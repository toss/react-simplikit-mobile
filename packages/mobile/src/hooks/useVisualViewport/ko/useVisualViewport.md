# useVisualViewport

Visual Viewport 변화를 추적하는 React hook입니다. 모바일 WebView에서 키보드가 나타나거나 사용자가 줌/스크롤할 때 변하는 실제 보이는 영역을 반환합니다.

## 인터페이스

```ts
function useVisualViewport(): { viewport: VisualViewportState | null };
```

### 파라미터

이 hook은 파라미터를 받지 않습니다.

### 반환값

`{ viewport: VisualViewportState | null }`을 반환합니다. SSR이거나 API가 지원되지 않으면 `viewport`는 `null`입니다.

| 속성 | 타입 | 설명 |
|------|------|------|
| `viewport.width` | `number` | Viewport 너비 (픽셀) |
| `viewport.height` | `number` | Viewport 높이 (픽셀) |
| `viewport.offsetLeft` | `number` | Layout viewport로부터의 왼쪽 오프셋 |
| `viewport.offsetTop` | `number` | Viewport 상단 오프셋. iOS에서 키보드가 나타나면 음수가 됨. |
| `viewport.scale` | `number` | 핀치 줌 배율. 1.0 = 줌 없음. |

## 예제

```tsx
function CustomLayout() {
  const { viewport } = useVisualViewport();

  if (!viewport) {
    return <div>Visual Viewport를 지원하지 않습니다</div>;
  }

  const { width, height, scale } = viewport;
  const showFloatingUI = scale <= 1.3;

  return (
    <div style={{ height }}>
      {showFloatingUI && <FloatingButton />}
      Viewport 인식 콘텐츠
    </div>
  );
}
```

## 중요 사항

- SSR 또는 Visual Viewport API를 지원하지 않는 브라우저에서 `viewport`는 `null`
- viewport 속성에 접근하기 전에 항상 null 체크 필요
- 키보드 높이만 필요하다면 `useKeyboardHeight()`를 사용하세요

## 동작 방식

- Visual Viewport API를 사용하여 viewport 변화 추적
- visual viewport의 `resize`와 `scroll` 이벤트를 모두 리스닝
- 논블로킹 상태 업데이트를 위해 `startTransition` 사용
