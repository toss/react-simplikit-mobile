import type { ReactNode } from 'react';

export interface PhoneTheme {
  phoneBg: string;
  notchBg: string;
  screenBg: string;
  errorColor: string;
  successColor: string;
  labelColor?: string;
}

export const themes: Record<string, PhoneTheme> = {
  default: {
    phoneBg: '#1f2937',
    notchBg: '#374151',
    screenBg: '#fff',
    errorColor: '#ef4444',
    successColor: '#10b981',
  },
  minimal: {
    phoneBg: '#000',
    notchBg: '#333',
    screenBg: '#fff',
    errorColor: '#000',
    successColor: '#000',
    labelColor: '#666',
  },
  developer: {
    phoneBg: '#1e293b',
    notchBg: '#334155',
    screenBg: '#fff',
    errorColor: '#ef4444',
    successColor: '#3b82f6',
  },
  foundation: {
    phoneBg: '#18181b',
    notchBg: '#27272a',
    screenBg: '#fafafa',
    errorColor: '#ef4444',
    successColor: '#22c55e',
  },
  darkModern: {
    phoneBg: '#1e293b',
    notchBg: '#334155',
    screenBg: '#f8fafc',
    errorColor: '#f472b6',
    successColor: '#38bdf8',
  },
  claudeCode: {
    phoneBg: '#141415',
    notchBg: '#1f1f21',
    screenBg: '#fafafa',
    errorColor: '#ef4444',
    successColor: '#d4a574',
  },
};

interface PhoneMockupProps {
  children: ReactNode;
  label?: string;
  variant?: 'default' | 'success' | 'error';
  theme?: PhoneTheme;
}

export function PhoneMockup({ children, label, variant = 'default', theme = themes.default }: PhoneMockupProps) {
  const borderColor = {
    default: theme.phoneBg,
    success: theme.successColor,
    error: theme.errorColor,
  }[variant];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 180,
          height: 360,
          backgroundColor: theme.phoneBg,
          borderRadius: 24,
          border: `3px solid ${borderColor}`,
          padding: 8,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            width: 60,
            height: 20,
            backgroundColor: theme.notchBg,
            borderRadius: 10,
            margin: '0 auto 8px',
          }}
        />
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 28px)',
            backgroundColor: theme.screenBg,
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
      {label && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: theme.labelColor || borderColor,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

interface BeforeAfterComparisonProps {
  theme?: PhoneTheme;
  accentColor?: string;
}

export function BeforeAfterComparison({ theme = themes.default, accentColor = '#3b82f6' }: BeforeAfterComparisonProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px 0',
      }}
    >
      {/* Before */}
      <PhoneMockup label="Before" variant="error" theme={theme}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Chat messages */}
          <div style={{ flex: 1, padding: 12, backgroundColor: '#f3f4f6' }}>
            <div
              style={{
                backgroundColor: '#e5e7eb',
                padding: 8,
                borderRadius: 12,
                fontSize: 11,
                marginBottom: 8,
                maxWidth: '80%',
              }}
            >
              Hello! How can I help?
            </div>
            <div
              style={{
                backgroundColor: accentColor,
                color: '#fff',
                padding: 8,
                borderRadius: 12,
                fontSize: 11,
                marginLeft: 'auto',
                maxWidth: '80%',
              }}
            >
              I have a question...
            </div>
          </div>
          {/* Keyboard covering input */}
          <div
            style={{
              height: '55%',
              backgroundColor: '#d1d5db',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Input hidden behind keyboard */}
            <div
              style={{
                padding: 8,
                backgroundColor: '#fff',
                borderTop: '1px solid #e5e7eb',
                opacity: 0.3,
              }}
            >
              <div
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: 8,
                  borderRadius: 20,
                  fontSize: 10,
                  color: '#9ca3af',
                }}
              >
                Type a message...
              </div>
            </div>
            {/* Keyboard */}
            <div style={{ flex: 1, padding: 4 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: 2,
                  marginBottom: 4,
                }}
              >
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                  <div
                    key={key}
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderRadius: 3,
                      padding: '4px 0',
                      fontSize: 8,
                      textAlign: 'center',
                    }}
                  >
                    {key}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(9, 1fr)',
                  gap: 2,
                  marginBottom: 4,
                  marginLeft: 6,
                }}
              >
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                  <div
                    key={key}
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderRadius: 3,
                      padding: '4px 0',
                      fontSize: 8,
                      textAlign: 'center',
                    }}
                  >
                    {key}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* X mark */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: theme.errorColor,
              fontSize: 48,
              fontWeight: 'bold',
              opacity: 0.8,
            }}
          >
            X
          </div>
        </div>
      </PhoneMockup>

      {/* After */}
      <PhoneMockup label="After" variant="success" theme={theme}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Chat messages - scrolled up */}
          <div style={{ flex: 1, padding: 12, backgroundColor: '#f3f4f6' }}>
            <div
              style={{
                backgroundColor: '#e5e7eb',
                padding: 8,
                borderRadius: 12,
                fontSize: 11,
                marginBottom: 8,
                maxWidth: '80%',
              }}
            >
              Hello! How can I help?
            </div>
            <div
              style={{
                backgroundColor: accentColor,
                color: '#fff',
                padding: 8,
                borderRadius: 12,
                fontSize: 11,
                marginLeft: 'auto',
                maxWidth: '80%',
              }}
            >
              I have a question...
            </div>
          </div>
          {/* Input visible above keyboard */}
          <div
            style={{
              padding: 8,
              backgroundColor: '#fff',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{
                backgroundColor: '#f3f4f6',
                padding: 8,
                borderRadius: 20,
                fontSize: 10,
                color: '#374151',
                border: `2px solid ${accentColor}`,
              }}
            >
              Type a message...
            </div>
          </div>
          {/* Keyboard */}
          <div
            style={{
              height: '45%',
              backgroundColor: '#d1d5db',
              padding: 4,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: 2,
                marginBottom: 4,
              }}
            >
              {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: 3,
                    padding: '4px 0',
                    fontSize: 8,
                    textAlign: 'center',
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: 2,
                marginBottom: 4,
                marginLeft: 6,
              }}
            >
              {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: 3,
                    padding: '4px 0',
                    fontSize: 8,
                    textAlign: 'center',
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          </div>
          {/* Checkmark */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              backgroundColor: theme.successColor,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            ✓
          </div>
        </div>
      </PhoneMockup>
    </div>
  );
}
