import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>@react-simplikit/mobile</h1>
        <p style={{ fontSize: 18, color: '#666' }}>Mobile Examples Playground - Test on your mobile device!</p>
        <Link
          to="/intro"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 16,
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ✨ View Intro Page
        </Link>
      </header>

      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
            borderBottom: '2px solid #0070f3',
            paddingBottom: 8,
          }}
        >
          📱 Mobile Hooks
        </h2>
        <nav>
          <DemoLink
            to="/demos/use-body-scroll-lock"
            title="useBodyScrollLock"
            description="Prevent body scroll with nested modals"
          />
          <DemoLink
            to="/demos/use-scroll-direction"
            title="useScrollDirection"
            description="Auto-hide navigation on scroll down"
          />
          <DemoLink
            to="/demos/use-visual-viewport"
            title="useVisualViewport"
            description="Track keyboard, zoom, and viewport changes"
          />
        </nav>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
            borderBottom: '2px solid #0070f3',
            paddingBottom: 8,
          }}
        >
          🔧 Utils
        </h2>
        <nav>
          <DemoLink
            to="/demos/body-scroll-lock-util"
            title="bodyScrollLock Utils"
            description="Programmatic scroll lock control"
          />
        </nav>
      </section>

      <section>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
            borderBottom: '2px solid #0070f3',
            paddingBottom: 8,
          }}
        >
          🛠️ Other
        </h2>
        <nav>
          <DemoLink to="/demos/is-server" title="isServer" description="Check if code is running on server" />
        </nav>
      </section>

    </div>
  );
}

function DemoLink({ to, title, description }: { to: string; title: string; description: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 150ms',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#f9f9f9';
        e.currentTarget.style.borderColor = '#0070f3';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.borderColor = '#e5e5e5';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 4,
          color: '#0070f3',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14, color: '#666' }}>{description}</div>
    </Link>
  );
}
