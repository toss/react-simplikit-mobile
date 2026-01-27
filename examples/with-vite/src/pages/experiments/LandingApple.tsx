import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';

/**
 * Apple-inspired Style (apple.com product pages)
 * - Massive typography with tight letter-spacing
 * - Full viewport sections
 * - Scroll-triggered opacity/parallax
 * - High contrast black/white
 * - SF Pro font family
 * - Cinematic product reveals
 */

export function LandingApple() {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getOpacity = (start: number, end: number) => {
    if (prefersReducedMotion) return 1;
    return Math.max(0, Math.min(1, 1 - (scrollY - start) / (end - start)));
  };

  const getTranslateY = (factor: number) => {
    if (prefersReducedMotion) return 0;
    return scrollY * factor;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* Sticky Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 max(22px, env(safe-area-inset-left))',
          height: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.72)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'saturate(180%) blur(20px)' : 'none',
          WebkitBackdropFilter: scrollY > 50 ? 'saturate(180%) blur(20px)' : 'none',
          transition: 'background-color 0.3s',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: -0.5 }}>simplikit</span>
        <div style={{ display: 'flex', gap: 32, fontSize: 12 }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            Overview
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section - Full Viewport */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
        }}
      >
        {/* Background Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 60%)',
            opacity: getOpacity(0, 400),
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: getOpacity(0, 350),
            transform: `translateY(${getTranslateY(0.2)}px)`,
          }}
        >
          {/* Overline */}
          <p
            style={{
              fontSize: 21,
              fontWeight: 600,
              color: '#bf5af2',
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            @react-simplikit/mobile
          </p>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(56px, 12vw, 96px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -5,
              marginBottom: 16,
            }}
          >
            Mobile.
            <br />
            <span style={{ color: '#86868b' }}>Redefined.</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(19px, 2.5vw, 28px)',
              color: '#86868b',
              maxWidth: 500,
              margin: '0 auto',
              fontWeight: 400,
              letterSpacing: -0.5,
            }}
          >
            React hooks for the problems CSS can't solve.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: getOpacity(0, 200),
          }}
        >
          <div
            style={{
              width: 26,
              height: 44,
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: 13,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: 4,
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 2,
                animation: prefersReducedMotion ? 'none' : 'scroll-bounce 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px',
        }}
      >
        <div style={{ maxWidth: 980, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(40px, 7vw, 64px)',
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Mobile keyboards
            <br />
            <span style={{ color: '#86868b' }}>break your layout.</span>
          </h2>
          <p
            style={{
              fontSize: 21,
              color: '#86868b',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.5,
              letterSpacing: -0.3,
            }}
          >
            CSS 100vh ignores the keyboard. Your input disappears.
            <br />
            Position fixed breaks on iOS. Your modal jumps.
          </p>
        </div>
      </section>

      {/* Solution Reveal */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px',
          backgroundColor: '#0d0d0d',
        }}
      >
        <div style={{ maxWidth: 1200, width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: 80,
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(40px, 6vw, 56px)',
                  fontWeight: 700,
                  letterSpacing: -2,
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                One hook.
                <br />
                <span style={{ color: '#bf5af2' }}>It just works.</span>
              </h2>
              <p
                style={{
                  fontSize: 19,
                  color: '#86868b',
                  lineHeight: 1.5,
                  marginBottom: 32,
                  letterSpacing: -0.3,
                }}
              >
                No configuration needed. No workarounds required. Works perfectly on iOS Safari, Android Chrome, and
                every browser in between.
              </p>

              {/* Install Command */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 24px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 980,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <code
                  style={{
                    fontSize: 15,
                    fontFamily:
                      'ui-monospace, "SF Mono", SFMono-Regular, "Roboto Mono", Menlo, Monaco, Consolas, monospace',
                    color: '#f5f5f7',
                  }}
                >
                  npm i @react-simplikit/mobile
                </code>
                <CopyButton text="npm i @react-simplikit/mobile" />
              </div>
            </div>

            {/* Code Example */}
            <div
              style={{
                backgroundColor: '#1d1d1f',
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  gap: 8,
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
              </div>
              <pre
                style={{
                  padding: 28,
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.9,
                  overflow: 'auto',
                  fontFamily: 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace',
                }}
              >
                <code>
                  <span style={{ color: '#bf5af2' }}>import</span>
                  <span style={{ color: '#f5f5f7' }}> {'{ useAvoidKeyboard }'}</span>
                  {'\n'}
                  <span style={{ color: '#bf5af2' }}>from</span>
                  <span style={{ color: '#32d74b' }}> '@react-simplikit/mobile'</span>
                  {'\n\n'}
                  <span style={{ color: '#bf5af2' }}>function</span>
                  <span style={{ color: '#ffd60a' }}> ChatInput</span>
                  <span style={{ color: '#f5f5f7' }}>() {'{'}</span>
                  {'\n'}
                  <span style={{ color: '#f5f5f7' }}>  </span>
                  <span style={{ color: '#bf5af2' }}>const</span>
                  <span style={{ color: '#f5f5f7' }}> {'{ style }'} = </span>
                  <span style={{ color: '#64d2ff' }}>useAvoidKeyboard</span>
                  <span style={{ color: '#f5f5f7' }}>()</span>
                  {'\n\n'}
                  <span style={{ color: '#f5f5f7' }}>  </span>
                  <span style={{ color: '#bf5af2' }}>return</span>
                  <span style={{ color: '#f5f5f7' }}> {'<'}</span>
                  <span style={{ color: '#64d2ff' }}>div</span>
                  <span style={{ color: '#f5f5f7' }}> style={'{'}...style{'}'}{'>'}...</span>
                  {'\n'}
                  <span style={{ color: '#f5f5f7' }}>{'}'}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple tile style */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              fontWeight: 700,
              letterSpacing: -2,
              textAlign: 'center',
              marginBottom: 80,
            }}
          >
            All the hooks you need.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            <FeatureTile icon="⌨️" title="Keyboard Avoiding" description="Keep inputs visible above the keyboard." />
            <FeatureTile icon="📐" title="Visual Viewport" description="Track the actual visible area in real-time." />
            <FeatureTile icon="🔒" title="Scroll Locking" description="Lock background scroll for modals." />
            <FeatureTile icon="↕️" title="Scroll Direction" description="Detect scroll direction with debouncing." />
          </div>
        </div>
      </section>

      {/* Stats - Large numbers */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: '#0d0d0d',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(40px, 10vw, 120px)',
            flexWrap: 'wrap',
          }}
        >
          <Stat value="<3KB" label="Gzipped" />
          <Stat value="0" label="Dependencies" />
          <Stat value="100%" label="TypeScript" />
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px 24px',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: 700,
              letterSpacing: -4,
              marginBottom: 24,
            }}
          >
            Get started.
          </h2>
          <p
            style={{
              fontSize: 21,
              color: '#86868b',
              marginBottom: 40,
              letterSpacing: -0.3,
            }}
          >
            Production-tested at Toss.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#"
              style={{
                padding: '18px 32px',
                backgroundColor: '#0071e3',
                color: '#fff',
                borderRadius: 980,
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 17,
                letterSpacing: -0.3,
              }}
            >
              Read the Docs
            </a>
            <a
              href="#"
              style={{
                padding: '18px 32px',
                backgroundColor: 'transparent',
                color: '#2997ff',
                borderRadius: 980,
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 17,
                letterSpacing: -0.3,
              }}
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '20px 24px',
          textAlign: 'center',
          color: '#6e6e73',
          fontSize: 12,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        Released under the MIT License
      </footer>

      {/* Back Link */}
      <Link
        to="/experiments"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '12px 20px',
          backgroundColor: '#0071e3',
          color: '#fff',
          borderRadius: 980,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          zIndex: 100,
        }}
      >
        ← Back
      </Link>

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function FeatureTile({ icon, title, description }: { icon: string; title: string; description: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 'clamp(32px, 5vw, 56px)',
        backgroundColor: isHovered ? '#1d1d1f' : '#161617',
        borderRadius: 18,
        transition: 'background-color 0.3s, transform 0.3s',
        transform: isHovered ? 'scale(1.02)' : 'none',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 20 }}>{icon}</div>
      <h3
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h3>
      <p style={{ color: '#86868b', fontSize: 17, lineHeight: 1.5, letterSpacing: -0.3 }}>{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 'clamp(48px, 10vw, 80px)',
          fontWeight: 700,
          letterSpacing: -3,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ color: '#86868b', fontSize: 17, letterSpacing: -0.3 }}>{label}</div>
    </div>
  );
}
