import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';
import { BeforeAfterComparison, themes } from '../../components/PhoneMockup';

/**
 * Minimal Style (SWR-inspired)
 * - Clean, code-first approach
 * - Minimal colors, lots of whitespace
 * - Focus on the code example
 */
export function LandingMinimal() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #eaeaea',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14 }}>@react-simplikit/mobile</span>
        <nav style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, letterSpacing: -1 }}>
          useAvoidKeyboard
        </h1>
        <p style={{ fontSize: 20, color: '#666', marginBottom: 48, lineHeight: 1.6 }}>
          Mobile keyboard avoiding for React.
          <br />
          Works on iOS Safari and Android Chrome.
        </p>

        {/* Install */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            backgroundColor: '#fafafa',
            borderRadius: 8,
            border: '1px solid #eaeaea',
            marginBottom: 48,
          }}
        >
          <code style={{ flex: 1, fontSize: 14, color: '#000' }}>npm i @react-simplikit/mobile</code>
          <CopyButton text="npm i @react-simplikit/mobile" />
        </div>

        {/* Before/After */}
        <BeforeAfterComparison theme={themes.minimal} accentColor="#000" />

        {/* Code Example */}
        <pre
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: 24,
            borderRadius: 8,
            fontSize: 14,
            lineHeight: 1.7,
            overflow: 'auto',
          }}
        >
          <code>{`import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

  return (
    <div style={{ position: 'fixed', bottom: 0, ...style }}>
      <input placeholder="Type a message..." />
    </div>
  )
}`}</code>
        </pre>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
        <p style={{ color: '#999', fontSize: 14 }}>Production-tested at Toss</p>
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '8px 16px',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: 20,
          fontSize: 12,
          textDecoration: 'none',
        }}
      >
        ← Back to Experiments
      </Link>
    </div>
  );
}
