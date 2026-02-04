import type { CSSProperties, ReactNode } from 'react';

type FixedBottomCTAProps = {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
};

/**
 * Fixed bottom CTA button component
 * Style is controlled by parent method components
 */
export function FixedBottomCTA({ children, style, onClick }: FixedBottomCTAProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        backgroundColor: '#fff',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        ...style,
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 600,
          color: '#fff',
          backgroundColor: '#3b82f6',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        {children}
      </button>
    </div>
  );
}
