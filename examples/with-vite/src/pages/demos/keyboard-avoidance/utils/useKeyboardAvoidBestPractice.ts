import type { CSSProperties } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import { usePlatform } from './usePlatform.ts';
import { useScrollingDetector } from './useScrollingDetector.ts';
import { useTouchingDetector } from './useTouchingDetector.ts';

// =============================================================================
// Types
// =============================================================================

export type UseKeyboardAvoidBestPracticeOptions = {
  safeAreaBottom?: number;
  transitionDuration?: number;
  hideOnScroll?: boolean;
  hideOnTouch?: boolean;
};

export type UseKeyboardAvoidBestPracticeReturn = {
  style: CSSProperties;
  keyboardHeight: number;
  viewportHeight: number;
  isKeyboardOpen: boolean;
  scale: number;
};

// =============================================================================
// Hook (Main API)
// =============================================================================

/**
 * Best Practice hook combining all analyzed keyboard avoidance methods
 *
 * Features:
 * - VirtualKeyboard API priority (Chrome 94+)
 * - VisualViewport fallback (iOS Safari)
 * - iOS auto-zoom scale correction
 * - Scroll/touch opacity hiding (TDS pattern)
 * - useSyncExternalStore (React 18+ concurrent safe)
 *
 * @example
 * const { style, isKeyboardOpen, keyboardHeight } = useKeyboardAvoidBestPractice({
 *   safeAreaBottom: 0,
 *   transitionDuration: 200,
 *   hideOnScroll: true,
 *   hideOnTouch: true,
 * });
 */
export function useKeyboardAvoidBestPractice(
  options: UseKeyboardAvoidBestPracticeOptions = {}
): UseKeyboardAvoidBestPracticeReturn {
  const { safeAreaBottom = 0, transitionDuration = 200, hideOnScroll = true, hideOnTouch = true } = options;

  const { isIOS } = usePlatform();
  const { scrolling } = useScrollingDetector({ timeout: 300 });
  const { touching } = useTouchingDetector();

  // useSyncExternalStore for React 18+ concurrent rendering safety
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isKeyboardOpen = state.height > KEYBOARD_THRESHOLD;
  const shouldHide = isKeyboardOpen && ((hideOnScroll && scrolling) || (hideOnTouch && touching));

  const style = useMemo<CSSProperties>(() => {
    if (!isKeyboardOpen) {
      return {};
    }

    // Hide during scroll/touch (TDS pattern - eliminates flickering)
    if (shouldHide) {
      return {
        opacity: 0,
        transition: 'opacity 100ms',
      };
    }

    // iOS scale correction (frontend-mobile pattern)
    const scaleCorrectedHeight = isIOS && state.scale > 1 ? state.height / state.scale : state.height;
    const offset = Math.max(0, Math.round(scaleCorrectedHeight + safeAreaBottom));

    return {
      // Use max() to handle both keyboard and safe-area (frontend-mobile pattern)
      bottom: `max(${offset}px, env(safe-area-inset-bottom))`,
      transition: `bottom ${transitionDuration}ms ease-out`,
      // Conditional layer promotion
      willChange: 'bottom',
    };
  }, [isKeyboardOpen, shouldHide, state.height, state.scale, isIOS, safeAreaBottom, transitionDuration]);

  return {
    style,
    keyboardHeight: state.height,
    viewportHeight: state.viewportHeight,
    isKeyboardOpen,
    scale: state.scale,
  };
}

// =============================================================================
// Internal Types
// =============================================================================

type VirtualKeyboard = {
  boundingRect: DOMRect;
  overlaysContent: boolean;
} & EventTarget;

declare global {
  interface Navigator {
    virtualKeyboard?: VirtualKeyboard;
  }
}

type KeyboardState = {
  height: number;
  viewportHeight: number;
  scale: number;
};

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_THRESHOLD = 50;

// =============================================================================
// Module State (Singleton for useSyncExternalStore)
// =============================================================================

