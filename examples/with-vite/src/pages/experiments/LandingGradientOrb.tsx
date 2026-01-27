import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';

/**
 * Gradient Orb Style (Vercel/Linear inspired)
 * - Floating gradient orbs with blur
 * - Mesh gradient backgrounds
 * - Glassmorphism cards
 * - Subtle grain texture
 */
export function LandingGradientOrb() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#050505',
        color: '#fafafa',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Gradient Orbs */}
      <div
        style={{
          position: 'fixed',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: `calc(${mousePos.y * 30}% - 200px)`,
          left: `calc(${mousePos.x * 30}% - 200px)`,
          transition: 'top 0.8s ease-out, left 0.8s ease-out',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: `calc(${(1 - mousePos.y) * 20}% - 100px)`,
          right: `calc(${(1 - mousePos.x) * 20}% - 100px)`,
          transition: 'bottom 0.8s ease-out, right 0.8s ease-out',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <header
          style={{
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 1400,
            margin: '0 auto',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18 }}>
            <span style={{ color: '#6366f1' }}>@</span>react-simplikit/mobile
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40, fontSize: 14 }}>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }}>
              Features
            </a>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }}>
              Docs
            </a>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }}>
              GitHub
            </a>
            <a
              href="#"
              style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Get Started
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section style={{ padding: '140px 40px 100px', textAlign: 'center', maxWidth: 1000, margin: '0 auto' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100,
              marginBottom: 40,
              fontSize: 14,
            }}
          >
            <span
              style={{
                padding: '4px 10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              NEW
            </span>
            <span style={{ color: '#aaa' }}>v1.0 is now available</span>
            <span style={{ color: '#6366f1' }}>→</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(48px, 9vw, 88px)',
              fontWeight: 800,
              lineHeight: 1,
              marginBottom: 32,
              letterSpacing: -4,
            }}
          >
            The hooks
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 5s ease infinite',
              }}
            >
              mobile needs
            </span>
          </h1>

          <p style={{ fontSize: 20, color: '#888', lineHeight: 1.7, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
            Production-tested React hooks for keyboard avoiding, viewport tracking, and scroll behaviors. Because CSS 100vh is
            still broken.
          </p>

          {/* Install */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 28px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              marginBottom: 32,
            }}
          >
            <code style={{ fontSize: 16, color: '#e5e5e5', fontFamily: 'ui-monospace, monospace' }}>
              <span style={{ color: '#6366f1' }}>$</span> npm install @react-simplikit/mobile
            </code>
            <CopyButton text="npm install @react-simplikit/mobile" />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 60 }}>
            <Stat value="<3KB" label="Bundle size" />
            <Stat value="0" label="Dependencies" />
            <Stat value="100%" label="TypeScript" />
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            <GlassCard
              icon="⌨️"
              title="Keyboard Avoiding"
              description="Keep inputs visible above the keyboard. Works on iOS Safari, Android Chrome, and everything in between."
              color="#6366f1"
            />
            <GlassCard
              icon="📐"
              title="Visual Viewport"
              description="Track the actual visible area in real-time. Perfect for positioning floating elements."
              color="#ec4899"
            />
            <GlassCard
              icon="🔒"
              title="Scroll Locking"
              description="Lock background scroll when modals open. No scroll bleed, no body jumping."
              color="#22d3ee"
            />
            <GlassCard
              icon="↕️"
              title="Scroll Direction"
              description="Detect scroll direction with debouncing. Auto-hide navigation bars on scroll down."
              color="#f59e0b"
            />
          </div>
        </section>

        {/* Code Example */}
        <section style={{ padding: '60px 40px', maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
              </div>
              <span style={{ color: '#666', fontSize: 13 }}>ChatInput.tsx</span>
              <CopyButton
                text={`import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

  return (
    <div style={{ position: 'fixed', bottom: 0, ...style }}>
      <input placeholder="Message..." />
    </div>
  )
}`}
              />
            </div>
            <pre
              style={{
                padding: 32,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.9,
                fontFamily: 'ui-monospace, monospace',
                overflow: 'auto',
              }}
            >
              <code>
                <span style={{ color: '#c084fc' }}>import</span>
                <span style={{ color: '#e5e5e5' }}> {'{ useAvoidKeyboard }'} </span>
                <span style={{ color: '#c084fc' }}>from</span>
                <span style={{ color: '#86efac' }}> '@react-simplikit/mobile'</span>
                {'\n\n'}
                <span style={{ color: '#c084fc' }}>function</span>
                <span style={{ color: '#fbbf24' }}> ChatInput</span>
                <span style={{ color: '#e5e5e5' }}>() {'{'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>  </span>
                <span style={{ color: '#c084fc' }}>const</span>
                <span style={{ color: '#e5e5e5' }}> {'{ style }'} = </span>
                <span style={{ color: '#6366f1' }}>useAvoidKeyboard</span>
                <span style={{ color: '#e5e5e5' }}>()</span>
                {'\n\n'}
                <span style={{ color: '#e5e5e5' }}>  </span>
                <span style={{ color: '#c084fc' }}>return</span>
                <span style={{ color: '#e5e5e5' }}> (</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>    {'<'}</span>
                <span style={{ color: '#22d3ee' }}>div</span>
                <span style={{ color: '#e5e5e5' }}> style={'{'}{'{ ...style }'}{'}'}{'>'}...{'</'}</span>
                <span style={{ color: '#22d3ee' }}>div</span>
                <span style={{ color: '#e5e5e5' }}>{'>'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>  )</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'}'}</span>
              </code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, letterSpacing: -2 }}>Ready to ship?</h2>
          <p style={{ color: '#888', marginBottom: 40, fontSize: 18 }}>Production-tested at Toss. Zero dependencies.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <a
              href="#"
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Get Started
            </a>
            <a
              href="#"
              style={{
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '40px', textAlign: 'center', color: '#444', fontSize: 14 }}>
          Released under the MIT License
        </footer>
      </div>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          zIndex: 10,
        }}
      >
        ← Back
      </Link>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {value}
      </div>
      <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function GlassCard({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 32,
        background: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        transition: 'background 0.3s, transform 0.3s',
        transform: isHovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{title}</h3>
      <p style={{ color: '#888', lineHeight: 1.7, fontSize: 15 }}>{description}</p>
    </div>
  );
}
