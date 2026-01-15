import { useState, useEffect } from 'react';
import { useBodyScrollLock } from '@react-simplikit/mobile';

import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { DemoLayout } from '../../components/DemoLayout.tsx';

// Body scroll lock wrapper component
function BodyScrollLock() {
  useBodyScrollLock();
  return null;
}

export function UseBodyScrollLockDemo() {
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

      <div className="space-y-6 pb-32">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Lock State</CardTitle>
            <CardDescription>Real-time body scroll lock status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Modal 1:</span>
              <span className={showModal1 ? 'text-green-600' : 'text-gray-400'}>
                {showModal1 ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Modal 2:</span>
              <span className={showModal2 ? 'text-green-600' : 'text-gray-400'}>
                {showModal2 ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Body Locked:</span>
              <span className={hasModal ? 'text-red-600 font-semibold' : 'text-gray-400'}>
                {hasModal ? '🔒 Locked' : '🔓 Unlocked'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Scroll Y:</span>
              <span>{Math.round(scrollPosition)}px</span>
            </div>
          </CardContent>
        </Card>

        {/* Demo Section */}
        <Card>
          <CardHeader>
            <CardTitle>Demo: Nested Modals</CardTitle>
            <CardDescription>
              Click the button below to open Modal 1. Inside Modal 1, you can open Modal 2.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Key Pattern:</strong> Use a single <code className="bg-blue-100 px-1 rounded">useBodyScrollLock()</code> at the parent
                level when any modal is open, rather than individual locks in each modal.
              </p>
            </div>

            <Button onClick={() => setShowModal1(true)} className="w-full">
              Open Modal 1
            </Button>

            {/* Scrollable Content */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-2">Scroll this content</h3>
              <p className="text-sm text-gray-600 mb-4">
                Try scrolling this area. When a modal is open, the body scroll will be locked, but
                you can still scroll inside modals.
              </p>
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="text-sm text-gray-600 mb-2">
                  Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
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
          </CardContent>
        </Card>
      </div>

      {/* Modal 1 */}
      <Dialog open={showModal1} onOpenChange={setShowModal1}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modal 1</DialogTitle>
            <DialogDescription>
              This is Modal 1. The body scroll is now locked, but you can scroll inside this modal.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm">
              Try scrolling inside this modal - it works fine. But the background page is locked.
            </p>

            <Button onClick={() => setShowModal2(true)} className="w-full">
              Open Modal 2 (Nested)
            </Button>

            <div className="max-h-48 overflow-y-auto bg-gray-50 p-4 rounded">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-sm mb-2">
                  Modal 1 scrollable content line {i + 1}
                </p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal 2 (Nested) */}
      <Dialog open={showModal2} onOpenChange={setShowModal2}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal 2 (Nested)</DialogTitle>
            <DialogDescription>
              This is Modal 2, opened from Modal 1.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm">
              Even with nested modals, the body scroll lock works correctly because we use a single
              lock at the parent level.
            </p>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>💡 Tip:</strong> Close this modal first, then Modal 1. The body scroll will
                unlock only when both modals are closed.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DemoLayout>
  );
}
