import './IntroPage.css';

import { useCallback, useEffect, useRef, useState } from 'react';

const features = [
  {
    id: 'scroll-direction',
    hook: 'useScrollDirection',
    tagline: 'Hide headers, effortlessly.',
    question: 'Ever wished the header would just get out of the way while scrolling?',
    description:
      'Detect scroll direction to smoothly hide and reveal headers, navigation bars, and floating buttons. Give your users more screen real estate.',
    code: `const { direction } = useScrollDirection();
const isHidden = direction === 'down';`,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '📜',
  },
  {
    id: 'avoid-keyboard',
    hook: 'useAvoidKeyboard',
    tagline: 'Keyboard up, button stays.',
    question: 'Frustrated when the keyboard covers your bottom buttons?',
    description:
      'Fixed-bottom elements automatically move above the keyboard when it appears. Perfect for chat inputs, forms, and CTA buttons.',
    code: `const { style } = useAvoidKeyboard();
// Apply style to position: fixed elements`,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '⌨️',
  },
  {
    id: 'safe-area',
    hook: 'getSafeAreaInset',
    tagline: "Don't hide behind the notch.",
    question: 'Annoyed when your UI disappears behind the notch or Dynamic Island?',
    description:
      'Get precise safe area inset values for any device. Position your content perfectly around notches, home indicators, and status bars.',
    code: `const topInset = getSafeAreaInset('top');
const bottomInset = getSafeAreaInset('bottom');`,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '📱',
  },
];

// Custom hook for intersection observer
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Custom hook for scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// Animated counter component
function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
}: {
  value: number | string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || typeof value !== 'number') return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, value, duration]);

  if (typeof value === 'string') {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// Feature card component with scroll animations
function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const { ref, isInView } = useInView(0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`feature-section ${isInView ? 'feature-section--visible' : ''} ${isHovered ? 'feature-section--active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="feature-accent" style={{ background: feature.gradient }} />

      <div className="feature-content">
        <div className="feature-index">0{index + 1}</div>

        <div className="feature-icon">{feature.icon}</div>

        <div className="feature-header">
          <code className="feature-hook">{feature.hook}</code>
          <h2 className="feature-tagline">{feature.tagline}</h2>
        </div>

        <div className="feature-body">
          <p className="feature-question">{feature.question}</p>
          <p className="feature-description">{feature.description}</p>
        </div>

        <div className="feature-code glass-card">
          <div className="code-header">
            <div className="code-dots">
              <span className="code-dot code-dot--red" />
              <span className="code-dot code-dot--yellow" />
              <span className="code-dot code-dot--green" />
            </div>
            <span className="code-filename">{feature.hook}.tsx</span>
          </div>
          <pre className="code-content">
            <code>{feature.code}</code>
          </pre>
        </div>
      </div>

      <div className="feature-glow" style={{ background: feature.gradient }} />

      {/* Floating particles */}
      <div className="feature-particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={
              {
                '--particle-delay': `${i * 0.5}s`,
                '--particle-x': `${Math.random() * 100}%`,
                background: feature.gradient,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export function IntroPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollProgress = useScrollProgress();
  const finalCtaRef = useInView(0.3);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToFeatures = useCallback(() => {
    const featuresSection = document.querySelector('.features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="intro-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background effects */}
      <div className="bg-gradient" />
      <div className="bg-noise" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      {/* Hero Section */}
      <section className={`hero ${isLoaded ? 'hero--loaded' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            React Hooks for Mobile
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line hero-title-line--1">Mobile web development,</span>
            <span className="hero-title-line hero-title-line--2 hero-title-gradient">no longer complicated.</span>
          </h1>

          <p className="hero-subtitle">
            @react-simplikit/mobile elegantly solves
            <br />
            the tricky problems you face in mobile web.
          </p>

          <div className="hero-cta">
            <button
              className="cta-button cta-button--primary"
              onClick={() => {
                navigator.clipboard.writeText('yarn add @react-simplikit/mobile');
              }}
            >
              <span className="cta-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              Install Now
            </button>
            <div className="cta-command">
              <code>yarn add @react-simplikit/mobile</code>
              <button
                className="cta-copy"
                onClick={() => navigator.clipboard.writeText('yarn add @react-simplikit/mobile')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">
                <AnimatedCounter value={0} />
              </span>
              <span className="stat-label">Dependencies</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">
                <AnimatedCounter value={100} suffix="%" />
              </span>
              <span className="stat-label">Test Coverage</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">
                <AnimatedCounter value="TypeScript" />
              </span>
              <span className="stat-label">First</span>
            </div>
          </div>
        </div>

        <button className="scroll-indicator" onClick={scrollToFeatures}>
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2 className="features-title">What we solve</h2>
          <p className="features-subtitle">Three hooks that handle the mobile quirks, so you don&apos;t have to.</p>
        </div>

        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </section>

      {/* Final CTA Section */}
      <section ref={finalCtaRef.ref} className={`final-cta ${finalCtaRef.isInView ? 'final-cta--visible' : ''}`}>
        <div className="final-cta-bg" />
        <div className="final-cta-content">
          <h2 className="final-cta-title">Get started today.</h2>
          <p className="final-cta-subtitle">Build better mobile web experiences.</p>

          <div className="final-cta-buttons">
            <button
              className="cta-button cta-button--primary cta-button--large"
              onClick={() => navigator.clipboard.writeText('yarn add @react-simplikit/mobile')}
            >
              Get Started
            </button>
            <a
              href="https://github.com/toss/react-simplikit"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-button--secondary cta-button--large"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Made with ❤️ by Toss</p>
          <p className="footer-links">
            <a href="/">Examples</a>
            <span>·</span>
            <a href="https://github.com/toss/react-simplikit" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
