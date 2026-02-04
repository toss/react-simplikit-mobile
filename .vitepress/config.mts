import { defineConfig } from 'vitepress';
import { en } from './en.mts';
import { ko, search as koSearch } from './ko.mts';

export default defineConfig({
  title: 'react-simplikit',
  locales: {
    root: { label: 'English', ...en },
    ko: { label: '한국어', ...ko },
  },
  srcDir: 'docs',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://static.toss.im/tps/main.css' }],
    ['link', { rel: 'stylesheet', href: 'https://static.toss.im/tps/others.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  ],
  themeConfig: {
    logo: '/images/logo.svg',
    search: {
      provider: 'local',
      options: { locales: { ...koSearch } },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/toss/react-simplikit' },
    ],
  },
});
