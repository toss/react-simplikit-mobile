import { useCallback, useEffect, useRef } from 'react';

// =============================================================================
// Types
// =============================================================================

type UsePrevScrollOptions = {
  /**
   * Whether to enable scroll restoration
   * @default true
   */
  enable?: boolean;
  /**
   * Target element to scroll (window by default)
   */
  element?: Element | Window;
  /**
   * Trigger to restore scroll position (e.g., isKeyboardOpen)
   */
  trigger: boolean;
  /**
   * Delay before restoring scroll (ms)
   * @default 50
   */
  delay?: number;
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Saves scroll position on focus and restores it when keyboard opens
 *
 * Used by tossbank to prevent iOS auto-scroll behavior
 * Causes slight "jitter" but prevents page from jumping
 *
 * @see tossbank: services/chat/src/hooks/usePrevScroll.ts
 */
export function usePrevScroll(options: UsePrevScrollOptions) {
  const { enable = true, element = window, trigger, delay = 50 } = options;
  const prevScrollRef = useRef(0);

  const scrollToPrev = useCallback(async () => {
    if (!enable) {
      return;
    }

    // Wait for keyboard to fully open
    await new Promise(resolve => setTimeout(resolve, delay));

    if (element === window) {
      window.scrollTo({ top: prevScrollRef.current, behavior: 'smooth' });
    } else if (element instanceof Element) {
      element.scrollTo({ top: prevScrollRef.current, behavior: 'smooth' });
    }
  }, [enable, element, delay]);

  useEffect(() => {
    if (trigger) {
      scrollToPrev();
    }
  }, [trigger, scrollToPrev]);

  const setPrevScroll = useCallback((scrollY: number) => {
    prevScrollRef.current = scrollY;
  }, []);

  return { setPrevScroll };
}
