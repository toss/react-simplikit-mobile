<script setup lang="ts">
/**
 * Dark Modern Style Home
 * - Modern dark theme
 * - Subtle gradients and glows
 * - Clean typography
 */
</script>

<template>
  <div class="home-dark-modern">
    <!-- Gradient Background -->
    <div class="bg-gradient"></div>

    <!-- Header -->
    <header class="header">
      <div class="logo">
        <div class="logo-icon">S</div>
        <span>SimpliKit</span>
      </div>
      <nav class="nav">
        <a href="/installation.html">Documentation</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
        <a href="/installation.html" class="btn-glow">Get Started</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-badge">
        <span class="pulse"></span>
        Now with SSR support
      </div>
      <h1>
        Mobile hooks
        <br />
        <span class="gradient-text">reimagined</span>
      </h1>
      <p>Production-ready React hooks that handle keyboard, viewport, and scroll behaviors. Built for modern mobile web.</p>

      <div class="install-box">
        <span class="prompt">$</span>
        <code>npm install @react-simplikit/mobile</code>
      </div>

      <div class="hero-buttons">
        <a href="/installation.html" class="btn-primary">
          Read Documentation
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://github.com/toss/react-simplikit" class="btn-secondary">View Source</a>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar">
      <div class="stat-item">
        <span class="stat-value">&lt;3KB</span>
        <span class="stat-label">Gzipped</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">0</span>
        <span class="stat-label">Dependencies</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">100%</span>
        <span class="stat-label">TypeScript</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">SSR</span>
        <span class="stat-label">Ready</span>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h2>Everything you need</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-glow cyan"></div>
          <div class="feature-icon">⌨️</div>
          <h3>useAvoidKeyboard</h3>
          <p>Keep inputs visible when the keyboard opens. Works on iOS Safari, Android Chrome, and every browser in between.</p>
        </div>
        <div class="feature-card">
          <div class="feature-glow purple"></div>
          <div class="feature-icon">📐</div>
          <h3>useVisualViewport</h3>
          <p>Track the actual visible viewport area in real-time. Perfect for positioning floating elements.</p>
        </div>
        <div class="feature-card">
          <div class="feature-glow green"></div>
          <div class="feature-icon">🔒</div>
          <h3>useBodyScrollLock</h3>
          <p>Lock background scroll when modals open. No scroll bleed, no body jumping, no iOS quirks.</p>
        </div>
        <div class="feature-card">
          <div class="feature-glow orange"></div>
          <div class="feature-icon">↕️</div>
          <h3>useScrollDirection</h3>
          <p>Detect scroll direction with intelligent debouncing. Auto-hide navigation bars on scroll.</p>
        </div>
      </div>
    </section>

    <!-- Code Section -->
    <section class="code-section">
      <div class="code-header">
        <h2>Simple API</h2>
        <p>Intuitive hooks that just work</p>
      </div>
      <div class="code-window">
        <div class="window-bar">
          <div class="window-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="filename">ChatInput.tsx</span>
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
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-glow"></div>
      <h2>Ready to ship?</h2>
      <p>Production-tested at Toss. Zero dependencies.</p>
      <div class="cta-buttons">
        <a href="/installation.html" class="btn-glow large">Get Started</a>
        <a href="https://github.com/toss/react-simplikit" class="btn-outline">View on GitHub</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>Released under the MIT License</p>
    </footer>
  </div>
</template>

<style scoped>
.home-dark-modern {
  min-height: 100vh;
  background-color: #09090b;
  color: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.bg-gradient {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

/* Header */
.header {
  position: relative;
  z-index: 10;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
}

.nav a {
  color: #71717a;
  text-decoration: none;
  transition: color 0.2s;
}

.nav a:hover {
  color: #fafafa;
}

.btn-glow {
  padding: 10px 20px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: #fff;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  transition: box-shadow 0.3s;
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
}

.btn-glow.large {
  padding: 16px 32px;
  font-size: 16px;
}

/* Hero */
.hero {
  position: relative;
  z-index: 10;
  padding: 100px 40px 80px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 100px;
  font-size: 14px;
  color: #a78bfa;
  margin-bottom: 32px;
}

.pulse {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.hero h1 {
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 5s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero p {
  font-size: 18px;
  color: #71717a;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto 40px;
}

.install-box {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 32px;
}

.prompt {
  color: #8b5cf6;
}

.install-box code {
  font-family: ui-monospace, monospace;
  font-size: 15px;
  color: #e4e4e7;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

.btn-secondary {
  padding: 14px 28px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fafafa;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

/* Stats Bar */
.stats-bar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #52525b;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

/* Features */
.features {
  position: relative;
  z-index: 10;
  padding: 100px 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.features h2 {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  letter-spacing: -1px;
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
  position: relative;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.feature-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.feature-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  pointer-events: none;
}

.feature-glow.cyan { background: #22d3ee; }
.feature-glow.purple { background: #8b5cf6; }
.feature-glow.green { background: #22c55e; }
.feature-glow.orange { background: #f59e0b; }

.feature-icon {
  font-size: 32px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: ui-monospace, monospace;
}

.feature-card p {
  font-size: 15px;
  color: #71717a;
  line-height: 1.7;
}

/* Code Section */
.code-section {
  position: relative;
  z-index: 10;
  padding: 80px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.code-header {
  text-align: center;
  margin-bottom: 40px;
}

.code-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.code-header p {
  color: #71717a;
}

.code-window {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
}

.window-bar {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.window-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.filename {
  color: #52525b;
  font-size: 13px;
  font-family: ui-monospace, monospace;
}

.code {
  padding: 28px;
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  font-family: ui-monospace, monospace;
  overflow: auto;
}

.code .kw { color: #c084fc; }
.code .str { color: #86efac; }
.code .fn { color: #fbbf24; }
.code .tag { color: #22d3ee; }
.code .num { color: #c4b5fd; }

/* CTA */
.cta {
  position: relative;
  z-index: 10;
  padding: 120px 40px;
  text-align: center;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.cta h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.cta p {
  font-size: 18px;
  color: #71717a;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-outline {
  padding: 16px 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fafafa;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

/* Footer */
.footer {
  position: relative;
  z-index: 10;
  padding: 32px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.footer p {
  font-size: 14px;
  color: #52525b;
}
</style>
