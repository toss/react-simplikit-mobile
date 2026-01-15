import type { CSSProperties, ReactNode } from 'react';

interface SimpleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export function SimpleButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style,
}: SimpleButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return '#d4d4d4';
    switch (variant) {
      case 'primary':
        return '#0070f3';
      case 'danger':
        return '#ee0000';
      case 'secondary':
        return '#e5e5e5';
      default:
        return '#0070f3';
    }
  };

  const getTextColor = () => {
    if (disabled) return '#737373';
    if (variant === 'secondary') return '#111827';
    return '#fff';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minHeight: '44px',
        padding: '12px 24px',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        width: fullWidth ? '100%' : 'auto',
        boxShadow: variant === 'secondary' ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(0.98)';
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}
