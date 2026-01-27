# useNetworkStatus 설계 논의

> 작성일: 2025-01-20
> 최종 수정: 2025-01-21
> 상태: ✅ 구현 완료

## 1. 훅의 목적

**핵심 목적**: Network Information API를 사용하여 네트워크 상태 감지

### 주요 사용 케이스

- 느린 네트워크에서 미디어 품질 조정 (고화질 → 저화질)
- 데이터 절약 모드 사용자 존중
- 네트워크 상태에 따른 프리로딩 전략 변경
- 오프라인/온라인 상태 감지

---

## 2. Chrome DevTools Throttling 이슈 (2025-01-21)

### 문제 발견

Chrome DevTools에서 Network throttling 설정 시 `effectiveType`이 변경되지 않음:

| DevTools 설정 | 예상 | 실제 |
|--------------|------|------|
| No throttling | 4g | 4g |
| Fast 4G | 4g | 4g |
| Slow 4G | 3g | **4g** |
| 3G | 2g | **4g** |
| Offline | - | **4g** |

### 원인 분석

DevTools throttling은 요청만 지연시키고, `navigator.connection.effectiveType`은 **실제 네트워크 품질**을 측정한 값. DevTools가 브라우저의 네트워크 측정 로직에 개입하지 않음.

**결론**: 버그가 아닌 정상 동작. 문서에 명시 필요.

---

## 3. Web API 표준 (WICG Spec)

**출처**: https://wicg.github.io/netinfo/

### effectiveType 임계값

| Type | RTT | Downlink | 용도 |
|------|-----|----------|------|
| `slow-2g` | ≥2000ms | ≤50 Kbps | 텍스트만 |
| `2g` | ≥1400ms | ≤70 Kbps | 작은 이미지 |
| `3g` | ≥270ms | ≤700 Kbps | 고해상도 이미지, SD 비디오 |
| `4g` | <270ms | >700 Kbps | HD 비디오, 실시간 |

### ConnectionType (type 속성)

```typescript
type ConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'mixed'
  | 'none'
  | 'other'
  | 'unknown'
  | 'wifi'
  | 'wimax';
```

---

## 4. 브라우저 호환성 (최종 분석)

### Network Information API 지원

| 브라우저 | effectiveType | type | downlink/rtt | saveData |
|---------|--------------|------|--------------|----------|
| Chrome (Android) | ✅ | ✅ | ✅ | ✅ |
| Chrome (Desktop) | ✅ | ❌ | ✅ | ✅ |
| Edge | ✅ | ❌ | ✅ | ✅ |
| Firefox | ❌ | ❌ | ❌ | ❌ |
| Safari | ❌ | ❌ | ❌ | ❌ |
| Safari (iOS) | ❌ | ❌ | ❌ | ❌ |

### 인앱 브라우저 (WebView)

| 환경 | 지원 여부 | 비고 |
|------|----------|------|
| 카카오톡 인앱 | ❌ | Android WebView 기반이지만 제한적 |
| Instagram WebView | ❌ | |
| Facebook WebView | ❌ | |
| 네이버 앱 | ❌ | |
| iOS WKWebView | ❌ | |

**결론**: 인앱 브라우저에서는 Network Information API를 신뢰할 수 없음.

---

## 5. 최종 API 설계 (구현 완료)

### 반환 타입

```typescript
type NetworkStatus = {
  // 항상 사용 가능 (모든 브라우저)
  isOnline: boolean;      // navigator.onLine 기반
  isSlowNetwork: boolean; // 복합 판단

  // API 의존 (Chrome/Edge only)
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  type?: ConnectionType;  // 물리적 연결 타입
  downlink?: number;      // Mbps
  rtt?: number;           // ms
  saveData?: boolean;
};
```

### isSlowNetwork 판단 로직

