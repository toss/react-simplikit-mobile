import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';
import {
  KeyboardAvoidanceProvider,
  KeyboardComposer,
  useKeyboardMetrics,
} from '../utils/useKeyboardAvoidanceProvider.tsx';

// =============================================================================
// Metadata
// =============================================================================

export const method7Meta: MethodMeta = {
  id: 'notion-complete',
  name: '7. Notion Complete (Provider+Composer)',
  source: 'Notion: KeyboardAvoidance by @박수경B',
  sourceUrl: 'https://www.notion.so/tossteam/KeyboardAvoidance-2fba360d33e380da8154ca488b148dfd',
  description:
    'Complete implementation from Notion with Provider/Composer pattern. Uses Portal-based rendering, CSS Variables, auto focus interception, and all stabilization features.',
  keyFeatures: [
    'Provider + Composer architecture',
    'Portal-based overlay rendering',
    'CSS Variables (--kb-vvh, --kb-vvt, --kb-kbh)',
    'Auto focus interception (touchstart, pointerdown, focusin)',
    'html + body freeze (both)',
    'Sub-pixel jitter suppression (JITTER_EPS_PX)',
    'Smooth docking animation',
    'iOS auto-zoom prevention (font-size: 16px)',
    'Guard scroll until keyboard opens',
    'useSyncExternalStore (React 18+)',
  ],
  issues: [
    'Most complex implementation',
    'Requires Provider wrapping',
    'Portal may affect z-index stacking',
    'CSS injection may conflict with other styles',
  ],
  pros: [
    'Most complete solution',
    'No manual focus handler wiring needed',
    'CSS Variables enable flexible styling',
    'Battle-tested at Toss (production)',
    'Handles all edge cases',
    'Smooth animations built-in',
  ],
  cons: [
    'Largest code footprint',
    'Provider required at app root',
    'May be overkill for simple use cases',
    'Learning curve for architecture',
  ],
};

// =============================================================================
// Inner Component (uses hooks)
// =============================================================================

function Method7Inner() {
  const { vvh, vvt, kbh, isOpen } = useKeyboardMetrics();

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method7Meta} />

        {/* Status Panel */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #22c55e',
          }}
        >
          <strong>Notion Complete Features:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>Keyboard: {isOpen ? `Open (${kbh}px)` : 'Closed'}</li>
            <li>Visual Viewport Height: {vvh}px</li>
            <li>Visual Viewport OffsetTop: {vvt}px</li>
            <li>Portal Rendering: ✅ Enabled</li>
            <li>Auto Focus Fix: ✅ Enabled</li>
            <li>Smooth Docking: ✅ Enabled</li>
          </ul>
        </div>

        {/* CSS Variables Info */}
        <div
          style={{
            backgroundColor: '#eff6ff',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          <div>--kb-vvh: {vvh}px</div>
          <div>--kb-vvt: {vvt}px</div>
          <div>--kb-kbh: {kbh}px</div>
        </div>

        <TestForm />
      </div>

      {/* KeyboardComposer - Portal to overlay root */}
      <KeyboardComposer
        style={{
          padding: '16px 20px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          backgroundColor: '#fff',
          borderTop: '1px solid #e5e7eb',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <button
          type="button"
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Submit (Notion Complete)
        </button>
      </KeyboardComposer>
    </div>
  );
}

// =============================================================================
// Component (with Provider)
// =============================================================================

export function Method7NotionComplete() {
  return (
    <KeyboardAvoidanceProvider
      injectStyles={true}
      enableIOSComposerFocusFix={true}
      preventIOSAutoZoom={true}
      openThresholdPx={80}
      smoothDocking={true}
      smoothDurationMs={180}
    >
      <Method7Inner />
    </KeyboardAvoidanceProvider>
  );
}
