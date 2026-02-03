# useScrollDirection

스크롤 방향을 감지하는 React hook입니다. 스크롤 방향(위/아래)과 현재 스크롤 위치를 반환합니다.

## 인터페이스

```ts
function useScrollDirection(options?: UseScrollDirectionOptions): ScrollDirectionState;
```

### 파라미터

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `throttleMs` | `number` | `50` | 쓰로틀 간격 (밀리초) |

### 반환값

| 속성 | 타입 | 설명 |
|------|------|------|
| `direction` | `'up' \| 'down' \| null` | 현재 스크롤 방향. 아직 스크롤이 발생하지 않은 경우 `null`. |
| `position` | `number` | 현재 스크롤 Y 위치 (픽셀). |

## 예제

```tsx
function Header() {
  const { direction, position } = useScrollDirection();

  const isHidden = direction === 'down' && position > 100;

  return (
    <header className={isHidden ? 'hidden' : 'visible'}>
      My Header
    </header>
  );
}
```

### 커스텀 쓰로틀 적용

```tsx
function Header() {
  const { direction } = useScrollDirection({ throttleMs: 100 });

  return (
    <header style={{ opacity: direction === 'down' ? 0 : 1 }}>
      My Header
    </header>
  );
}
```

## 동작 방식

- 성능을 위해 passive 리스너와 함께 `scroll` 이벤트 사용
- 과도한 리렌더링을 방지하기 위해 기본적으로 쓰로틀 적용 (50ms)
- SSR 안전: 서버 사이드 렌더링 중에는 position을 0으로 반환