```typescript
// Note: 오프라인일 때는 isSlowNetwork = false (네트워크 없음 ≠ 느린 네트워크)
const isSlowNetwork =
  isOnline &&                                     // 온라인일 때만 판단
  (saveData === true ||                           // 데이터 세이버
    isSlowByEffectiveType ||                      // 3g 이하
    (effectiveType == null && (                   // API 없을 때 fallback
      rtt >= 270 ||                               // RTT 높음
      downlink <= 0.7                             // 속도 느림
    )));
```

**설계 결정**: `isSlowNetwork`와 `isOnline`은 독립적인 개념으로 분리
- 오프라인: `isOnline = false`, `isSlowNetwork = false`
- 느린 네트워크: `isOnline = true`, `isSlowNetwork = true`
- 빠른 네트워크: `isOnline = true`, `isSlowNetwork = false`

### 이벤트 리스너

```typescript
// 항상 등록 (모든 브라우저)
window.addEventListener('online', update);
window.addEventListener('offline', update);

// API 지원 시에만
connection?.addEventListener('change', update);
```

---

## 6. 고려했지만 채택하지 않은 방안

### Performance Timing 기반 측정

```typescript
const start = performance.now();
await fetch('/speed-test-image.jpg');
const duration = performance.now() - start;
```

**불채택 사유**: 추가 트래픽 발생, 서버 리소스 필요, 라이브러리 복잡도 증가

### User-Agent 기반 인앱 감지

```typescript
const isInApp = /KAKAOTALK|Instagram|FBAN/.test(navigator.userAgent);
```

**불채택 사유**: UA 파싱 유지보수 비용, 신뢰성 감소 추세

### 네이티브 브릿지 폴백

**불채택 사유**: 라이브러리에서 특정 앱 의존성 추가는 부적절. 사용처에서 별도 구현 권장.

---

## 7. 실제 사용 패턴

### 프로덕션 레포에서 발견된 패턴

| 시나리오 | 설명 | 사용처 |
|----------|------|--------|
| **네이티브 브릿지** | 앱에서 네트워크 상태 조회 | AppBridge |
| **네트워크 클라이언트** | retry, timeout 정책 | Card Tracker |
| **에러 핸들링** | 네트워크 에러 처리 | Terms 서비스 |

---

## 8. 사용 예시

### 기본 사용 (모든 브라우저)

```tsx
function VideoPlayer() {
  const { isOnline, isSlowNetwork } = useNetworkStatus();

  if (!isOnline) {
    return <OfflineMessage />;
  }

  if (isSlowNetwork) {
    return <img src="thumbnail.jpg" alt="thumbnail" />;
  }

  return <video src="video.mp4" controls />;
}
```

### 고급 사용 (API 지원 환경)

```tsx
function AdaptiveContent() {
  const { type, effectiveType, saveData, downlink } = useNetworkStatus();

  const shouldLoadHD =
    type === 'wifi' &&
    effectiveType === '4g' &&
    !saveData &&
    (downlink ?? 0) > 5;

  return <Image quality={shouldLoadHD ? 'high' : 'low'} />;
}
```

---

## 9. 완료 체크리스트

- [x] Safari 미지원 대응 → `isOnline` fallback 추가
- [x] `isSlowNetwork` 기준 재검토 → RTT/downlink fallback 추가
- [x] `type` 속성 추가 (물리적 연결 타입)
- [x] 타입 중복 제거 → `ConnectionType` 추가
- [x] online/offline 이벤트 리스너 추가
- [x] Chrome DevTools throttling 문서화
- [x] 브라우저 호환성 JSDoc 업데이트

---

## 참고 자료

- [WICG Network Information API Spec](https://wicg.github.io/netinfo/)
- [MDN: Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [MDN: NetworkInformation.effectiveType](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)
- [Chrome Samples: Network Information](https://googlechrome.github.io/samples/network-information/)

---

**관련 파일**:
- 구현: `src/hooks/useNetworkStatus/useNetworkStatus.ts`
- 테스트: `src/hooks/useNetworkStatus/useNetworkStatus.spec.ts`
