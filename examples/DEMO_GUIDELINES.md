# Demo Page Guidelines

새로운 데모 페이지를 작성할 때 따라야 할 가이드라인입니다.

## 핵심 원칙

1. **로직이 먼저 보여야 한다** - 스타일 코드가 핵심 로직을 가리면 안 됨
2. **일관된 구조** - 모든 데모가 같은 패턴을 따름
3. **재사용 컴포넌트 활용** - 반복 패턴은 공유 컴포넌트로

## 데모 페이지 구조

```tsx
import { Button, Card, CodeBlock, InfoBox, StatusCard, StatusRow } from '@examples/shared';
import { useMyHook } from '@react-simplikit/mobile';
import { DemoLayout } from '../../components/DemoLayout';

// 1. 코드 예제 상수 (상단에 분리)
const EXAMPLE_CODE = `import { useMyHook } from '@react-simplikit/mobile';
...`;

export function MyHookDemo() {
  // 2. 핵심 훅 사용 (상단에 명확히)
  const { value } = useMyHook();

  return (
    <DemoLayout title="useMyHook" description="Hook description">
      {/* 3. 상태 표시 */}
      <StatusCard title="State" description="Real-time state">
        <StatusRow label="Value" value={value} monospace />
      </StatusCard>

      {/* 4. 데모 영역 */}
      <Card title="Demo">
        <InfoBox variant="info">
          <strong>Key Pattern:</strong> 핵심 패턴 설명
        </InfoBox>
        {/* Interactive demo */}
      </Card>

      {/* 5. 코드 예제 */}
      <Card title="Implementation Code">
        <CodeBlock code={EXAMPLE_CODE} />
      </Card>
    </DemoLayout>
  );
}
```

## 공유 컴포넌트

### StatusRow

상태 값을 key-value 형태로 표시합니다.

```tsx
<StatusRow
  label="Direction"
  value={direction || 'none'}
  variant="success"  // 'default' | 'success' | 'warning' | 'error' | 'muted'
  monospace          // 코드 값에 사용
/>
```

### StatusCard

여러 StatusRow를 그룹화합니다.

```tsx
<StatusCard title="Lock State" description="Real-time status">
  <StatusRow label="Locked" value="Yes" variant="error" />
  <StatusRow label="Position" value="100px" monospace />
</StatusCard>
```

### InfoBox

정보, 팁, 경고를 표시합니다.

```tsx
<InfoBox variant="info">    {/* 파란색 - 정보 */}
<InfoBox variant="tip">     {/* 노란색 - 팁 */}
<InfoBox variant="warning"> {/* 빨간색 - 경고 */}
<InfoBox variant="neutral"> {/* 회색 - 중립 */}
```

### CodeBlock

코드 예제를 표시합니다.

```tsx
const CODE = `function example() {
  return 'hello';
}`;

<CodeBlock code={CODE} />
```

## 파일 구조

```
examples/
├── shared/src/components/   # 공유 컴포넌트
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── CodeBlock.tsx
│   ├── Dialog.tsx
│   ├── InfoBox.tsx
│   ├── StatusCard.tsx
│   └── StatusRow.tsx
├── with-nextjs/app/demos/   # Next.js 데모
│   └── {hook-name}/page.tsx
└── with-vite/src/pages/demos/  # Vite 데모
    └── {HookName}Demo.tsx
```

## 체크리스트

새 데모 작성 시:

- [ ] 핵심 훅/유틸 사용이 파일 상단에 명확히 보임
- [ ] StatusCard로 실시간 상태 표시
- [ ] InfoBox로 핵심 패턴/팁 강조
- [ ] CodeBlock으로 사용 예제 제공
- [ ] Vite와 Next.js 양쪽에 동일 데모 존재
- [ ] 인라인 스타일 최소화 (공유 컴포넌트 활용)

## 예시: Before vs After

### Before (스타일이 로직을 가림)

```tsx
// 220줄, 핵심 로직이 스타일 사이에 묻힘
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
  <span style={{ fontWeight: 500 }}>Modal 1:</span>
  <span style={{ color: showModal1 ? '#16a34a' : '#9ca3af' }}>
    {showModal1 ? 'Open' : 'Closed'}
  </span>
</div>
```

### After (로직이 명확히 보임)

```tsx
// 164줄, 핵심 로직이 바로 보임
<StatusRow
  label="Modal 1"
  value={showModal1 ? 'Open' : 'Closed'}
  variant={showModal1 ? 'success' : 'muted'}
/>
```
