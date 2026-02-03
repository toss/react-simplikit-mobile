# usePageVisibility

페이지 가시성 변화를 감지하는 React hook입니다. Page Visibility API를 사용하여 사용자가 탭을 전환하거나 브라우저를 최소화할 때를 모니터링합니다.

## 인터페이스

```ts
function usePageVisibility(): PageVisibility;
```

### 파라미터

이 hook은 파라미터를 받지 않습니다.

### 반환값

| 속성 | 타입 | 설명 |
|------|------|------|
| `isVisible` | `boolean` | 페이지가 현재 사용자에게 보이면 true |
| `visibilityState` | `'visible' \| 'hidden'` | 현재 가시성 상태 |

## 예제

```tsx
function VideoPlayer() {
  const { isVisible } = usePageVisibility();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!isVisible) {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return <video ref={videoRef} src="video.mp4" />;
}
```

### 분석 추적

```tsx
function Analytics() {
  const { visibilityState } = usePageVisibility();

  useEffect(() => {
    if (visibilityState === 'hidden') {
      analytics.track('page_hidden');
    }
  }, [visibilityState]);

  return null;
}
```

## SSR 동작

서버 사이드 렌더링 중에는 `{ isVisible: true, visibilityState: 'visible' }`를 반환합니다.

## 사용 사례

- 애니메이션이나 비디오 일시정지/재개
- 탭이 숨겨지면 백그라운드 작업 중지
- 페이지 체류 시간 분석 추적
- 사용자가 떠날 때 초안 콘텐츠 저장
