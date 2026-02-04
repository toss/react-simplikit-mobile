import { useEffect, useMemo, useRef, useState } from 'react';

// =============================================================================
// Types
// =============================================================================

type UseKeyboardInsetOptions = {
  /**
   * Minimum height to consider keyboard as open
   * @default 60
   */
  threshold?: number;
  /**
   * Use requestAnimationFrame for updates
   * @default true
   */
  useRAF?: boolean;
};

type KeyboardInset = {
  height: number;
  isOpen: boolean;
  viewportHeight: number;
};

type VirtualKeyboard = {
  boundingRect: DOMRect;
  overlaysContent: boolean;
} & EventTarget;

declare global {
  interface Navigator {
    virtualKeyboard?: VirtualKeyboard;
  }
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Advanced keyboard height detection with multiple fallbacks
 *
 * Priority:
 * 1. Chrome VirtualKeyboard API (most accurate, Chrome 94+)
 * 2. VisualViewport API (widely supported)
 * 3. window.innerHeight baseline comparison (fallback)
 *
 * Features:
 * - rAF scheduling for performance
 * - Orientation change handling
 * - Noise filtering with threshold
 *
 * @see frontend-mobile: service.toss.im/shopping/shopping-search/src/hooks/_common/useKeyboardInset.ts
 */
export function useKeyboardInset(options: UseKeyboardInsetOptions = {}): KeyboardInset {
  const { threshold = 60, useRAF = true } = options;

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [height, setHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  const baselineRef = useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);
  const rafRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // Effect: Event Listeners & Computation
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // -------------------------------------------------------------------------
    // Scheduling Helper
    // -------------------------------------------------------------------------

    const schedule = (fn: () => void) => {
      if (!useRAF) {
        fn();
        return;
      }
      if (rafRef.current != null) {
        return;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        fn();
      });
    };

    // -------------------------------------------------------------------------
    // Keyboard Height Computation Functions
    // -------------------------------------------------------------------------

    const computeFromVirtualKeyboard = (): number | null => {
      const virtualKeyboard = navigator.virtualKeyboard;
      if (virtualKeyboard?.boundingRect == null) {
        return null;
      }

      const candidate = Math.max(0, Math.round(virtualKeyboard.boundingRect.height));
      return candidate >= threshold ? candidate : 0;
    };

    const computeFromVisualViewport = (): number | null => {
      const visualViewport = window.visualViewport;
      if (visualViewport == null) {
        return null;
      }

      const visualViewportHeight = Math.round(visualViewport.height);
      const candidate = Math.max(
        0,
        Math.round(baselineRef.current - (visualViewport.height + visualViewport.offsetTop))
      );

      setViewportHeight(visualViewportHeight);
      return candidate >= threshold ? candidate : 0;
    };

    const computeFromInnerHeight = (): number => {
      const candidate = Math.max(0, baselineRef.current - window.innerHeight);
      return candidate >= threshold ? candidate : 0;
    };

    // -------------------------------------------------------------------------
    // Main Recompute Logic (Priority: VK API > VisualViewport > innerHeight)
    // -------------------------------------------------------------------------

    const recompute = () => {
      // 1) VirtualKeyboard API (Chrome - most accurate)
      const virtualKeyboardHeight = computeFromVirtualKeyboard();
      if (virtualKeyboardHeight != null) {
        setHeight(virtualKeyboardHeight);
        return;
      }

      // 2) VisualViewport (widely supported)
      const visualViewportHeight = computeFromVisualViewport();
      if (visualViewportHeight != null) {
        setHeight(visualViewportHeight);
        return;
      }

      // 3) innerHeight fallback
      setHeight(computeFromInnerHeight());
    };

    // -------------------------------------------------------------------------
    // Baseline Management
    // -------------------------------------------------------------------------

    const maybeUpdateBaseline = () => {
      if (window.innerHeight > baselineRef.current) {
        baselineRef.current = window.innerHeight;
      }
    };

    // -------------------------------------------------------------------------
    // Event Handlers
    // -------------------------------------------------------------------------

    const onResize = () =>
      schedule(() => {
        maybeUpdateBaseline();
        recompute();
      });

    const onOrientation = () =>
      schedule(() => {
        baselineRef.current = window.innerHeight;
        recompute();
      });

    const onVisualViewportChange = () => schedule(recompute);
    const onVirtualKeyboardChange = () => schedule(recompute);

    // -------------------------------------------------------------------------
    // Initialize & Subscribe
    // -------------------------------------------------------------------------

    baselineRef.current = window.innerHeight;
    schedule(recompute);

    // Window events
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onOrientation, { passive: true });

    // VisualViewport events
    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', onVisualViewportChange);
      visualViewport.addEventListener('scroll', onVisualViewportChange);
    }

    // Chrome VirtualKeyboard API
    const virtualKeyboard = navigator.virtualKeyboard;
    if (virtualKeyboard?.addEventListener) {
      try {
        virtualKeyboard.overlaysContent = true;
      } catch {
        // Ignore errors
      }
      virtualKeyboard.addEventListener('geometrychange', onVirtualKeyboardChange);
    }

    // -------------------------------------------------------------------------
    // Cleanup
    // -------------------------------------------------------------------------

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);

      if (visualViewport) {
        visualViewport.removeEventListener('resize', onVisualViewportChange);
        visualViewport.removeEventListener('scroll', onVisualViewportChange);
      }

      if (virtualKeyboard?.removeEventListener) {
        virtualKeyboard.removeEventListener('geometrychange', onVirtualKeyboardChange);
      }

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [threshold, useRAF]);

  // ---------------------------------------------------------------------------
  // Derived State
  // ---------------------------------------------------------------------------

  const isOpen = useMemo(() => {
    return height >= threshold;
  }, [height, threshold]);

  return { height, isOpen, viewportHeight };
}
