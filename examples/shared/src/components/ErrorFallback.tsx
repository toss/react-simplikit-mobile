import { SimpleButton } from './SimpleButton';
import { SimpleCard } from './SimpleCard';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      style={{
        padding: '24px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
      }}
    >
      <SimpleCard title="⚠️ Something went wrong">
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#111827', marginBottom: '8px' }}>
            An error occurred while rendering this component:
          </p>
          <pre
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '14px',
              overflow: 'auto',
              color: '#ee0000',
              border: '1px solid #e5e5e5',
            }}
          >
            {error.message}
          </pre>
        </div>
        {error.stack && (
          <details style={{ marginBottom: '16px' }}>
            <summary
              style={{
                cursor: 'pointer',
                color: '#0070f3',
                marginBottom: '8px',
                fontSize: '14px',
              }}
            >
              View stack trace
            </summary>
            <pre
              style={{
                padding: '12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto',
                maxHeight: '300px',
                border: '1px solid #e5e5e5',
              }}
            >
              {error.stack}
            </pre>
          </details>
        )}
        <SimpleButton onClick={resetErrorBoundary} variant="primary" fullWidth>
          Try again
        </SimpleButton>
      </SimpleCard>
    </div>
  );
}
