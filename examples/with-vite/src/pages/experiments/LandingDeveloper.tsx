import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';
import { BeforeAfterComparison, themes } from '../../components/PhoneMockup';

/**
 * Developer Style (useHooks-inspired)
 * - Hook library / code snippet catalog feel
 * - Alphabetical hook listing
 * - Clean white background with subtle accents
 * - Professional yet approachable
 */
export function LandingDeveloper() {
  const hooks = [
    { name: 'useAvoidKeyboard', desc: 'Avoid mobile keyboard overlay' },
    { name: 'useBatteryStatus', desc: 'Monitor device battery level' },
    { name: 'useBodyScrollLock', desc: 'Lock body scroll for modals' },
    { name: 'useKeyboardHeight', desc: 'Get current keyboard height' },
    { name: 'useScrollDirection', desc: 'Detect scroll direction' },
    { name: 'useVisualViewport', desc: 'Track visual viewport changes' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            }}
          />
          <span style={{ fontWeight: 700, fontSize: 16 }}>react-simplikit/mobile</span>
        </div>
        <a
          href="https://github.com/toss/react-simplikit"
          style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}
        >
          GitHub
        </a>
      </header>

      {/* Hero */}
      <section style={{ padding: '64px 24px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: '#111827' }}>
          A collection of mobile-first React hooks
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
          Production-tested utilities for iOS Safari and Android Chrome
        </p>

        {/* Install Command */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
          }}
        >
          <code style={{ fontSize: 14, color: '#111827', fontFamily: 'ui-monospace, monospace' }}>
            npm i @react-simplikit/mobile
          </code>
          <CopyButton text="npm i @react-simplikit/mobile" />
        </div>
      </section>

      {/* Before/After */}
      <section style={{ padding: '48px 24px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <BeforeAfterComparison theme={themes.developer} accentColor="#3b82f6" />
        </div>
      </section>

      {/* Hooks Grid */}
      <section style={{ padding: '48px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 24, textTransform: 'uppercase' }}>
          Available Hooks
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {hooks.map(hook => (
            <a
              key={hook.name}
              href="#"
              style={{
                display: 'block',
                padding: 20,
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'border-color 150ms, box-shadow 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#3b82f6',
                  marginBottom: 4,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {hook.name}
              </div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>{hook.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Hook */}
      <section style={{ padding: '48px 24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            FEATURED
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111827' }}>useAvoidKeyboard</h3>
          <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 24 }}>
            The most common mobile web problem, solved in one line.
          </p>

          <pre
            style={{
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: 20,
              borderRadius: 8,
              fontSize: 13,
              lineHeight: 1.7,
              overflow: 'auto',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <code>{`const { style } = useAvoidKeyboard()

return (
  <div style={{ position: 'fixed', bottom: 0, ...style }}>
    <input placeholder="Message..." />
  </div>
)`}</code>
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ color: '#9ca3af', fontSize: 14 }}>Built by Toss</p>
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          borderRadius: 20,
          fontSize: 12,
          textDecoration: 'none',
        }}
      >
        ← Back
      </Link>
    </div>
  );
}
