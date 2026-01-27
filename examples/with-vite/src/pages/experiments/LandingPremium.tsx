import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';
import { BeforeAfterComparison, themes } from '../../components/PhoneMockup';

/**
 * Premium Style (Claude Code-inspired)
 * - Dark theme
 * - Capability contrast ("X fails. This works.")
 * - Animated status indicators
 * - Sophisticated typography
 */
export function LandingPremium() {
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = ['Detecting keyboard...', 'Calculating viewport...', 'Adjusting position...', 'Done.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(i => (i + 1) % statuses.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1f1f1f',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14 }}>@react-simplikit/mobile</span>
        <nav style={{ display: 'flex', gap: 32 }}>
          <a href="#" style={{ color: '#a1a1aa', fontSize: 14, textDecoration: 'none' }}>
            Documentation
          </a>
          <a href="#" style={{ color: '#a1a1aa', fontSize: 14, textDecoration: 'none' }}>
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '120px 32px 80px', maxWidth: 900, margin: '0 auto' }}>
        {/* Status Indicator */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            backgroundColor: '#1f1f1f',
            borderRadius: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: statusIndex === 3 ? '#22c55e' : '#f59e0b',
              animation: statusIndex !== 3 ? 'pulse 1s infinite' : 'none',
            }}
          />
          <span style={{ fontSize: 13, color: '#a1a1aa' }}>{statuses[statusIndex]}</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          <span style={{ color: '#71717a' }}>CSS 100vh fails.</span>
          <br />
          <span style={{ color: '#fafafa' }}>This works.</span>
        </h1>

        <p
          style={{
            fontSize: 20,
            color: '#71717a',
            marginBottom: 48,
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Mobile keyboard utilities for React.
          <br />
          Production-tested at Toss.
        </p>

        {/* Install Options */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 64, flexWrap: 'wrap' }}>
          <InstallOption label="npm" command="npm i @react-simplikit/mobile" />
          <InstallOption label="yarn" command="yarn add @react-simplikit/mobile" />
          <InstallOption label="pnpm" command="pnpm add @react-simplikit/mobile" />
        </div>

        {/* Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <ComparisonCard
            title="Before"
            description="Keyboard covers input. Users can't see what they type."
            code={`// The problem
.chat-input {
  position: fixed;
  bottom: 0;
  /* Keyboard covers this */
}`}
            variant="bad"
          />
          <ComparisonCard
            title="After"
            description="Input stays visible. Always above the keyboard."
            code={`// The solution
const { style } = useAvoidKeyboard()

<div style={{ ...style }}>
  <input />
</div>`}
            variant="good"
          />
        </div>
      </section>

      {/* Phone Mockup */}
      <section style={{ padding: '60px 32px', borderTop: '1px solid #1f1f1f' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <BeforeAfterComparison
            theme={{ ...themes.claudeCode, successColor: '#22c55e' }}
            accentColor="#a78bfa"
          />
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 32px', borderTop: '1px solid #1f1f1f' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 14, color: '#71717a', marginBottom: 40, textTransform: 'uppercase', letterSpacing: 2 }}>
            Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { title: 'Visual Viewport API', desc: 'Accurate keyboard detection' },
              { title: 'iOS Safari', desc: 'Full support for all versions' },
              { title: 'Android Chrome', desc: 'Works across devices' },
              { title: 'SSR Safe', desc: 'Next.js, Remix compatible' },
              { title: 'TypeScript', desc: '100% type coverage' },
              { title: 'Zero Dependencies', desc: 'Just 3KB gzipped' },
            ].map(item => (
              <div key={item.title}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: '#71717a', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '8px 16px',
          backgroundColor: '#fafafa',
          color: '#0a0a0a',
          borderRadius: 20,
          fontSize: 12,
          textDecoration: 'none',
        }}
      >
        ← Back to Experiments
      </Link>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function InstallOption({ label, command }: { label: string; command: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        backgroundColor: '#1f1f1f',
        borderRadius: 8,
      }}
    >
      <span style={{ fontSize: 12, color: '#71717a', minWidth: 40 }}>{label}</span>
      <code style={{ fontSize: 13, color: '#fafafa' }}>{command}</code>
      <CopyButton text={command} />
    </div>
  );
}

function ComparisonCard({
  title,
  description,
  code,
  variant,
}: {
  title: string;
  description: string;
  code: string;
  variant: 'good' | 'bad';
}) {
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: '#1f1f1f',
        borderRadius: 12,
        border: `1px solid ${variant === 'good' ? '#22c55e33' : '#ef444433'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: variant === 'good' ? '#22c55e' : '#ef4444',
          }}
        />
        <span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      <p style={{ color: '#71717a', fontSize: 14, marginBottom: 16 }}>{description}</p>
      <pre
        style={{
          margin: 0,
          padding: 16,
          backgroundColor: '#0a0a0a',
          borderRadius: 8,
          fontSize: 12,
          color: '#a1a1aa',
          overflow: 'auto',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
