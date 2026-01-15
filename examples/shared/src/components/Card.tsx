import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
}

export function Card({ children, title, style }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-md)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: 'var(--spacing-md)',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            margin: '0 0 var(--spacing-md) 0',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-gray-900)',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
