import type { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
  minHeight?: string;
}

export function Section({ id, title, children, style, minHeight = '400px' }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        minHeight,
        padding: 'var(--spacing-xl)',
        marginBottom: 'var(--spacing-md)',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {title && (
        <h2
          style={{
            margin: '0 0 var(--spacing-lg) 0',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-gray-900)',
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
