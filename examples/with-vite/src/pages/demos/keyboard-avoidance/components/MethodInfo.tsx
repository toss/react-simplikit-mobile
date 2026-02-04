import type { ReactNode } from 'react';

export type MethodMeta = {
  id: string;
  name: string;
  source: string;
  sourceUrl?: string;
  description: string;
  keyFeatures: string[];
  issues: string[];
  pros: string[];
  cons: string[];
};

type MethodInfoProps = {
  meta: MethodMeta;
};

/**
 * Displays information about a keyboard avoidance method
 */
export function MethodInfo({ meta }: MethodInfoProps) {
  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        fontSize: '14px',
      }}
    >
      <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>{meta.name}</h3>

      <p style={{ margin: '0 0 12px', color: '#6b7280' }}>{meta.description}</p>

      {meta.sourceUrl != null ? (
        <a
          href={meta.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '12px' }}
        >
          📁 {meta.source}
        </a>
      ) : (
        <span style={{ color: '#9ca3af', fontSize: '12px' }}>📁 {meta.source}</span>
      )}

      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <InfoSection title="Key Features" items={meta.keyFeatures} icon="⚙️" />
        <InfoSection title="Known Issues" items={meta.issues} icon="⚠️" color="#f59e0b" />
        <InfoSection title="Pros" items={meta.pros} icon="✅" color="#10b981" />
        <InfoSection title="Cons" items={meta.cons} icon="❌" color="#ef4444" />
      </div>
    </div>
  );
}

function InfoSection({
  title,
  items,
  icon,
  color = '#6b7280',
}: {
  title: string;
  items: string[];
  icon: ReactNode;
  color?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div style={{ fontWeight: 500, marginBottom: '4px', color }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563' }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: '2px' }}>
            {icon} {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
