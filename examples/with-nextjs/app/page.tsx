import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>@react-simplikit/mobile</h1>
      <p style={{ color: '#666' }}>Examples for Next.js (App Router)</p>

      <nav style={{ marginTop: 24 }}>
        <h2>Mobile Hooks</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Link href="/demos/use-body-scroll-lock" style={{ textDecoration: 'none' }}>
              <strong style={{ color: '#000' }}>useBodyScrollLock</strong>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  background: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                hook
              </span>
            </Link>
            <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Prevent body scroll (nested modals)</p>
          </li>

          <li style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Link href="/demos/use-scroll-direction" style={{ textDecoration: 'none' }}>
              <strong style={{ color: '#000' }}>useScrollDirection</strong>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  background: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                hook
              </span>
            </Link>
            <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Auto-hide navigation on scroll</p>
          </li>

          <li style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Link href="/demos/use-visual-viewport" style={{ textDecoration: 'none' }}>
              <strong style={{ color: '#000' }}>useVisualViewport</strong>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  background: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                hook
              </span>
            </Link>
            <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Keyboard height + zoom detection</p>
          </li>
        </ul>

        <h2 style={{ marginTop: 32 }}>Utils</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Link href="/demos/body-scroll-lock-util" style={{ textDecoration: 'none' }}>
              <strong style={{ color: '#000' }}>bodyScrollLock</strong>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  background: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                utils
              </span>
            </Link>
            <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Programmatic scroll lock control</p>
          </li>

          <li style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Link href="/demos/is-server" style={{ textDecoration: 'none' }}>
              <strong style={{ color: '#000' }}>isServer</strong>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  background: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                utils
              </span>
            </Link>
            <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Check if code is running on the server</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}
