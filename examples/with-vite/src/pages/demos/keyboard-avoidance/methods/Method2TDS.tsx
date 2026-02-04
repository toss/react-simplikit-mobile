import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { getKeyboardHeight, useVisualViewport } from '@react-simplikit/mobile';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { usePlatform } from '../utils/usePlatform.ts';
import { useScrollingDetector } from '../utils/useScrollingDetector.ts';
import { useTouchingDetector } from '../utils/useTouchingDetector.ts';

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_RATIO_THRESHOLD = 0.3;

// =============================================================================
// Metadata
// =============================================================================

export const method2Meta: MethodMeta = {
  id: 'tds',
  name: '2. TDS Method (opacity hiding)',
  source: 'toss/tds',
  sourceUrl: 'https://github.com/toss/tds',
  description:
    'TDS design system approach: Hide CTA with opacity:0 during scroll/touch to avoid flickering caused by VisualViewport event timing issues.',
  keyFeatures: [
    'Keyboard ratio detection (>30% = open)',
    'Hide during scroll (throttle 50ms, timeout 400-700ms)',
    'Hide during touch (startDelay 100ms, endDelay 200ms)',
    'iOS only position adjustment',
  ],
  issues: [
    'CTA disappears during scroll (UX tradeoff)',
    'User might miss button while scrolling',
    'Slight delay before CTA reappears',
  ],
  pros: [
    'Completely eliminates flickering',
    'Proven in production (TDS)',
    'Simple implementation',
    'No DOM manipulation',
  ],
  cons: ['CTA invisible during interaction', 'Scroll timeout can feel slow', 'Not suitable for all use cases'],
};

// =============================================================================
// Component
// =============================================================================

export function Method2TDS() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { isIOS } = usePlatform();
  const { viewport } = useVisualViewport();
  const { scrolling } = useScrollingDetector({ timeout: 400 });
  const { touching } = useTouchingDetector();

  const keyboardHeight = getKeyboardHeight();

  // ---------------------------------------------------------------------------
  // Keyboard Detection
  // ---------------------------------------------------------------------------

  const isKeyboardOpen = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const totalHeight = window.outerHeight || window.screen.availHeight;
    const ratio = keyboardHeight / totalHeight;
    return ratio > KEYBOARD_RATIO_THRESHOLD;
  }, [keyboardHeight]);

  // ---------------------------------------------------------------------------
  // Style Computation (TDS pattern: hide during scroll/touch)
  // ---------------------------------------------------------------------------

  const ctaStyle = useMemo<CSSProperties>(() => {
    if (!isIOS || !isKeyboardOpen) {
      return {};
    }

    // Hide during scroll or touch
    if (scrolling || touching) {
      return { opacity: 0, transition: 'opacity 150ms' };
    }

    // Position above keyboard
    const offsetY = viewport?.offsetTop ?? 0;
    return {
      transform: `translateY(${offsetY}px)`,
      transition: 'transform 200ms ease-out, opacity 150ms',
    };
  }, [isIOS, isKeyboardOpen, scrolling, touching, viewport?.offsetTop]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method2Meta} />
        <TestForm />
      </div>

      <FixedBottomCTA style={ctaStyle}>Submit (TDS)</FixedBottomCTA>
    </div>
  );
}
