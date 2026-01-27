# useAvoidKeyboard

`useAvoidKeyboard`는 모바일 기기에서 화면 키보드가 고정 하단 요소를 가리는 것을 방지하는 React 훅입니다. Visual Viewport API를 사용하여 정확한 키보드 높이를 계산하고, 요소를 키보드 위로 부드럽게 이동시키는 CSS 스타일을 반환합니다.

## 왜 useAvoidKeyboard인가?

모바일 브라우저, 특히 iOS Safari에서 화면 키보드는 입력 필드, CTA, 네비게이션 바와 같은 고정 하단 요소를 가릴 수 있습니다. `100vh`, `scrollIntoView`, `resize` 이벤트와 같은 표준 솔루션은 신뢰할 수 없습니다.

`useAvoidKeyboard`는 다음을 통해 이 문제를 해결합니다:
- 정확한 키보드 높이 감지를 위한 Visual Viewport API 사용
- 자연스러운 애니메이션을 위한 부드러운 CSS 트랜지션 제공
- iOS Safari와 Android Chrome 모두 지원
- 적절한 하이드레이션 처리로 SSR 안전

## 인터페이스

```ts
function useAvoidKeyboard(options?: UseAvoidKeyboardOptions): UseAvoidKeyboardResult
```

### 파라미터

| 이름 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `options` | `UseAvoidKeyboardOptions` | 아니오 | - | 훅의 설정 옵션 |
| `options.safeAreaBottom` | `number` | 아니오 | `0` | 키보드가 숨겨졌을 때의 기본 하단 오프셋(픽셀). iPhone 홈 인디케이터(34px)에 유용 |
| `options.transitionDuration` | `number` | 아니오 | `200` | 부드러운 애니메이션을 위한 트랜지션 지속 시간(밀리초) |
| `options.transitionTimingFunction` | `string` | 아니오 | `'ease-out'` | 애니메이션을 위한 트랜지션 타이밍 함수 |
| `options.immediate` | `boolean` | 아니오 | `true` | true면 마운트 시 초기 키보드 높이를 가져옴 |

### 반환값

| 이름 | 타입 | 설명 |
|------|------|------|
| `style` | `CSSProperties` | transform과 transition 속성을 포함하는 CSS 스타일 객체. 고정 하단 요소에 적용 |

## 예제

### 기본 사용법

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

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
      <input placeholder="메시지를 입력하세요..." />
    </div>
  )
}
```

### Safe Area Bottom과 함께

홈 인디케이터가 있는 iPhone의 경우 `safeAreaBottom`을 추가하세요:

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function FixedBottomCTA() {
  const { style } = useAvoidKeyboard({ safeAreaBottom: 34 })

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        ...style,
      }}
    >
      <button style={{ width: '100%' }}>제출</button>
    </div>
  )
}
```

### 커스텀 애니메이션

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function AnimatedInput() {
  const { style } = useAvoidKeyboard({
    transitionDuration: 300,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  })

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
      <input placeholder="여기에 입력하세요..." />
    </div>
  )
}
```

## 작동 원리

1. 내부적으로 `useKeyboardHeight`를 사용하여 Visual Viewport 변경을 구독
2. `window.innerHeight - visualViewport.height`로 키보드 높이 계산
3. 요소를 위로 이동시키는 CSS `transform: translateY()` 스타일 반환
4. 자연스러운 애니메이션을 위해 부드러운 CSS 트랜지션 적용

## 브라우저 호환성

| 브라우저 | 지원 |
|---------|-----------|
| Chrome 61+ | ✅ |
| Safari 13+ | ✅ |
| Firefox 91+ | ✅ |
| Edge 79+ | ✅ |
| Chrome Android | ✅ |
| Safari iOS 13+ | ✅ |

## 관련 훅

- `useKeyboardHeight` - 원시 키보드 높이 값 가져오기
- `useVisualViewport` - 전체 Visual Viewport 상태 가져오기
