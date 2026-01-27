import { defineConfig, DefaultTheme } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';
import { sourceRoot } from './shared.mts';

export const en = defineConfig({
  lang: 'en',
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: 'https://github.com/toss/react-simplikit/edit/main/src/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Installation', link: '/installation' },
    { text: 'API Reference', link: '/hooks/useAvoidKeyboard' },
    { text: 'Playground', link: '/playground/' },
    { text: 'Experiments', link: '/experiments' },
    { text: 'Core', link: '/core/' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    '/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Playground', link: '/playground/' },
          { text: 'Experiments', link: '/experiments/' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useAvoidKeyboard', link: '/hooks/useAvoidKeyboard' },
          { text: 'useKeyboardHeight', link: '/hooks/useKeyboardHeight' },
          { text: 'useVisualViewport', link: '/hooks/useVisualViewport' },
          { text: 'useScrollDirection', link: '/hooks/useScrollDirection' },
          { text: 'useBodyScrollLock', link: '/hooks/useBodyScrollLock' },
          { text: 'useBatteryStatus', link: '/hooks/useBatteryStatus' },
        ],
      },
      {
        text: 'Utilities',
        items: [
          { text: 'getKeyboardHeight', link: '/utils/getKeyboardHeight' },
          { text: 'isKeyboardVisible', link: '/utils/isKeyboardVisible' },
          { text: 'bodyScrollLock', link: '/utils/bodyScrollLock' },
          { text: 'isServer', link: '/utils/isServer' },
        ],
      },
    ],
    '/experiments/': [
      {
        text: 'Landing Experiments',
        items: [
          { text: 'Overview', link: '/experiments/' },
        ],
      },
      {
        text: 'Modern Styles',
        items: [
          { text: 'Bento Grid', link: '/experiments/bento' },
          { text: 'Gradient Orb', link: '/experiments/gradient-orb' },
          { text: 'Apple', link: '/experiments/apple' },
        ],
      },
      {
        text: 'Classic Styles',
        items: [
          { text: 'Minimal', link: '/experiments/minimal' },
          { text: 'Premium', link: '/experiments/premium' },
          { text: 'Developer', link: '/experiments/developer' },
          { text: 'Foundation', link: '/experiments/foundation' },
          { text: 'Dark Modern', link: '/experiments/dark-modern' },
          { text: 'Claude Code', link: '/experiments/claude-code' },
        ],
      },
    ],
    '/core/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/core/intro' },
          { text: 'Why react-simplikit matters', link: '/core/why-react-simplikit-matters' },
          { text: 'Installation', link: '/core/installation' },
          { text: 'Design Principles', link: '/core/design-principles' },
          { text: 'Contributing', link: '/core/contributing' },
        ],
      },
      {
        text: 'Reference',
        items: sortByText([
          {
            text: 'Components',
            items: getSidebarItems(sourceRoot, 'components', '*').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
          {
            text: 'Hooks',
            items: getSidebarItems(sourceRoot, 'hooks', '*').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
          {
            text: 'Utils',
            items: getSidebarItems(sourceRoot, 'utils', '*').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
        ]),
      },
    ],
  };
}
