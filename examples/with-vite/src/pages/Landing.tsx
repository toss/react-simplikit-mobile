import { Link } from 'react-router-dom';
import { BeforeAfterComparison } from '../components/PhoneMockup';
import { CopyButton } from '../components/CopyButton';

const NPM_INSTALL_COMMAND = 'npm install @react-simplikit/mobile';
const GITHUB_URL = 'https://github.com/toss/react-simplikit';

const CODE_EXAMPLE = `import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

  return (
    <div style={{ position: 'fixed', bottom: 0, ...style }}>
      <input placeholder="Type a message..." />
    </div>
  )
}`;

export function Landing() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Code Example Section */}
      <CodeSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Other Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Production-tested at Toss
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 16,
            color: '#111827',
          }}
        >
          Mobile keyboards hide your input.
          <br />
          <span style={{ color: '#3b82f6' }}>We fix that.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: '#6b7280',
            marginBottom: 32,
            maxWidth: 500,
            margin: '0 auto 32px',
          }}
        >
          React hooks for mobile web.
          <br />
          Built for iOS Safari and Android Chrome.
        </p>

        {/* Before/After Comparison */}
        <BeforeAfterComparison />

        {/* Install Command */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 32,
            flexWrap: 'wrap',
          }}
        >
          <code
            style={{
              padding: '12px 20px',
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          >
            {NPM_INSTALL_COMMAND}
          </code>
          <CopyButton text={NPM_INSTALL_COMMAND} />
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginTop: 24,
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 150ms',
            }}
          >
            Try Demos
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              backgroundColor: '#fff',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function CodeSection() {
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 8,
            color: '#111827',
          }}
        >
          One hook. That's it.
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: 24,
          }}
        >
          No configuration. No workarounds. Just works.
        </p>

        {/* Code Block */}
        <div
          style={{
            backgroundColor: '#1f2937',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Code Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #374151',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <span style={{ color: '#9ca3af', fontSize: 12 }}>ChatInput.tsx</span>
            <CopyButton text={CODE_EXAMPLE} style={{ padding: '4px 8px', fontSize: 12 }} />
          </div>
          {/* Code Content */}
          <pre
            style={{
              margin: 0,
              padding: 20,
              color: '#e5e7eb',
              fontSize: 13,
              lineHeight: 1.6,
              overflow: 'auto',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            <code>{highlightCode(CODE_EXAMPLE)}</code>
          </pre>
        </div>

        {/* Demo Link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            to="/"
            style={{
              color: '#3b82f6',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Try it on your phone →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
            color: '#111827',
          }}
        >
          Battle-tested in production
        </h2>
        <p
          style={{
            color: '#6b7280',
            marginBottom: 32,
          }}
        >
          Powering chat inputs, forms, and bottom sheets across Toss apps.
        </p>

        {/* Company Logos */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0.7,
          }}
        >
          {['Toss', 'Toss Securities', 'Toss Bank', 'Toss Payments'].map(company => (
            <div
              key={company}
              style={{
                padding: '16px 24px',
                backgroundColor: '#f3f4f6',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                color: '#374151',
              }}
            >
              {company}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            marginTop: 40,
            flexWrap: 'wrap',
          }}
        >
          <StatItem value="100%" label="TypeScript" />
          <StatItem value="< 3KB" label="Gzipped" />
          <StatItem value="0" label="Dependencies" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#3b82f6',
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 14, color: '#6b7280' }}>{label}</div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      name: 'useScrollDirection',
      description: 'Detect scroll direction. Auto-hide navigation bars.',
      icon: '↕️',
    },
    {
      name: 'useBodyScrollLock',
      description: 'Lock background scroll when modals open.',
      icon: '🔒',
    },
    {
      name: 'useVisualViewport',
      description: 'Track the actual visible area including keyboard.',
      icon: '📱',
    },
  ];

  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 32,
            color: '#111827',
          }}
        >
          More hooks included
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {features.map(feature => (
            <div
              key={feature.name}
              style={{
                padding: 24,
                backgroundColor: '#fff',
                borderRadius: 12,
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: '#111827',
                }}
              >
                {feature.name}
              </h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#1f2937', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 16,
          }}
        >
          Get started
        </h2>
        <p
          style={{
            color: '#9ca3af',
            marginBottom: 32,
          }}
        >
          Add reliable mobile keyboard handling in seconds.
        </p>

        {/* Install Command */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          <code
            style={{
              padding: '12px 20px',
              backgroundColor: '#374151',
              color: '#e5e7eb',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          >
            {NPM_INSTALL_COMMAND}
          </code>
          <CopyButton text={NPM_INSTALL_COMMAND} />
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a href="#" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>
            Documentation
          </a>
          <Link to="/" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>
            Demos
          </Link>
        </div>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function highlightCode(code: string): React.ReactNode {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    let highlighted = line
      .replace(/(import|from|function|return|const)/g, '<span style="color:#c084fc">$1</span>')
      .replace(/('[@\w\/-]+')/g, '<span style="color:#34d399">$1</span>')
      .replace(/(useAvoidKeyboard)/g, '<span style="color:#60a5fa">$1</span>')
      .replace(/(\{|\}|\(|\))/g, '<span style="color:#fbbf24">$1</span>')
      .replace(/(style|placeholder|position|bottom)/g, '<span style="color:#f472b6">$1</span>');

    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        {i < lines.length - 1 && '\n'}
      </span>
    );
  });
}
