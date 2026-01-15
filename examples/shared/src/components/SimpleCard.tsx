import type { CSSProperties, ReactNode } from 'react';

interface SimpleCardProps {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
}

export function SimpleCard({ children, title, style }: SimpleCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '16px',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
