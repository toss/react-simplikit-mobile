# useAvoidKeyboard

모바일 기기에서 화면 키보드가 나타날 때 하단 고정 요소가 키보드를 피하도록 도와주는 React hook입니다.

## 인터페이스

```ts
function useAvoidKeyboard(options?: UseAvoidKeyboardOptions): UseAvoidKeyboardResult;
```

### 파라미터

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `safeAreaBottom` | `number` | `0` | 키보드가 숨겨져 있을 때 기본 하단 오프셋 (픽셀) |
| `transitionDuration` | `number` | `200` | 부드러운 애니메이션을 위한 전환 시간 (밀리초) |
| `transitionTimingFunction` | `string` | `'ease-out'` | 애니메이션 전환 타이밍 함수 |
| `immediate` | `boolean` | `true` | true일 경우 마운트 시 초기 키보드 높이를 가져옴 |

### 반환값

| 속성 | 타입 | 설명 |
|------|------|------|
| `style` | `CSSProperties` | 하단 고정 요소에 적용할 CSS 스타일 객체. transform과 transition 속성을 포함합니다. |

## 예제

```tsx
function FixedBottomCTA() {
  const { style } = useAvoidKeyboard();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        ...style,
      }}
    >
      <button>제출</button>
    </div>
  );
}
```

### Safe Area Bottom 적용

```tsx
// iPhone 홈 인디케이터 등을 위한 safe area bottom 오프셋 적용
function FixedBottomCTA() {
  const { style } = useAvoidKeyboard({ safeAreaBottom: 34 });

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        ...style,
      }}
    >
      <button>제출</button>
    </div>
  );
}
```

## 동작 방식

이 hook은 Visual Viewport API를 사용하여 화면 키보드가 나타나는 것을 감지하고, 요소를 키보드 위로 이동시키기 위한 적절한 `translateY` 값을 계산합니다. 전환은 CSS 트랜지션을 사용하여 부드럽게 애니메이션됩니다.
