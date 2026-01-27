<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Developer Style Home
 * - Terminal/hacker aesthetic
 * - Monospace everything
 * - Green on black
 */

const time = ref('');

const updateTime = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString('en-US', { hour12: false });
};

let interval: number;

onMounted(() => {
  updateTime();
  interval = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="home-developer">
    <!-- Terminal Header -->
    <header class="terminal-header">
      <span class="prompt">~/react-simplikit/mobile</span>
      <span class="time">{{ time }}</span>
    </header>

    <!-- Main Content -->
    <main class="terminal-body">
      <div class="line">
        <span class="prompt-symbol">$</span>
        <span class="command">cat README.md</span>
      </div>

      <div class="output">
        <pre class="ascii">
 _____ _                 _ _ _    _ _
/  ___(_)               | (_) |  (_) |
\ `--. _ _ __ ___  _ __ | |_| | ___| |_
 `--. \ | '_ ` _ \| '_ \| | | |/ / | __|
/\__/ / | | | | | | |_) | | |   &lt;| | |_
\____/|_|_| |_| |_| .__/|_|_|_|\_\_|\__|
                  | |
                  |_|   /mobile
        </pre>
      </div>

      <div class="section">
        <div class="line">
          <span class="comment"># React hooks for mobile web</span>
        </div>
        <br />
        <div class="line">
          <span class="key">description</span><span class="colon">:</span>
          <span class="value">Production-tested hooks for keyboard, viewport, scroll</span>
        </div>
        <div class="line">
          <span class="key">size</span><span class="colon">:</span>
          <span class="value-number">&lt;3KB</span>
          <span class="comment"># gzipped</span>
        </div>
        <div class="line">
          <span class="key">dependencies</span><span class="colon">:</span>
          <span class="value-number">0</span>
        </div>
        <div class="line">
          <span class="key">typescript</span><span class="colon">:</span>
          <span class="value-bool">true</span>
        </div>
        <div class="line">
          <span class="key">ssr_safe</span><span class="colon">:</span>
          <span class="value-bool">true</span>
        </div>
      </div>

      <br />

      <div class="line">
        <span class="prompt-symbol">$</span>
        <span class="command">npm install @react-simplikit/mobile</span>
      </div>
      <div class="output install-output">
        <span class="success">✓</span> added 1 package in 0.8s
      </div>

      <br />

      <div class="line">
        <span class="prompt-symbol">$</span>
        <span class="command">cat example.tsx</span>
      </div>

      <div class="code-block">
        <div class="code-line">
          <span class="line-num">1</span>
          <span class="kw">import</span> &#123; useAvoidKeyboard &#125; <span class="kw">from</span> <span class="str">'@react-simplikit/mobile'</span>
        </div>
        <div class="code-line">
          <span class="line-num">2</span>
        </div>
        <div class="code-line">
          <span class="line-num">3</span>
          <span class="kw">function</span> <span class="fn">ChatInput</span>() &#123;
        </div>
        <div class="code-line">
          <span class="line-num">4</span>
          <span class="indent"></span><span class="kw">const</span> &#123; style &#125; = <span class="fn">useAvoidKeyboard</span>()
        </div>
        <div class="code-line">
          <span class="line-num">5</span>
        </div>
        <div class="code-line">
          <span class="line-num">6</span>
          <span class="indent"></span><span class="kw">return</span> &lt;<span class="tag">div</span> style=&#123;&#123;...style&#125;&#125;&gt;...&lt;/<span class="tag">div</span>&gt;
        </div>
        <div class="code-line">
          <span class="line-num">7</span>
          &#125;
        </div>
      </div>

      <br />

      <div class="line">
        <span class="prompt-symbol">$</span>
        <span class="command">ls hooks/</span>
      </div>
      <div class="output file-list">
        <span class="file">useAvoidKeyboard.ts</span>
        <span class="file">useVisualViewport.ts</span>
        <span class="file">useBodyScrollLock.ts</span>
        <span class="file">useScrollDirection.ts</span>
        <span class="file">useKeyboardHeight.ts</span>
      </div>

      <br />

      <div class="line">
        <span class="prompt-symbol">$</span>
        <span class="command">open <a href="/installation.html" class="link">https://docs.simplikit.dev</a></span>
      </div>

      <div class="line cursor-line">
        <span class="prompt-symbol">$</span>
        <span class="cursor">_</span>
      </div>
    </main>

    <!-- Footer -->
    <footer class="terminal-footer">
      <span>MIT License</span>
      <span>·</span>
      <span>Toss</span>
      <span>·</span>
      <a href="https://github.com/toss/react-simplikit">GitHub</a>
    </footer>
  </div>
</template>

<style scoped>
.home-developer {
  min-height: 100vh;
  background-color: #0d1117;
  color: #c9d1d9;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace;
  font-size: 14px;
  line-height: 1.6;
}

.terminal-header {
  padding: 12px 24px;
  background-color: #161b22;
  border-bottom: 1px solid #30363d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prompt {
  color: #58a6ff;
}

.time {
  color: #484f58;
}

.terminal-body {
  padding: 32px 24px;
  max-width: 800px;
  margin: 0 auto;
}

.line {
  margin-bottom: 8px;
}

.prompt-symbol {
  color: #3fb950;
  margin-right: 12px;
}

.command {
  color: #f0f6fc;
}

.comment {
  color: #484f58;
}

.output {
  margin: 16px 0;
  padding-left: 24px;
}

.ascii {
  color: #3fb950;
  font-size: 10px;
  line-height: 1.2;
  margin: 0;
}

.section {
  margin: 24px 0;
  padding-left: 24px;
}

.key {
  color: #ff7b72;
}

.colon {
  color: #c9d1d9;
  margin: 0 8px;
}

.value {
  color: #a5d6ff;
}

.value-number {
  color: #79c0ff;
}

.value-bool {
  color: #3fb950;
}

.install-output {
  color: #3fb950;
}

.success {
  margin-right: 8px;
}

.code-block {
  margin: 16px 0;
  padding: 16px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
}

.code-line {
  display: flex;
  align-items: center;
  min-height: 24px;
}

.line-num {
  width: 24px;
  color: #484f58;
  text-align: right;
  margin-right: 16px;
  user-select: none;
}

.indent {
  width: 24px;
  display: inline-block;
}

.kw {
  color: #ff7b72;
}

.str {
  color: #a5d6ff;
}

.fn {
  color: #d2a8ff;
}

.tag {
  color: #7ee787;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.file {
  color: #58a6ff;
}

.link {
  color: #58a6ff;
  text-decoration: underline;
}

.cursor-line {
  margin-top: 24px;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: #3fb950;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-footer {
  padding: 16px 24px;
  border-top: 1px solid #30363d;
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #484f58;
  font-size: 12px;
}

.terminal-footer a {
  color: #58a6ff;
  text-decoration: none;
}
</style>
