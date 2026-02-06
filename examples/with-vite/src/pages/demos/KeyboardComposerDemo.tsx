import { useState } from 'react';
import { Button, Card, CodeBlock, InfoBox, StatusCard, StatusRow } from '@examples/shared';
import { KeyboardComposer, useKeyboardMetrics } from '@react-simplikit/mobile';

import { DemoLayout } from '../../components/DemoLayout.tsx';

const PROVIDER_CODE = `// Wrap your app root with KeyboardAvoidanceProvider
import { KeyboardAvoidanceProvider } from '@react-simplikit/mobile';

function App() {
  return (
    <KeyboardAvoidanceProvider>
      <YourApp />
    </KeyboardAvoidanceProvider>
  );
}`;

const COMPOSER_CODE = `// Wrap your fixed-bottom input with KeyboardComposer
import { KeyboardComposer } from '@react-simplikit/mobile';

function ChatInput() {
  return (
    <KeyboardComposer>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </KeyboardComposer>
  );
}`;

const METRICS_CODE = `// Access keyboard metrics anywhere in your app
import { useKeyboardMetrics } from '@react-simplikit/mobile';

function MyComponent() {
  const { kbh, vvh, vvt, isOpen } = useKeyboardMetrics();

  return (
    <div>
      <p>Keyboard Height: {kbh}px</p>
      <p>Visual Viewport Height: {vvh}px</p>
      <p>Visual Viewport Offset Top: {vvt}px</p>
      <p>Keyboard Open: {isOpen ? 'Yes' : 'No'}</p>
    </div>
  );
}`;

function DemoContent() {
  const [chatMessage, setChatMessage] = useState('');
  const { kbh, vvh, vvt, isOpen } = useKeyboardMetrics();

  return (
    <>
      <div style={{ paddingBottom: '80px' }}>
        {/* Status */}
        <StatusCard title="Keyboard Metrics" description="Real-time keyboard information via CSS variables">
          <StatusRow
            label="Keyboard Height (--kb-kbh)"
            value={`${Math.round(kbh)}px`}
            variant={isOpen ? 'success' : 'default'}
            monospace
          />
          <StatusRow label="Visual Viewport Height (--kb-vvh)" value={`${Math.round(vvh)}px`} monospace />
          <StatusRow
            label="Visual Viewport Offset (--kb-vvt)"
            value={`${Math.round(vvt)}px`}
            variant={vvt !== 0 ? 'warning' : 'default'}
            monospace
          />
          <StatusRow label="Keyboard Open" value={isOpen ? 'Yes' : 'No'} variant={isOpen ? 'success' : 'default'} />
        </StatusCard>

        {/* How it works */}
        <Card title="How It Works">
          <div style={{ marginBottom: '16px' }}>
            <InfoBox variant="tip">
              <strong>CSS Variable Based:</strong> The provider injects CSS variables (<code>--kb-kbh</code>,{' '}
              <code>--kb-vvh</code>, <code>--kb-vvt</code>) that update in real-time. KeyboardComposer uses these to
              position fixed elements above the keyboard.
            </InfoBox>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <InfoBox variant="neutral">
              <strong>iOS Focus Jump Prevention:</strong> On iOS Safari, when focusing an input inside KeyboardComposer,
              the body is temporarily locked to prevent the viewport from jumping.
            </InfoBox>
          </div>
        </Card>

        {/* Chat Demo */}
        <Card title="1. Chat Input Demo">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            The chat input bar at the bottom is wrapped with <code>KeyboardComposer</code>. Tap it to see it stick to
            the keyboard!
          </p>

          {/* Fake chat messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: '#f3f4f6',
                borderRadius: '16px 16px 16px 4px',
                maxWidth: '80%',
                fontSize: '14px',
              }}
            >
              Hey! How are you? 👋
            </div>
            <div
              style={{
                padding: '10px 14px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                borderRadius: '16px 16px 4px 16px',
                maxWidth: '80%',
                marginLeft: 'auto',
                fontSize: '14px',
              }}
            >
              I&apos;m great, thanks!
            </div>
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: '#f3f4f6',
                borderRadius: '16px 16px 16px 4px',
                maxWidth: '80%',
                fontSize: '14px',
              }}
            >
              What are you up to?
            </div>
          </div>
        </Card>

        {/* Provider Code */}
        <Card title="2. Setup: KeyboardAvoidanceProvider">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Wrap your app root once with the provider. It sets up global listeners and injects CSS variables.
          </p>
          <CodeBlock code={PROVIDER_CODE} />
        </Card>

        {/* Composer Code */}
        <Card title="3. Usage: KeyboardComposer">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Wrap any fixed-bottom element with KeyboardComposer. It automatically positions above the keyboard.
          </p>
          <CodeBlock code={COMPOSER_CODE} />
        </Card>

        {/* Metrics Hook Code */}
        <Card title="4. Optional: useKeyboardMetrics">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Access keyboard metrics anywhere in your app for custom behavior.
          </p>
          <CodeBlock code={METRICS_CODE} />
        </Card>

        {/* Features */}
        <Card title="5. Key Features">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <StatusRow label="CSS Variable Based" value="No re-renders needed" />
            <StatusRow label="iOS Jump Prevention" value="Body lock on focus" />
            <StatusRow label="Safe Area Support" value="Respects device notch" />
            <StatusRow label="asChild Support" value="Slot pattern for flexibility" />
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Chat Input with KeyboardComposer */}
      <KeyboardComposer
        asChild
        style={{
          padding: '12px 16px',
          backgroundColor: 'white',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={chatMessage}
          onChange={e => setChatMessage(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e5e5e5',
            borderRadius: '24px',
            outline: 'none',
            backgroundColor: '#f9fafb',
          }}
        />
        <Button
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            padding: 0,
            fontSize: '18px',
          }}
          onClick={() => {
            if (chatMessage.trim()) {
              alert(`Sent: ${chatMessage}`);
              setChatMessage('');
            }
          }}
        >
          ↑
        </Button>
      </KeyboardComposer>
    </>
  );
}

export function KeyboardComposerDemo() {
  return (
    <DemoLayout title="KeyboardComposer" description="CSS variable-based keyboard avoidance with iOS jump prevention">
      <DemoContent />
    </DemoLayout>
  );
}
