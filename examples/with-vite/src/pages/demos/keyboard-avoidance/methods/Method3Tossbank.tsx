import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { getKeyboardHeight, useVisualViewport } from '@react-simplikit/mobile';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { usePlatform } from '../utils/usePlatform.ts';
import { usePrevScroll } from '../utils/usePrevScroll.ts';

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_RATIO_THRESHOLD = 0.2;

// =============================================================================
// Metadata
// =============================================================================

export const method3Meta: MethodMeta = {
  id: 'tossbank',
  name: '3. Tossbank Method (scroll restore)',
  source: 'tossbank-frontend',
  sourceUrl: undefined, // Internal repo
  description:
    'Tossbank approach: Save scroll position on input focus, restore after keyboard opens. Prevents iOS auto-scroll but causes slight "jitter".',
  keyFeatures: [
    'Save scrollY on focus',
    'Restore scroll after keyboard opens (50ms delay)',
    'Smooth scroll animation (200ms)',
    'Works with useFixedBottomStyle',
  ],
  issues: [
    'Visible "jitter" effect (scroll tries then gets restored)',
    'Delay between focus and scroll restoration',
    'May conflict with user scroll intention',
  ],
  pros: ['Prevents page jump on focus', 'CTA stays visible', 'Simple concept', 'No opacity hiding needed'],
  cons: [
    '"덜컹거림" (jitter) is noticeable',
    'Scroll restoration can feel unnatural',
    'May interfere with accessibility',
    'Timing sensitive',
  ],
};

// =============================================================================
// Component
// =============================================================================

export function Method3Tossbank() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { isIOS } = usePlatform();
  const { viewport } = useVisualViewport();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const keyboardHeight = getKeyboardHeight();

  // ---------------------------------------------------------------------------
  // Keyboard Detection
  // ---------------------------------------------------------------------------

  const keyboardOpen = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const totalHeight = window.outerHeight || window.screen.availHeight;
    const ratio = keyboardHeight / totalHeight;
    const open = ratio > KEYBOARD_RATIO_THRESHOLD;
    if (open !== isKeyboardOpen) {
      setIsKeyboardOpen(open);
    }
    return open;
  }, [keyboardHeight, isKeyboardOpen]);

  // ---------------------------------------------------------------------------
  // Scroll Restoration
  // ---------------------------------------------------------------------------

  const { setPrevScroll } = usePrevScroll({
    enable: isIOS,
    element: window,
    trigger: keyboardOpen,
    delay: 50,
  });

  const handleFocus = () => {
    setPrevScroll(window.scrollY);
  };

  // ---------------------------------------------------------------------------
  // Style Computation
  // ---------------------------------------------------------------------------

  const ctaStyle = useMemo<CSSProperties>(() => {
    if (!isIOS || !keyboardOpen) {
      return {};
    }

    const offsetY = viewport?.offsetTop ?? 0;
    return {
      transform: `translateY(${offsetY}px)`,
      transition: 'transform 200ms ease-out',
    };
  }, [isIOS, keyboardOpen, viewport?.offsetTop]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method3Meta} />
        <TestForm onFocus={handleFocus} />
      </div>

      <FixedBottomCTA style={ctaStyle}>Submit (Tossbank)</FixedBottomCTA>
    </div>
  );
}
