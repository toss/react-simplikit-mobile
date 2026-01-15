import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

interface SimpleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
}

export function SimpleDialog({ open, onOpenChange, title, children, trigger }: SimpleDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '90vw',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
            animation: 'slideInUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <Dialog.Title
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              {title}
            </Dialog.Title>
            <Dialog.Close
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px',
                color: '#737373',
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close dialog"
            >
              ×
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Add required animations via CSS-in-JS style tag injection
if (typeof document !== 'undefined') {
  const styleId = 'simple-dialog-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInUp {
        from {
          transform: translate(-50%, -40%);
          opacity: 0;
        }
        to {
          transform: translate(-50%, -50%);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
