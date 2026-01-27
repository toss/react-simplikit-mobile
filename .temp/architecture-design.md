---
llm: architecture-design
timestamp: 2026-01-26T00:00:00Z
status: success
---

# @react-simplikit/mobile 아키텍처 설계

## 설계 개요

@react-simplikit/mobile은 모바일 웹 개발의 핵심 문제점(뷰포트, 키보드, 레이아웃)을 해결하는 React 유틸리티 라이브러리입니다. 이 설계는 다음을 목표로 합니다:

1. **명확한 가치 제안**: 모바일 웹 개발의 고통점 해결
2. **상세한 문서화**: 각 Hook/Util의 실시간 데모와 API 문서
3. **모바일 중심 체험**: QR 코드를 통한 즉시 테스트
4. **글로벌 접근성**: 한국어/영어 완벽 지원

---

## 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                    Documentation Site                         │
│         (react-simplikit.slash.page/mobile)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐    ┌──────────────────┐              │
│  │  Landing Page    │    │  API Reference   │              │
│  │  - Value Props   │    │  - All Hooks     │              │
│  │  - Problem/Sol   │    │  - All Utils     │              │
│  │  - QR Codes      │    │  - Live Demos    │              │
│  └────────┬─────────┘    └──────────────────┘              │
│           │                                                  │
│  ┌────────▼──────────────────────────────────┐              │
│  │  Shared Documentation Components           │              │
│  │  - DemoLayout, CodeBlock, StatusCard       │              │
│  │  - Mobile-optimized components             │              │
│  └────────────────────────────────────────────┘              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
          │                          │
          │                          │
    ┌─────▼────────┐          ┌──────▼─────────┐
    │ Demo Apps    │          │ NPM Package     │
    │ (QR Target)  │          │ (@react-simp..) │
    ├──────────────┤          ├─────────────────┤
    │ • Vite       │          │ • useAvoidKB    │
    │ • Next.js    │          │ • useKeyboardH  │
    │ • Shared UI  │          │ • useNetworkSta │
    └──────────────┘          └─────────────────┘
```

---

## 주요 컴포넌트와 책임

### 1. 문서 사이트 (VitePress 기반)

#### 1.1 랜딩 페이지 (`/mobile`)

**책임**: @react-simplikit/mobile의 첫 인상 제공

**구조**:

```
/mobile/index.md
├── Hero Section
│   ├── 헤드라인: "Mobile Web, Simplified"
│   ├── 부제: 모바일 웹 개발의 고통점 해결
│   └── CTA: "See Live Demo" (QR Code)
│
├── Problem Section
│   ├── 문제 1: Viewport 이슈 (iOS Safari)
│   ├── 문제 2: Keyboard 가림 문제
│   ├── 문제 3: Layout Shift
│   └── 문제 4: Network 상태 감지 어려움
│
├── Solution Grid
│   ├── useAvoidKeyboard - 키보드 자동 회피
│   ├── useKeyboardHeight - 키보드 높이 감지
│   ├── useVisualViewport - 실시간 뷰포트 추적
│   ├── useScrollDirection - 스크롤 방향 감지
│   ├── useBodyScrollLock - 스크롤 잠금 제어
│   └── useNetworkStatus - 네트워크 상태 모니터링
│
├── Feature Highlights (데모별 QR)
│   ├── QR Code 1: Live Keyboard Demo
│   ├── QR Code 2: Viewport Behavior
│   └── QR Code 3: Network Status
│
└── Getting Started
    ├── Installation
    ├── Quick Example
    └── Full Documentation Link
```

**컴포넌트**:

- `LandingHero`: 메인 영역
- `ProblemCard`: 각 문제점 설명
- `SolutionGrid`: 솔루션 그리드
- `QRCodeDemo`: QR 코드 + 설명
- `FeatureShowcase`: 기능별 데모 연결

#### 1.2 API 레퍼런스 (`/mobile/api/`)

**책임**: 모든 Hooks/Utils의 상세 문서 제공

**구조**:

```
/mobile/api/
├── hooks/
│   ├── useAvoidKeyboard.md
│   ├── useKeyboardHeight.md
│   ├── useVisualViewport.md
│   ├── useScrollDirection.md
│   ├── useBodyScrollLock.md
│   └── useNetworkStatus.md
│
├── utils/
│   └── (필요시 추가)
│
└── _layout.md (공통 구조)
```

**각 API 문서 구조**:

````markdown
# useAvoidKeyboard

## 개요

[한 문장 설명]

## 문제 상황

[왜 필요한가? 실제 사용 사례]

## 기본 사용법

```tsx
const { ref, isKeyboardVisible } = useAvoidKeyboard();
```
````

## Live Demo (with QR)

[QR 코드 링크 + iframe 데모]

## API Reference

[타입, 옵션, 반환값]

## 예제

[실제 사용 코드 예제]

## 주의사항

[브라우저 호환성, 성능, 제약사항]

## 관련 Hooks

[연관된 다른 Hooks]

```

