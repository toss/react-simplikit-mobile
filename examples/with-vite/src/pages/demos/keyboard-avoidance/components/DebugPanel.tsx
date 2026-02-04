import type { CSSProperties, ReactNode } from 'react';
import { useVisualViewport } from '@react-simplikit/mobile';

import { usePlatform } from '../utils/usePlatform.ts';

type DebugPanelProps = {
  methodName: string;
  extraInfo?: Record<string, string | number | boolean>;
  style?: CSSProperties;
};

/**
 * Debug panel showing real-time viewport and keyboard information
 */
export function DebugPanel({ methodName, extraInfo, style }: DebugPanelProps) {
  const { viewport } = useVisualViewport();
  const { isIOS } = usePlatform();

  const keyboardHeight = viewport ? window.innerHeight - viewport.height - viewport.offsetTop : 0;
  const isKeyboardOpen = keyboardHeight > 50;

  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: '8px 12px',
        fontSize: '11px',
        fontFamily: 'monospace',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <DebugItem label="Method" value={methodName} highlight />
        <DebugItem label="platform" value={isIOS ? 'iOS' : 'Other'} variant={isIOS ? 'success' : 'default'} />
        <DebugItem label="innerHeight" value={`${window.innerHeight}px`} />
        {viewport != null && (
          <>
            <DebugItem label="viewport.height" value={`${Math.round(viewport.height)}px`} />
            <DebugItem label="viewport.offsetTop" value={`${Math.round(viewport.offsetTop)}px`} />
            <DebugItem label="viewport.scale" value={viewport.scale.toFixed(2)} />
          </>
        )}
        <DebugItem
          label="keyboardHeight"
          value={`${Math.round(keyboardHeight)}px`}
          variant={isKeyboardOpen ? 'success' : 'default'}
        />
        {extraInfo != null &&
          Object.entries(extraInfo).map(([key, value]) => <DebugItem key={key} label={key} value={String(value)} />)}
      </div>
    </div>
  );
}

function DebugItem({
  label,
  value,
  variant = 'default',
  highlight = false,
}: {
  label: string;
  value: ReactNode;
  variant?: 'default' | 'success' | 'warning';
  highlight?: boolean;
}) {
  const colors = {
    default: '#9ca3af',
    success: '#34d399',
    warning: '#fbbf24',
  };

  return (
    <span>
      <span style={{ color: '#6b7280' }}>{label}: </span>
      <span
        style={{
          color: highlight ? '#60a5fa' : colors[variant],
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {value}
      </span>
    </span>
  );
}
