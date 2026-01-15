import type { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return 'var(--color-gray-300)';
    switch (variant) {
      case 'primary':
        return 'var(--color-primary)';
      case 'danger':
        return 'var(--color-danger)';
      case 'secondary':
        return 'var(--color-gray-200)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getTextColor = () => {
    if (disabled) return 'var(--color-gray-500)';
    if (variant === 'secondary') return 'var(--color-gray-900)';
    return '#fff';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minHeight: 'var(--touch-target-min)',
        padding: '12px 24px',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontSize: '16px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition-fast)',
        width: fullWidth ? '100%' : 'auto',
        boxShadow: variant === 'secondary' ? 'none' : 'var(--shadow-sm)',
        ...style,
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
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
