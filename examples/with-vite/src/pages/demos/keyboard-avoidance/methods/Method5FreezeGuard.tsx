import type { CSSProperties, FocusEvent } from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { getKeyboardHeight, useVisualViewport } from '@react-simplikit/mobile';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { guardScrollUntilKeyboardOpen, useFreezeRoot } from '../utils/useFreezeRoot.ts';
import { usePlatform } from '../utils/usePlatform.ts';

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_HEIGHT_THRESHOLD = 100;

// =============================================================================
// Metadata
// =============================================================================

export const method5Meta: MethodMeta = {
  id: 'freeze-guard',
  name: '5. Freeze + Guard Method',
  source: 'Notion: KeyboardAvoidance by @박수경B',
  sourceUrl: 'https://www.notion.so/tossteam/KeyboardAvoidance-2fba360d33e380da8154ca488b148dfd',
  description:
    'Complete solution using preventScroll focus, html/body freeze, and rAF guard loop. Prevents iOS auto-scroll entirely.',
  keyFeatures: [
    'focus({ preventScroll: true })',
    'html/body position:fixed freeze',
    'rAF guard loop until keyboard opens',
    'Sub-pixel jitter prevention',
    'CSS Variables for keyboard metrics',
  ],
  issues: [
    'Complex implementation',
    'Requires wrapping focus handlers',
    'May interfere with other scroll behaviors',
    'Timing sensitive (guard timeout)',
  ],
  pros: [
    'Completely prevents auto-scroll',
    'No jitter or flickering',
    'Most thorough solution',
    'Battle-tested at Toss',
  ],
  cons: [
    'Most complex implementation',
    'DOM manipulation (html/body)',
    'Harder to integrate',
    'Requires understanding of all parts',
  ],
};

// =============================================================================
// Component
// =============================================================================

export function Method5FreezeGuard() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { isIOS } = usePlatform();
  const { viewport } = useVisualViewport();
  const { freeze, unfreeze } = useFreezeRoot();

  const keyboardHeight = getKeyboardHeight();
  const cancelGuardRef = useRef<(() => void) | null>(null);

  // ---------------------------------------------------------------------------
  // Focus Handler (preventScroll + freeze + guard)
  // ---------------------------------------------------------------------------

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!isIOS) return;

      const target = event.target;
      const scrollY = window.scrollY;

      // 1. Freeze root to prevent auto-scroll
      freeze();

      // 2. Focus with preventScroll
      event.preventDefault();
      target.focus({ preventScroll: true });

      // 3. Start guard loop
      cancelGuardRef.current = guardScrollUntilKeyboardOpen(scrollY, () => {
        unfreeze();
      });
    },
    [isIOS, freeze, unfreeze]
  );

  // ---------------------------------------------------------------------------
  // Blur Handler
  // ---------------------------------------------------------------------------

  const handleBlur = useCallback(() => {
    if (cancelGuardRef.current) {
      cancelGuardRef.current();
      cancelGuardRef.current = null;
    }
    unfreeze();
  }, [unfreeze]);

  // ---------------------------------------------------------------------------
  // Keyboard Detection
  // ---------------------------------------------------------------------------

  const isKeyboardOpen = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return keyboardHeight > KEYBOARD_HEIGHT_THRESHOLD;
  }, [keyboardHeight]);

  // ---------------------------------------------------------------------------
  // Style Computation
  // ---------------------------------------------------------------------------

  const ctaStyle = useMemo<CSSProperties>(() => {
    if (!isIOS || !isKeyboardOpen) {
      return {};
    }

    const offsetY = viewport?.offsetTop ?? 0;
    return {
      transform: `translateY(${offsetY}px)`,
      transition: 'transform 200ms ease-out',
    };
  }, [isIOS, isKeyboardOpen, viewport?.offsetTop]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method5Meta} />

        <div
          style={{
            backgroundColor: '#fef3c7',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          ⚠️ This method intercepts focus events. On iOS, it uses preventScroll + freeze + guard pattern.
        </div>

        <TestForm onFocus={handleFocus} onBlur={handleBlur} />
      </div>

      <FixedBottomCTA style={ctaStyle}>Submit (Freeze+Guard)</FixedBottomCTA>
    </div>
  );
}
