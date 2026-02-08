# useVisualViewport

React hook to track Visual Viewport changes.

Returns the actual visible area in mobile WebView, which changes when the keyboard appears or the user zooms/scrolls.

## Interface

### Parameters

This hook takes no parameters.

### Return Value

Returns an object with the following property:

| Property | Type | Description |
|----------|------|-------------|
| `viewport` | `VisualViewportState \| null` | Visual Viewport state object, or `null` if not supported (SSR or browser without Visual Viewport API) |

#### VisualViewportState Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Viewport width in pixels |
| `height` | `number` | Viewport height in pixels |
| `offsetLeft` | `number` | Viewport left offset (px) from the layout viewport. Typically 0 unless horizontal scrolling or panning occurs |
| `offsetTop` | `number` | Viewport top offset (px) from the layout viewport. On iOS: Becomes negative when keyboard appears (e.g., -300px means 300px keyboard height). On Android: Typically remains 0. Use `-offsetTop` to get accurate keyboard height on iOS |
| `scale` | `number` | Pinch-zoom scaling factor. 1.0 = no zoom (default), > 1.0 = zoomed in, < 1.0 = zoomed out (rare, depends on viewport settings) |

## Example

```tsx
function CustomLayout() {
  const { viewport } = useVisualViewport();

  // Always check for null first
  if (!viewport) {
    return <div>Visual Viewport not supported</div>;
  }

  const { width, height, offsetTop, scale } = viewport;

  // Hide floating UI when user zooms in
  const showFloatingUI = scale <= 1.3;

  return (
    <div style={{ height }}>
      {showFloatingUI && <FloatingButton />}
      Viewport-aware content
    </div>
  );
}
```

### Detecting Zoom

```tsx
const { viewport } = useVisualViewport();
if (viewport && viewport.scale > 1.3) {
  // Hide floating UI when user zooms in
  setShowFloatingButton(false);
}
```

## Notes

- **SSR Safety**: `viewport` is `null` on SSR or in browsers that don't support Visual Viewport API. Always check for null before accessing viewport properties.
- **Browser Support**: Visual Viewport API is supported in modern mobile browsers. For unsupported environments, the hook returns `null`.
- **Performance**: Uses React's `startTransition` to prevent blocking updates during viewport changes.
- **Simpler Alternative**: If you only need keyboard height, use `useKeyboardHeight()` instead for a simpler API.
- **Platform Differences**:
  - iOS: `offsetTop` becomes negative when keyboard appears
  - Android: `offsetTop` typically remains 0
- **Use Cases**:
  - Detecting keyboard appearance
  - Responding to pinch-zoom gestures
  - Creating viewport-aware layouts
  - Hiding/showing UI elements based on zoom level
