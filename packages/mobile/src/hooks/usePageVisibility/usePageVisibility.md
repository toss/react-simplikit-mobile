# usePageVisibility

A React hook to detect page visibility changes. Monitors when the user switches tabs or minimizes the browser using the Page Visibility API.

## Interface

```ts
function usePageVisibility(): PageVisibility;
```

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isVisible` | `boolean` | True if page is currently visible to the user |
| `visibilityState` | `'visible' \| 'hidden'` | Current visibility state |

## Example

```tsx
function VideoPlayer() {
  const { isVisible } = usePageVisibility();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!isVisible) {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return <video ref={videoRef} src="video.mp4" />;
}
```

### Analytics Tracking

```tsx
function Analytics() {
  const { visibilityState } = usePageVisibility();

  useEffect(() => {
    if (visibilityState === 'hidden') {
      analytics.track('page_hidden');
    }
  }, [visibilityState]);

  return null;
}
```

## SSR Behavior

Returns `{ isVisible: true, visibilityState: 'visible' }` during server-side rendering.

## Use Cases

- Pausing/resuming animations or videos
- Stopping background tasks when tab is hidden
- Analytics tracking for time on page
- Saving draft content when user leaves