#### 1.3 다국어 지원
**기존 VitePress 설정 활용**:
```

/mobile/index.md (영어)
/mobile/ko/index.md (한국어)
/mobile/api/hooks/... (영어)
/mobile/api/ko/hooks/... (한국어)

```

---

### 2. 데모 앱 아키텍처

#### 2.1 Shared Demo Components (`packages/examples/shared`)
**책임**: 모든 데모에서 재사용 가능한 UI 컴포넌트 제공

**구조**:
```

packages/examples/shared/src/
├── components/
│ ├── DemoLayout.tsx # 모든 데모의 기본 레이아웃
│ ├── StatusCard.tsx # 상태 표시 카드
│ ├── StatusRow.tsx # 상태 행
│ ├── CodeBlock.tsx # 코드 블록
│ ├── Button.tsx # 버튼
│ ├── Card.tsx # 일반 카드
│ ├── InfoBox.tsx # 정보 박스
│ ├── Dialog.tsx # 다이얼로그
│ └── QRCode.tsx # QR 코드 표시
│
├── hooks/
│ └── useMobileDevice.ts # 모바일 기기 감지
│
└── theme/
├── colors.ts
├── spacing.ts
└── typography.ts

````

**DemoLayout 컴포넌트**:
```tsx
<DemoLayout
  title="useAvoidKeyboard"
  description="키보드 자동 회피"
  qrCode="https://..."
>
  {/* 상태 표시 */}
  {/* 데모 영역 */}
  {/* 코드 예제 */}
</DemoLayout>
````

#### 2.2 Vite 데모 앱 (`examples/with-vite`)

**책임**: QR 타겟, 빠른 개발 경험

**구조**:

```
examples/with-vite/
├── src/
│   ├── pages/
│   │   ├── demos/
│   │   │   ├── useAvoidKeyboardDemo.tsx
│   │   │   ├── useKeyboardHeightDemo.tsx
│   │   │   ├── useVisualViewportDemo.tsx
│   │   │   ├── useScrollDirectionDemo.tsx
│   │   │   ├── useBodyScrollLockDemo.tsx
│   │   │   └── useNetworkStatusDemo.tsx
│   │   ├── index.tsx            # 데모 목록
│   │   └── [demoId].tsx         # 동적 라우팅
│   │
│   ├── components/
│   │   └── Navigation.tsx
│   │
│   └── App.tsx
│
├── index.html
├── vite.config.ts
└── package.json
```

**라우팅**:

- `/` - 데모 목록 (모든 Hook의 설명 + QR)
- `/demos/use-avoid-keyboard` - useAvoidKeyboard 데모
- `/demos/use-keyboard-height` - useKeyboardHeight 데모
- ...

#### 2.3 Next.js 데모 앱 (`examples/with-nextjs`)

**책임**: 프로덕션 배포, SEO, 모바일 체험

**구조**:

```
examples/with-nextjs/
├── app/
│   ├── demos/
│   │   ├── page.tsx                      # 데모 목록
│   │   ├── [hookName]/
│   │   │   ├── page.tsx                  # 개별 데모
│   │   │   └── layout.tsx                # 데모 레이아웃
│   │   │
│   │   ├── use-avoid-keyboard/page.tsx
│   │   ├── use-keyboard-height/page.tsx
│   │   ├── use-visual-viewport/page.tsx
│   │   ├── use-scroll-direction/page.tsx
│   │   ├── use-body-scroll-lock/page.tsx
│   │   └── use-network-status/page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx                          # 메인 랜딩
│   └── api/
│       └── og/                           # OG 이미지 생성
│
├── public/
│   ├── qr/
│   │   ├── avoid-keyboard.svg
│   │   ├── keyboard-height.svg
│   │   └── ...
│   │
│   └── images/
│
├── next.config.ts
└── package.json
```

