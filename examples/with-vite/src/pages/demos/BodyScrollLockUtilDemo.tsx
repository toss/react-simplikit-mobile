import { useEffect, useState } from 'react';
import { disableBodyScrollLock, enableBodyScrollLock } from '@react-simplikit/mobile';
import { SimpleButton, SimpleCard } from '@examples/shared';
import { DemoLayout } from '../../components/DemoLayout.tsx';

export function BodyScrollLockUtilDemo() {
  const [locked, setLocked] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    if (locked) {
      disableBodyScrollLock();
      setLocked(false);
    } else {
      enableBodyScrollLock();
      setLocked(true);
    }
  };

  const handleForceLock = () => {
    enableBodyScrollLock();
    setLocked(true);
  };

  const handleForceUnlock = () => {
    disableBodyScrollLock();
    setLocked(false);
  };

  return (
    <DemoLayout
      title="bodyScrollLock Utils"
      description="Programmatically control body scroll lock"
    >
      <div style={{ paddingBottom: '128px' }}>
        {/* Status */}
        <SimpleCard>
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>{locked ? '🔒' : '🔓'}</div>
            <h2 style={{ fontSize: '30px', fontWeight: 700, color: locked ? '#dc2626' : '#16a34a', margin: 0 }}>
              {locked ? 'LOCKED' : 'UNLOCKED'}
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>
              {locked ? 'Body scroll is locked. Try scrolling!' : 'Body scroll is unlocked.'}
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontFamily: 'monospace' }}>Scroll Y: {Math.round(scrollY)}px</p>
          </div>
        </SimpleCard>

        {/* Controls */}
        <SimpleCard title="Controls">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Test the scroll lock utilities</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SimpleButton onClick={handleToggle} fullWidth>
              {locked ? '🔓 Unlock Scroll' : '🔒 Lock Scroll'}
            </SimpleButton>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <SimpleButton onClick={handleForceLock} variant="secondary">
                Force Lock
              </SimpleButton>
              <SimpleButton onClick={handleForceUnlock} variant="secondary">
                Force Unlock
              </SimpleButton>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '8px', margin: 0 }}>How to test:</h4>
              <ol style={{ paddingLeft: '20px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
                <li>Click "Lock Scroll" and try to scroll - it won't work</li>
                <li>Click "Unlock Scroll" to restore scrolling</li>
                <li>Try Force Lock/Unlock for direct control</li>
              </ol>
            </div>
          </div>
        </SimpleCard>

        {/* Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SimpleCard title="🪝 useBodyScrollLock Hook">
            <div style={{ fontSize: '14px' }}>
              <p style={{ fontWeight: 600, marginBottom: '8px' }}>Use when:</p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#374151' }}>
                <li>Lock tied to component lifecycle</li>
                <li>Managing modals, drawers</li>
                <li>Automatic cleanup on unmount</li>
              </ul>
              <pre style={{ marginTop: '12px', padding: '12px', backgroundColor: '#111827', color: '#e5e7eb', borderRadius: '4px', fontSize: '12px', overflowX: 'auto' }}>
                <code>{`function Modal() {
  useBodyScrollLock();
  return <div>Modal</div>;
}`}</code>
              </pre>
            </div>
          </SimpleCard>

          <SimpleCard title="🔧 Utils (Current Demo)">
            <div style={{ fontSize: '14px' }}>
              <p style={{ fontWeight: 600, marginBottom: '8px' }}>Use when:</p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#374151' }}>
                <li>Need programmatic control</li>
                <li>Complex lock/unlock logic</li>
                <li>Outside React components</li>
              </ul>
              <pre style={{ marginTop: '12px', padding: '12px', backgroundColor: '#111827', color: '#e5e7eb', borderRadius: '4px', fontSize: '12px', overflowX: 'auto' }}>
                <code>{`const handleClick = () => {
  enableBodyScrollLock();
};`}</code>
              </pre>
            </div>
          </SimpleCard>
        </div>

        {/* Scrollable Content */}
        <SimpleCard title="Scrollable Content">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Test area - try scrolling when locked</p>
          <div style={{ maxHeight: '384px', overflowY: 'auto', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i} style={{ fontSize: '14px', marginBottom: '8px' }}>
                Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            ))}
          </div>
        </SimpleCard>
      </div>
    </DemoLayout>
  );
}
