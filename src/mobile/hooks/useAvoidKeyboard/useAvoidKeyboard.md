# useAvoidKeyboard

`useAvoidKeyboard` is a React hook that helps fixed-bottom elements avoid the on-screen keyboard on mobile devices. It uses the Visual Viewport API to calculate the exact keyboard height and returns CSS styles to smoothly move elements above the keyboard.

## Why useAvoidKeyboard?

On mobile browsers, especially iOS Safari, the on-screen keyboard can cover fixed-bottom elements like input fields, CTAs, and navigation bars. Standard solutions like `100vh`, `scrollIntoView`, or `resize` events don't work reliably.

`useAvoidKeyboard` solves this by:
- Using the Visual Viewport API for accurate keyboard height detection
- Providing smooth CSS transitions for natural animations
- Supporting both iOS Safari and Android Chrome
- Being SSR-safe with proper hydration handling

## Interface

```ts
function useAvoidKeyboard(options?: UseAvoidKeyboardOptions): UseAvoidKeyboardResult
```

### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `UseAvoidKeyboardOptions` | No | - | Configuration options for the hook |
| `options.safeAreaBottom` | `number` | No | `0` | Base bottom offset in pixels when keyboard is hidden. Useful for iPhone home indicator (34px) |
| `options.transitionDuration` | `number` | No | `200` | Transition duration in milliseconds for smooth animation |
| `options.transitionTimingFunction` | `string` | No | `'ease-out'` | Transition timing function for the animation |
| `options.immediate` | `boolean` | No | `true` | If true, gets the initial keyboard height on mount |

### Return Value

| Name | Type | Description |
|------|------|-------------|
| `style` | `CSSProperties` | CSS style object containing transform and transition properties. Apply this to your fixed-bottom element |

## Examples

### Basic Usage

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function ChatInput() {
  const { style } = useAvoidKeyboard()

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
      <input placeholder="Type a message..." />
    </div>
  )
}
```

### With Safe Area Bottom

For iPhones with home indicator, add `safeAreaBottom`:

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function FixedBottomCTA() {
  const { style } = useAvoidKeyboard({ safeAreaBottom: 34 })

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        ...style,
      }}
    >
      <button style={{ width: '100%' }}>Submit</button>
    </div>
  )
}
```

### Custom Animation

```tsx
import { useAvoidKeyboard } from '@react-simplikit/mobile'

function AnimatedInput() {
  const { style } = useAvoidKeyboard({
    transitionDuration: 300,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  })

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
      <input placeholder="Type here..." />
    </div>
  )
}
```

## How It Works

1. Uses `useKeyboardHeight` internally to subscribe to Visual Viewport changes
2. Calculates keyboard height from `window.innerHeight - visualViewport.height`
3. Returns a CSS `transform: translateY()` style to move the element up
4. Applies smooth CSS transition for natural animation

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 61+ | ✅ |
| Safari 13+ | ✅ |
| Firefox 91+ | ✅ |
| Edge 79+ | ✅ |
| Chrome Android | ✅ |
| Safari iOS 13+ | ✅ |

## Related Hooks

- `useKeyboardHeight` - Get raw keyboard height value
- `useVisualViewport` - Get full Visual Viewport state
