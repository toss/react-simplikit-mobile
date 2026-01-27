<script setup lang="ts">
/**
 * Bento Grid Style Home (Linear.app inspired)
 * - Asymmetric grid layout
 * - Cards with subtle hover effects
 * - Dark theme with gradient accents
 */
</script>

<template>
  <div class="home-bento">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <div class="logo-icon">M</div>
        <span class="logo-text">simplikit</span>
      </div>
      <nav class="nav">
        <a href="/installation.html">Docs</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
        <a href="/installation.html" class="btn">Get Started</a>
      </nav>
    </header>

    <main class="main">
      <!-- Hero -->
      <section class="hero">
        <div class="badge">
          <span class="badge-dot"></span>
          Production-ready
        </div>
        <h1>
          Mobile web,
          <br />
          <span class="gradient">finally fixed.</span>
        </h1>
        <p>React hooks that solve the keyboard, viewport, and scroll problems that CSS can't.</p>
        <div class="install">
          <code>npm i @react-simplikit/mobile</code>
        </div>
      </section>

      <!-- Bento Grid -->
      <section class="bento">
        <!-- Main Card -->
        <div class="card main-card">
          <span class="card-label">Core Hook</span>
          <h3>useAvoidKeyboard</h3>
          <p>Keep your inputs visible when the mobile keyboard opens. No CSS hacks, no JavaScript timers.</p>
          <div class="phones">
            <div class="phone before">
              <div class="phone-screen">
                <div class="phone-notch"></div>
                <div class="phone-content"></div>
                <div class="phone-input error">Hidden!</div>
                <div class="phone-keyboard"></div>
              </div>
              <span class="phone-label error">Before</span>
            </div>
            <div class="phone after">
              <div class="phone-screen">
                <div class="phone-notch"></div>
                <div class="phone-content"></div>
                <div class="phone-input success">Type...</div>
                <div class="phone-keyboard"></div>
              </div>
              <span class="phone-label success">After</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="card stat-card">
          <span class="stat-value">&lt;3KB</span>
          <span class="stat-label">Gzipped size</span>
        </div>
        <div class="card stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Dependencies</span>
        </div>

        <!-- Feature Cards -->
        <div class="card feature-card cyan">
          <span class="feature-icon">📐</span>
          <h4>useVisualViewport</h4>
          <p>Track the actual visible area.</p>
        </div>
        <div class="card feature-card green">
          <span class="feature-icon">🔒</span>
          <h4>useBodyScrollLock</h4>
          <p>Lock background scroll for modals.</p>
        </div>

        <!-- Code Card -->
        <div class="card code-card">
          <pre><code><span class="kw">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()

<span class="kw">return</span> &lt;<span class="tag">div</span> style=&#123;&#123;...style&#125;&#125;&gt;...&lt;/&gt;</code></pre>
        </div>

        <!-- More Features -->
        <div class="card feature-card orange">
          <span class="feature-icon">↕️</span>
          <h4>useScrollDirection</h4>
          <p>Detect scroll direction.</p>
        </div>
        <div class="card stat-card ts">
          <span class="stat-value ts-label">TS</span>
          <span class="stat-label">100% TypeScript</span>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <h2>Ready to ship?</h2>
        <p>Get started in seconds. Production-tested at Toss.</p>
        <div class="cta-buttons">
          <a href="/installation.html" class="btn-primary">Read the Docs</a>
          <a href="https://github.com/toss/react-simplikit" class="btn-secondary">View on GitHub</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      Released under the MIT License. Production-tested at Toss.
    </footer>
  </div>
</template>

<style scoped>
.home-bento {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #fafafa;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header */
.header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #5b5cff, #9b59f4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.logo-text {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.3px;
}

.nav {
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 14px;
}

.nav a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
}

.btn {
  color: #0a0a0a !important;
  background-color: #fafafa;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
}

/* Main */
.main {
  padding: 60px 24px 100px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Hero */
.hero {
  margin-bottom: 60px;
  max-width: 700px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 10px;
  background: rgba(91, 92, 255, 0.1);
  border: 1px solid rgba(91, 92, 255, 0.2);
  border-radius: 100px;
  margin-bottom: 28px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.hero h1 {
  font-size: clamp(44px, 7vw, 72px);
  font-weight: 650;
  line-height: 1.05;
  margin-bottom: 20px;
  letter-spacing: -2px;
}

.gradient {
  background: linear-gradient(135deg, #5b5cff 0%, #9b59f4 50%, #e879f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin-bottom: 36px;
  max-width: 480px;
}

.install {
  display: inline-flex;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.install code {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-family: "JetBrains Mono", ui-monospace, monospace;
}

/* Bento Grid */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 12px;
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .bento {
    grid-template-columns: 1fr;
  }
}

.card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Main Card */
.main-card {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg, rgba(91, 92, 255, 0.15) 0%, rgba(155, 89, 244, 0.1) 100%);
}

.card-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #9b59f4;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.main-card h3 {
  font-size: 26px;
  font-weight: 650;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.main-card p {
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 24px;
}

/* Phones */
.phones {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.phone-screen {
  width: 72px;
  height: 130px;
  background: #0f0f0f;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}

.before .phone-screen {
  border: 2px solid rgba(239, 68, 68, 0.5);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.15);
}

.after .phone-screen {
  border: 2px solid rgba(34, 197, 94, 0.5);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.15);
}

.phone-notch {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 10px;
  background: #000;
  border-radius: 10px;
}

.phone-content {
  position: absolute;
  top: 24px;
  left: 8px;
  right: 8px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.phone-input {
  position: absolute;
  left: 6px;
  right: 6px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-size: 8px;
}

.phone-input.error {
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  color: #ef4444;
}

.phone-input.success {
  bottom: 52%;
  background: #5b5cff;
  color: #fff;
}

.phone-keyboard {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: #1a1a1a;
}

.phone-label {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 500;
}

.phone-label.error { color: #ef4444; }
.phone-label.success { color: #22c55e; }

/* Stat Cards */
.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-value {
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #fafafa 0%, rgba(255, 255, 255, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.ts-label {
  color: #3178c6 !important;
  -webkit-text-fill-color: #3178c6 !important;
  font-size: 28px !important;
}

/* Feature Cards */
.feature-card {
  padding: 24px;
}

.feature-card.cyan {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);
}

.feature-card.green {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%);
}

.feature-card.orange {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 146, 60, 0.1) 100%);
}

.feature-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 14px;
}

.feature-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
}

/* Code Card */
.code-card {
  grid-column: span 2;
}

.code-card pre {
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  color: rgba(255, 255, 255, 0.85);
}

.code-card .kw { color: #c084fc; }
.code-card .fn { color: #5b5cff; }
.code-card .tag { color: #22d3ee; }

/* CTA */
.cta {
  margin-top: 80px;
  padding: 56px 40px;
  background: linear-gradient(135deg, rgba(91, 92, 255, 0.1) 0%, rgba(155, 89, 244, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}

.cta h2 {
  font-size: 32px;
  font-weight: 650;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.cta p {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 28px;
}

.cta-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 28px;
  background: linear-gradient(135deg, #5b5cff, #9b59f4);
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.btn-secondary {
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Footer */
.footer {
  padding: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
