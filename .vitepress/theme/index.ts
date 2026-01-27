// https://vitepress.dev/guide/custom-theme
import './style.css';

import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import Interface from '../components/Interface.vue';
import SplitView from '../components/SplitView.vue';

// Custom home components for landing page experiments
import HomeClaudeCode from './components/HomeClaudeCode.vue';
import HomeApple from './components/HomeApple.vue';
import HomeBento from './components/HomeBento.vue';
import HomeGradientOrb from './components/HomeGradientOrb.vue';
import HomeMinimal from './components/HomeMinimal.vue';
import HomePremium from './components/HomePremium.vue';
import HomeDeveloper from './components/HomeDeveloper.vue';
import HomeFoundation from './components/HomeFoundation.vue';
import HomeDarkModern from './components/HomeDarkModern.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    app.component('Interface', Interface);
    app.component('SplitView', SplitView);

    // Register home components
    app.component('HomeClaudeCode', HomeClaudeCode);
    app.component('HomeApple', HomeApple);
    app.component('HomeBento', HomeBento);
    app.component('HomeGradientOrb', HomeGradientOrb);
    app.component('HomeMinimal', HomeMinimal);
    app.component('HomePremium', HomePremium);
    app.component('HomeDeveloper', HomeDeveloper);
    app.component('HomeFoundation', HomeFoundation);
    app.component('HomeDarkModern', HomeDarkModern);
  },
} satisfies Theme;