**Next.js 특화 기능**:

```tsx
// app/demos/use-avoid-keyboard/page.tsx
export async function generateMetadata() {
  return {
    title: 'useAvoidKeyboard Demo - @react-simplikit/mobile',
    description: '키보드 자동 회피 기능 실시간 데모',
    openGraph: {
      images: ['/api/og?hook=useAvoidKeyboard'],
    },
  };
}

export default function Page() {
  return <UseAvoidKeyboardDemo />;
}
```

---

### 3. 문서 생성 파이프라인

**목표**: 코드 주석에서 자동으로 API 문서 생성

**구조**:

```
.scripts/
├── generate-docs.ts
│   ├── parseHookComments()      # JSDoc 파싱
│   ├── generateMarkdown()       # Markdown 생성
│   └── validateDocumentation() # 검증
│
└── templates/
    ├── hook-api.md
    ├── util-api.md
    └── example-code.ts
```

**사용 흐름**:

```
packages/mobile/src/hooks/useAvoidKeyboard.ts
  ↓ (JSDoc comment)
  ↓
.scripts/generate-docs.ts
  ↓
src/mobile/api/hooks/useAvoidKeyboard.md (생성)
  ↓
VitePress 빌드
  ↓
https://react-simplikit.slash.page/mobile/api/hooks/use-avoid-keyboard
```

---

## 사이트 구조 (URL/네비게이션)

### 기본 URL 구조

```
react-simplikit.slash.page/
│
├── /                                    # 메인 홈 (기존)
│   ├── (components, hooks, utils)      # 기존 react-simplikit
│   └── (design principles, etc)
│
└── /mobile/                             # NEW: @react-simplikit/mobile
    ├── index.md                         # 랜딩 페이지
    │   ├── Hero
    │   ├── Problem Section (4가지)
    │   ├── Solution Grid (6가지 Hook)
    │   ├── Live Demos (QR Codes)
    │   └── Getting Started
    │
    ├── /api/                            # API 레퍼런스
    │   ├── hooks/
    │   │   ├── use-avoid-keyboard/
    │   │   │   ├── index.md             # 문서
    │   │   │   └── ko/index.md          # 한국어
    │   │   ├── use-keyboard-height/
    │   │   ├── use-visual-viewport/
    │   │   ├── use-scroll-direction/
    │   │   ├── use-body-scroll-lock/
    │   │   └── use-network-status/
    │   │
    │   └── utils/
    │       └── (필요시 추가)
    │
    ├── /ko/                             # 한국어 버전
    │   ├── index.md                     # 랜딩 (한국어)
    │   └── api/hooks/...
    │
    ├── /guide/                          # 가이드
    │   ├── installation.md
    │   ├── quick-start.md
    │   ├── use-cases.md
    │   └── migration.md                 # 기존 라이브러리에서 마이그레이션
    │
    ├── /examples/                       # 코드 예제 링크
    │   ├── keyboard-handling.md
    │   ├── form-layout.md
    │   └── chat-app.md
    │
    └── /troubleshooting/               # 문제 해결
        ├── keyboard-not-detected.md
        ├── layout-shifts.md
        └── browser-compatibility.md
```

### 내비게이션 구조

```
Header Navigation:
┌────────────────────────────────────────────────────┐
│ Logo │ Home │ Docs │ Reference │ Demo │ GitHub │   │
└────────────────────────────────────────────────────┘
       │          │                 │
       ▼          ▼                 ▼
    Main       /mobile/api/    examples/with-vite
   (기존)   /mobile/guide/
```

### Sidebar Navigation

**English**:

```
Getting Started
├── Introduction
├── Installation
├── Quick Start
└── Why @react-simplikit/mobile?

API Reference
├── Hooks
│   ├── useAvoidKeyboard
│   ├── useKeyboardHeight
│   ├── useVisualViewport
│   ├── useScrollDirection
│   ├── useBodyScrollLock
│   └── useNetworkStatus
├── Utils
└── Examples

Resources
├── Browser Compatibility
├── Performance Tips
├── Troubleshooting
└── Contributing
```

**한국어** (동일 구조, 번역):

