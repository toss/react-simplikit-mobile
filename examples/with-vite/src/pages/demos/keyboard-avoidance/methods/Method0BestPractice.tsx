import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import { useKeyboardAvoidBestPractice } from '../utils/useKeyboardAvoidBestPractice.ts';

// =============================================================================
// Metadata
// =============================================================================

export const method0Meta: MethodMeta = {
  id: 'best-practice',
  name: '0. Best Practice (Recommended)',
  source: 'Combined Analysis',
  sourceUrl: undefined,
  description:
    'Recommended implementation combining best practices from all analyzed methods: VirtualKeyboard API priority, VisualViewport fallback, iOS scale correction, scroll/touch hiding, GPU acceleration.',
  keyFeatures: [
    'VirtualKeyboard API priority (Chrome 94+)',
    'VisualViewport fallback (iOS Safari)',
    'iOS auto-zoom scale correction',
    'Scroll/touch opacity hiding (TDS pattern)',
    'GPU acceleration (translate3d + willChange)',
    'max() CSS for safe-area handling',
    'useSyncExternalStore (React 18+)',
    'isKeyboardOpen state exposed',
  ],
  issues: ['Requires testing on various devices', 'Complex but well-organized'],
  pros: [
    'Best of all methods combined',
    'Works on all platforms',
    'No flickering (TDS pattern)',
    'Best performance (GPU + rAF)',
    'React 18+ concurrent safe',
    'Future-proof (VK API ready)',
  ],
  cons: ['More code than simple solutions', 'Requires understanding of all patterns'],
};

// =============================================================================
// Component
// =============================================================================

export function Method0BestPractice() {
  const { style, keyboardHeight, isKeyboardOpen, scale } = useKeyboardAvoidBestPractice({
    safeAreaBottom: 0,
    transitionDuration: 200,
    hideOnScroll: true,
    hideOnTouch: true,
  });

  const hasVKAPI = typeof navigator !== 'undefined' && 'virtualKeyboard' in navigator;

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method0Meta} />

        <div
          style={{
            backgroundColor: '#ecfdf5',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #10b981',
          }}
        >
          <strong>Best Practice Features:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>VirtualKeyboard API: {hasVKAPI ? '✅ Available' : '❌ Not available (using VisualViewport)'}</li>
            <li>Keyboard: {isKeyboardOpen ? `Open (${keyboardHeight}px)` : 'Closed'}</li>
            <li>Scale correction: {scale !== 1 ? `Active (${scale.toFixed(2)}x)` : 'Not needed'}</li>
            <li>Scroll/touch hiding: Enabled</li>
          </ul>
        </div>

        <TestForm />
      </div>

      <FixedBottomCTA style={style}>Submit (Best Practice)</FixedBottomCTA>
    </div>
  );
}
