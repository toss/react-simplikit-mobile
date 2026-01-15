import { useState } from 'react';
import { isAndroid, isIOS } from '@react-simplikit/mobile';

import { Card } from './Card.tsx';

export function DeviceInfo() {
  const [showUA, setShowUA] = useState(false);

  const platform = isIOS() ? 'iOS' : isAndroid() ? 'Android' : 'Desktop/Other';
  const browser = getBrowser();
  const screenSize = `${window.screen.width}×${window.screen.height}`;
  const viewportSize = `${window.innerWidth}×${window.innerHeight}`;
  const supportsVisualViewport = typeof window.visualViewport !== 'undefined';

  return (
    <Card title="📱 Device Info">
      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
        <InfoRow label="Platform" value={platform} />
        <InfoRow label="Browser" value={browser} />
        <InfoRow label="Screen" value={screenSize} />
        <InfoRow label="Viewport" value={viewportSize} />
        <InfoRow
          label="Visual Viewport API"
          value={supportsVisualViewport ? '✅ Supported' : '❌ Not Supported'}
        />

        {/* User Agent (Collapsible) */}
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <button
            onClick={() => setShowUA(!showUA)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontSize: '14px',
              padding: 'var(--spacing-xs) 0',
              textDecoration: 'underline',
            }}
          >
            {showUA ? 'Hide' : 'Show'} User Agent
          </button>
          {showUA && (
            <pre
              style={{
                marginTop: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm)',
                backgroundColor: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {navigator.userAgent}
            </pre>
          )}
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-xs)',
        padding: 'var(--spacing-xs) 0',
        borderBottom: '1px solid var(--color-gray-100)',
      }}
    >
      <span style={{ fontWeight: 600, color: 'var(--color-gray-700)' }}>{label}:</span>
      <span style={{ color: 'var(--color-gray-900)', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
}
