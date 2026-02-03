# useAvoidKeyboard

A React hook to help fixed-bottom elements avoid the on-screen keyboard on mobile devices.

## Interface

```ts
function useAvoidKeyboard(options?: UseAvoidKeyboardOptions): UseAvoidKeyboardResult;
```

### Parameters

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `safeAreaBottom` | `number` | `0` | Base bottom offset in pixels when keyboard is hidden |
| `transitionDuration` | `number` | `200` | Transition duration in milliseconds for smooth animation |
| `transitionTimingFunction` | `string` | `'ease-out'` | Transition timing function for the animation |
| `immediate` | `boolean` | `true` | If true, gets the initial keyboard height on mount |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `style` | `CSSProperties` | CSS style object to apply to the fixed bottom element. Contains transform and transition properties. |

## Example

```tsx
function FixedBottomCTA() {
  const { style } = useAvoidKeyboard();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        ...style,
      }}
    >
      <button>Submit</button>
    </div>
  );
}
```

### With Safe Area Bottom

```tsx
// With safe area bottom offset (e.g., for iPhone home indicator)
function FixedBottomCTA() {
  const { style } = useAvoidKeyboard({ safeAreaBottom: 34 });

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        ...style,
      }}
    >
      <button>Submit</button>
    </div>
  );
}
```

## How It Works

This hook uses the Visual Viewport API to detect when the on-screen keyboard appears and calculates the appropriate `translateY` value to move the element above the keyboard. The transition is smoothly animated using CSS transitions.
