import { defineConfig, DefaultTheme } from 'vitepress';
import { docsRoot } from './shared.mts';
import glob from 'fast-glob';
import path from 'path';

export const ko = defineConfig({
  lang: 'ko',
  themeConfig: {
    nav: [
      { text: '홈', link: '/ko/' },
      { text: 'Mobile', link: '/ko/mobile/' },
      { text: 'Core', link: '/ko/core/' },
    ],
    sidebar: {
      '/ko/core/': coreSidebar(),
      '/ko/mobile/': mobileSidebar(),
    },
    footer: {
      message: 'MIT 라이선스에 따라 배포됩니다.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function coreSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '가이드',
      items: [
        { text: '소개', link: '/ko/core/intro' },
        { text: 'react-simplikit, 선택의 이유', link: '/ko/core/why-react-simplikit-matters' },
        { text: '설치하기', link: '/ko/core/installation' },
        { text: '설계 원칙', link: '/ko/core/design-principles' },
        { text: '기여하기', link: '/ko/core/contributing' },
      ],
    },
    { text: '컴포넌트', collapsed: false, items: getItems('ko/core/components') },
    { text: '훅', collapsed: false, items: getItems('ko/core/hooks') },
    { text: '유틸리티', collapsed: false, items: getItems('ko/core/utils') },
  ];
}

function mobileSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '가이드',
      items: [
        { text: '소개', link: '/ko/mobile/intro' },
      ],
    },
    { text: '훅', collapsed: false, items: getItems('ko/mobile/hooks') },
  ];
}

function getItems(subPath: string): DefaultTheme.SidebarItem[] {
  const files = glob.sync(path.join(docsRoot, subPath, '*.md'));
  return files.map(file => {
    const name = path.basename(file, '.md');
    return { text: name, link: `/${subPath}/${name}` };
  }).sort((a, b) => a.text.localeCompare(b.text));
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  ko: {
    translations: {
      button: { buttonText: '검색' },
      modal: { noResultsText: '검색 결과 없음' },
    },
  },
};
