<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Claude Code Style Home
 * - Dark theme (Gray-950)
 * - Animated status symbols
 * - Rotating words
 * - OS-aware install command
 * - Comparison section
 */

const STATUS_SYMBOLS = ['◈', '◓', '✽', '◐', '○'];
const ROTATING_WORDS = ['developers', 'teams', 'startups', 'enterprises'];

const symbolIndex = ref(0);
const wordIndex = ref(0);
const isMac = ref(true);
const copied = ref(false);

let symbolInterval: number;
let wordInterval: number;

onMounted(() => {
  isMac.value = navigator.platform.toLowerCase().includes('mac');

  symbolInterval = window.setInterval(() => {
    symbolIndex.value = (symbolIndex.value + 1) % STATUS_SYMBOLS.length;
  }, 1000);

  wordInterval = window.setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % ROTATING_WORDS.length;
  }, 2500);
});

onUnmounted(() => {
  clearInterval(symbolInterval);
  clearInterval(wordInterval);
});

const installCommand = 'npm install @react-simplikit/mobile';

const handleCopy = async () => {
  await navigator.clipboard.writeText(installCommand);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="home-claude-code">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <span class="symbol">{{ STATUS_SYMBOLS[symbolIndex] }}</span>
        <span class="name">@react-simplikit/mobile</span>
      </div>
      <nav class="nav">
        <a href="/installation.html">Docs</a>
        <a href="https://github.com/toss/react-simplikit">GitHub</a>
        <a href="/installation.html" class="btn-primary">Get Started</a>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h1 class="headline">
        Mobile hooks for
        <span class="rotating-word">{{ ROTATING_WORDS[wordIndex] }}</span>
      </h1>

      <p class="subheadline">
        Production-tested React hooks that handle keyboard, viewport, and scroll behaviors.
        Built for the problems CSS can't solve.
      </p>

      <!-- Install Command -->
      <div class="install-card">
        <div class="install-header">
          <div class="os-tabs">
            <button :class="{ active: isMac }" @click="isMac = true">macOS</button>
            <button :class="{ active: !isMac }" @click="isMac = false">Windows</button>
          </div>
          <button class="copy-btn" @click="handleCopy">
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <code class="install-command">
          <span class="dollar">$</span> {{ installCommand }}
        </code>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-buttons">
        <a href="/installation.html" class="btn-primary-large">Read the Docs</a>
        <a href="https://github.com/toss/react-simplikit" class="btn-secondary-large">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="comparison">
      <h2>
        <span class="muted">CSS handles viewport.</span>
        <br />
        SimpliKit handles <span class="accent">reality</span>.
      </h2>
      <p>100vh doesn't account for keyboard. Position fixed breaks on iOS. We solved it.</p>
    </section>

    <!-- Visual Demo -->
    <section class="demo">
      <div class="demo-grid">
        <!-- Before -->
        <div class="demo-card error">
          <div class="demo-label">
            <span class="dot error"></span>
            Without SimpliKit
          </div>
          <div class="phone">
            <div class="phone-notch"></div>
            <div class="phone-content">
              <div class="content-line"></div>
              <div class="content-line short"></div>
            </div>
            <div class="phone-input hidden">Input hidden!</div>
            <div class="phone-keyboard"></div>
          </div>
          <p>Input disappears behind keyboard</p>
        </div>

        <!-- After -->
        <div class="demo-card success">
          <div class="demo-label">
            <span class="dot success"></span>
            With SimpliKit
          </div>
          <div class="phone">
            <div class="phone-notch"></div>
            <div class="phone-content">
              <div class="content-line"></div>
            </div>
            <div class="phone-input visible">Type here...</div>
            <div class="phone-keyboard"></div>
          </div>
          <p>Input stays visible automatically</p>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="code-section">
      <div class="code-window">
        <div class="window-controls">
          <div class="control red"></div>
          <div class="control yellow"></div>
          <div class="control green"></div>
        </div>
        <span class="filename">ChatInput.tsx</span>
        <pre class="code"><code><span class="keyword">import</span> &#123; useAvoidKeyboard &#125; <span class="keyword">from</span> <span class="string">'@react-simplikit/mobile'</span>

<span class="keyword">function</span> <span class="function">ChatInput</span>() &#123;
  <span class="keyword">const</span> &#123; style &#125; = <span class="fn-call">useAvoidKeyboard</span>()

  <span class="keyword">return</span> (
    &lt;<span class="tag">div</span> style=&#123;&#123; position: <span class="string">'fixed'</span>, bottom: 0, ...style &#125;&#125;&gt;
      &lt;<span class="tag">input</span> placeholder=<span class="string">"Type a message..."</span> /&gt;
    &lt;/<span class="tag">div</span>&gt;
  )
&#125;</code></pre>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h2>Everything mobile needs.</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">◈</span>
          <h3>useAvoidKeyboard</h3>
          <p>Keep inputs visible when the keyboard opens. Works on iOS Safari and Android.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">◓</span>
          <h3>useVisualViewport</h3>
          <p>Track the actual visible area in real-time. Perfect for floating elements.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">✽</span>
          <h3>useBodyScrollLock</h3>
          <p>Lock background scroll for modals. No iOS Safari rubber-banding bugs.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">◐</span>
          <h3>useScrollDirection</h3>
          <p>Detect scroll direction with debouncing. Auto-hide navigation on scroll.</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat">
        <span class="value">&lt;3KB</span>
        <span class="label">Gzipped size</span>
      </div>
      <div class="stat">
        <span class="value">0</span>
        <span class="label">Dependencies</span>
      </div>
      <div class="stat">
        <span class="value">100%</span>
        <span class="label">TypeScript</span>
      </div>
      <div class="stat">
        <span class="value">SSR</span>
        <span class="label">Ready</span>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <h2>Ready to ship?</h2>
      <p>Production-tested at Toss. Zero dependencies. TypeScript first.</p>
      <div class="cta-buttons">
        <a href="/installation.html" class="btn-primary-large">Get Started</a>
        <a href="https://github.com/toss/react-simplikit" class="btn-secondary-large">View on GitHub</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      Released under the MIT License. Production-tested at Toss.
    </footer>
  </div>
</template>

<style scoped>
.home-claude-code {
  min-height: 100vh;
  background-color: rgb(10, 10, 11);
  color: rgb(250, 250, 250);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header */
.header {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
}

.symbol {
  font-size: 18px;
  color: #da7756;
  transition: transform 0.3s ease;
}

.name {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.3px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
}

.nav a {
  color: rgb(115, 115, 115);
  text-decoration: none;
}

.nav a:hover {
  color: rgb(250, 250, 250);
}

.btn-primary {
  padding: 8px 16px;
  background-color: rgb(250, 250, 250);
  color: rgb(10, 10, 11);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
}

/* Hero */
.hero {
  padding: 100px 24px 80px;
  max-width: 900px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 24px;
}

.rotating-word {
  color: #da7756;
  display: inline-block;
  min-width: 200px;
  transition: opacity 0.3s ease;
}

.subheadline {
  font-size: 20px;
  color: rgb(115, 115, 115);
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 560px;
}

/* Install Card */
.install-card {
  background-color: rgb(20, 20, 21);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px;
  margin-bottom: 40px;
  max-width: 480px;
}

.install-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.os-tabs {
  display: flex;
  gap: 8px;
}

.os-tabs button {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: rgb(82, 82, 82);
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
}

.os-tabs button.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.copy-btn {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgb(163, 163, 163);
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.install-command {
  display: block;
  font-size: 15px;
  color: rgb(229, 229, 229);
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
}

.dollar {
  color: rgb(115, 115, 115);
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary-large {
  padding: 14px 28px;
  background-color: rgb(250, 250, 250);
  color: rgb(10, 10, 11);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.btn-secondary-large {
  padding: 14px 28px;
  background-color: transparent;
  color: rgb(250, 250, 250);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Comparison */
.comparison {
  padding: 80px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background-color: rgb(15, 15, 16);
  text-align: center;
}

.comparison h2 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.comparison .muted {
  color: rgb(115, 115, 115);
}

.comparison .accent {
  color: #da7756;
}

.comparison p {
  font-size: 18px;
  color: rgb(115, 115, 115);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Demo */
.demo {
  padding: 80px 24px;
  max-width: 900px;
  margin: 0 auto;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.demo-card {
  background-color: rgb(20, 20, 21);
  border-radius: 20px;
  padding: 32px;
}

.demo-card.error {
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.demo-card.success {
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.demo-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  color: rgb(163, 163, 163);
  font-weight: 500;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.error {
  background-color: #ef4444;
}

.dot.success {
  background-color: #22c55e;
}

.phone {
  width: 100%;
  max-width: 200px;
  aspect-ratio: 9/16;
  background-color: rgb(10, 10, 11);
  border-radius: 24px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 3px solid rgb(38, 38, 38);
}

.phone-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 20px;
  background: #000;
  border-radius: 10px;
}

.phone-content {
  padding: 40px 12px 12px;
}

.content-line {
  height: 8px;
  background-color: rgb(38, 38, 38);
  border-radius: 4px;
  margin-bottom: 8px;
  width: 80%;
}

.content-line.short {
  width: 60%;
}

.phone-input {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 10px;
}

.phone-input.hidden {
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  color: #ef4444;
}

.phone-input.visible {
  bottom: 52%;
  background: #da7756;
  color: #fff;
}

.phone-keyboard {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background-color: rgb(38, 38, 38);
}

.demo-card p {
  text-align: center;
  margin-top: 20px;
  color: rgb(115, 115, 115);
  font-size: 14px;
}

/* Code Section */
.code-section {
  padding: 60px 24px;
  background-color: rgb(15, 15, 16);
  max-width: 700px;
  margin: 0 auto;
}

.code-window {
  background-color: rgb(20, 20, 21);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.window-controls {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red { background-color: #ff5f57; }
.control.yellow { background-color: #febc2e; }
.control.green { background-color: #28c840; }

.filename {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(82, 82, 82);
  font-size: 13px;
  font-family: ui-monospace, monospace;
}

.code {
  padding: 28px;
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
}

.code .keyword { color: #c084fc; }
.code .string { color: #86efac; }
.code .function { color: #fbbf24; }
.code .fn-call { color: #da7756; }
.code .tag { color: #22d3ee; }

/* Features */
.features {
  padding: 80px 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.features h2 {
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
  letter-spacing: -1px;
  text-align: center;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-card {
  padding: 28px;
  background-color: rgb(20, 20, 21);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.feature-card:hover {
  background-color: rgb(25, 25, 26);
  transform: translateY(-2px);
}

.feature-icon {
  color: #da7756;
  font-size: 22px;
  display: block;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: ui-monospace, monospace;
}

.feature-card p {
  font-size: 14px;
  color: rgb(115, 115, 115);
  line-height: 1.6;
}

/* Stats */
.stats {
  padding: 60px 24px;
  background-color: rgb(15, 15, 16);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 4px;
}

.stat .label {
  color: rgb(115, 115, 115);
  font-size: 14px;
}

/* Final CTA */
.final-cta {
  padding: 100px 24px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.final-cta h2 {
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 20px;
}

.final-cta p {
  font-size: 18px;
  color: rgb(115, 115, 115);
  margin-bottom: 40px;
}

.final-cta .cta-buttons {
  justify-content: center;
}

/* Footer */
.footer {
  padding: 32px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
  color: rgb(82, 82, 82);
  font-size: 13px;
}
</style>
