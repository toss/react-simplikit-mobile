<script setup lang="ts">
/**
 * Minimal Style Home
 * - Ultra clean with lots of whitespace
 * - Monochrome with single accent color
 * - Light theme
 */
</script>

<template>
  <div class="home-minimal">
    <!-- Header -->
    <header class="header">
      <div class="logo">simplikit</div>
      <nav class="nav">
        <a href="/installation.html">Docs</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <h1>Mobile hooks<br />that just work.</h1>
      <p>React hooks for keyboard, viewport, and scroll behaviors.</p>
      <div class="cta">
        <a href="/installation.html" class="btn-primary">Get Started</a>
        <code class="install">npm i @react-simplikit/mobile</code>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="feature">
        <h3>useAvoidKeyboard</h3>
        <p>Keep inputs visible above the keyboard.</p>
      </div>
      <div class="feature">
        <h3>useVisualViewport</h3>
        <p>Track the actual visible area.</p>
      </div>
      <div class="feature">
        <h3>useBodyScrollLock</h3>
        <p>Lock background scroll for modals.</p>
      </div>
      <div class="feature">
        <h3>useScrollDirection</h3>
        <p>Detect scroll direction.</p>
      </div>
    </section>

    <!-- Code -->
    <section class="code-section">
      <pre class="code"><code><span class="kw">import</span> &#123; useAvoidKeyboard &#125; <span class="kw">from</span> <span class="str">'@react-simplikit/mobile'</span>

<span class="kw">const</span> &#123; style &#125; = useAvoidKeyboard()

<span class="kw">return</span> &lt;div style=&#123;&#123;...style&#125;&#125;&gt;...&lt;/div&gt;</code></pre>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat">
        <span class="value">&lt;3KB</span>
        <span class="label">Size</span>
      </div>
      <div class="stat">
        <span class="value">0</span>
        <span class="label">Dependencies</span>
      </div>
      <div class="stat">
        <span class="value">TS</span>
        <span class="label">First</span>
      </div>
    </section>

    <!-- CTA -->
    <section class="final-cta">
      <h2>Ready?</h2>
      <a href="/installation.html" class="btn-primary">Read the Docs</a>
    </section>

    <!-- Footer -->
    <footer class="footer">
      MIT License · Toss
    </footer>
  </div>
</template>

<style scoped>
.home-minimal {
  min-height: 100vh;
  background-color: #fafafa;
  color: #111;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.header {
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.logo {
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 32px;
  font-size: 14px;
}

.nav a {
  color: #666;
  text-decoration: none;
}

.nav a:hover {
  color: #111;
}

.hero {
  padding: 120px 48px 80px;
  max-width: 700px;
  margin: 0 auto;
}

.hero h1 {
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
}

.hero p {
  font-size: 20px;
  color: #666;
  margin-bottom: 48px;
}

.cta {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 28px;
  background-color: #111;
  color: #fff;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
}

.install {
  padding: 14px 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: ui-monospace, monospace;
  color: #444;
}

.features {
  padding: 80px 48px;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

@media (max-width: 640px) {
  .features {
    grid-template-columns: 1fr;
  }
}

.feature h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: ui-monospace, monospace;
}

.feature p {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
}

.code-section {
  padding: 60px 48px;
  background-color: #f5f5f5;
}

.code {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.8;
  font-family: ui-monospace, monospace;
  overflow: auto;
}

.code .kw { color: #0070f3; }
.code .str { color: #067d17; }

.stats {
  padding: 80px 48px;
  display: flex;
  justify-content: center;
  gap: 80px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat .value {
  display: block;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -2px;
}

.stat .label {
  color: #888;
  font-size: 14px;
}

.final-cta {
  padding: 100px 48px;
  text-align: center;
  background-color: #111;
  color: #fff;
}

.final-cta h2 {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 32px;
  letter-spacing: -1px;
}

.final-cta .btn-primary {
  background-color: #fff;
  color: #111;
}

.footer {
  padding: 24px 48px;
  text-align: center;
  color: #888;
  font-size: 13px;
}
</style>
