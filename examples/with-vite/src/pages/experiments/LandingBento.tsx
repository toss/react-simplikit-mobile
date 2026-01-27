import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';

/**
 * Bento Grid Style (Linear.app inspired)
 * - Asymmetric grid layout
 * - Cards with subtle hover effects and border glow
 * - Dark theme with gradient accent pops
 * - Responsive grid that collapses gracefully
 * - Micro-interactions with spring physics feel
 */
export function LandingBento() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #5b5cff, #9b59f4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: -0.3 }}>simplikit</span>
        </div>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 14 }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            GitHub
          </a>
          <a
            href="#"
            style={{
              color: '#0a0a0a',
              backgroundColor: '#fafafa',
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Get Started
          </a>
        </nav>
      </header>

      <main style={{ padding: '60px 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Hero */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ maxWidth: 700 }}>
            {/* Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px 6px 10px',
                background: 'rgba(91, 92, 255, 0.1)',
                border: '1px solid rgba(91, 92, 255, 0.2)',
                borderRadius: 100,
                marginBottom: 28,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
                }}
              />
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Production-ready</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(44px, 7vw, 72px)',
                fontWeight: 650,
                lineHeight: 1.05,
                marginBottom: 20,
                letterSpacing: -2,
              }}
            >
              Mobile web,
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5b5cff 0%, #9b59f4 50%, #e879f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                finally fixed.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              React hooks that solve the keyboard, viewport, and scroll problems that CSS can't.
            </p>

            {/* Install Command */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
              }}
            >
              <code
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                }}
              >
                npm i @react-simplikit/mobile
              </code>
              <CopyButton text="npm i @react-simplikit/mobile" />
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gridAutoRows: 'minmax(180px, auto)',
              gap: 12,
            }}
          >
            {/* Main Feature - Large */}
            <BentoCard
              style={{
                gridColumn: isMobile ? 'span 1' : 'span 2',
                gridRow: isMobile ? 'span 1' : 'span 2',
              }}
              accentGradient="linear-gradient(135deg, rgba(91, 92, 255, 0.15) 0%, rgba(155, 89, 244, 0.1) 100%)"
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#9b59f4',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      marginBottom: 16,
                    }}
                  >
                    Core Hook
                  </span>
                  <h3
                    style={{
                      fontSize: 26,
                      fontWeight: 650,
                      marginBottom: 12,
                      letterSpacing: -0.5,
                    }}
                  >
                    useAvoidKeyboard
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: 15 }}>
                    Keep your inputs visible when the mobile keyboard opens. No CSS hacks, no JavaScript timers.
                  </p>
                </div>

                {/* Before/After Phones */}
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    marginTop: 24,
                    justifyContent: isMobile ? 'center' : 'flex-start',
                  }}
                >
                  <MiniPhone label="Before" status="error" />
                  <MiniPhone label="After" status="success" />
                </div>
              </div>
            </BentoCard>

            {/* Stat: Size */}
            <BentoCard>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 700,
                    marginBottom: 8,
                    letterSpacing: -2,
                    background: 'linear-gradient(135deg, #fafafa 0%, rgba(255,255,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {'<3KB'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Gzipped size</div>
              </div>
            </BentoCard>

            {/* Stat: Deps */}
            <BentoCard>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 700,
                    marginBottom: 8,
                    letterSpacing: -2,
                    background: 'linear-gradient(135deg, #fafafa 0%, rgba(255,255,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  0
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Dependencies</div>
              </div>
            </BentoCard>

            {/* Feature: Visual Viewport */}
            <BentoCard accentGradient="linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)">
              <FeatureIcon>📐</FeatureIcon>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>useVisualViewport</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Track the actual visible area, including when keyboard changes it.
              </p>
            </BentoCard>

            {/* Feature: Scroll Lock */}
            <BentoCard accentGradient="linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)">
              <FeatureIcon>🔒</FeatureIcon>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>useBodyScrollLock</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Lock background scroll for modals. Works on iOS Safari.
              </p>
            </BentoCard>

            {/* Code Example */}
            <BentoCard style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
              <pre
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                <code>
                  <span style={{ color: '#c084fc' }}>const</span> {'{ style }'} ={' '}
                  <span style={{ color: '#5b5cff' }}>useAvoidKeyboard</span>()
                  {'\n\n'}
                  <span style={{ color: '#c084fc' }}>return</span> {'<'}
                  <span style={{ color: '#22d3ee' }}>div</span>{' '}
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>style</span>={'{'}...style{'}'}{'>'}...{'</>'}
                </code>
              </pre>
            </BentoCard>

            {/* Feature: Scroll Direction */}
            <BentoCard accentGradient="linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 146, 60, 0.1) 100%)">
              <FeatureIcon>↕️</FeatureIcon>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>useScrollDirection</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Detect scroll direction. Auto-hide navigation on scroll.
              </p>
            </BentoCard>

            {/* TypeScript */}
            <BentoCard>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: '#3178c6',
                  }}
                >
                  TypeScript
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>100% type coverage</div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            marginTop: 80,
            padding: '56px 40px',
            background: 'linear-gradient(135deg, rgba(91, 92, 255, 0.1) 0%, rgba(155, 89, 244, 0.05) 100%)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 650, marginBottom: 12, letterSpacing: -0.5 }}>Ready to ship?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
            Get started in seconds. Production-tested at Toss.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#"
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #5b5cff, #9b59f4)',
                color: '#fff',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Read the Docs
            </a>
            <a
              href="#"
              style={{
                padding: '14px 28px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#fff',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '24px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontSize: 13,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        Released under the MIT License. Production-tested at Toss.
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '10px 18px',
          background: 'linear-gradient(135deg, #5b5cff, #9b59f4)',
          color: '#fff',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          zIndex: 100,
        }}
      >
        ← Back
      </Link>
    </div>
  );
}