```
시작하기
├── 소개
├── 설치
├── 빠른 시작
└── 왜 @react-simplikit/mobile인가?

API 레퍼런스
├── Hooks
│   ├── useAvoidKeyboard
│   └── ...
└── ...
```

---

## 데모 앱 아키텍처 상세

### 데모 렌더링 워크플로우

```
User scans QR → https://demo.react-simplikit.slash.page/demos/use-avoid-keyboard

Next.js App (with-nextjs) / Vite App (with-vite)
  ↓
Layout 적용
  ├── Responsive Header
  ├── Mobile-first CSS
  └── Touch-friendly UI
  ↓
Demo Component 로드
  ├── useAvoidKeyboard Hook 실행
  ├── 상태 표시 (StatusCard)
  ├── 실시간 상호작용 영역
  └── 코드 예제 (CodeBlock)
  ↓
사용자 상호작용
  ├── 입력 필드 포커스 → 키보드 나타남
  ├── Hook 실행 → 자동 스크롤
  └── 상태 업데이트 실시간 표시
```

### 각 Demo 컴포넌트 구조

```tsx
// Examples: useAvoidKeyboardDemo.tsx

export function UseAvoidKeyboardDemo() {
  // 1. Hook 사용
  const { ref, isKeyboardVisible } = useAvoidKeyboard();

  // 2. 상태 관리
  const [inputValue, setInputValue] = useState('');

  return (
    <DemoLayout
      title="useAvoidKeyboard"
      description="키보드 자동 회피 기능"
      qrCode="https://..."
    >
      {/* Section 1: 실시간 상태 표시 */}
      <StatusCard title="Hook State" description="Current values">
        <StatusRow
          label="Keyboard Visible"
          value={isKeyboardVisible ? 'Yes' : 'No'}
          variant={isKeyboardVisible ? 'warning' : 'default'}
        />
        <StatusRow
          label="Input Value"
          value={inputValue || '(empty)'}
          monospace
        />
      </StatusCard>

      {/* Section 2: 인터랙티브 데모 */}
      <Card title="Try It Out">
        <InfoBox variant="info">
          <strong>Tip:</strong> 아래 입력 필드를 탭하면 키보드가 나타나고,
          useAvoidKeyboard가 자동으로 뷰를 조정합니다.
        </InfoBox>

        <div ref={ref}>
          <input
            type="text"
            placeholder="Tap to open keyboard..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <p>Keyboard status: {isKeyboardVisible ? 'Open' : 'Closed'}</p>
        </div>
      </Card>

      {/* Section 3: 코드 */}
      <Card title="Implementation">
        <CodeBlock code={EXAMPLE_CODE} />
      </Card>
    </DemoLayout>
  );
}
```

---

## 기술 선택과 근거

### 문서 사이트

| 영역           | 선택               | 근거                                                   |
| -------------- | ------------------ | ------------------------------------------------------ |
| **프레임워크** | VitePress          | 1) 기존 설정 재사용 가능 2) 마크다운 중심 3) 빠른 빌드 |
| **다국어**     | VitePress i18n     | 1) 기존 구조 활용 2) 파일 기반 관리                    |
| **배포**       | Vercel             | 1) Git 연동 2) 자동 빌드 3) 무료                       |
| **검색**       | Local Search       | 1) 기존 설정 2) 다국어 지원                            |
| **스타일**     | Toss Design System | 1) 브랜드 일관성 2) 반응형 지원                        |

### 데모 앱

| 영역              | 선택                  | 근거                                      |
| ----------------- | --------------------- | ----------------------------------------- |
| **Vite 앱**       | React + TypeScript    | 1) 빠른 개발 2) HMR 3) 가벼운 번들        |
| **Next.js 앱**    | App Router + React 19 | 1) SEO 2) OG 이미지 3) 프로덕션 준비      |
| **공유 컴포넌트** | Monorepo 패키지       | 1) 코드 재사용 2) 타입 안전성 3) 유지보수 |
| **배포**          | Vercel                | 1) 최적화 2) 성능 모니터링                |
| **모바일 최적화** | Viewport 메타태그     | 1) 기본 사항 2) Touch 이벤트 처리         |

### 문서 생성

| 영역       | 선택                        | 근거                                |
| ---------- | --------------------------- | ----------------------------------- |
| **방식**   | JSDoc 파싱                  | 1) 코드와 문서 동기화 2) 자동 생성  |
| **도구**   | TypeScript + comment-parser | 1) 정확한 파싱 2) 타입 정보 추출    |
| **아웃풋** | Markdown                    | 1) VitePress 호환 2) 버전 관리 용이 |

