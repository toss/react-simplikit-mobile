import { defineConfig, HeadConfig } from 'vitepress';
import { en } from './en.mts';
import { ko, search as koSearch } from './ko.mts';

export default defineConfig({
  title: '@react-simplikit/mobile',
  locales: {
    root: { label: 'English', ...en },
    ko: { label: '한국어', ...ko },
  },
  srcDir: 'src',
  rewrites: {
    // Mobile as root (main focus)
    'mobile/docs/en/index.md': 'index.md',
    'mobile/docs/en/:document.md': ':document.md',
    'mobile/docs/en/experiments/:experiment.md': 'experiments/:experiment.md',
    'mobile/docs/ko/index.md': 'ko/index.md',
    'mobile/docs/ko/:document.md': 'ko/:document.md',
    'mobile/docs/ko/experiments/:experiment.md': 'ko/experiments/:experiment.md',
    'mobile/hooks/:implementation/ko/:implementation.md': 'ko/hooks/:implementation.md',
    'mobile/hooks/:implementation/:implementation.md': 'hooks/:implementation.md',
    // Legacy react-simplikit docs (under /core)
    'docs/ko/:document.md': 'core/ko/:document.md',
    'docs/en/:document.md': 'core/:document.md',
    'components/:implementation/ko/:implementation.md': 'core/ko/components/:implementation.md',
    'components/:implementation/:implementation.md': 'core/components/:implementation.md',
    'hooks/:implementation/ko/:implementation.md': 'core/ko/hooks/:implementation.md',
    'hooks/:implementation/:implementation.md': 'core/hooks/:implementation.md',
    'utils/:implementation/ko/:implementation.md': 'core/ko/utils/:implementation.md',
    'utils/:implementation/:implementation.md': 'core/utils/:implementation.md',
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://static.toss.im/tps/main.css' }],
    ['link', { rel: 'stylesheet', href: 'https://static.toss.im/tps/others.css' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    ['meta', { name: 'author', content: 'Viva Republica, Inc.' }],
    ['meta', { name: 'keywords', content: 'react, mobile, hooks, keyboard, viewport, ios, safari, android, react-simplikit' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '@react-simplikit/mobile' }],
    ['meta', { property: 'og:description', content: 'Mobile web utilities for React - Production-tested at Toss' }],
    ['meta', { property: 'og:site_name', content: '@react-simplikit/mobile' }],
    ['meta', { property: 'og:image', content: 'https://react-simplikit.slash.page/images/og.png' }],
    ['meta', { name: 'twitter:image', content: 'https://react-simplikit.slash.page/images/og.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    const title = pageData.frontmatter.title || pageData.title || '@react-simplikit/mobile';
    const description =
      pageData.frontmatter.description || pageData.description || 'Mobile web utilities for React - Production-tested at Toss';

    head.push(['meta', { property: 'og:title', content: title }]);
    head.push(['meta', { property: 'og:description', content: description }]);

    return head;
  },
  themeConfig: {
    logo: '/images/logo.svg',
    search: {
      provider: 'local',
      options: {
        locales: {
          ...koSearch,
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/toss/react-simplikit' },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@react-simplikit/mobile',
        ariaLabel: 'npm',
      },
    ],
  },
});
