import type { CSSProperties } from 'react';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getKeyboardHeight, subscribeKeyboardHeight } from '@react-simplikit/mobile';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { useScrollingDetector } from '../utils/useScrollingDetector.ts';
import { useTouchingDetector } from '../utils/useTouchingDetector.ts';

// =============================================================================
// Constants
// =============================================================================

const KEYBOARD_THRESHOLD = 50;

// =============================================================================
// Metadata
// =============================================================================

export const method6Meta: MethodMeta = {
  id: 'proposed',
  name: '6. Proposed Improvement',
  source: 'Analysis Result',
  sourceUrl: undefined,
  description:
    'Proposed improvement based on multi-perspective analysis. Combines best practices: useSyncExternalStore, GPU optimization, optional scroll/touch hiding.',
  keyFeatures: [
    'useSyncExternalStore (React 18+ pattern)',
    'GPU acceleration (translate3d + willChange)',
    'Optional hideOnScroll/hideOnTouch',
    'isKeyboardOpen state exposed',
    'Backward compatible API',
  ],
  issues: ['Needs real device testing', 'Performance impact to be measured', 'API design to be finalized'],
  pros: [
    'React 18+ best practices',
    'No breaking changes',
    'Opt-in advanced features',
    'Better performance (GPU)',
    'Concurrent rendering safe',
  ],
  cons: ['Not yet production tested', 'May need tuning', 'More options can be confusing'],
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Proposed useAvoidKeyboard with useSyncExternalStore
 */
function useAvoidKeyboardProposed(options: {
  safeAreaBottom?: number;
  transitionDuration?: number;
  hideOnScroll?: boolean;
  hideOnTouch?: boolean;
}) {
  const { safeAreaBottom = 0, transitionDuration = 200, hideOnScroll = false, hideOnTouch = false } = options;

  // ---------------------------------------------------------------------------
  // useSyncExternalStore Setup
  // ---------------------------------------------------------------------------

  const subscribe = useCallback((callback: () => void) => {
    const { unsubscribe } = subscribeKeyboardHeight({
      callback,
      immediate: false,
      throttleMs: 16,
    });
    return unsubscribe;
  }, []);

  const getSnapshot = useCallback(() => {
    return getKeyboardHeight();
  }, []);
  const getServerSnapshot = useCallback(() => {
    return 0;
  }, []);

  const keyboardHeight = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // ---------------------------------------------------------------------------
  // Scroll/Touch Detection
  // ---------------------------------------------------------------------------

  const { scrolling } = useScrollingDetector({ timeout: 150 });
  const { touching } = useTouchingDetector();

  // ---------------------------------------------------------------------------
  // Computed Values
  // ---------------------------------------------------------------------------

  const isKeyboardOpen = keyboardHeight > KEYBOARD_THRESHOLD;
  const shouldHide = (hideOnScroll && scrolling) || (hideOnTouch && touching);

  // ---------------------------------------------------------------------------
  // Style Computation
  // ---------------------------------------------------------------------------

  const style = useMemo<CSSProperties>(() => {
    const translateY = -(keyboardHeight + safeAreaBottom);

    if (shouldHide && isKeyboardOpen) {
      return {
        transform: `translate3d(0, ${translateY}px, 0)`,
        opacity: 0,
        transition: `transform ${transitionDuration}ms ease-out, opacity 100ms`,
        willChange: 'transform, opacity',
      };
    }

    return {
      transform: `translate3d(0, ${translateY}px, 0)`,
      transition: `transform ${transitionDuration}ms ease-out`,
      willChange: keyboardHeight > 0 ? 'transform' : 'auto',
    };
  }, [keyboardHeight, safeAreaBottom, transitionDuration, shouldHide, isKeyboardOpen]);

  return {
    style,
    keyboardHeight,
    isKeyboardOpen,
  };
}

// =============================================================================
// Component
// =============================================================================

export function Method6Proposed() {
  const { style } = useAvoidKeyboardProposed({
    safeAreaBottom: 0,
    transitionDuration: 200,
    hideOnScroll: true,
    hideOnTouch: true,
  });

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method6Meta} />

        <div
          style={{
            backgroundColor: '#dbeafe',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          💡 This method uses:
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>
              <code>useSyncExternalStore</code> for React 18+ compatibility
            </li>
            <li>
              <code>translate3d</code> for GPU acceleration
            </li>
            <li>
              <code>willChange</code> for conditional layer promotion
            </li>
            <li>
              Optional <code>hideOnScroll</code> + <code>hideOnTouch</code>
            </li>
          </ul>
        </div>

        <TestForm />
      </div>

      <FixedBottomCTA style={style}>Submit (Proposed)</FixedBottomCTA>
    </div>
  );
}
