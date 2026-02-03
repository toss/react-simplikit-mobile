# useScrollDirection

A React hook to detect scroll direction. Returns scroll direction (up/down) and current scroll position.

## Interface

```ts
function useScrollDirection(options?: UseScrollDirectionOptions): ScrollDirectionState;
```

### Parameters

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `throttleMs` | `number` | `50` | Throttle interval in milliseconds |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `direction` | `'up' \| 'down' \| null` | Current scroll direction. `null` when no scroll has occurred yet. |
| `position` | `number` | Current scroll Y position in pixels. |

## Example

```tsx
function Header() {
  const { direction, position } = useScrollDirection();

  const isHidden = direction === 'down' && position > 100;

  return (
    <header className={isHidden ? 'hidden' : 'visible'}>
      My Header
    </header>
  );
}
```

### With Custom Throttle

```tsx
function Header() {
  const { direction } = useScrollDirection({ throttleMs: 100 });

  return (
    <header style={{ opacity: direction === 'down' ? 0 : 1 }}>
      My Header
    </header>
  );
}
```

## How It Works

- Uses the `scroll` event with passive listener for performance
- Throttled by default (50ms) to prevent excessive re-renders
- SSR-safe: Returns 0 for position during server-side rendering
