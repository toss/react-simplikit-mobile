# useVisualViewport

A React hook to track Visual Viewport changes. Returns the actual visible area in mobile WebView, which changes when the keyboard appears or the user zooms/scrolls.

## Interface

```ts
function useVisualViewport(): { viewport: VisualViewportState | null };
```

### Parameters

This hook takes no parameters.

### Return Value

Returns `{ viewport: VisualViewportState | null }`. `viewport` is `null` on SSR or if API is not supported.

| Property | Type | Description |
|----------|------|-------------|
| `viewport.width` | `number` | Viewport width in pixels |
| `viewport.height` | `number` | Viewport height in pixels |
| `viewport.offsetLeft` | `number` | Viewport left offset from the layout viewport |
| `viewport.offsetTop` | `number` | Viewport top offset. On iOS, becomes negative when keyboard appears. |
| `viewport.scale` | `number` | Pinch-zoom scaling factor. 1.0 = no zoom. |

## Example

```tsx
function CustomLayout() {
  const { viewport } = useVisualViewport();

  if (!viewport) {
    return <div>Visual Viewport not supported</div>;
  }

  const { width, height, scale } = viewport;
  const showFloatingUI = scale <= 1.3;

  return (
    <div style={{ height }}>
      {showFloatingUI && <FloatingButton />}
      Viewport-aware content
    </div>
  );
}
```

## Important Notes

- `viewport` is `null` on SSR or in browsers that don't support Visual Viewport API
- Always check for null before accessing viewport properties
- If you only need keyboard height, use `useKeyboardHeight()` instead

## How It Works

- Uses the Visual Viewport API to track viewport changes
- Listens to both `resize` and `scroll` events on the visual viewport
- Uses `startTransition` for non-blocking state updates
