export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div
      style={{
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          padding: '24px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
        }}
      >
        <h2
          style={{
            color: '#991b1b',
            marginTop: 0,
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          ⚠️ Something went wrong
        </h2>
        <p style={{ color: '#7f1d1d', marginBottom: '16px' }}>
          This demo encountered an error. This might happen if your browser doesn't support the
          required APIs.
        </p>
        <details style={{ marginTop: '16px' }}>
          <summary
            style={{
              cursor: 'pointer',
              color: '#991b1b',
              fontWeight: '500',
            }}
          >
            Error details
          </summary>
          <pre
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#fff',
              border: '1px solid #fecaca',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
            }}
          >
            {error.message}
          </pre>
        </details>
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
