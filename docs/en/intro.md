# Introduction

**react-simplikit** is a collection of lightweight, powerful utilities for React applications developed by [Toss](https://toss.im).

## Packages

### Core (`react-simplikit`)

The core package includes essential hooks, components, and utilities that work in any React environment:

- **Hooks**: `useBooleanState`, `useDebounce`, `useInterval`, `usePreservedCallback`, and more
- **Components**: `ImpressionArea`, `SwitchCase`, `Separated`
- **Utils**: `buildContext`, `mergeProps`, `mergeRefs`

```bash
npm install react-simplikit
```

### Mobile (`@react-simplikit/mobile`)

The mobile package provides hooks optimized for mobile web environments:

- **Hooks**: `useAvoidKeyboard`, `useBodyScrollLock`, `useScrollDirection`, `useVisualViewport`, `useNetworkStatus`, `usePageVisibility`

```bash
npm install @react-simplikit/mobile
```

## Design Philosophy

1. **Simple**: Easy to understand and use
2. **Lightweight**: Minimal bundle size, zero dependencies
3. **Type-Safe**: Full TypeScript support
4. **Tree-Shakeable**: Import only what you need
