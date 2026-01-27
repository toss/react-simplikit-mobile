# useLowPowerMode 설계 논의

> 작성일: 2026-01-20
> 상태: 설계 검토 중

## 1. 훅의 목적

**핵심 목적**: 저전력 모드 휴리스틱 감지 (표준 Web API 없음)

### 왜 휴리스틱인가?

- OS 레벨의 "저전력 모드"를 직접 감지하는 Web API가 **없음**
- 여러 신호를 조합하여 저전력 상황을 **추정**

### 주요 사용 케이스

- 자동 재생 비디오 비활성화
- 복잡한 애니메이션 간소화
- 백그라운드 작업 축소
- 이미지 품질 조정

---

## 2. API 설계

### 현재 반환 타입

```typescript
type LowPowerMode = {
  isLowPowerMode: boolean;  // 종합 판단 (OR 조합)
  indicators: {
    lowBattery: boolean;    // 배터리 ≤20% && 충전 중 아님
    saveData: boolean;      // 데이터 절약 모드
    reducedMotion: boolean; // 동작 줄이기 설정
  };
  batteryLevel?: number;    // 0-1 범위 (undefined if 미지원)
  charging?: boolean;       // 충전 중 여부 (undefined if 미지원)
};
```

### 휴리스틱 조합

```
isLowPowerMode = lowBattery || saveData || reducedMotion
```

| 지표 | API | 브라우저 지원 |
|------|-----|-------------|
| `lowBattery` | Battery API | ⚠️ Deprecated (Chrome에서만 동작) |
| `saveData` | Network Information API | ❌ Safari 미지원 |
| `reducedMotion` | CSS Media Query | ✅ 전체 지원 |

---

## 3. 실제 사용 패턴 분석

### 프로덕션 레포에서 발견된 패턴

| 시나리오 | 설명 | 파일 |
|----------|------|------|
| **User Agent 파싱** | iOS/Android 저전력 모드 감지 | `isLowBatteryMode.ts` |
| **애니메이션 제어** | reduced motion 시 scale 제거 | `TooltipInOutMotion.tsx` |
| **UI 분기** | 저전력 사용자에게 경량 UI | `SellMyCarIntro/index.tsx` |
| **메모리 기반 최적화** | deviceMemory로 작업량 조정 | `price-mission/script.ts` |

### 핵심 인사이트

#### 1. User Agent 파싱이 더 신뢰성 있음

```typescript
// frontend-mobile에서 발견된 패턴
import { parseUserAgent } from '@catch-js/core';

export function isLowBatteryMode(): boolean {
  if (isServer()) return false;

  const { batteryModePreference } = parseUserAgent(navigator.userAgent);
  return batteryModePreference === 'low';
}
```

**장점**: iOS/Android 앱 내 웹뷰에서 정확한 저전력 모드 감지
**단점**: 일반 브라우저에서는 동작하지 않음

#### 2. `prefers-reduced-motion`이 가장 범용적

```typescript
// 5개 이상의 파일에서 사용
// useSyncExternalStore 패턴
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    callback => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false  // SSR 폴백
  );
}
```

#### 3. 실제 UI 분기 패턴

```typescript
// 저전력 모드 사용자에게 경량 UI 제공
const SellMyCarIntro = () => {
  const isLowBatteryUser = isLowBatteryMode();

  if (isLowBatteryUser) {
    return <LowBatteryIntro />;  // Lottie + 이미지 경량 버전
  }

  return <DefaultIntro />;  // 풀 애니메이션 버전
};
```

#### 4. 애니메이션 최적화 패턴

```typescript
// Framer Motion에서 reduced motion 대응
const motionLevel = useReducedMotion() ? 'reduced' : 'basic';

const ExitMotion = {
  basic: { opacity: 0, scale: 0 },      // 풀 애니메이션
  reduced: { opacity: 0 },               // scale 제거
};

<motion.div exit={ExitMotion[motionLevel]} />
```

---

## 4. 고민 포인트

### Battery API Deprecated 문제

