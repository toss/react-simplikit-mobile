# useBodyScrollLock

body 스크롤을 잠그는 React hook입니다. 모달, 오버레이 등 배경 스크롤을 방지해야 하는 UI 컴포넌트에 유용합니다.

## 인터페이스

```ts
function useBodyScrollLock(): void;
```

### 파라미터

이 hook은 파라미터를 받지 않습니다.

### 반환값

이 hook은 아무것도 반환하지 않습니다.

## 예제

```tsx
function Modal() {
  useBodyScrollLock();

  return <div className="modal">모달 내용</div>;
}
```

### 다중 모달 패턴

여러 개의 겹치는 모달이 있는 경우, 부모 레벨에서 단일 잠금을 사용하세요:

```tsx
function BodyScrollLock() {
  useBodyScrollLock();
  return null;
}

function App() {
  const hasModal = showModal1 || showModal2;

  return (
    <>
      {hasModal && <BodyScrollLock />}
      {showModal1 && <Modal1 />}
      {showModal2 && <Modal2 />}
    </>
  );
}
```

## 동작 방식

- 컴포넌트가 마운트될 때 자동으로 body 스크롤을 잠금
- 컴포넌트가 언마운트될 때 자동으로 body 스크롤 잠금 해제
- 내부적으로 참조 카운팅 메커니즘을 사용하여 중첩된 모달을 올바르게 처리
