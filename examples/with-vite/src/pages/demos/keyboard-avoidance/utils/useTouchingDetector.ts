import { useEffect, useRef, useState } from 'react';

// =============================================================================
// Types
// =============================================================================

type UseTouchingDetectorOptions = {
  /**
   * Delay before setting touching to true (ms)
   * @default 100
   */
  startDelay?: number;
  /**
   * Delay before setting touching to false after touch end (ms)
   * @default 200
   */
  endDelay?: number;
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Detects if the user is currently touching the screen
 *
 * Used by TDS to hide FixedBottomCTA during touch
 * to avoid flickering due to VisualViewport event timing issues
 *
 * @see TDS: packages/tds/mobile/src/components/bottom-cta/hooks/useTouchingDetector.ts
 */
export function useTouchingDetector(options: UseTouchingDetectorOptions = {}) {
  const { startDelay = 100, endDelay = 200 } = options;
  const [touching, setTouching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleTouchStart = () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setTouching(true);
        timeoutRef.current = undefined;
      }, startDelay);
    };

    const handleTouchEnd = () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setTouching(false);
        timeoutRef.current = undefined;
      }, endDelay);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startDelay, endDelay]);

  return { touching };
}
