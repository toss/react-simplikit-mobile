import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Button } from './Button.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    // Swipe down to close (100px threshold)
    if (endY - startY > 100) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 'var(--z-overlay)',
          animation: 'fadeIn var(--transition-base)',
        }}
      />

      {/* Modal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-lg)',
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflow: 'auto',
          zIndex: 'var(--z-modal)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideInUp var(--transition-base)',
          width: '100%',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)',
            paddingBottom: 'var(--spacing-md)',
            borderBottom: '1px solid var(--color-gray-200)',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-gray-900)',
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 'var(--spacing-sm)',
              color: 'var(--color-gray-500)',
              minHeight: 'var(--touch-target-min)',
              minWidth: 'var(--touch-target-min)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        <div
          style={{
            marginTop: 'var(--spacing-lg)',
            paddingTop: 'var(--spacing-md)',
            borderTop: '1px solid var(--color-gray-200)',
          }}
        >
          <Button onClick={onClose} fullWidth>
            Close
          </Button>
        </div>
      </div>
    </>
  );
}