| 브라우저 | Battery API 상태 |
|----------|-----------------|
| Chrome | ✅ 동작 (deprecated 예정) |
| Firefox | ❌ 제거됨 |
| Safari | ❌ 구현 안됨 |
| Edge | ✅ 동작 |

**질문**: Battery API에 의존하는 게 맞는가?

### 대안: User Agent 파싱 추가?

```typescript
// 옵션: 네이티브 앱 저전력 모드 감지 추가
type LowPowerMode = {
  isLowPowerMode: boolean;
  indicators: {
    lowBattery: boolean;
    saveData: boolean;
    reducedMotion: boolean;
    nativeLowPowerMode?: boolean;  // User Agent 기반 (새로 추가?)
  };
};
```

### `deviceMemory` 추가?

```typescript
// 메모리 기반 최적화도 저전력 지표로 사용?
indicators: {
  ...현재,
  lowMemory?: boolean;  // deviceMemory < 2GB
};
```

---

## 5. 코드 리뷰 피드백 요약

### 3명의 전문가 리뷰

| 심각도 | 이슈 | 상태 |
|--------|------|------|
| Major | Race condition (버전 카운터 필요) | 미적용 |
| Major | 타입 중복 (`NetworkInformation`) | 공통 모듈 분리 필요 |
| Minor | `BatteryManager` 타입과 `EventTarget` 인터섹션 문제 | 개선 가능 |

### 이전 Multi-LLM 리뷰 (HANDOFF.md 참조)

- **[P1] Data Saver 변경 감지 누락** - 적용 완료
- **[P2] 비동기 초기화 Race Condition** - `isMounted` 플래그 적용 완료
- **Magic Number 상수화** - `LOW_BATTERY_THRESHOLD = 0.2` 적용 완료

---

## 6. API 확장 검토 (미결정)

### 옵션 비교

| 옵션 | 장점 | 단점 |
|------|------|------|
| **현재 유지** | 심플, 범용적 | Battery API deprecated |
| **User Agent 파싱 추가** | 앱 내 정확한 감지 | 일반 브라우저에서 무용 |
| **deviceMemory 추가** | 메모리 기반 최적화 | 별도 훅으로 분리하는 게 나을 수도 |
| **Battery API 제거** | deprecated 의존성 제거 | 기능 축소 |

### 콜백 패턴?

```typescript
useLowPowerMode({
  onLowPower: () => { /* 경량 모드 전환 */ },
  onNormalPower: () => { /* 일반 모드 전환 */ },
});
```

---

## 7. 다음 단계

- [ ] Battery API 유지 여부 결정
- [ ] User Agent 파싱 추가 여부 결정
- [ ] Race condition 대응 (버전 카운터)
- [ ] 타입 중복 제거 (공통 모듈)
- [ ] 코드 구현 업데이트
- [ ] 테스트 업데이트

---

## 참고 자료

### 관련 파일

- 현재 구현: `src/hooks/useLowPowerMode/useLowPowerMode.ts`
- 테스트: `src/hooks/useLowPowerMode/useLowPowerMode.spec.ts`
- HANDOFF: `/HANDOFF.md`

### 프로덕션 예시 파일

**frontend-mobile:**
- `service.toss.im/automobile/src/shared/utils/isLowBatteryMode.ts` - User Agent 파싱
- `service.toss.im/automobile/src/CarSale/containers/SellMyCarIntro/` - UI 분기
- `service.toss.im/pedometer-v3/.../TooltipInOutMotion.tsx` - 애니메이션 제어
- `react-native/price-mission/src/_shared/constants/script.ts` - deviceMemory

**tossbank-frontend:**
- `services/home/src/hooks/usePrefersReducedMotion.ts` - useSyncExternalStore 패턴

**TDS:**
- `packages/tds/react-utils/src/hooks/useReducedMotion.ts` - framer-motion 연동
- `packages/tds/react-utils/src/hooks/useMediaQuery.ts` - 미디어 쿼리 훅

### MDN 참조

- [Battery Status API (Deprecated)](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Network Information API - saveData](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)
