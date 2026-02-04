import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { useKeyboardInset } from '../utils/useKeyboardInset.ts';
import { useScrollingDetector } from '../utils/useScrollingDetector.ts';
import { useTouchingDetector } from '../utils/useTouchingDetector.ts';

// =============================================================================
// Metadata
// =============================================================================

export const method4Meta: MethodMeta = {
  id: 'frontend-mobile',
  name: '4. Frontend-Mobile Method (advanced)',
  source: 'toss/frontend-mobile',
  sourceUrl: undefined, // Internal repo
  description:
    'Most advanced implementation from frontend-mobile. Uses VirtualKeyboard API (Chrome), rAF scheduling, iOS scale correction, and max() for safe-area.',
  keyFeatures: [
    'VirtualKeyboard API priority (Chrome 94+)',
    'VisualViewport fallback',
    'rAF scheduling for performance',
    'iOS auto-zoom scale correction (vv.scale)',
    'max() CSS for safe-area handling',
    'Orientation change baseline reset',
  ],
  issues: [
    'VirtualKeyboard API not supported on iOS Safari',
    'Complex implementation',
    'Multiple fallback paths to maintain',
  ],
  pros: [
    'Most accurate keyboard height (when VK API available)',
    'Best performance with rAF',
    'Handles edge cases (zoom, orientation)',
    'Future-proof (VK API is the standard)',
  ],
  cons: [
    'iOS still uses VisualViewport fallback',
    'More code complexity',
    'Threshold tuning needed',
    'VK API browser support limited',
  ],
};

// =============================================================================
// Component
// =============================================================================

export function Method4FrontendMobile() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { height: keyboardHeight, isOpen: isKeyboardOpen } = useKeyboardInset({ threshold: 60 });
  const { scrolling } = useScrollingDetector({ timeout: 400 });
  const { touching } = useTouchingDetector();

  // ---------------------------------------------------------------------------
  // Style Computation (with scale correction and safe-area)
  // ---------------------------------------------------------------------------

  const ctaStyle = useMemo<CSSProperties>(() => {
    if (!isKeyboardOpen) {
      return {};
    }

    // Hide during scroll/touch (TDS pattern)
    if (scrolling || touching) {
      return { opacity: 0, transition: 'opacity 150ms' };
    }

    // Get scale for iOS zoom correction
    const visualViewport = window.visualViewport;
    const scale = visualViewport?.scale ?? 1;
    const offset = keyboardHeight > 0 ? keyboardHeight / scale : 0;
    const clamped = Math.max(0, Math.round(offset));

    return {
      // Use max() to handle both keyboard and safe-area
      bottom: `max(${clamped}px, env(safe-area-inset-bottom))`,
      transition: 'bottom 200ms ease-out, opacity 150ms',
    };
  }, [isKeyboardOpen, keyboardHeight, scrolling, touching]);

  // ---------------------------------------------------------------------------
  // VirtualKeyboard API Check
  // ---------------------------------------------------------------------------

  const hasVKAPI = typeof navigator !== 'undefined' && 'virtualKeyboard' in navigator;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method4Meta} />

        {hasVKAPI && (
          <div
            style={{
              backgroundColor: '#d1fae5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
            }}
          >
            ✅ VirtualKeyboard API available! Using native keyboard detection.
          </div>
        )}

        <TestForm />
      </div>

      <FixedBottomCTA style={ctaStyle}>Submit (Frontend-Mobile)</FixedBottomCTA>
    </div>
  );
}
