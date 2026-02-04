import { useEffect, useRef, useState } from 'react';

import { throttle } from './throttle.ts';

// =============================================================================
// Types
// =============================================================================

type UseScrollingDetectorOptions = {
  /**
   * Timeout in ms to consider scrolling has stopped
   * @default 150
   */
  timeout?: number;
  /**
   * Throttle interval in ms
   * @default 50
   */
  throttleMs?: number;
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Detects if the user is currently scrolling
 *
 * Used by TDS to hide FixedBottomCTA during scroll
 * to avoid flickering due to VisualViewport event timing issues
 *
 * @see TDS: packages/tds/mobile/src/components/bottom-cta/hooks/useScrollingDetector.ts
 */
export function useScrollingDetector(options: UseScrollingDetectorOptions = {}) {
  const { timeout = 150, throttleMs = 50 } = options;
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handler = throttle(() => {
      setScrolling(true);

      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setScrolling(false);
        timeoutRef.current = undefined;
      }, timeout);
    }, throttleMs);

    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout, throttleMs]);

  return { scrolling };
}