---

## 기존 문서와의 통합 전략

### 전략: 분리 + 연결

```
react-simplikit.slash.page/
├── /                              # 메인 (기존 react-simplikit)
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── 링크: "Mobile Web?" → /mobile
│
└── /mobile/                        # 새 섹션 (@react-simplikit/mobile)
    ├── 랜딩
    ├── /api/
    └── 링크: "Back to Main Docs" → /
```

### 이유

1. **명확한 경계**: 두 패키지의 명확한 구분
2. **독립적 관리**: 각 패키지의 다큐멘테이션 독립적 관리
3. **네비게이션 명확**: 사용자가 두 패키지 간 이동 가능
4. **SEO 이점**: 각각 고유의 콘텐츠 포커스

### 통합 방식

```markdown
<!-- src/index.md (기존 메인) -->

## 패키지

### react-simplikit

일반적인 React 유틸리티

### @react-simplikit/mobile

**NEW** - 모바일 웹 개발 특화
[새로운 모바일 패키지 탐색 →](/mobile)

---

<!-- src/mobile/index.md -->

[← 메인 문서로 돌아가기](/)
```

### VitePress 설정 변경 사항

```typescript
// .vitepress/config.mts
export default defineConfig({
  title: 'react-simplikit',
  locales: {
    root: {
      label: 'English',
      ...en,
      // 기존 레이아웃 유지
    },
    ko: {
      label: '한국어',
      ...ko,
    },
    // mobile은 /mobile 경로에 자동 포함됨
  },
  srcDir: 'src',
  rewrites: {
    'docs/ko/:document.md': 'ko/:document.md',
    'docs/en/:document.md': ':document.md',

    // 모바일 API 문서
    'mobile/:category/ko/:name.md': 'ko/mobile/:category/:name.md',
    'mobile/:category/:name.md': 'mobile/:category/:name.md',
  },
});
```

---

## 잠재적 리스크 및 대응 방안

### 1. 문서 동기화 문제

**리스크**: 코드 변경 시 문서 미갱신
**심각도**: 높음
**대응**:

- JSDoc 기반 자동 생성
- CI/CD: API 문서 변경 자동 감지
- 온보딩: 개발자 가이드에 "코드 주석 필수" 명시

```bash
# pre-commit hook
yarn docs:gen && git add src/mobile/api/**/*.md
```

### 2. 모바일 브라우저 호환성

**리스크**: 특정 브라우저에서 Hook 동작 실패
**심각도**: 높음
**대응**:

- 각 Hook별 호환성 테이블 명시
- 데모 앱에서 현재 브라우저 정보 표시
- Fallback 구현 지침 제공

```tsx
// 데모 앱: 호환성 경고
if (!('visualViewport' in window)) {
  return <CompatibilityWarning />;
}
```

### 3. QR 코드 유지보수

**리스크**: QR 코드 링크 변경 시 모든 문서 업데이트 필요
**심각도**: 중간
**대응**:

- 환경 변수로 Base URL 관리
- 데이터 파일로 QR 코드 URL 중앙화

```typescript
// .vitepress/shared.mts
export const DEMO_URLS = {
  useAvoidKeyboard:
    'https://demo.react-simplikit.slash.page/demos/use-avoid-keyboard',
  useKeyboardHeight:
    'https://demo.react-simplikit.slash.page/demos/use-keyboard-height',
  // ...
};
```

### 4. 성능 이슈 (데모 앱)

**리스크**: 많은 Hook 데모로 인한 번들 크기 증가
**심각도**: 중간
**대응**:

- 라우트별 코드 스플리팅
- 데모 컴포넌트 동적 임포트

```tsx
// Next.js
const UseAvoidKeyboardDemo = dynamic(
  () => import('@/demos/UseAvoidKeyboardDemo'),
  { loading: () => <SkeletonLoader /> }
);
```

### 5. 다국어 번역 관리

**리스크**: 영어/한국어 불일치, 번역 누락
**심각도**: 중간
**대응**:

- 번역 체크리스트 자동화
- i18n 키 검증 스크립트

```bash
# CI: 누락된 번역 감지
yarn i18n:validate
```

### 6. 데모 앱 배포 구분

