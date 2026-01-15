import { useState } from 'react';
import { useVisualViewport } from '@react-simplikit/mobile';
import { SimpleButton, SimpleCard } from '@examples/shared';
import { DemoLayout } from '../../components/DemoLayout.tsx';

export function UseVisualViewportDemo() {
  const { viewport } = useVisualViewport();
  const [inputValue, setInputValue] = useState('');

  if (!viewport) {
    return (
      <DemoLayout title="useVisualViewport" description="Visual Viewport API not supported">
        <SimpleCard>
          <div style={{ padding: '24px' }}>
            <p style={{ color: '#dc2626' }}>
              ❌ Your browser doesn't support the Visual Viewport API.
              <br /><br />
              This API is available in:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '14px' }}>
              <li>iOS Safari 13+</li>
              <li>Android Chrome 61+</li>
              <li>Desktop Chrome/Edge (with limited features)</li>
            </ul>
          </div>
        </SimpleCard>
      </DemoLayout>
    );
  }

  const { width, height, offsetTop, scale } = viewport;
  const keyboardHeight = -offsetTop;
  const isZoomed = scale > 1.3;
  const isKeyboardOpen = keyboardHeight > 0;

  return (
    <DemoLayout
      title="useVisualViewport"
      description="Track Visual Viewport changes: keyboard, zoom, and viewport dimensions"
    >
      <div style={{ paddingBottom: '384px' }}>
        {/* Real-time Info */}
        <SimpleCard title="Visual Viewport State">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Real-time viewport information</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Width:</span>
              <span>{Math.round(width)}px</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Height:</span>
              <span>{Math.round(height)}px</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Offset Top:</span>
              <span style={{ color: offsetTop !== 0 ? '#ea580c' : 'inherit', fontWeight: offsetTop !== 0 ? 600 : 400 }}>
                {Math.round(offsetTop)}px
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Scale:</span>
              <span style={{ color: scale !== 1 ? '#ea580c' : 'inherit', fontWeight: scale !== 1 ? 600 : 400 }}>
                {scale.toFixed(2)}x
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Keyboard Height (iOS):</span>
              <span style={{ color: keyboardHeight > 0 ? '#16a34a' : 'inherit', fontWeight: keyboardHeight > 0 ? 600 : 400 }}>
                {Math.round(keyboardHeight)}px
              </span>
            </div>
          </div>
        </SimpleCard>

        {/* Keyboard Test */}
        <SimpleCard title="1️⃣ Keyboard Height Detection (iOS)">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Tap the input to show keyboard</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="Tap here to show keyboard"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: isKeyboardOpen ? '#fef3c7' : 'white',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            />

            {isKeyboardOpen && (
              <div style={{ padding: '16px', backgroundColor: '#fef9c3', border: '1px solid #fde047', borderRadius: '8px' }}>
                <p style={{ fontWeight: 600, margin: 0 }}>⌨️ Keyboard is open! Height: {Math.round(keyboardHeight)}px</p>
              </div>
            )}

            <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '14px' }}>
              <strong>Platform Behavior:</strong>
              <br /><strong>iOS:</strong> offsetTop becomes negative when keyboard appears
              <br /><strong>Android:</strong> offsetTop typically remains 0
            </div>
          </div>
        </SimpleCard>

        {/* Zoom Test */}
        <SimpleCard title="2️⃣ Pinch-Zoom Detection">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Pinch-zoom in/out on this page</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '32px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>Current Zoom: {scale.toFixed(2)}x</p>
              <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>
                {scale === 1 && '✓ Normal (1.0x)'}
                {scale > 1 && scale <= 1.3 && '🔍 Zoomed In (≤ 1.3x)'}
                {scale > 1.3 && '🔍🔍 Heavily Zoomed (> 1.3x)'}
              </p>
            </div>

            {isZoomed && (
              <div style={{ padding: '16px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#7f1d1d' }}>
                <p style={{ fontWeight: 600, margin: 0 }}>🔍 Heavy zoom detected! Floating UI hidden.</p>
              </div>
            )}
          </div>
        </SimpleCard>

        {/* Code Example */}
        <SimpleCard title="Implementation Code">
          <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px', margin: 0 }}>
            <code>{`import { useVisualViewport } from '@react-simplikit/mobile';

function CustomLayout() {
  const { viewport } = useVisualViewport();

  if (!viewport) {
    return <div>Not supported</div>;
  }

  const { width, height, offsetTop, scale } = viewport;
  const keyboardHeight = -offsetTop;
  const isZoomed = scale > 1.3;

  return (
    <div style={{ height }}>
      {!isZoomed && <FloatingButton />}
      <div style={{ paddingBottom: keyboardHeight }}>
        Content
      </div>
    </div>
  );
}`}</code>
          </pre>
        </SimpleCard>
      </div>

      {/* Floating Button */}
      {!isZoomed && (
        <SimpleButton
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            padding: 0,
          }}
        >
          💬
        </SimpleButton>
      )}
    </DemoLayout>
  );
}
