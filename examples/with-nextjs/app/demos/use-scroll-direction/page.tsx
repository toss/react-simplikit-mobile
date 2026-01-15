'use client';

import { useScrollDirection } from '@react-simplikit/mobile';
import { SimpleCard } from '@examples/shared';
import { DemoLayout } from '@/components/DemoLayout';

export default function UseScrollDirectionDemo() {
  const { direction, position } = useScrollDirection({ throttleMs: 50 });

  const isHidden = direction === 'down' && position > 100;

  return (
    <div>
      {/* Fixed Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#2563eb',
          color: '#fff',
          padding: '16px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ maxWidth: '672px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Demo Navigation</h1>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            {direction === 'down' && '⬇️ Down'}
            {direction === 'up' && '⬆️ Up'}
            {direction === null && '—'}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ paddingTop: '80px' }}>
        <DemoLayout
          title="useScrollDirection"
          description="Auto-hide navigation bar on scroll down, show on scroll up"
        >
          <div style={{ paddingBottom: '128px' }}>
            {/* Status Card */}
            <SimpleCard title="Scroll State">
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Real-time scroll direction and position</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ fontWeight: 500 }}>Direction:</span>
                  <span style={{ fontFamily: 'monospace' }}>{direction || 'none'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ fontWeight: 500 }}>Position:</span>
                  <span style={{ fontFamily: 'monospace' }}>{Math.round(position)}px</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ fontWeight: 500 }}>Nav Hidden:</span>
                  <span style={{ color: isHidden ? '#dc2626' : '#16a34a' }}>
                    {isHidden ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </SimpleCard>

            {/* Instructions */}
            <SimpleCard title="How it works">
              <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '8px', margin: 0 }}>Instructions:</h3>
                <ol style={{ paddingLeft: '20px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
                  <li>Scroll down the page - the navigation bar will hide</li>
                  <li>Scroll up - the navigation bar will reappear</li>
                  <li>The effect only activates after scrolling past 100px</li>
                </ol>
              </div>

              <div style={{ padding: '16px', borderLeft: '4px solid #2563eb', backgroundColor: '#f9fafb' }}>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  <strong>💡 Use Case:</strong> This pattern is commonly used in mobile apps to
                  maximize screen real estate. The navigation hides when scrolling down (reading
                  mode) and appears when scrolling up (likely to navigate).
                </p>
              </div>
            </SimpleCard>

            {/* Demo Sections */}
            {[1, 2, 3, 4, 5].map((num) => (
              <SimpleCard key={num} title={`Section ${num}`} style={{ minHeight: '400px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Keep scrolling to see more sections and test the auto-hide navigation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <p style={{ margin: 0 }}>Current direction: <strong>{direction || 'none'}</strong></p>
                  <p style={{ margin: 0 }}>Current position: <strong>{Math.round(position)}px</strong></p>
                </div>
              </SimpleCard>
            ))}

            {/* Code Example */}
            <SimpleCard title="Implementation Code">
              <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px', margin: 0 }}>
                <code>{`import { useScrollDirection } from '@react-simplikit/mobile';

function Header() {
  const { direction, position } = useScrollDirection();

  // Hide header on scroll down (after 100px threshold)
  const isHidden = direction === 'down' && position > 100;

  return (
    <nav
      style={{
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms',
      }}
    >
      <h1>My Header</h1>
    </nav>
  );
}`}</code>
              </pre>
            </SimpleCard>
          </div>
        </DemoLayout>
      </div>
    </div>
  );
}
