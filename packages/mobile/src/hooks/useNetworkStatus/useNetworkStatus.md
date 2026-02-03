# useNetworkStatus

A React hook to access Network Information API. Provides raw network connection data.

## Interface

```ts
function useNetworkStatus(): NetworkStatus;
```

### Parameters

This hook takes no parameters.

### Return Value

Returns `NetworkStatus` object. All properties are `undefined` if API is not supported.

| Property | Type | Description |
|----------|------|-------------|
| `effectiveType` | `'slow-2g' \| '2g' \| '3g' \| '4g'` | Effective connection type based on network quality |
| `type` | `'wifi' \| 'cellular' \| 'ethernet' \| ...` | Physical connection type |
| `downlink` | `number` | Downlink speed in Mbps |
| `rtt` | `number` | Round-trip time in milliseconds |
| `saveData` | `boolean` | User's data saver preference |

## Example

```tsx
function AdaptiveImage() {
  const { effectiveType, saveData } = useNetworkStatus();

  // Determine quality based on your app's needs
  const useHighQuality = effectiveType === '4g' && !saveData;

  return (
    <img
      src={useHighQuality ? 'high-res.jpg' : 'low-res.jpg'}
      alt="Content"
    />
  );
}
```

### Video Autoplay Based on Network

```tsx
function VideoPlayer() {
  const { type, downlink } = useNetworkStatus();

  // Custom logic: only autoplay on wifi with good bandwidth
  const shouldAutoplay = type === 'wifi' && (downlink ?? 0) > 5;

  return <video src="video.mp4" autoPlay={shouldAutoplay} />;
}
```

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge (Android) | Full support |
| Chrome/Edge (Desktop) | Partial (effectiveType, downlink, rtt, saveData) |
| Firefox | Not supported |
| Safari | Not supported |

## References

- [Network Information API Spec](https://wicg.github.io/netinfo/)
- [MDN: Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
