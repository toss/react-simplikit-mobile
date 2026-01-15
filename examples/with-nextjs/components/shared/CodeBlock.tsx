import { useState } from 'react';

import { Button } from './Button.tsx';

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: 'tsx' | 'ts' | 'jsx' | 'js';
  defaultOpen?: boolean;
}

export function CodeBlock({ title = 'View Source Code', code, defaultOpen = false }: CodeBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightSyntax = (code: string): string => {
    // Simple syntax highlighting with HTML
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|true|false|null|undefined)\b/g,
        '<span style="color: var(--color-primary); font-weight: 600;">$1</span>'
      )
      .replace(
        /(\/\/.*$)/gm,
        '<span style="color: var(--color-gray-500); font-style: italic;">$1</span>'
      )
      .replace(
        /(['"`])(.*?)\1/g,
        '<span style="color: var(--color-success);">$1$2$1</span>'
      );
  };

  return (
    <div
      style={{
        marginTop: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-gray-900)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 'var(--touch-target-min)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        <span>{title}</span>
        <span
          style={{
            fontSize: '20px',
            transition: 'transform var(--transition-fast)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </button>

      {/* Code Content */}
      {isOpen && (
        <div
          style={{
            position: 'relative',
          }}
        >
          {/* Copy Button */}
          <div
            style={{
              position: 'absolute',
              top: 'var(--spacing-sm)',
              right: 'var(--spacing-sm)',
              zIndex: 1,
            }}
          >
            <Button onClick={handleCopy} variant="secondary" style={{ fontSize: '12px', padding: '8px 12px' }}>
              {copied ? '✓ Copied!' : 'Copy'}
            </Button>
          </div>

          {/* Code */}
          <pre
            style={{
              margin: 0,
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-gray-50)',
              overflow: 'auto',
              fontSize: '13px',
              lineHeight: '1.6',
              fontFamily: 'Monaco, Menlo, monospace',
              maxHeight: '500px',
            }}
          >
            <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />
          </pre>
        </div>
      )}
    </div>
  );
}
