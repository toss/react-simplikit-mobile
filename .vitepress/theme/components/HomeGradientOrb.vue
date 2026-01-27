<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Gradient Orb Style Home (Vercel/Linear inspired)
 * - Floating gradient orbs with blur
 * - Glassmorphism cards
 * - Mouse-tracking effects
 */

const mousePos = ref({ x: 0.5, y: 0.5 });

const handleMouseMove = (e: MouseEvent) => {
  mousePos.value = {
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
  };
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div class="home-gradient-orb">
    <!-- Noise Overlay -->
    <div class="noise"></div>

    <!-- Gradient Orbs -->
    <div
      class="orb orb-1"
      :style="{
        top: `calc(${mousePos.y * 30}% - 200px)`,
        left: `calc(${mousePos.x * 30}% - 200px)`,
      }"
    ></div>
    <div
      class="orb orb-2"
      :style="{
        bottom: `calc(${(1 - mousePos.y) * 20}% - 100px)`,
        right: `calc(${(1 - mousePos.x) * 20}% - 100px)`,
      }"
    ></div>
    <div class="orb orb-3"></div>

    <!-- Content -->
    <div class="content">
      <!-- Header -->
      <header class="header">
        <div class="logo">
          <span class="at">@</span>react-simplikit/mobile
        </div>
        <nav class="nav">
          <a href="#">Features</a>
          <a href="/installation.html">Docs</a>
          <a href="https://github.com/toss/react-simplikit">GitHub</a>
          <a href="/installation.html" class="btn-glass">Get Started</a>
        </nav>
      </header>

      <!-- Hero -->
      <section class="hero">
        <div class="badge">
          <span class="badge-new">NEW</span>
          <span class="badge-text">v1.0 is now available</span>
          <span class="badge-arrow">→</span>
        </div>

        <h1>
          The hooks
          <br />
          <span class="gradient-text">mobile needs</span>
        </h1>

        <p>
          Production-tested React hooks for keyboard avoiding, viewport tracking, and scroll behaviors.
          Because CSS 100vh is still broken.
        </p>

        <div class="install-glass">
          <code><span class="dollar">$</span> npm install @react-simplikit/mobile</code>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="value">&lt;3KB</span>
            <span class="label">Bundle size</span>
          </div>
          <div class="stat">
            <span class="value">0</span>
            <span class="label">Dependencies</span>
          </div>
          <div class="stat">
            <span class="value">100%</span>
            <span class="label">TypeScript</span>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features">
        <div class="features-grid">
          <div class="glass-card">
            <div class="card-icon cyan">⌨️</div>
            <h3>Keyboard Avoiding</h3>
            <p>Keep inputs visible above the keyboard. Works on iOS Safari, Android Chrome, and everything in between.</p>
          </div>
          <div class="glass-card">
            <div class="card-icon pink">📐</div>
            <h3>Visual Viewport</h3>
            <p>Track the actual visible area in real-time. Perfect for positioning floating elements.</p>
          </div>
          <div class="glass-card">
            <div class="card-icon cyan">🔒</div>
            <h3>Scroll Locking</h3>
            <p>Lock background scroll when modals open. No scroll bleed, no body jumping.</p>
          </div>
          <div class="glass-card">
            <div class="card-icon orange">↕️</div>
            <h3>Scroll Direction</h3>
            <p>Detect scroll direction with debouncing. Auto-hide navigation bars on scroll down.</p>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="code-section">
        <div class="code-glass">
          <div class="code-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="filename">ChatInput.tsx</span>
          </div>
          <pre class="code"><code><span class="keyword">import</span> &#123; useAvoidKeyboard &#125; <span class="keyword">from</span> <span class="string">'@react-simplikit/mobile'</span>

<span class="keyword">function</span> <span class="function">ChatInput</span>() &#123;
  <span class="keyword">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()

  <span class="keyword">return</span> (
    &lt;<span class="tag">div</span> style=&#123;&#123; ...style &#125;&#125;&gt;...&lt;/<span class="tag">div</span>&gt;
  )
&#125;</code></pre>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <h2>Ready to ship?</h2>
        <p>Production-tested at Toss. Zero dependencies.</p>
        <div class="cta-buttons">
          <a href="/installation.html" class="btn-gradient">Get Started</a>
          <a href="https://github.com/toss/react-simplikit" class="btn-glass-outline">View on GitHub</a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        Released under the MIT License
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home-gradient-orb {
  min-height: 100vh;
  background-color: #050505;
  color: #fafafa;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Noise */
.noise {
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* Orbs */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  transition: top 0.8s ease-out, left 0.8s ease-out, bottom 0.8s ease-out, right 0.8s ease-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%);
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%);
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Content */
.content {
  position: relative;
  z-index: 2;
}

/* Header */
.header {
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-weight: 700;
  font-size: 18px;
}

.at {
  color: #6366f1;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 14px;
}

.nav a {
  color: #888;
  text-decoration: none;
}

.nav a:hover {
  color: #fff;
}

.btn-glass {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff !important;
  font-weight: 500;
}

/* Hero */
.hero {
  padding: 140px 40px 100px;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  margin-bottom: 40px;
  font-size: 14px;
}

.badge-new {
  padding: 4px 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
}

.badge-text {
  color: #aaa;
}

.badge-arrow {
  color: #6366f1;
}

.hero h1 {
  font-size: clamp(48px, 9vw, 88px);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 32px;
  letter-spacing: -4px;
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%);
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
  font-size: 20px;
  color: #888;
  line-height: 1.7;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.install-glass {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-bottom: 32px;
}

.install-glass code {
  font-size: 16px;
  color: #e5e5e5;
  font-family: ui-monospace, monospace;
}

.dollar {
  color: #6366f1;
}

.stats {
  display: flex;
  gap: 48px;
  justify-content: center;
  margin-top: 60px;
}

.stat .value {
  display: block;
  font-size: 40px;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat .label {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

/* Features */
.features {
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.glass-card {
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: background 0.3s, transform 0.3s;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.card-icon.cyan { background: rgba(99, 102, 241, 0.15); }
.card-icon.pink { background: rgba(236, 72, 153, 0.15); }
.card-icon.orange { background: rgba(245, 158, 11, 0.15); }

.glass-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.glass-card p {
  color: #888;
  line-height: 1.7;
  font-size: 15px;
}

/* Code Section */
.code-section {
  padding: 60px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.code-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.code-header {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background-color: #ff5f57; }
.dot.yellow { background-color: #febc2e; }
.dot.green { background-color: #28c840; }

.filename {
  color: #666;
  font-size: 13px;
}

.code {
  padding: 32px;
  margin: 0;
  font-size: 15px;
  line-height: 1.9;
  overflow: auto;
  font-family: ui-monospace, monospace;
}

.code .keyword { color: #c084fc; }
.code .string { color: #86efac; }
.code .function { color: #fbbf24; }
.code .fn { color: #6366f1; }
.code .tag { color: #22d3ee; }

/* CTA */
.cta {
  padding: 100px 40px;
  text-align: center;
}

.cta h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -2px;
}

.cta p {
  color: #888;
  margin-bottom: 40px;
  font-size: 18px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-gradient {
  padding: 16px 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
}

.btn-glass-outline {
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
}

/* Footer */
.footer {
  padding: 40px;
  text-align: center;
  color: #444;
  font-size: 14px;
}
</style>
