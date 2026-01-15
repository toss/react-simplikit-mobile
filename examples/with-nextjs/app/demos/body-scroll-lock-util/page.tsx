'use client';

import { useEffect, useState } from 'react';
import { disableBodyScrollLock, enableBodyScrollLock } from '@react-simplikit/mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BodyScrollLockUtilDemo() {
  const [locked, setLocked] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    if (locked) {
      disableBodyScrollLock();
      setLocked(false);
    } else {
      enableBodyScrollLock();
      setLocked(true);
    }
  };

  const handleForceLock = () => {
    enableBodyScrollLock();
    setLocked(true);
  };

  const handleForceUnlock = () => {
    disableBodyScrollLock();
    setLocked(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">bodyScrollLock Utils</h1>
        <p className="text-gray-600">Programmatically control body scroll lock</p>
      </div>

      <div className="space-y-6 pb-32">
        {/* Status */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">{locked ? '🔒' : '🔓'}</div>
            <h2 className={`text-3xl font-bold ${locked ? 'text-red-600' : 'text-green-600'}`}>
              {locked ? 'LOCKED' : 'UNLOCKED'}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {locked ? 'Body scroll is locked. Try scrolling!' : 'Body scroll is unlocked.'}
            </p>
            <p className="text-sm text-gray-500 mt-1 font-mono">Scroll Y: {Math.round(scrollY)}px</p>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Test the scroll lock utilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleToggle} className="w-full" size="lg">
              {locked ? '🔓 Unlock Scroll' : '🔒 Lock Scroll'}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleForceLock} variant="outline">
                Force Lock
              </Button>
              <Button onClick={handleForceUnlock} variant="outline">
                Force Unlock
              </Button>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">How to test:</h4>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Click "Lock Scroll" and try to scroll - it won't work</li>
                <li>Click "Unlock Scroll" to restore scrolling</li>
                <li>Try Force Lock/Unlock for direct control</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Comparison */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>🪝 useBodyScrollLock Hook</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-semibold mb-2">Use when:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Lock tied to component lifecycle</li>
                <li>Managing modals, drawers</li>
                <li>Automatic cleanup on unmount</li>
              </ul>
              <pre className="mt-3 p-3 bg-gray-900 text-gray-100 rounded text-xs overflow-x-auto">
                <code>{`function Modal() {
  useBodyScrollLock();
  return <div>Modal</div>;
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔧 Utils (Current Demo)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-semibold mb-2">Use when:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Need programmatic control</li>
                <li>Complex lock/unlock logic</li>
                <li>Outside React components</li>
              </ul>
              <pre className="mt-3 p-3 bg-gray-900 text-gray-100 rounded text-xs overflow-x-auto">
                <code>{`const handleClick = () => {
  enableBodyScrollLock();
};`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Scrollable Content */}
        <Card>
          <CardHeader>
            <CardTitle>Scrollable Content</CardTitle>
            <CardDescription>Test area - try scrolling when locked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {Array.from({ length: 30 }).map((_, i) => (
                <p key={i} className="text-sm mb-2">
                  Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
