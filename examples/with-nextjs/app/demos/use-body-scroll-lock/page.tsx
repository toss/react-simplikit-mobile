'use client';

import { useState, useEffect } from 'react';
import { useBodyScrollLock } from '@react-simplikit/mobile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">useBodyScrollLock</h1>
        <p className="text-gray-600">
          Prevent body scroll when modals are open. Demonstrates nested modals with correct lock pattern.
        </p>
      </div>

      {hasModal && <BodyScrollLock />}

      <div className="space-y-6 pb-32">
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

        <Card>
          <CardHeader>
            <CardTitle>Demo: Nested Modals</CardTitle>
            <CardDescription>
              Click the button to open Modal 1. Inside Modal 1, you can open Modal 2.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Key Pattern:</strong> Use a single useBodyScrollLock() at the parent level
              </p>
            </div>

            <Button onClick={() => setShowModal1(true)} className="w-full">
              Open Modal 1
            </Button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-2">Scroll this content</h3>
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="text-sm text-gray-600 mb-2">
                  Line {i + 1}: Lorem ipsum dolor sit amet.
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showModal1} onOpenChange={setShowModal1}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modal 1</DialogTitle>
            <DialogDescription>
              This is Modal 1. The body scroll is now locked.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Button onClick={() => setShowModal2(true)} className="w-full">
              Open Modal 2 (Nested)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal2} onOpenChange={setShowModal2}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal 2 (Nested)</DialogTitle>
            <DialogDescription>This is Modal 2, opened from Modal 1.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
