import { useEffect, useRef, useState } from 'react';

interface InspectorProps {
  title: string;
  data: Record<string, any>;
  highlight?: string[];
  position?: 'top' | 'bottom';
  collapsible?: boolean;
}

export function Inspector({
  title,
  data,
  highlight = [],
  position = 'bottom',
  collapsible = true,
}: InspectorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [highlightedKeys, setHighlightedKeys] = useState<Set<string>>(new Set());
  const prevDataRef = useRef<Record<string, any>>(data);

  useEffect(() => {
    const changedKeys = new Set<string>();

    Object.keys(data).forEach((key) => {
      if (prevDataRef.current[key] !== data[key]) {
        changedKeys.add(key);
      }
    });

    if (changedKeys.size > 0) {
      setHighlightedKeys(changedKeys);
      const timer = setTimeout(() => {
        setHighlightedKeys(new Set());
      }, 600);

      prevDataRef.current = { ...data };
      return () => clearTimeout(timer);
    }
  }, [data]);

  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <div
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderTop: position === 'bottom' ? '1px solid var(--color-gray-300)' : 'none',
        borderBottom: position === 'top' ? '1px solid var(--color-gray-300)' : 'none',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-inspector)',
        backdropFilter: 'blur(10px)',
        paddingBottom: position === 'bottom' ? 'env(safe-area-inset-bottom)' : 0,
        paddingTop: position === 'top' ? 'env(safe-area-inset-top)' : 0,
      }}
    >
      {/* Header */}
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        disabled={!collapsible}
        style={{
          width: '100%',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          backgroundColor: 'var(--color-gray-100)',
          border: 'none',
          cursor: collapsible ? 'pointer' : 'default',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 'var(--touch-target-min)',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-gray-900)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </span>
        {collapsible && (
          <span
            style={{
              fontSize: '20px',
              color: 'var(--color-gray-600)',
              transition: 'transform var(--transition-fast)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </span>
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div
          style={{
            padding: 'var(--spacing-md)',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontFamily: 'Monaco, Menlo, monospace',
              fontSize: '13px',
            }}
          >
            {Object.entries(data).map(([key, value]) => {
              const isHighlighted = highlightedKeys.has(key) || highlight.includes(key);
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    marginBottom: 'var(--spacing-xs)',
                    backgroundColor: isHighlighted
                      ? 'var(--color-warning)'
                      : 'var(--color-gray-50)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background-color var(--transition-base)',
                    animation: highlightedKeys.has(key) ? 'highlight 600ms ease-out' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: 'var(--color-gray-700)',
                      marginRight: 'var(--spacing-md)',
                    }}
                  >
                    {key}:
                  </span>
                  <span
                    style={{
                      color: 'var(--color-primary)',
                      fontWeight: highlightedKeys.has(key) ? 700 : 400,
                      textAlign: 'right',
                      wordBreak: 'break-all',
                    }}
                  >
                    {formatValue(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
