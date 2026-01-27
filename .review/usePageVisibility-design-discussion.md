# usePageVisibility 설계 논의

> 작성일: 2026-01-20
> 최종 수정: 2026-01-21
> 상태: ✅ 구현 완료

## 1. 훅의 목적

**핵심 목적**: 모바일 웹에서 탭 전환 감지 (탭을 벗어났을 때 감지)

### 탭 이탈이 발생하는 상황

| 상황 | `visibilityState` | `isVisible` |
|------|-------------------|-------------|
| 다른 탭으로 전환 | `hidden` | `false` |
| 브라우저 최소화 | `hidden` | `false` |
| 홈 화면으로 이동 | `hidden` | `false` |
| 앱 전환 (Alt+Tab) | `hidden` | `false` |
| 화면 잠금 | `hidden` | `false` |
| 같은 탭에서 다른 앱 오버레이 | `visible` (주의!) | `true` |

---

## 2. Document-level vs Element-level Visibility

### 검토 배경

"특정 요소가 보이는지"를 감지하는 기능이 필요한지 검토함.

### 두 API 비교

| 기준 | Page Visibility API | IntersectionObserver |
|------|---------------------|----------------------|
| 대상 | 브라우저 탭 전체 (Document) | 특정 DOM 요소 (Element) |
| 감지 이벤트 | 탭 전환, 최소화, 앱 전환, 화면 잠금 | 스크롤, 레이아웃 변경 |
| ref 필요 | ❌ | ✅ (요소 참조) |
| 용도 | 리소스 절약, 데이터 동기화 | 지연 로딩, 무한 스크롤, 광고 노출 |

### 결정: Document-level 유지

**Element-level visibility (IntersectionObserver)는 스코프 외**

**이유**:
1. **모바일 특화 아님**: 데스크톱과 동일하게 동작하는 범용 API
2. **기존 솔루션 풍부**: `react-intersection-observer`, `react-use` 등
3. **라이브러리 스코프**: react-simplikit/mobile은 모바일 웹 **특화** 문제 해결에 집중

---

## 3. API 설계 결정사항

### 확정된 사항

| 항목 | 결정 | 이유 |
|------|------|------|
| `visibilityState` | **유지** | 세부 상태 필요한 케이스 존재 |
| `prerender` | **제거** | deprecated, 현대 브라우저에서 미사용 |
| 타입 정의 방식 | **브라우저 타입에서 파생** | 출처 명확히 드러내기 |

### 타입 설계

```typescript
// 브라우저 타입에서 파생 (Exclude로 prerender 제거)
export type VisibilityState = Exclude<DocumentVisibilityState, 'prerender'>;

// 또는 Extract로 명시적 선택
export type VisibilityState = Extract<DocumentVisibilityState, 'visible' | 'hidden'>;
```

### 현재 반환 타입

```typescript
type PageVisibility = {
  isVisible: boolean;
  visibilityState: VisibilityState;  // 'visible' | 'hidden'
};
```

---

## 4. 실제 사용 패턴 분석

두 개의 프로덕션 레포지토리에서 분석한 결과:
- `/Users/kimyouknow/Documents/core/tossbank-frontend`
- `/Users/kimyouknow/Documents/core/frontend-mobile`

### 사용 빈도순 시나리오

| 순위 | 시나리오 | 예시 | 핵심 동작 |
|------|----------|------|----------|
| **1** | 외부 작업 후 복귀 감지 | 공유, 딥링크, 송금 | `visible`일 때 서버 동기화 |
| **2** | 게임/미션 타이머 | 카드 뒤집기 게임 | `hidden` 시간 계산하여 타이머 조정 |
| **3** | 쿼리 데이터 리페치 | 영수증, 혜택 목록 | `visible`일 때 stale 데이터 갱신 |
| **4** | 비디오 재생 제어 | 카드 소개 영상 | `visible`일 때 자동 재생 |
| **5** | 광고/로그 이벤트 | 노출 광고 | `visible`일 때 이벤트 전송 |

### 핵심 인사이트

