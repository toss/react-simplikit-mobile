import { defineConfig, DefaultTheme } from 'vitepress';
import { docsRoot } from './shared.mts';
import glob from 'fast-glob';
import path from 'path';

export const en = defineConfig({
  lang: 'en',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Mobile', link: '/mobile/' },
      { text: 'Core', link: '/core/' },
    ],
    sidebar: {
      '/core/': coreSidebar(),
      '/mobile/': mobileSidebar(),
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function coreSidebar(): DefaultTheme.SidebarItem[] {
  return [
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
    { text: 'Components', collapsed: false, items: getItems('core/components') },
    { text: 'Hooks', collapsed: false, items: getItems('core/hooks') },
    { text: 'Utils', collapsed: false, items: getItems('core/utils') },
  ];
}

function mobileSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/mobile/intro' },
      ],
    },
    { text: 'Hooks', collapsed: false, items: getItems('mobile/hooks') },
  ];
}

function getItems(subPath: string): DefaultTheme.SidebarItem[] {
  const files = glob.sync(path.join(docsRoot, subPath, '*.md'));
  return files.map(file => {
    const name = path.basename(file, '.md');
    return { text: name, link: `/${subPath}/${name}` };
  }).sort((a, b) => a.text.localeCompare(b.text));
}
