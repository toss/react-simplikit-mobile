import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';
import { BeforeAfterComparison, themes } from '../../components/PhoneMockup';

/**
 * Dark Modern Style (Tailwind CSS-inspired)
 * - Section markers with colored labels
 * - Multi-color accent system
 * - Monospace typography for technical elements
 * - Subtle background patterns
 */
export function LandingDarkModern() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16, color: '#38bdf8' }}>@react-simplikit/mobile</span>
        <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Section Label */}
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            fontWeight: 600,
            color: '#38bdf8',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          Mobile Hooks
        </div>

        <h1 style={{ fontSize: 56, fontWeight: 800, marginBottom: 24, letterSpacing: -2, lineHeight: 1.1 }}>
          Rapidly build modern{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #818cf8, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            mobile experiences
          </span>
        </h1>

        <p style={{ fontSize: 20, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7, maxWidth: 600 }}>
          A utility-first approach to mobile web development. Production-tested hooks that solve real problems on iOS
          Safari and Android Chrome.
        </p>

        {/* Install */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            backgroundColor: '#1e293b',
            borderRadius: 9999,
            border: '1px solid #334155',
          }}
        >
          <code style={{ fontSize: 14, color: '#e2e8f0', fontFamily: 'ui-monospace, monospace' }}>
            npm i @react-simplikit/mobile
          </code>
          <CopyButton text="npm i @react-simplikit/mobile" />
        </div>
      </section>

      {/* Before/After */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <BeforeAfterComparison theme={themes.darkModern} accentColor="#38bdf8" />
        </div>
      </section>

      {/* Why Section */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Section Label */}
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 12,
              fontWeight: 600,
              color: '#f472b6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 24,
            }}
          >
            Why this exists
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
            CSS 100vh is broken on mobile.
            <br />
            This isn't.
          </h2>

          <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
            Mobile browsers have dynamic toolbars that change the viewport height. The Visual Viewport API gives you
            accurate measurements. We make it simple.
          </p>

          {/* Code Example */}
          <div
            style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              border: '1px solid #334155',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #334155',
                fontSize: 12,
                color: '#64748b',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              ChatInput.tsx
            </div>
            <pre style={{ padding: 20, margin: 0, fontSize: 14, lineHeight: 1.7, overflow: 'auto' }}>
              <code style={{ fontFamily: 'ui-monospace, monospace' }}>
                {`import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

  return (
    <div style={{ position: 'fixed', bottom: 0, ...style }}>
      <input placeholder="Type a message..." />
    </div>
  )
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Section Label */}
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 12,
              fontWeight: 600,
              color: '#a78bfa',
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 24,
            }}
          >
            What you get
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { icon: '⌨️', title: 'Keyboard Avoiding', color: '#38bdf8' },
              { icon: '📐', title: 'Visual Viewport', color: '#818cf8' },
              { icon: '🔒', title: 'Scroll Locking', color: '#f472b6' },
              { icon: '↕️', title: 'Scroll Direction', color: '#34d399' },
              { icon: '🔋', title: 'Battery Status', color: '#fbbf24' },
              { icon: '🌐', title: 'SSR Safe', color: '#fb7185' },
            ].map(item => (
              <div
                key={item.title}
                style={{
                  padding: 24,
                  backgroundColor: '#1e293b',
                  borderRadius: 12,
                  border: '1px solid #334155',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: item.color }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b' }}>Production-tested at Toss</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          {[
            { value: '<3KB', label: 'Gzipped' },
            { value: '0', label: 'Dependencies' },
            { value: '100%', label: 'TypeScript' },
          ].map(stat => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  marginBottom: 4,
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          textAlign: 'center',
          borderTop: '1px solid #1e293b',
          fontSize: 14,
          color: '#475569',
        }}
      >
        Released under the MIT License. Copyright © 2025 Toss.
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          color: '#0f172a',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        ← Back
      </Link>
    </div>
  );
}
