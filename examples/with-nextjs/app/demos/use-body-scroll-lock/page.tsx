'use client';

import { useState, useEffect } from 'react';
import { useBodyScrollLock } from '@react-simplikit/mobile';
import { SimpleButton, SimpleCard, SimpleDialog } from '@examples/shared';
import { DemoLayout } from '@/components/DemoLayout';

// Body scroll lock wrapper component
function BodyScrollLock() {
  useBodyScrollLock();
  return null;
}

export default function UseBodyScrollLockDemo() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasModal = showModal1 || showModal2;

  return (
    <DemoLayout
      title="useBodyScrollLock"
      description="Prevent body scroll when modals are open. Demonstrates nested modals with correct lock pattern."
    >
      {/* Single lock at parent level */}
      {hasModal && <BodyScrollLock />}

      <div style={{ paddingBottom: '128px' }}>
        {/* Status Card */}
        <SimpleCard title="Lock State">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Real-time body scroll lock status</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ fontWeight: 500 }}>Modal 1:</span>
              <span style={{ color: showModal1 ? '#16a34a' : '#9ca3af' }}>
                {showModal1 ? 'Open' : 'Closed'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ fontWeight: 500 }}>Modal 2:</span>
              <span style={{ color: showModal2 ? '#16a34a' : '#9ca3af' }}>
                {showModal2 ? 'Open' : 'Closed'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ fontWeight: 500 }}>Body Locked:</span>
              <span style={{ color: hasModal ? '#dc2626' : '#9ca3af', fontWeight: hasModal ? 600 : 400 }}>
                {hasModal ? '🔒 Locked' : '🔓 Unlocked'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ fontWeight: 500 }}>Scroll Y:</span>
              <span>{Math.round(scrollPosition)}px</span>
            </div>
          </div>
        </SimpleCard>

        {/* Demo Section */}
        <SimpleCard title="Demo: Nested Modals">
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Click the button below to open Modal 1. Inside Modal 1, you can open Modal 2.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <p style={{ fontSize: '14px', color: '#1e3a8a', margin: 0 }}>
                <strong>Key Pattern:</strong> Use a single <code style={{ backgroundColor: '#dbeafe', padding: '2px 4px', borderRadius: '4px' }}>useBodyScrollLock()</code> at the parent
                level when any modal is open, rather than individual locks in each modal.
              </p>
            </div>

            <SimpleButton onClick={() => setShowModal1(true)} fullWidth>
              Open Modal 1
            </SimpleButton>

            {/* Scrollable Content */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', maxHeight: '384px', overflowY: 'auto' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px', margin: 0 }}>Scroll this content</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>
                Try scrolling this area. When a modal is open, the body scroll will be locked, but
                you can still scroll inside modals.
              </p>
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>
                  Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
          </div>
        </SimpleCard>

        {/* Code Example */}
        <SimpleCard title="Implementation Code">
          <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px', margin: 0 }}>
            <code>{`import { useState } from 'react';
import { useBodyScrollLock } from '@react-simplikit/mobile';

// ✅ Correct: Single lock wrapper
function BodyScrollLock() {
  useBodyScrollLock();
  return null;
}

function App() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const hasModal = showModal1 || showModal2;

  return (
    <>
      {/* Single lock at parent level */}
      {hasModal && <BodyScrollLock />}

      {showModal1 && (
        <Modal onClose={() => setShowModal1(false)}>
          <h2>Modal 1</h2>
          <button onClick={() => setShowModal2(true)}>
            Open Modal 2
          </button>
        </Modal>
      )}

      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
          <h2>Modal 2</h2>
        </Modal>
      )}
    </>
  );
}`}</code>
          </pre>
        </SimpleCard>
      </div>

      {/* Modal 1 */}
      <SimpleDialog open={showModal1} onOpenChange={setShowModal1} title="Modal 1">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          This is Modal 1. The body scroll is now locked, but you can scroll inside this modal.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px' }}>
            Try scrolling inside this modal - it works fine. But the background page is locked.
          </p>

          <SimpleButton onClick={() => setShowModal2(true)} fullWidth>
            Open Modal 2 (Nested)
          </SimpleButton>

          <div style={{ maxHeight: '192px', overflowY: 'auto', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '4px' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i} style={{ fontSize: '14px', marginBottom: '8px' }}>
                Modal 1 scrollable content line {i + 1}
              </p>
            ))}
          </div>
        </div>
      </SimpleDialog>

      {/* Modal 2 (Nested) */}
      <SimpleDialog open={showModal2} onOpenChange={setShowModal2} title="Modal 2 (Nested)">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          This is Modal 2, opened from Modal 1.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px' }}>
            Even with nested modals, the body scroll lock works correctly because we use a single
            lock at the parent level.
          </p>

          <div style={{ padding: '16px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
              <strong>💡 Tip:</strong> Close this modal first, then Modal 1. The body scroll will
              unlock only when both modals are closed.
            </p>
          </div>
        </div>
      </SimpleDialog>
    </DemoLayout>
  );
}
