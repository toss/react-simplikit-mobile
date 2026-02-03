import { defineConfig, DefaultTheme } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';
import { coreSourceRoot, mobileDocsRoot } from './shared.mts';

export const en = defineConfig({
  lang: 'en',
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: 'https://github.com/toss/react-simplikit/edit/main/:path',
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
    {
      text: 'Core',
      items: [
        { text: 'Hooks', link: '/core/hooks/useBooleanState' },
        { text: 'Components', link: '/core/components/ImpressionArea' },
        { text: 'Utils', link: '/core/utils/buildContext' },
      ],
    },
    {
      text: 'Mobile',
      items: [
        { text: 'Hooks', link: '/mobile/hooks/useAvoidKeyboard' },
      ],
    },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/intro' },
        { text: 'Installation', link: '/installation' },
      ],
    },
    {
      text: 'Core (react-simplikit)',
      collapsed: false,
      items: sortByText([
        {
          text: 'Components',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'components', '*'),
        },
        {
          text: 'Hooks',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'hooks', '*'),
        },
        {
          text: 'Utils',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'utils', '*'),
        },
      ]),
    },
    {
      text: 'Mobile (@react-simplikit/mobile)',
      collapsed: false,
      items: [
        {
          text: 'Hooks',
          collapsed: true,
          items: getSidebarItems(mobileDocsRoot, 'mobile', 'hooks'),
        },
      ],
    },
  ];
}
