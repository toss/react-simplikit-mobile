<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Apple-inspired Home
 * - Massive typography
 * - Scroll-triggered effects
 * - Full viewport sections
 * - SF Pro font family
 */

const scrollY = ref(0);
const prefersReducedMotion = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = mediaQuery.matches;
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const getOpacity = (start: number, end: number) => {
  if (prefersReducedMotion.value) return 1;
  return Math.max(0, Math.min(1, 1 - (scrollY.value - start) / (end - start)));
};
</script>

<template>
  <div class="home-apple">
    <!-- Sticky Nav -->
    <nav class="nav" :class="{ scrolled: scrollY > 50 }">
      <span class="logo">simplikit</span>
      <div class="nav-links">
        <a href="#">Overview</a>
        <a href="/installation.html">Docs</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg" :style="{ opacity: getOpacity(0, 400) }"></div>
      <div class="hero-content" :style="{ opacity: getOpacity(0, 350) }">
        <p class="overline">@react-simplikit/mobile</p>
        <h1>
          Mobile.
          <br />
          <span class="muted">Redefined.</span>
        </h1>
        <p class="tagline">React hooks for the problems CSS can't solve.</p>
      </div>
      <div class="scroll-indicator" :style="{ opacity: getOpacity(0, 200) }">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="problem">
      <h2>
        Mobile keyboards
        <br />
        <span class="muted">break your layout.</span>
      </h2>
      <p>
        CSS 100vh ignores the keyboard. Your input disappears.
        <br />
        Position fixed breaks on iOS. Your modal jumps.
      </p>
    </section>

    <!-- Solution Section -->
    <section class="solution">
      <div class="solution-grid">
        <div class="solution-text">
          <h2>
            One hook.
            <br />
            <span class="accent">It just works.</span>
          </h2>
          <p>
            No configuration needed. No workarounds required.
            Works perfectly on iOS Safari, Android Chrome, and every browser in between.
          </p>
          <div class="install-pill">
            <code>npm i @react-simplikit/mobile</code>
          </div>
        </div>
        <div class="code-block">
          <div class="code-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
          </div>
          <pre class="code"><code><span class="keyword">import</span> &#123; useAvoidKeyboard &#125;
<span class="keyword">from</span> <span class="string">'@react-simplikit/mobile'</span>

<span class="keyword">function</span> <span class="function">ChatInput</span>() &#123;
  <span class="keyword">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()

  <span class="keyword">return</span> &lt;<span class="tag">div</span> style=&#123;&#123;...style&#125;&#125;&gt;...
&#125;</code></pre>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h2>All the hooks you need.</h2>
      <div class="features-grid">
        <div class="feature-tile">
          <span class="icon">⌨️</span>
          <h3>Keyboard Avoiding</h3>
          <p>Keep inputs visible above the keyboard.</p>
        </div>
        <div class="feature-tile">
          <span class="icon">📐</span>
          <h3>Visual Viewport</h3>
          <p>Track the actual visible area in real-time.</p>
        </div>
        <div class="feature-tile">
          <span class="icon">🔒</span>
          <h3>Scroll Locking</h3>
          <p>Lock background scroll for modals.</p>
        </div>
        <div class="feature-tile">
          <span class="icon">↕️</span>
          <h3>Scroll Direction</h3>
          <p>Detect scroll direction with debouncing.</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat">
        <span class="value">&lt;3KB</span>
        <span class="label">Gzipped</span>
      </div>
      <div class="stat">
        <span class="value">0</span>
        <span class="label">Dependencies</span>
      </div>
      <div class="stat">
        <span class="value">100%</span>
        <span class="label">TypeScript</span>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Get started.</h2>
      <p>Production-tested at Toss.</p>
      <div class="cta-buttons">
        <a href="/installation.html" class="btn-primary">Read the Docs</a>
        <a href="https://github.com/toss/react-simplikit" class="btn-link">View on GitHub →</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      Released under the MIT License
    </footer>
  </div>
</template>

<style scoped>
.home-apple {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
  overflow-x: hidden;
}