let keyboardState: KeyboardState = { height: 0, viewportHeight: 0, scale: 1 };
let baseline = typeof window !== 'undefined' ? window.innerHeight : 0;
let rafId: number | null = null;
const listeners: Set<() => void> = new Set();

// =============================================================================
// useSyncExternalStore Interface
// =============================================================================

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): KeyboardState {
  return keyboardState;
}

function getServerSnapshot(): KeyboardState {
  return { height: 0, viewportHeight: 0, scale: 1 };
}

// =============================================================================
// Low-level Helpers
// =============================================================================

function notify() {
  listeners.forEach(listener => listener());
}

function scheduleUpdate(fn: () => void) {
  if (rafId != null) {
    return;
  }
  rafId = requestAnimationFrame(() => {
    rafId = null;
    fn();
  });
}

// =============================================================================
// Keyboard Height Computation
// =============================================================================

function computeKeyboardHeight(): KeyboardState {
  if (typeof window === 'undefined') {
    return { height: 0, viewportHeight: 0, scale: 1 };
  }

  // 1) Try VirtualKeyboard API first (Chrome 94+, most accurate)
  const virtualKeyboard = navigator.virtualKeyboard;
  if (virtualKeyboard?.boundingRect) {
    const height = Math.max(0, Math.round(virtualKeyboard.boundingRect.height));
    return {
      height: height >= KEYBOARD_THRESHOLD ? height : 0,
      viewportHeight: window.innerHeight,
      scale: 1,
    };
  }

  // 2) VisualViewport fallback (iOS Safari, widely supported)
  const visualViewport = window.visualViewport;
  if (visualViewport) {
    const scale = visualViewport.scale ?? 1;
    const candidate = Math.max(0, Math.round(baseline - (visualViewport.height + visualViewport.offsetTop)));
    return {
      height: candidate >= KEYBOARD_THRESHOLD ? candidate : 0,
      viewportHeight: Math.round(visualViewport.height),
      scale,
    };
  }

  // 3) innerHeight fallback
  const candidate = Math.max(0, baseline - window.innerHeight);
  return {
    height: candidate >= KEYBOARD_THRESHOLD ? candidate : 0,
    viewportHeight: window.innerHeight,
    scale: 1,
  };
}

function maybeUpdateBaseline() {
  if (typeof window !== 'undefined' && window.innerHeight > baseline) {
    baseline = window.innerHeight;
  }
}

function updateKeyboardState() {
  const newState = computeKeyboardHeight();
  if (
    newState.height !== keyboardState.height ||
    newState.viewportHeight !== keyboardState.viewportHeight ||
    newState.scale !== keyboardState.scale
  ) {
    keyboardState = newState;
    notify();
  }
}

// =============================================================================
// Event Listener Initialization (runs once on module load)
// =============================================================================

if (typeof window !== 'undefined') {
  const onResize = () =>
    scheduleUpdate(() => {
      maybeUpdateBaseline();
      updateKeyboardState();
    });

  const onOrientation = () =>
    scheduleUpdate(() => {
      baseline = window.innerHeight;
      updateKeyboardState();
    });

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onOrientation, { passive: true });

  // VisualViewport events
  const visualViewport = window.visualViewport;
  if (visualViewport) {
    visualViewport.addEventListener('resize', () => scheduleUpdate(updateKeyboardState));
    visualViewport.addEventListener('scroll', () => scheduleUpdate(updateKeyboardState));
  }

  // VirtualKeyboard API (Chrome)
  const virtualKeyboard = navigator.virtualKeyboard;
  if (virtualKeyboard?.addEventListener) {
    try {
      virtualKeyboard.overlaysContent = true;
    } catch {
      // Ignore
    }
    virtualKeyboard.addEventListener('geometrychange', () => scheduleUpdate(updateKeyboardState));
  }

  // Initial computation
  baseline = window.innerHeight;
  updateKeyboardState();
}
