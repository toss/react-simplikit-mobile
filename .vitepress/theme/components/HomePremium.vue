<script setup lang="ts">
/**
 * Premium Style Home
 * - Luxurious dark theme
 * - Gold accents
 * - Elegant serif typography
 */
</script>

<template>
  <div class="home-premium">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <span class="logo-mark">◆</span>
        SimpliKit
      </div>
      <nav class="nav">
        <a href="/installation.html">Documentation</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
        <a href="/installation.html" class="btn-gold">Get Started</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <p class="eyebrow">@react-simplikit/mobile</p>
      <h1>Crafted for<br /><span class="gold">Excellence</span></h1>
      <p class="tagline">Premium React hooks for mobile experiences that demand perfection.</p>
      <div class="install-box">
        <code>npm install @react-simplikit/mobile</code>
      </div>
    </section>

    <!-- Divider -->
    <div class="divider">
      <span class="divider-mark">◆</span>
    </div>

    <!-- Features -->
    <section class="features">
      <h2>The Complete Solution</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">⌨</span>
          <h3>Keyboard Avoiding</h3>
          <p>Intelligently positions your inputs above the mobile keyboard with zero configuration.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">◎</span>
          <h3>Visual Viewport</h3>
          <p>Real-time tracking of the visible area for precise element positioning.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">◈</span>
          <h3>Scroll Control</h3>
          <p>Elegant scroll locking for modals without the Safari quirks.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">↕</span>
          <h3>Direction Detection</h3>
          <p>Smooth scroll direction detection with intelligent debouncing.</p>
        </div>
      </div>
    </section>

    <!-- Code -->
    <section class="code-section">
      <div class="code-window">
        <div class="window-bar">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <pre class="code"><code><span class="kw">import</span> &#123; useAvoidKeyboard &#125; <span class="kw">from</span> <span class="str">'@react-simplikit/mobile'</span>

<span class="kw">function</span> <span class="fn">ChatInput</span>() &#123;
  <span class="kw">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()

  <span class="kw">return</span> &lt;<span class="tag">div</span> style=&#123;&#123;...style&#125;&#125;&gt;...&lt;/<span class="tag">div</span>&gt;
&#125;</code></pre>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat">
        <span class="value">&lt;3<span class="unit">KB</span></span>
        <span class="label">Gzipped</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="value">0</span>
        <span class="label">Dependencies</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="value">100<span class="unit">%</span></span>
        <span class="label">TypeScript</span>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Experience Excellence</h2>
      <p>Join teams who demand the best.</p>
      <div class="cta-buttons">
        <a href="/installation.html" class="btn-gold-large">Read Documentation</a>
        <a href="https://github.com/toss/react-simplikit" class="btn-outline">View Source</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-line"></div>
      <p>Released under MIT License · Production-tested at Toss</p>
    </footer>
  </div>
</template>

<style scoped>
.home-premium {
  min-height: 100vh;
  background-color: #0c0c0c;
  color: #f5f5f5;
  font-family: 'Times New Roman', Georgia, serif;
}

.header {
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.logo-mark {
  color: #c9a962;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: -apple-system, sans-serif;
}

.nav a {
  color: #888;
  text-decoration: none;
  text-transform: uppercase;
}

.nav a:hover {
  color: #c9a962;
}

.btn-gold {
  padding: 12px 24px;
  background: linear-gradient(135deg, #c9a962, #8b7355);
  color: #0c0c0c;
  border-radius: 4px;
  font-weight: 600;
}

.hero {
  padding: 140px 48px 100px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.eyebrow {
  font-family: ui-monospace, monospace;
  font-size: 14px;
  color: #c9a962;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: clamp(56px, 10vw, 96px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 32px;
}

.gold {
  color: #c9a962;
  font-style: italic;
}

.tagline {
  font-size: 22px;
  color: #888;
  max-width: 500px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

.install-box {
  display: inline-block;
  padding: 20px 32px;
  border: 1px solid #333;
  background-color: #111;
}

.install-box code {
  font-family: ui-monospace, monospace;
  font-size: 15px;
  color: #c9a962;
}

.divider {
  text-align: center;
  padding: 60px 0;
}

.divider-mark {
  color: #333;
  font-size: 24px;
}

.features {
  padding: 80px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.features h2 {
  text-align: center;
  font-size: 14px;
  font-family: -apple-system, sans-serif;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: 40px;
  border: 1px solid #222;
  background-color: #111;
  transition: border-color 0.3s;
}

.feature-card:hover {
  border-color: #c9a962;
}

.feature-icon {
  font-size: 28px;
  color: #c9a962;
  display: block;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.feature-card p {
  font-family: -apple-system, sans-serif;
  font-size: 15px;
  color: #888;
  line-height: 1.7;
}

.code-section {
  padding: 80px 48px;
  max-width: 700px;
  margin: 0 auto;
}

.code-window {
  background-color: #111;
  border: 1px solid #222;
  overflow: hidden;
}

.window-bar {
  padding: 16px 20px;
  border-bottom: 1px solid #222;
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #333;
}

.code {
  padding: 32px;
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  font-family: ui-monospace, monospace;
  overflow: auto;
}

.code .kw { color: #c9a962; }
.code .str { color: #6b8e6b; }
.code .fn { color: #f5f5f5; }
.code .tag { color: #8b8bc9; }

.stats {
  padding: 80px 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat .value {
  display: block;
  font-size: 64px;
  font-weight: 400;
  letter-spacing: -2px;
  color: #c9a962;
}

.stat .unit {
  font-size: 32px;
}

.stat .label {
  font-family: -apple-system, sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  margin-top: 8px;
  display: block;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background-color: #333;
}

.cta {
  padding: 120px 48px;
  text-align: center;
  background: linear-gradient(180deg, #0c0c0c 0%, #111 100%);
}

.cta h2 {
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.cta p {
  font-family: -apple-system, sans-serif;
  color: #666;
  margin-bottom: 48px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-gold-large {
  padding: 18px 40px;
  background: linear-gradient(135deg, #c9a962, #8b7355);
  color: #0c0c0c;
  text-decoration: none;
  font-family: -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.btn-outline {
  padding: 18px 40px;
  border: 1px solid #333;
  color: #888;
  text-decoration: none;
  font-family: -apple-system, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.footer {
  padding: 40px 48px;
  text-align: center;
}

.footer-line {
  width: 60px;
  height: 1px;
  background-color: #333;
  margin: 0 auto 24px;
}

.footer p {
  font-family: -apple-system, sans-serif;
  font-size: 12px;
  color: #444;
  letter-spacing: 1px;
}
</style>
