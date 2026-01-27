import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';
import { BeforeAfterComparison, themes } from '../../components/PhoneMockup';

/**
 * Foundation Style (shadcn/ui-inspired)
 * - Dark mode first
 * - "Open Source. Open Code." philosophy
 * - Clean, minimal, professional
 * - Geist-like typography
 */
export function LandingFoundation() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fafafa',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14 }}>@react-simplikit/mobile</span>
        <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>
            Components
          </a>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        {/* Badge */}
        <a
          href="#"
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            fontSize: 13,
            color: '#a1a1aa',
            textDecoration: 'none',
            marginBottom: 24,
          }}
        >
          v1.0 released →
        </a>

        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, letterSpacing: -1, lineHeight: 1.1 }}>
          Build mobile-first
          <br />
          React applications
        </h1>

        <p style={{ fontSize: 18, color: '#71717a', marginBottom: 32, lineHeight: 1.6 }}>
          Open source hooks for iOS Safari and Android Chrome.
          <br />
          Copy and paste into your apps. Works with any framework.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              padding: '12px 24px',
              backgroundColor: '#fafafa',
              color: '#09090b',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Get Started
          </a>
          <a
            href="#"
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#fafafa',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            View Hooks
          </a>
        </div>
      </section>

      {/* Before/After */}
      <section style={{ padding: '0 24px 60px', maxWidth: 600, margin: '0 auto' }}>
        <BeforeAfterComparison theme={themes.foundation} accentColor="#22c55e" />
      </section>

      {/* Code Preview */}
      <section style={{ padding: '0 24px 80px', maxWidth: 700, margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#18181b',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Window Header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#28c840' }} />
            <span style={{ marginLeft: 12, fontSize: 13, color: '#71717a' }}>ChatInput.tsx</span>
          </div>

          {/* Code */}
          <pre style={{ padding: 20, margin: 0, fontSize: 13, lineHeight: 1.7, overflow: 'auto' }}>
            <code>
              <span style={{ color: '#c084fc' }}>import</span>
              <span style={{ color: '#fafafa' }}> {'{ useAvoidKeyboard }'} </span>
              <span style={{ color: '#c084fc' }}>from</span>
              <span style={{ color: '#a5f3fc' }}> '@react-simplikit/mobile'</span>
              {'\n\n'}
              <span style={{ color: '#c084fc' }}>export function</span>
              <span style={{ color: '#fde047' }}> ChatInput</span>
              <span style={{ color: '#fafafa' }}>() {'{'}</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'  '}</span>
              <span style={{ color: '#c084fc' }}>const</span>
              <span style={{ color: '#fafafa' }}> {'{ style }'} = </span>
              <span style={{ color: '#4ade80' }}>useAvoidKeyboard</span>
              <span style={{ color: '#fafafa' }}>()</span>
              {'\n\n'}
              <span style={{ color: '#fafafa' }}>{'  '}</span>
              <span style={{ color: '#c084fc' }}>return</span>
              <span style={{ color: '#fafafa' }}> (</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'    <'}</span>
              <span style={{ color: '#4ade80' }}>div</span>
              <span style={{ color: '#fafafa' }}> style={'{'}{'{ '}</span>
              <span style={{ color: '#fde047' }}>...style</span>
              <span style={{ color: '#fafafa' }}> {'}'}{'}'}{'>'}</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'      <'}</span>
              <span style={{ color: '#4ade80' }}>input</span>
              <span style={{ color: '#fafafa' }}> /{'>'}</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'    </'}</span>
              <span style={{ color: '#4ade80' }}>div</span>
              <span style={{ color: '#fafafa' }}>{'>'}</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'  )'}</span>
              {'\n'}
              <span style={{ color: '#fafafa' }}>{'}'}</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section
        style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0c0c0d' }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 32,
          }}
        >
          {[
            { title: 'Open Source', desc: 'MIT licensed. Use it however you want.' },
            { title: 'Type Safe', desc: '100% TypeScript with full type inference.' },
            { title: 'Zero Dependencies', desc: 'No bloat. Just React.' },
            { title: 'SSR Ready', desc: 'Works with Next.js, Remix, and more.' },
          ].map(item => (
            <div key={item.title}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Get started in seconds</h2>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            backgroundColor: '#18181b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
          }}
        >
          <code style={{ fontSize: 14, color: '#fafafa', fontFamily: 'ui-monospace, monospace' }}>
            npm i @react-simplikit/mobile
          </code>
          <CopyButton text="npm i @react-simplikit/mobile" />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          fontSize: 14,
          color: '#52525b',
        }}
      >
        Built by Toss. Open source.
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '8px 16px',
          backgroundColor: '#fafafa',
          color: '#09090b',
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