function BentoCard({
  children,
  style,
  accentGradient,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accentGradient?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        background: accentGradient || 'rgba(255, 255, 255, 0.02)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s, box-shadow 0.25s',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
        boxShadow: isHovered ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 24,
        marginBottom: 14,
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
}

function MiniPhone({ label, status }: { label: string; status: 'success' | 'error' }) {
  const isSuccess = status === 'success';

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 72,
          height: 130,
          backgroundColor: '#0f0f0f',
          borderRadius: 14,
          border: `2px solid ${isSuccess ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isSuccess ? '0 0 20px rgba(34, 197, 94, 0.15)' : '0 0 20px rgba(239, 68, 68, 0.15)',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 28,
            height: 10,
            backgroundColor: '#000',
            borderRadius: 10,
          }}
        />

        {/* Content placeholder */}
        <div style={{ position: 'absolute', top: 24, left: 8, right: 8 }}>
          <div style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 6 }} />
          <div
            style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, width: '70%' }}
          />
        </div>

        {/* Input */}
        <div
          style={{
            position: 'absolute',
            bottom: isSuccess ? 52 : 0,
            left: 6,
            right: 6,
            height: 28,
            backgroundColor: isSuccess ? '#5b5cff' : 'rgba(255,255,255,0.1)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            transition: 'bottom 0.3s ease',
          }}
        >
          <span style={{ fontSize: 8, color: isSuccess ? '#fff' : 'rgba(255,255,255,0.4)' }}>Type here...</span>
        </div>

        {/* Keyboard */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 45,
            backgroundColor: '#1a1a1a',
          }}
        >
          {/* Key rows */}
          <div style={{ padding: '6px 4px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[0, 1, 2].map(row => (
              <div key={row} style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(key => (
                  <div
                    key={key}
                    style={{
                      width: 6,
                      height: 8,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          fontWeight: 500,
          color: isSuccess ? '#22c55e' : '#ef4444',
        }}
      >
        {label}
      </div>
    </div>
  );
}
