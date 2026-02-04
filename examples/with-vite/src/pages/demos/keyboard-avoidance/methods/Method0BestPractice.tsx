import type { CSSProperties } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { usePlatform } from '../utils/usePlatform.ts';
import { useScrollingDetector } from '../utils/useScrollingDetector.ts';
import { useTouchingDetector } from '../utils/useTouchingDetector.ts';

// =============================================================================
// Types
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
// Constants & Metadata
// =============================================================================

const KEYBOARD_THRESHOLD = 50;

export const method0Meta: MethodMeta = {
  id: 'best-practice',
  name: '0. Best Practice (Recommended)',
  source: 'Combined Analysis',
  sourceUrl: undefined,
  description:
    'Recommended implementation combining best practices from all analyzed methods: VirtualKeyboard API priority, VisualViewport fallback, iOS scale correction, scroll/touch hiding, GPU acceleration.',
  keyFeatures: [
    'VirtualKeyboard API priority (Chrome 94+)',
    'VisualViewport fallback (iOS Safari)',
    'iOS auto-zoom scale correction',
    'Scroll/touch opacity hiding (TDS pattern)',
    'GPU acceleration (translate3d + willChange)',
    'max() CSS for safe-area handling',
    'useSyncExternalStore (React 18+)',
    'isKeyboardOpen state exposed',
  ],
  issues: ['Requires testing on various devices', 'Complex but well-organized'],
  pros: [
    'Best of all methods combined',
    'Works on all platforms',
    'No flickering (TDS pattern)',
    'Best performance (GPU + rAF)',
    'React 18+ concurrent safe',
    'Future-proof (VK API ready)',
  ],
  cons: ['More code than simple solutions', 'Requires understanding of all patterns'],
};

// =============================================================================
// Module State (Singleton for useSyncExternalStore)
// =============================================================================

let keyboardState: KeyboardState = { height: 0, viewportHeight: 0, scale: 1 };
let baseline = typeof window !== 'undefined' ? window.innerHeight : 0;
let rafId: number | null = null;
const listeners: Set<() => void> = new Set();

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

// =============================================================================
// Hook
// =============================================================================

/**
 * Best Practice hook combining all analyzed methods
 */
function useKeyboardAvoidBestPractice(options: {
  safeAreaBottom?: number;
  transitionDuration?: number;
  hideOnScroll?: boolean;
  hideOnTouch?: boolean;
}) {
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
// Component
// =============================================================================

export function Method0BestPractice() {
  const { style, keyboardHeight, isKeyboardOpen, scale } = useKeyboardAvoidBestPractice({
    safeAreaBottom: 0,
    transitionDuration: 200,
    hideOnScroll: true,
    hideOnTouch: true,
  });

  const hasVKAPI = typeof navigator !== 'undefined' && 'virtualKeyboard' in navigator;

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method0Meta} />

        <div
          style={{
            backgroundColor: '#ecfdf5',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #10b981',
          }}
        >
          <strong>Best Practice Features:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>VirtualKeyboard API: {hasVKAPI ? '✅ Available' : '❌ Not available (using VisualViewport)'}</li>
            <li>Keyboard: {isKeyboardOpen ? `Open (${keyboardHeight}px)` : 'Closed'}</li>
            <li>Scale correction: {scale !== 1 ? `Active (${scale.toFixed(2)}x)` : 'Not needed'}</li>
            <li>Scroll/touch hiding: Enabled</li>
          </ul>
        </div>

        <TestForm />
      </div>

      <FixedBottomCTA style={style}>Submit (Best Practice)</FixedBottomCTA>
    </div>
  );
}