**리스크**: 문서 사이트와 데모 앱 URL 혼동
**심각도**: 낮음
**대응**:

- 명확한 도메인 분리
- QR 코드에 명시적 레이블

```
문서: https://react-simplikit.slash.page/mobile/
데모: https://demo.react-simplikit.slash.page/
```

---

## 구현 로드맵

### Phase 1: 기반 구축 (1-2주)

- [ ] VitePress 구조 분리 (`/mobile` 경로)
- [ ] 랜딩 페이지 기본 틀
- [ ] Shared demo components 패키지 생성
- [ ] Vite/Next.js 데모 앱 기본 설정

### Phase 2: 콘텐츠 작성 (2-3주)

- [ ] API 문서 자동 생성 스크립트
- [ ] 각 Hook별 상세 문서 작성
- [ ] 각 데모 컴포넌트 구현
- [ ] 코드 예제 작성

### Phase 3: 다국어 + 배포 (1-2주)

- [ ] 한국어 번역
- [ ] i18n 검증
- [ ] Vercel 배포 설정
- [ ] QR 코드 생성 및 테스트

### Phase 4: 최적화 + 문서화 (1주)

- [ ] 성능 최적화
- [ ] 개발자 온보딩 문서
- [ ] 기여 가이드라인
- [ ] 사후 유지보수 계획

---

## 디렉토리 구조 (최종)

```
react-simplikit-mobile/
├── .vitepress/
│   ├── config.mts                    # VitePress 설정 (mobile 추가)
│   ├── en.mts                        # 영어 설정
│   ├── ko.mts                        # 한국어 설정
│   ├── components/
│   │   ├── LandingHero.vue
│   │   ├── ProblemCard.vue
│   │   ├── SolutionGrid.vue
│   │   ├── QRCodeDemo.vue
│   │   └── FeatureShowcase.vue
│   └── theme/
│       └── custom-blocks.ts
│
├── src/
│   ├── index.md                      # 메인 홈 (기존)
│   │
│   ├── mobile/
│   │   ├── index.md                  # NEW: 랜딩 페이지
│   │   ├── guide/
│   │   │   ├── installation.md
│   │   │   ├── quick-start.md
│   │   │   └── use-cases.md
│   │   │
│   │   ├── api/
│   │   │   ├── hooks/
│   │   │   │   ├── use-avoid-keyboard.md
│   │   │   │   ├── use-keyboard-height.md
│   │   │   │   ├── use-visual-viewport.md
│   │   │   │   ├── use-scroll-direction.md
│   │   │   │   ├── use-body-scroll-lock.md
│   │   │   │   └── use-network-status.md
│   │   │   │
│   │   │   └── utils/
│   │   │       └── (필요시)
│   │   │
│   │   ├── examples/
│   │   │   ├── keyboard-form.md
│   │   │   ├── chat-app.md
│   │   │   └── responsive-layout.md
│   │   │
│   │   └── ko/                       # 한국어 버전 (동일 구조)
│   │       ├── index.md
│   │       ├── api/hooks/...
│   │       └── ...
│   │
│   └── docs/ (기존 구조)
│
├── packages/
│   ├── mobile/                       # 기존 라이브러리
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   │   ├── useAvoidKeyboard.ts
│   │   │   │   ├── useKeyboardHeight.ts
│   │   │   │   ├── useVisualViewport.ts
│   │   │   │   ├── useScrollDirection.ts
│   │   │   │   ├── useBodyScrollLock.ts
│   │   │   │   └── useNetworkStatus.ts
│   │   │   └── utils/
│   │   │
│   │   └── test/
│   │
│   └── examples/
│       ├── shared/                   # NEW: 공유 컴포넌트
│       │   ├── src/
│       │   │   ├── components/
│       │   │   │   ├── DemoLayout.tsx
│       │   │   │   ├── StatusCard.tsx
│       │   │   │   ├── StatusRow.tsx
│       │   │   │   ├── CodeBlock.tsx
│       │   │   │   ├── Button.tsx
│       │   │   │   ├── Card.tsx
│       │   │   │   ├── InfoBox.tsx
│       │   │   │   ├── Dialog.tsx
│       │   │   │   └── QRCode.tsx
│       │   │   │
│       │   │   ├── hooks/
│       │   │   │   └── useMobileDevice.ts
│       │   │   │
│       │   │   └── theme/
│       │   │
│       │   └── package.json
│       │
│       ├── with-vite/               # 기존
│       │   ├── src/
│       │   │   ├── pages/
│       │   │   │   ├── demos/
│       │   │   │   │   ├── UseAvoidKeyboardDemo.tsx
│       │   │   │   │   ├── UseKeyboardHeightDemo.tsx
│       │   │   │   │   ├── UseVisualViewportDemo.tsx
│       │   │   │   │   ├── UseScrollDirectionDemo.tsx
│       │   │   │   │   ├── UseBodyScrollLockDemo.tsx
│       │   │   │   │   └── UseNetworkStatusDemo.tsx
│       │   │   │   ├── index.tsx    # 데모 목록
│       │   │   │   └── [demoId].tsx
│       │   │   └── components/
│       │   │       └── Navigation.tsx
│       │   │
│       │   └── index.html
│       │
│       └── with-nextjs/             # 기존
│           ├── app/
│           │   ├── demos/
│           │   │   ├── page.tsx     # 데모 목록
│           │   │   ├── layout.tsx
│           │   │   ├── [hookName]/
│           │   │   │   ├── page.tsx
│           │   │   │   └── layout.tsx
│           │   │   │
│           │   │   ├── use-avoid-keyboard/page.tsx
│           │   │   ├── use-keyboard-height/page.tsx
│           │   │   ├── use-visual-viewport/page.tsx
│           │   │   ├── use-scroll-direction/page.tsx
│           │   │   ├── use-body-scroll-lock/page.tsx
│           │   │   └── use-network-status/page.tsx
│           │   │
│           │   ├── page.tsx         # 메인
│           │   ├── layout.tsx
│           │   └── api/
│           │       └── og/
│           │
│           └── next.config.ts
│
├── .scripts/
│   ├── generate-docs.ts             # NEW: API 문서 자동 생성
│   ├── templates/
│   │   ├── hook-api.md
│   │   └── util-api.md
│   └── index.ts
│
└── .github/
    └── workflows/
        ├── docs-deploy.yml          # VitePress 배포
        └── demo-deploy.yml          # 데모 앱 배포
```

