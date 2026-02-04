import { useCallback, useRef } from 'react';

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_OPEN_THRESHOLD = 100;
const GUARD_TIMEOUT_MS = 1100;

// =============================================================================
// Hook: useFreezeRoot
// =============================================================================

/**
 * Freezes html/body to prevent iOS auto-scroll when input is focused
 *
 * This is part of the "Freeze + Guard" pattern from @박수경B's KeyboardAvoidance
 * Combined with preventScroll focus option and guard scroll logic
 *
 * @see Notion: KeyboardAvoidance (2026) by @박수경B
 */
export function useFreezeRoot() {
  const frozenScrollYRef = useRef(0);
  const isFrozenRef = useRef(false);

  const freeze = useCallback(() => {
    if (isFrozenRef.current) {
      return;
    }

    const html = document.documentElement;
    frozenScrollYRef.current = window.scrollY || 0;

    html.style.position = 'fixed';
    html.style.top = `-${frozenScrollYRef.current}px`;
    html.style.width = '100%';
    html.style.height = '100%';
    html.style.overflow = 'hidden';

    isFrozenRef.current = true;
  }, []);

  const unfreeze = useCallback(() => {
    if (!isFrozenRef.current) {
      return;
    }

    const html = document.documentElement;

    html.style.position = '';
    html.style.top = '';
    html.style.width = '';
    html.style.height = '';
    html.style.overflow = '';

    window.scrollTo(0, frozenScrollYRef.current);
    isFrozenRef.current = false;
  }, []);

  return { freeze, unfreeze, isFrozen: isFrozenRef.current };
}

// =============================================================================
// Utility: guardScrollUntilKeyboardOpen
// =============================================================================

/**
 * Guards scroll position until keyboard opens using requestAnimationFrame
 *
 * Forces scroll back to anchor position every frame until keyboard is detected
 */
export function guardScrollUntilKeyboardOpen(anchorY: number, onKeyboardOpen: () => void, maxMs = GUARD_TIMEOUT_MS) {
  let opened = false;
  let timedOut = false;

  // ---------------------------------------------------------------------------
  // Keyboard Detection
  // ---------------------------------------------------------------------------

  const checkKeyboardOpen = () => {
    const visualViewport = window.visualViewport;
    if (visualViewport == null) {
      return false;
    }
    return window.innerHeight - visualViewport.height > KEYBOARD_OPEN_THRESHOLD;
  };

  // ---------------------------------------------------------------------------
  // Animation Frame Loop
  // ---------------------------------------------------------------------------

  const tick = () => {
    if (checkKeyboardOpen()) {
      opened = true;
      onKeyboardOpen();
      return;
    }

    if (window.scrollY !== anchorY) {
      window.scrollTo(0, anchorY);
    }

    if (!opened && !timedOut) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);

  // ---------------------------------------------------------------------------
  // Timeout Fallback
  // ---------------------------------------------------------------------------

  setTimeout(() => {
    timedOut = true;
    if (!opened) {
      onKeyboardOpen();
    }
  }, maxMs);

  // ---------------------------------------------------------------------------
  // Cancel Function
  // ---------------------------------------------------------------------------

  return () => {
    timedOut = true;
  };
}
