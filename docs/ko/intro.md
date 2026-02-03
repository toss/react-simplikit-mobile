# 소개

**react-simplikit**은 [토스](https://toss.im)에서 개발한 가볍고 강력한 React 유틸리티 모음입니다.

## 패키지

### Core (`react-simplikit`)

Core 패키지는 모든 React 환경에서 동작하는 필수적인 hooks, components, utilities를 포함합니다:

- **Hooks**: `useBooleanState`, `useDebounce`, `useInterval`, `usePreservedCallback` 등
- **Components**: `ImpressionArea`, `SwitchCase`, `Separated`
- **Utils**: `buildContext`, `mergeProps`, `mergeRefs`

```bash
npm install react-simplikit
```

### Mobile (`@react-simplikit/mobile`)

Mobile 패키지는 모바일 웹 환경에 최적화된 hooks를 제공합니다:

- **Hooks**: `useAvoidKeyboard`, `useBodyScrollLock`, `useScrollDirection`, `useVisualViewport`, `useNetworkStatus`, `usePageVisibility`

```bash
npm install @react-simplikit/mobile
```

## 설계 철학

1. **간단함**: 이해하고 사용하기 쉬움
2. **가벼움**: 최소한의 번들 사이즈, 의존성 없음
3. **타입 안전**: 완전한 TypeScript 지원
4. **트리 셰이킹**: 필요한 것만 임포트