---

## 핵심 성공 요소

1. **명확한 가치 제안**: 랜딩 페이지에서 "왜 필요한가"를 즉시 전달
2. **실시간 데모**: QR 코드로 즉시 테스트 가능
3. **자동 문서 생성**: 코드와 문서 동기화
4. **모바일 중심**: 데모 앱이 진정한 모바일 체험 제공
5. **글로벌 접근성**: 한영 동시 지원

---

## 마이그레이션 경로

기존 사용자(react-simplikit → @react-simplikit/mobile):

````markdown
# 마이그레이션 가이드

## 패키지 변경

```bash
npm uninstall react-simplikit-mobile
npm install @react-simplikit/mobile
```
````

## 임포트 경로 변경

```diff
- import { useAvoidKeyboard } from 'react-simplikit-mobile'
+ import { useAvoidKeyboard } from '@react-simplikit/mobile'
```

## API 호환성

- 100% 호환 (동일한 Hook)
- 추가 기능: useNetworkStatus

```

---

## 결론

이 아키텍처는 @react-simplikit/mobile을 모바일 웹 개발의 표준 솔루션으로 포지셔닝합니다.
VitePress 기반의 통합 문서 사이트와 실시간 데모, 자동 문서 생성을 통해 개발자 경험을 극대화합니다.
```

---

## 마이그레이션 경로

기존 사용자(react-simplikit → @react-simplikit/mobile):

````markdown
# 마이그레이션 가이드

## 패키지 변경

```bash
npm uninstall react-simplikit-mobile
npm install @react-simplikit/mobile
```
````

## 임포트 경로 변경

```diff
- import { useAvoidKeyboard } from 'react-simplikit-mobile'
+ import { useAvoidKeyboard } from '@react-simplikit/mobile'
```

## API 호환성

- 100% 호환 (동일한 Hook)
- 추가 기능: useNetworkStatus

```

---

## 결론

이 아키텍처는 @react-simplikit/mobile을 모바일 웹 개발의 표준 솔루션으로 포지셔닝합니다.
VitePress 기반의 통합 문서 사이트와 실시간 데모, 자동 문서 생성을 통해 개발자 경험을 극대화합니다.
```
