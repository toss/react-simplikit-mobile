<script setup lang="ts">
/**
 * Foundation Style Home
 * - Clean utility-focused design
 * - Inspired by Tailwind/Foundation docs
 * - Professional and trustworthy
 */
</script>

<template>
  <div class="home-foundation">
    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <svg class="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#3b82f6"/>
            <path d="M10 16h12M16 10v12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span>SimpliKit</span>
        </div>
        <nav class="nav">
          <a href="/installation.html">Docs</a>
          <a href="https://github.com/toss/react-simplikit">GitHub</a>
          <a href="/installation.html" class="btn-primary">Get Started</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="badge">
          <span class="badge-dot"></span>
          v1.0 Released
        </div>
        <h1>Build better mobile experiences</h1>
        <p>A collection of production-ready React hooks for handling keyboard, viewport, and scroll behaviors on mobile web.</p>
        <div class="hero-actions">
          <a href="/installation.html" class="btn-primary-large">
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 3.5l4.5 4.5-4.5 4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <div class="install-cmd">
            <code>npm i @react-simplikit/mobile</code>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">&lt;3KB</span>
            <span class="hero-stat-label">Bundle size</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">0</span>
            <span class="hero-stat-label">Dependencies</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">100%</span>
            <span class="hero-stat-label">TypeScript</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="features-inner">
        <div class="features-header">
          <span class="section-label">Features</span>
          <h2>Everything you need for mobile</h2>
          <p>Solve the common mobile web problems that CSS can't handle.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <line x1="8" y1="18" x2="16" y2="18"/>
              </svg>
            </div>
            <h3>useAvoidKeyboard</h3>
            <p>Automatically adjusts your layout when the mobile keyboard appears, keeping inputs visible.</p>
            <a href="/hooks/useAvoidKeyboard.html" class="feature-link">Learn more →</a>
          </div>
          <div class="feature-card">
            <div class="feature-icon purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 3v18"/>
              </svg>
            </div>
            <h3>useVisualViewport</h3>
            <p>Track the actual visible viewport area in real-time, accounting for browser UI changes.</p>
            <a href="/hooks/useVisualViewport.html" class="feature-link">Learn more →</a>
          </div>
          <div class="feature-card">
            <div class="feature-icon green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="11" width="14" height="10" rx="2"/>
                <path d="M12 11V7a4 4 0 00-8 0v4"/>
              </svg>
            </div>
            <h3>useBodyScrollLock</h3>
            <p>Lock body scroll when modals are open without the iOS Safari rubber-banding issues.</p>
            <a href="/hooks/useBodyScrollLock.html" class="feature-link">Learn more →</a>
          </div>
          <div class="feature-card">
            <div class="feature-icon orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12l7-7 7 7"/>
              </svg>
            </div>
            <h3>useScrollDirection</h3>
            <p>Detect scroll direction with intelligent debouncing for auto-hiding navigation bars.</p>
            <a href="/hooks/useScrollDirection.html" class="feature-link">Learn more →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="code-example">
      <div class="code-example-inner">
        <div class="code-example-header">
          <span class="section-label">Quick Start</span>
          <h2>Simple and intuitive API</h2>
          <p>Get started in seconds with our straightforward hooks.</p>
        </div>
        <div class="code-window">
          <div class="code-tabs">
            <span class="code-tab active">ChatInput.tsx</span>
          </div>
          <pre class="code"><code><span class="kw">import</span> &#123; useAvoidKeyboard &#125; <span class="kw">from</span> <span class="str">'@react-simplikit/mobile'</span>

<span class="kw">export function</span> <span class="fn">ChatInput</span>() &#123;
  <span class="kw">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()

  <span class="kw">return</span> (
    &lt;<span class="tag">div</span> style=&#123;&#123; position: <span class="str">'fixed'</span>, bottom: <span class="num">0</span>, ...style &#125;&#125;&gt;
      &lt;<span class="tag">input</span> placeholder=<span class="str">"Type a message..."</span> /&gt;
    &lt;/<span class="tag">div</span>&gt;
  )
&#125;</code></pre>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-inner">
        <h2>Ready to build?</h2>
        <p>Start using SimpliKit in your project today.</p>
        <div class="cta-actions">
          <a href="/installation.html" class="btn-white">Read the Documentation</a>
          <a href="https://github.com/toss/react-simplikit" class="btn-outline-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <p>Released under the MIT License. Production-tested at Toss.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-foundation {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.header {
  background-color: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
}

.nav a {
  color: #64748b;
  text-decoration: none;
}

.nav a:hover {
  color: #1e293b;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: #fff;
  border-radius: 8px;
  font-weight: 500;
}

/* Hero */
.hero {
  background: linear-gradient(180deg, #fff 0%, #f8fafc 100%);
  padding: 80px 24px 100px;
}

.hero-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background-color: #dbeafe;
  color: #1d4ed8;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
}

.hero h1 {
  font-size: clamp(40px, 6vw, 56px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 20px;
  color: #0f172a;
}

.hero > p,
.hero-inner > p {
  font-size: 18px;
  color: #64748b;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 40px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.btn-primary-large {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background-color: #3b82f6;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.install-cmd {
  padding: 14px 24px;
  background-color: #1e293b;
  border-radius: 10px;
}

.install-cmd code {
  font-family: ui-monospace, monospace;
  font-size: 14px;
  color: #e2e8f0;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.hero-stat {
  text-align: center;
}

.hero-stat-value {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
}

.hero-stat-label {
  font-size: 14px;
  color: #94a3b8;
}

/* Features */
.features {
  padding: 100px 24px;
  background-color: #fff;
}

.features-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.features-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.features-header h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.features-header p {
  font-size: 18px;
  color: #64748b;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: 32px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon.blue {
  background-color: #dbeafe;
  color: #3b82f6;
}

.feature-icon.purple {
  background-color: #ede9fe;
  color: #8b5cf6;
}

.feature-icon.green {
  background-color: #dcfce7;
  color: #22c55e;
}

.feature-icon.orange {
  background-color: #ffedd5;
  color: #f97316;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: ui-monospace, monospace;
  color: #0f172a;
}

.feature-card p {
  font-size: 15px;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 16px;
}

.feature-link {
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  text-decoration: none;
}

/* Code Example */
.code-example {
  padding: 100px 24px;
  background-color: #f8fafc;
}

.code-example-inner {
  max-width: 800px;
  margin: 0 auto;
}

.code-example-header {
  text-align: center;
  margin-bottom: 40px;
}

.code-example-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #0f172a;
}

.code-example-header p {
  font-size: 18px;
  color: #64748b;
}

.code-window {
  background-color: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.code-tabs {
  padding: 16px 24px;
  border-bottom: 1px solid #334155;
}

.code-tab {
  font-size: 13px;
  color: #94a3b8;
  font-family: ui-monospace, monospace;
}

.code-tab.active {
  color: #f8fafc;
}

.code {
  padding: 24px;
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  font-family: ui-monospace, monospace;
  overflow: auto;
  color: #e2e8f0;
}

.code .kw { color: #f472b6; }
.code .str { color: #a5f3fc; }
.code .fn { color: #fbbf24; }
.code .tag { color: #34d399; }
.code .num { color: #c4b5fd; }

/* CTA */
.cta {
  padding: 100px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #fff;
}

.cta-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-white {
  padding: 14px 28px;
  background-color: #fff;
  color: #1d4ed8;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.btn-outline-white {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

/* Footer */
.footer {
  padding: 32px 24px;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer p {
  font-size: 14px;
  color: #94a3b8;
}
</style>