#### 1. 대부분 `visible` 복귀 시점에 관심

```typescript
// 패턴: hidden → visible 전환 시 동작
useVisibilityEvent(state => {
  if (state === 'visible') {
    // 복귀 시 처리 (리페치, 동기화, 재생)
  }
});
```

#### 2. 경과 시간 계산 패턴 (게임/타이머)

```typescript
const hiddenAt = useRef<Date>();

useVisibilityEvent(state => {
  if (state === 'hidden') {
    hiddenAt.current = new Date();  // 숨겨진 시점 기록
  } else {
    const elapsed = differenceInSeconds(new Date(), hiddenAt.current);
    setTimer(prev => prev - elapsed);  // 경과 시간만큼 차감
  }
});
```

#### 3. iOS 특수 처리 필요

```typescript
// iOS에서 visibilitychange가 불안정 → viewstatechange도 함께 사용
document.addEventListener('visibilitychange', handler);
document.addEventListener('viewstatechange', handler);  // iOS 전용
```

---

## 5. API 확장 검토 (미결정)

### 옵션 비교

| 옵션 | 장점 | 단점 | 결정 |
|------|------|------|------|
| **현재 유지** (심플) | 심플, 범용적 | 경과 시간 계산은 직접 구현 | - |
| **콜백 추가** `onVisible`, `onHidden` | 편의성 | API 복잡도 증가 | - |
| **경과 시간 제공** `hiddenDuration` | 타이머 케이스에 유용 | 특수 케이스에만 필요 | - |
| **iOS 대응** `viewstatechange` 포함 | 호환성 | 복잡도 증가 | - |

### 콜백 패턴 예시 (검토 중)

```typescript
// 옵션 1: 현재 상태 기반
const { isVisible } = usePageVisibility();
useEffect(() => {
  if (!isVisible) video.pause();
}, [isVisible]);

// 옵션 2: 콜백 기반
usePageVisibility({
  onHidden: () => video.pause(),
  onVisible: () => video.play(),
});
```

---

## 6. 코드 리뷰 피드백 요약

### 3명의 전문가 리뷰 (React, TypeScript, JavaScript)

| 심각도 | 이슈 | 상태 |
|--------|------|------|
| Major | `document.visibilityState as VisibilityState` 타입 단언 위험 | 수정 예정 |
| Minor | SSR 초기값 하드코딩 (hydration 주의) | 의도된 패턴 |
| Minor | `getPageVisibility()` 중복 호출 | 개선 가능 |

### 이전 Multi-LLM 리뷰 (HANDOFF.md 참조)

- **useEffect의 불필요한 isServer() 체크 제거** - 적용 완료
- **SSR 동작 문서화** - 적용 완료

---

## 7. 다음 단계

- [ ] API 확장 여부 결정 (콜백, iOS 대응 등)
- [ ] 타입 정의 수정 (`Exclude<DocumentVisibilityState, 'prerender'>`)
- [ ] 코드 구현 업데이트
- [ ] 테스트 업데이트
- [ ] JSDoc 문서화

---

## 참고 자료

### 관련 파일

- 현재 구현: `src/hooks/usePageVisibility/usePageVisibility.ts`
- 테스트: `src/hooks/usePageVisibility/usePageVisibility.spec.ts`
- HANDOFF: `/HANDOFF.md`

### 프로덕션 예시 파일

**tossbank-frontend:**
- `services/home/src/hooks/useTabViewChangeEvent.ts` - iOS 대응 포함
- `services/card-management/src/hooks/useForcePlayVideoOnWindowFocus.ts` - 비디오 제어

**frontend-mobile:**
- `service.toss.im/tosspay-game/src/pages/EventCardFlip/components/CardFlipEventGamePage.tsx` - 타이머
- `service.toss.im/card-products/credit-card/src/pages/LimitedCardEvents/TimeAttack/hooks/useTimeAttackPreventOverlay.tsx` - 공유 후 복귀
- `app.toss.team/card-tracker/src/hooks/useVisibilitySync.ts` - 쿼리 리페치
