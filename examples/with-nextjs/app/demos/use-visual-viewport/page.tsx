'use client';

import { useState } from 'react';
import { useVisualViewport } from '@react-simplikit/mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UseVisualViewportDemo() {
  const { viewport } = useVisualViewport();
  const [inputValue, setInputValue] = useState('');

  if (!viewport) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">useVisualViewport</h1>
          <p className="text-gray-600">Visual Viewport API not supported</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">
              ❌ Your browser doesn't support the Visual Viewport API.
              <br /><br />
              This API is available in:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>iOS Safari 13+</li>
              <li>Android Chrome 61+</li>
              <li>Desktop Chrome/Edge (with limited features)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { width, height, offsetTop, scale } = viewport;
  const keyboardHeight = -offsetTop;
  const isZoomed = scale > 1.3;
  const isKeyboardOpen = keyboardHeight > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">useVisualViewport</h1>
        <p className="text-gray-600">
          Track Visual Viewport changes: keyboard, zoom, and viewport dimensions
        </p>
      </div>

      <div className="space-y-6 pb-96">
        {/* Real-time Info */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Viewport State</CardTitle>
            <CardDescription>Real-time viewport information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span>Width:</span>
              <span>{Math.round(width)}px</span>
            </div>
            <div className="flex justify-between">
              <span>Height:</span>
              <span>{Math.round(height)}px</span>
            </div>
            <div className="flex justify-between">
              <span>Offset Top:</span>
              <span className={offsetTop !== 0 ? 'text-orange-600 font-semibold' : ''}>
                {Math.round(offsetTop)}px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Scale:</span>
              <span className={scale !== 1 ? 'text-orange-600 font-semibold' : ''}>
                {scale.toFixed(2)}x
              </span>
            </div>
            <div className="flex justify-between">
              <span>Keyboard Height (iOS):</span>
              <span className={keyboardHeight > 0 ? 'text-green-600 font-semibold' : ''}>
                {Math.round(keyboardHeight)}px
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Test */}
        <Card>
          <CardHeader>
            <CardTitle>1️⃣ Keyboard Height Detection (iOS)</CardTitle>
            <CardDescription>Tap the input to show keyboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Tap here to show keyboard"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 text-base border-2 rounded-lg focus:border-blue-500 focus:outline-none"
              style={{ backgroundColor: isKeyboardOpen ? '#fef3c7' : 'white' }}
            />

            {isKeyboardOpen && (
              <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="font-semibold">⌨️ Keyboard is open! Height: {Math.round(keyboardHeight)}px</p>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <strong>Platform Behavior:</strong>
              <br /><strong>iOS:</strong> offsetTop becomes negative when keyboard appears
              <br /><strong>Android:</strong> offsetTop typically remains 0
            </div>
          </CardContent>
        </Card>

        {/* Zoom Test */}
        <Card>
          <CardHeader>
            <CardTitle>2️⃣ Pinch-Zoom Detection</CardTitle>
            <CardDescription>Pinch-zoom in/out on this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-8 bg-gray-100 rounded-lg text-center">
              <p className="text-2xl font-semibold">Current Zoom: {scale.toFixed(2)}x</p>
              <p className="text-sm text-gray-600 mt-2">
                {scale === 1 && '✓ Normal (1.0x)'}
                {scale > 1 && scale <= 1.3 && '🔍 Zoomed In (≤ 1.3x)'}
                {scale > 1.3 && '🔍🔍 Heavily Zoomed (> 1.3x)'}
              </p>
            </div>

            {isZoomed && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-900">
                <p className="font-semibold">🔍 Heavy zoom detected! Floating UI hidden.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              <code>{`import { useVisualViewport } from '@react-simplikit/mobile';

function CustomLayout() {
  const { viewport } = useVisualViewport();

  if (!viewport) {
    return <div>Not supported</div>;
  }

  const { width, height, offsetTop, scale } = viewport;
  const keyboardHeight = -offsetTop;
  const isZoomed = scale > 1.3;

  return (
    <div style={{ height }}>
      {!isZoomed && <FloatingButton />}
      <div style={{ paddingBottom: keyboardHeight }}>
        Content
      </div>
    </div>
  );
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Floating Button */}
      {!isZoomed && (
        <Button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl"
          size="icon"
        >
          💬
        </Button>
      )}
    </div>
  );
}
