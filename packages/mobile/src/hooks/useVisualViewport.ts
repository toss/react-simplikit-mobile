import { startTransition, useCallback, useEffect, useState } from 'react';

import { isServer } from '../utils/isServer.ts';

type VisualViewportState = {
  /** Viewport width (px) */
  width: number;
  /** Viewport height (px) */
  height: number;
  /**
   * Viewport left offset (px) from the layout viewport
   *
   * Typically 0 unless horizontal scrolling or panning occurs
   */
  offsetLeft: number;
  /**
   * Viewport top offset (px) from the layout viewport
   *
   * On iOS: Becomes negative when keyboard appears (e.g., -300px means 300px keyboard height)
   * On Android: Typically remains 0
   *
   * Use `-offsetTop` to get accurate keyboard height on iOS
   */
  offsetTop: number;
  /**
   * Pinch-zoom scaling factor
   *
   * - 1.0 = no zoom (default)
   * - > 1.0 = zoomed in
   * - < 1.0 = zoomed out (rare, depends on viewport settings)
   *
   * @example
   * ```tsx
   * const { scale } = useVisualViewport();
   * // Hide floating UI when user zooms in
   * if (scale > 1.3) setShowFloatingButton(false);
   * ```
   */
  scale: number;
};

/**
 * React hook to track Visual Viewport changes
 *
 * Returns the actual visible area in mobile WebView, which changes when
 * the keyboard appears or the user zooms/scrolls.
 *
 * **Tip:** If you only need keyboard height, use `useKeyboardHeight()` instead
 * for a simpler API.
 *
 * @returns Visual Viewport state (width, height, offsetLeft, offsetTop, scale)
 *
 * @see {@link useKeyboardHeight} - Simpler hook for keyboard height only
 *
 * @example
 * ```tsx
 * function CustomLayout() {
 *   const { width, height, offsetTop, scale } = useVisualViewport();
 *
 *   // Hide floating UI when user zooms in
 *   const showFloatingUI = scale <= 1.3;
 *
 *   return (
 *     <div style={{ height }}>
 *       {showFloatingUI && <FloatingButton />}
 *       Viewport-aware content
 *     </div>
 *   );
 * }
 * ```
 */
export function useVisualViewport(): VisualViewportState {
  const visualViewport = isServer() ? null : window.visualViewport;

  const [viewport, setViewport] = useState<VisualViewportState>(() => getVisualViewportState(visualViewport));

  const updateViewportState = useCallback(() => {
    startTransition(() => {
      setViewport(getVisualViewportState(window.visualViewport ?? null));
    });
  }, []);

  useEffect(
    function handleVisualViewportChange() {
      window.visualViewport?.addEventListener('resize', updateViewportState);
      window.visualViewport?.addEventListener('scroll', updateViewportState);

      return function cleanup() {
        window.visualViewport?.removeEventListener('resize', updateViewportState);
        window.visualViewport?.removeEventListener('scroll', updateViewportState);
      };
    },
    [updateViewportState]
  );

  return viewport;
}

function getVisualViewportState(visualViewport: VisualViewport | null): VisualViewportState {
  return {
    width: visualViewport?.width ?? 0,
    height: visualViewport?.height ?? 0,
    offsetLeft: visualViewport?.offsetLeft ?? 0,
    offsetTop: visualViewport?.offsetTop ?? 0,
    scale: visualViewport?.scale ?? 1,
  };
}
