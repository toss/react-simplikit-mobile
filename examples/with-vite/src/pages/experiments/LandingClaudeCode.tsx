import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/CopyButton';

/**
 * Claude Code Official Style (claude.com/product/claude-code)
 * - Dark mode first (Gray-950 background)
 * - Animated status symbols (◈, ◓, ✽, ◐)
 * - Typewriter effect with rotating words
 * - Comparison section "X does Y. SimpliKit does Z."
 * - OS-aware install commands
 * - GSAP-like smooth animations
 */

const STATUS_SYMBOLS = ['◈', '◓', '✽', '◐', '○'];
const ROTATING_WORDS = ['developers', 'teams', 'startups', 'enterprises'];

export function LandingClaudeCode() {
  const [symbolIndex, setSymbolIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Detect OS
    setIsMac(navigator.platform.toLowerCase().includes('mac'));

    const symbolInterval = setInterval(() => {
      setSymbolIndex(i => (i + 1) % STATUS_SYMBOLS.length);
    }, 1000);

    const wordInterval = setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }, 2500);

    return () => {
      clearInterval(symbolInterval);
      clearInterval(wordInterval);
    };
  }, []);

  const installCommand = isMac ? 'npm install @react-simplikit/mobile' : 'npm install @react-simplikit/mobile';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(10, 10, 11)',
        color: 'rgb(250, 250, 250)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontSize: 18,
              color: '#da7756',
              transition: 'transform 0.3s ease',
            }}
          >
            {STATUS_SYMBOLS[symbolIndex]}
          </span>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: -0.3 }}>@react-simplikit/mobile</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14 }}>
          <a href="#" style={{ color: 'rgb(115, 115, 115)', textDecoration: 'none' }}>
            Docs
          </a>
          <a href="#" style={{ color: 'rgb(115, 115, 115)', textDecoration: 'none' }}>
            GitHub
          </a>
          <a
            href="#"
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgb(250, 250, 250)',
              color: 'rgb(10, 10, 11)',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: '100px 24px 80px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {/* Headline with rotating word */}
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 24,
          }}
        >
          Mobile hooks for{' '}
          <span
            style={{
              color: '#da7756',
              display: 'inline-block',
              minWidth: 200,
              transition: 'opacity 0.3s ease',
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 20,
            color: 'rgb(115, 115, 115)',
            lineHeight: 1.6,
            marginBottom: 48,
            maxWidth: 560,
          }}
        >
          Production-tested React hooks that handle keyboard, viewport, and scroll behaviors. Built for the problems CSS
          can't solve.
        </p>

        {/* Install Command Card */}
        <div
          style={{
            backgroundColor: 'rgb(20, 20, 21)',
            borderRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 20,
            marginBottom: 40,
            maxWidth: 480,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => setIsMac(true)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: isMac ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: isMac ? '#fff' : 'rgb(82, 82, 82)',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                macOS
              </button>
              <button
                onClick={() => setIsMac(false)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: !isMac ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: !isMac ? '#fff' : 'rgb(82, 82, 82)',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Windows
              </button>
            </div>
            <button
              onClick={handleCopy}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                color: copied ? '#22c55e' : 'rgb(163, 163, 163)',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.3s ease',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code
            style={{
              display: 'block',
              fontSize: 15,
              color: 'rgb(229, 229, 229)',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            }}
          >
            <span style={{ color: 'rgb(115, 115, 115)' }}>$</span> {installCommand}
          </code>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              padding: '14px 28px',
              backgroundColor: 'rgb(250, 250, 250)',
              color: 'rgb(10, 10, 11)',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            Read the Docs
          </a>
          <a
            href="#"
            style={{
              padding: '14px 28px',
              backgroundColor: 'transparent',
              color: 'rgb(250, 250, 250)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Comparison Section - Key Claude Code Style */}
      <section
        style={{
          padding: '80px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: 'rgb(15, 15, 16)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: -1,
              marginBottom: 16,
            }}
          >
            <span style={{ color: 'rgb(115, 115, 115)' }}>CSS handles viewport.</span>
            <br />
            SimpliKit handles <span style={{ color: '#da7756' }}>reality</span>.
          </h2>
          <p
            style={{
              fontSize: 18,
              color: 'rgb(115, 115, 115)',
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            100vh doesn't account for keyboard. Position fixed breaks on iOS. We solved it.
          </p>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              marginBottom: 60,
            }}
          >
            {/* Before */}
            <div
              style={{
                backgroundColor: 'rgb(20, 20, 21)',
                borderRadius: 20,
                padding: 32,
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                  }}
                />
                <span style={{ fontSize: 13, color: 'rgb(163, 163, 163)', fontWeight: 500 }}>Without SimpliKit</span>
              </div>

              {/* Phone Mockup - Before */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 200,
                  aspectRatio: '9/16',
                  backgroundColor: 'rgb(10, 10, 11)',
                  borderRadius: 24,
                  margin: '0 auto',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '3px solid rgb(38, 38, 38)',
                }}
              >
                {/* Status bar */}
                <div
                  style={{
                    height: 28,
                    backgroundColor: 'rgb(20, 20, 21)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 60, height: 20, backgroundColor: '#000', borderRadius: 10 }} />
                </div>

                {/* Content */}
                <div style={{ padding: 12, flex: 1 }}>
                  <div
                    style={{
                      height: 8,
                      backgroundColor: 'rgb(38, 38, 38)',
                      borderRadius: 4,
                      marginBottom: 8,
                      width: '80%',
                    }}
                  />
                  <div
                    style={{
                      height: 8,
                      backgroundColor: 'rgb(38, 38, 38)',
                      borderRadius: 4,
                      marginBottom: 8,
                      width: '60%',
                    }}
                  />
                </div>

                {/* Keyboard covering input */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '45%',
                    backgroundColor: 'rgb(38, 38, 38)',
                  }}
                >
                  <div style={{ padding: 8, fontSize: 8, color: '#ef4444' }}>Input hidden!</div>
                </div>
              </div>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: 'rgb(115, 115, 115)',
                  fontSize: 14,
                }}
              >
                Input disappears behind keyboard
              </p>
            </div>

            {/* After */}
            <div
              style={{
                backgroundColor: 'rgb(20, 20, 21)',
                borderRadius: 20,
                padding: 32,
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                  }}
                />
                <span style={{ fontSize: 13, color: 'rgb(163, 163, 163)', fontWeight: 500 }}>With SimpliKit</span>
              </div>

              {/* Phone Mockup - After */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 200,
                  aspectRatio: '9/16',
                  backgroundColor: 'rgb(10, 10, 11)',
                  borderRadius: 24,
                  margin: '0 auto',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '3px solid rgb(38, 38, 38)',
                }}
              >
                {/* Status bar */}
                <div
                  style={{
                    height: 28,
                    backgroundColor: 'rgb(20, 20, 21)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 60, height: 20, backgroundColor: '#000', borderRadius: 10 }} />
                </div>

                {/* Content with input visible */}
                <div style={{ padding: 12 }}>
                  <div
                    style={{
                      height: 8,
                      backgroundColor: 'rgb(38, 38, 38)',
                      borderRadius: 4,
                      marginBottom: 8,
                      width: '80%',
                    }}
                  />
                </div>

                {/* Input above keyboard */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '45%',
                    left: 12,
                    right: 12,
                    height: 36,
                    backgroundColor: '#da7756',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                  }}
                >
                  <span style={{ fontSize: 10, color: '#fff' }}>Type here...</span>
                </div>

                {/* Keyboard */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '45%',
                    backgroundColor: 'rgb(38, 38, 38)',
                    opacity: 0.8,
                  }}
                />
              </div>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: 'rgb(115, 115, 115)',
                  fontSize: 14,
                }}
              >
                Input stays visible automatically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section style={{ padding: '60px 24px', backgroundColor: 'rgb(15, 15, 16)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'rgb(20, 20, 21)',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Window Controls */}
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
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
              <span style={{ color: 'rgb(82, 82, 82)', fontSize: 13, fontFamily: 'ui-monospace, monospace' }}>
                ChatInput.tsx
              </span>
              <CopyButton
                text={`import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

  return (
    <div style={{ position: 'fixed', bottom: 0, ...style }}>
      <input placeholder="Type a message..." />
    </div>
  )
}`}
              />
            </div>

            <pre
              style={{
                padding: 28,
                margin: 0,
                fontSize: 14,
                lineHeight: 1.9,
                overflow: 'auto',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
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
                <span style={{ color: '#e5e5e5' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>const</span>
                <span style={{ color: '#e5e5e5' }}> {'{ style }'} = </span>
                <span style={{ color: '#da7756' }}>useAvoidKeyboard</span>
                <span style={{ color: '#e5e5e5' }}>()</span>
                {'\n\n'}
                <span style={{ color: '#e5e5e5' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>return</span>
                <span style={{ color: '#e5e5e5' }}> (</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'    <'}</span>
                <span style={{ color: '#22d3ee' }}>div</span>
                <span style={{ color: '#e5e5e5' }}> style={'{'}{'{ position: '}</span>
                <span style={{ color: '#86efac' }}>'fixed'</span>
                <span style={{ color: '#e5e5e5' }}>{', bottom: 0, ...style }'}{'}'}{'>'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'      <'}</span>
                <span style={{ color: '#22d3ee' }}>input</span>
                <span style={{ color: '#e5e5e5' }}> placeholder=</span>
                <span style={{ color: '#86efac' }}>"Type a message..."</span>
                <span style={{ color: '#e5e5e5' }}> {'/>'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'    </'}</span>
                <span style={{ color: '#22d3ee' }}>div</span>
                <span style={{ color: '#e5e5e5' }}>{'>'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'  )'}</span>
                {'\n'}
                <span style={{ color: '#e5e5e5' }}>{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 700,
              letterSpacing: -1,
              textAlign: 'center',
              marginBottom: 60,
            }}
          >
            Everything mobile needs.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                symbol: '◈',
                title: 'useAvoidKeyboard',
                desc: 'Keep inputs visible when the keyboard opens. Works on iOS Safari and Android.',
              },
              {
                symbol: '◓',
                title: 'useVisualViewport',
                desc: 'Track the actual visible area in real-time. Perfect for floating elements.',
              },
              {
                symbol: '✽',
                title: 'useBodyScrollLock',
                desc: 'Lock background scroll for modals. No iOS Safari rubber-banding bugs.',
              },
              {
                symbol: '◐',
                title: 'useScrollDirection',
                desc: 'Detect scroll direction with debouncing. Auto-hide navigation on scroll.',
              },
            ].map(item => (
              <FeatureCard key={item.title} symbol={item.symbol} title={item.title} description={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: '60px 24px',
          backgroundColor: 'rgb(15, 15, 16)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 40,
          }}
        >
          <StatItem value="<3KB" label="Gzipped size" />
          <StatItem value="0" label="Dependencies" />
          <StatItem value="100%" label="TypeScript" />
          <StatItem value="SSR" label="Ready" />
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(36px, 6vw, 52px)',
              fontWeight: 700,
              letterSpacing: -1,
              marginBottom: 20,
            }}
          >
            Ready to ship?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: 'rgb(115, 115, 115)',
              marginBottom: 40,
            }}
          >
            Production-tested at Toss. Zero dependencies. TypeScript first.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#"
              style={{
                padding: '16px 32px',
                backgroundColor: 'rgb(250, 250, 250)',
                color: 'rgb(10, 10, 11)',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Get Started
            </a>
            <a
              href="#"
              style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: 'rgb(250, 250, 250)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center',
          color: 'rgb(82, 82, 82)',
          fontSize: 13,
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
          backgroundColor: 'rgb(250, 250, 250)',
          color: 'rgb(10, 10, 11)',
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

function FeatureCard({ symbol, title, description }: { symbol: string; title: string; description: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 28,
        backgroundColor: isHovered ? 'rgb(25, 25, 26)' : 'rgb(20, 20, 21)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'background-color 0.2s ease, transform 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        style={{
          color: '#da7756',
          fontSize: 22,
          marginBottom: 16,
        }}
      >
        {symbol}
      </div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 10,
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'rgb(115, 115, 115)', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -1,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ color: 'rgb(115, 115, 115)', fontSize: 14 }}>{label}</div>
    </div>
  );
}