/* Nav */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 max(22px, env(safe-area-inset-left));
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.nav.scrolled {
  background-color: rgba(0, 0, 0, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
}

.logo {
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 32px;
  font-size: 12px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

/* Hero */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 24px;
  position: relative;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 60%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.overline {
  font-size: 21px;
  font-weight: 600;
  color: #bf5af2;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.hero h1 {
  font-size: clamp(56px, 12vw, 96px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -5px;
  margin-bottom: 16px;
}

.hero .muted {
  color: #86868b;
}

.tagline {
  font-size: clamp(19px, 2.5vw, 28px);
  color: #86868b;
  max-width: 500px;
  font-weight: 400;
  letter-spacing: -0.5px;
}

.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-mouse {
  width: 26px;
  height: 44px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 4px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  animation: scroll-bounce 1.5s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(6px); opacity: 0.4; }
}

/* Problem */
.problem {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px;
  text-align: center;
}

.problem h2 {
  font-size: clamp(40px, 7vw, 64px);
  font-weight: 700;
  letter-spacing: -3px;
  line-height: 1.1;
  margin-bottom: 24px;
}

.problem p {
  font-size: 21px;
  color: #86868b;
  max-width: 600px;
  line-height: 1.5;
  letter-spacing: -0.3px;
}

/* Solution */
.solution {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px;
  background-color: #0d0d0d;
}

.solution-grid {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

@media (max-width: 900px) {
  .solution-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.solution-text h2 {
  font-size: clamp(40px, 6vw, 56px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 20px;
}

.solution-text .accent {
  color: #bf5af2;
}

.solution-text p {
  font-size: 19px;
  color: #86868b;
  line-height: 1.5;
  margin-bottom: 32px;
  letter-spacing: -0.3px;
}

.install-pill {
  display: inline-flex;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 980px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.install-pill code {
  font-size: 15px;
  font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace;
  color: #f5f5f7;
}

.code-block {
  background-color: #1d1d1f;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.code-header {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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

.code {
  padding: 28px;
  margin: 0;
  font-size: 15px;
  line-height: 1.9;
  overflow: auto;
  font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace;
}

.code .keyword { color: #bf5af2; }
.code .string { color: #32d74b; }
.code .function { color: #ffd60a; }
.code .fn { color: #64d2ff; }
.code .tag { color: #64d2ff; }

/* Features */
.features {
  padding: 120px 24px;
  max-width: 1120px;
  margin: 0 auto;
}

.features h2 {
  font-size: clamp(40px, 6vw, 56px);
  font-weight: 700;
  letter-spacing: -2px;
  text-align: center;
  margin-bottom: 80px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-tile {
  padding: clamp(32px, 5vw, 56px);
  background-color: #161617;
  border-radius: 18px;
  transition: background-color 0.3s, transform 0.3s;
}

.feature-tile:hover {
  background-color: #1d1d1f;
  transform: scale(1.02);
}

.feature-tile .icon {
  font-size: 48px;
  display: block;
  margin-bottom: 20px;
}

.feature-tile h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.feature-tile p {
  color: #86868b;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: -0.3px;
}

/* Stats */
.stats {
  padding: 100px 24px;
  background-color: #0d0d0d;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: clamp(40px, 10vw, 120px);
  flex-wrap: wrap;
}

.stat .value {
  display: block;
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 700;
  letter-spacing: -3px;
  margin-bottom: 4px;
}

.stat .label {
  color: #86868b;
  font-size: 17px;
  letter-spacing: -0.3px;
}

/* CTA */
.cta {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 24px;
}

.cta h2 {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 700;
  letter-spacing: -4px;
  margin-bottom: 24px;
}

.cta p {
  font-size: 21px;
  color: #86868b;
  margin-bottom: 40px;
  letter-spacing: -0.3px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary {
  padding: 18px 32px;
  background-color: #0071e3;
  color: #fff;
  border-radius: 980px;
  text-decoration: none;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -0.3px;
}

.btn-link {
  padding: 18px 32px;
  color: #2997ff;
  text-decoration: none;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -0.3px;
}

/* Footer */
.footer {
  padding: 20px 24px;
  text-align: center;
  color: #6e6e73;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
