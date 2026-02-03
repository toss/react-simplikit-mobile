import { defineConfig, DefaultTheme } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';
import { coreSourceRoot, mobileDocsRoot } from './shared.mts';

export const ko = defineConfig({
  lang: 'ko',
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: 'https://github.com/toss/react-simplikit/edit/main/:path',
      text: 'GitHub에서 수정하기',
    },
    footer: {
      message: 'MIT 라이선스에 따라 배포됩니다.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '홈', link: '/ko' },
    {
      text: 'Core',
      items: [
        { text: 'Hooks', link: '/ko/core/hooks/useBooleanState' },
        { text: 'Components', link: '/ko/core/components/ImpressionArea' },
        { text: 'Utils', link: '/ko/core/utils/buildContext' },
      ],
    },
    {
      text: 'Mobile',
      items: [
        { text: 'Hooks', link: '/ko/mobile/hooks/useAvoidKeyboard' },
      ],
    },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: '시작하기',
      items: [
        { text: '소개', link: '/ko/intro' },
        { text: '설치하기', link: '/ko/installation' },
      ],
    },
    {
      text: 'Core (react-simplikit)',
      collapsed: false,
      items: sortByText([
        {
          text: '컴포넌트',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'components', '*', 'ko'),
        },
        {
          text: '훅',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'hooks', '*', 'ko'),
        },
        {
          text: '유틸리티',
          collapsed: true,
          items: getSidebarItems(coreSourceRoot, 'core', 'utils', '*', 'ko'),
        },
      ]),
    },
    {
      text: 'Mobile (@react-simplikit/mobile)',
      collapsed: false,
      items: [
        {
          text: '훅',
          collapsed: true,
          items: getSidebarItems(mobileDocsRoot, 'mobile', 'hooks', 'ko'),
        },
      ],
    },
  ];
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  ko: {
    translations: {
      button: {
        buttonText: '검색',
        buttonAriaLabel: '검색',
      },
      modal: {
        backButtonTitle: '뒤로가기',
        displayDetails: '더보기',
        footer: {
          closeKeyAriaLabel: '닫기',
          closeText: '닫기',
          navigateDownKeyAriaLabel: '아래로',
          navigateText: '이동',
          navigateUpKeyAriaLabel: '위로',
          selectKeyAriaLabel: '선택',
          selectText: '선택',
        },
        noResultsText: '검색 결과를 찾지 못했어요.',
        resetButtonTitle: '모두 지우기',
      },
    },
  },
};
