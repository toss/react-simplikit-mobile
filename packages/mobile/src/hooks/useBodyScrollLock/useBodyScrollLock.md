# useBodyScrollLock

A React hook to lock body scroll. Useful for modals, overlays, and other UI components that need to prevent background scrolling.

## Interface

```ts
function useBodyScrollLock(): void;
```

### Parameters

This hook takes no parameters.

### Return Value

This hook does not return anything.

## Example

```tsx
function Modal() {
  useBodyScrollLock();

  return <div className="modal">Modal content</div>;
}
```

### Multiple Modals Pattern

For multiple overlapping modals, use a single lock at the parent level:

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

## How It Works

- Automatically locks body scroll when the component mounts
- Automatically unlocks body scroll when the component unmounts
- Uses a ref-counting mechanism internally to handle nested modals correctly
