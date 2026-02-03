# useNetworkStatus

Network Information API에 접근하는 React hook입니다. 네트워크 연결 정보를 제공합니다.

## 인터페이스

```ts
function useNetworkStatus(): NetworkStatus;
```

### 파라미터

이 hook은 파라미터를 받지 않습니다.

### 반환값

`NetworkStatus` 객체를 반환합니다. API가 지원되지 않으면 모든 속성이 `undefined`입니다.

| 속성 | 타입 | 설명 |
|------|------|------|
| `effectiveType` | `'slow-2g' \| '2g' \| '3g' \| '4g'` | 네트워크 품질 기반 유효 연결 유형 |
| `type` | `'wifi' \| 'cellular' \| 'ethernet' \| ...` | 물리적 연결 유형 |
| `downlink` | `number` | 다운링크 속도 (Mbps) |
| `rtt` | `number` | 왕복 시간 (밀리초) |
| `saveData` | `boolean` | 사용자의 데이터 절약 설정 |

## 예제

```tsx
function AdaptiveImage() {
  const { effectiveType, saveData } = useNetworkStatus();

  const useHighQuality = effectiveType === '4g' && !saveData;

  return (
    <img
      src={useHighQuality ? 'high-res.jpg' : 'low-res.jpg'}
      alt="콘텐츠"
    />
  );
}
```

### 네트워크 기반 비디오 자동재생

```tsx
function VideoPlayer() {
  const { type, downlink } = useNetworkStatus();

  const shouldAutoplay = type === 'wifi' && (downlink ?? 0) > 5;

  return <video src="video.mp4" autoPlay={shouldAutoplay} />;
}
```

## 브라우저 지원

| 브라우저 | 지원 |
|---------|------|
| Chrome/Edge (Android) | 완전 지원 |
| Chrome/Edge (Desktop) | 부분 지원 |
| Firefox | 미지원 |
| Safari | 미지원 |
