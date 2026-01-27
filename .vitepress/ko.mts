import { defineConfig, DefaultTheme } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';
import { sourceRoot } from './shared.mts';

export const ko = defineConfig({
  lang: 'ko',
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: 'https://github.com/toss/react-simplikit/edit/main/src/:path',
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
    { text: '홈', link: '/ko/' },
    { text: '설치하기', link: '/ko/installation' },
    { text: 'API 레퍼런스', link: '/ko/hooks/useAvoidKeyboard' },
    { text: 'Playground', link: '/playground/' },
    { text: '실험', link: '/ko/experiments/' },
    { text: 'Core', link: '/core/ko/' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    '/ko/': [
      {
        text: '가이드',
        items: [
          { text: '소개', link: '/ko/' },
          { text: '설치하기', link: '/ko/installation' },
          { text: 'Playground', link: '/playground/' },
          { text: '실험', link: '/ko/experiments/' },
        ],
      },
      {
        text: '훅',
        items: [
          { text: 'useAvoidKeyboard', link: '/ko/hooks/useAvoidKeyboard' },
          { text: 'useKeyboardHeight', link: '/ko/hooks/useKeyboardHeight' },
          { text: 'useVisualViewport', link: '/ko/hooks/useVisualViewport' },
          { text: 'useScrollDirection', link: '/ko/hooks/useScrollDirection' },
          { text: 'useBodyScrollLock', link: '/ko/hooks/useBodyScrollLock' },
          { text: 'useBatteryStatus', link: '/ko/hooks/useBatteryStatus' },
        ],
      },
      {
        text: '유틸리티',
        items: [
          { text: 'getKeyboardHeight', link: '/ko/utils/getKeyboardHeight' },
          { text: 'isKeyboardVisible', link: '/ko/utils/isKeyboardVisible' },
          { text: 'bodyScrollLock', link: '/ko/utils/bodyScrollLock' },
          { text: 'isServer', link: '/ko/utils/isServer' },
        ],
      },
    ],
    '/ko/experiments/': [
      {
        text: '랜딩 실험',
        items: [
          { text: '개요', link: '/ko/experiments/' },
        ],
      },
      {
        text: '모던 스타일',
        items: [
          { text: 'Bento Grid', link: '/ko/experiments/bento' },
          { text: 'Gradient Orb', link: '/ko/experiments/gradient-orb' },
          { text: 'Apple', link: '/ko/experiments/apple' },
        ],
      },
      {
        text: '클래식 스타일',
        items: [
          { text: 'Minimal', link: '/ko/experiments/minimal' },
          { text: 'Premium', link: '/ko/experiments/premium' },
          { text: 'Developer', link: '/ko/experiments/developer' },
          { text: 'Foundation', link: '/ko/experiments/foundation' },
          { text: 'Dark Modern', link: '/ko/experiments/dark-modern' },
          { text: 'Claude Code', link: '/ko/experiments/claude-code' },
        ],
      },
    ],
    '/core/ko/': [
      {
        text: '가이드',
        items: [
          { text: '소개', link: '/core/ko/intro' },
          { text: 'react-simplikit, 선택의 이유', link: '/core/ko/why-react-simplikit-matters' },
          { text: '설치하기', link: '/core/ko/installation' },
          { text: '설계 원칙', link: '/core/ko/design-principles' },
          { text: '기여하기', link: '/core/ko/contributing' },
        ],
      },
      {
        text: '레퍼런스',
        items: sortByText([
          {
            text: '컴포넌트',
            items: getSidebarItems(sourceRoot, 'components', '*', 'ko').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
          {
            text: '훅',
            items: getSidebarItems(sourceRoot, 'hooks', '*', 'ko').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
          {
            text: '유틸리티',
            items: getSidebarItems(sourceRoot, 'utils', '*', 'ko').map(item => ({
              ...item,
              link: `/core${item.link}`,
            })),
          },
        ]),
      },
    ],
  };
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
