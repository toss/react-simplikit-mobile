import { useState } from 'react';

import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { useKeyboardAvoidBestPractice } from '../utils/useKeyboardAvoidBestPractice.ts';

// =============================================================================
// Metadata
// =============================================================================

export const method8Meta: MethodMeta = {
  id: 'fixed-input',
  name: '8. Fixed Input (Chat Style)',
  source: 'Common Pattern',
  sourceUrl: undefined,
  description:
    'Chat-style UI with fixed input at the bottom. This pattern is commonly used in messaging apps where the input field stays fixed at the bottom of the screen.',
  keyFeatures: [
    'Fixed input at bottom (chat style)',
    'Message list above input',
    'Keyboard avoidance for fixed input',
    'Auto-scroll to bottom on new message',
    'Best Practice hook integration',
  ],
  issues: ['Input field is always visible at bottom', 'Different UX from form-style inputs'],
  pros: [
    'Natural for chat/messaging apps',
    'Input always accessible',
    'Keyboard pushes input up smoothly',
    'No need to scroll to find input',
  ],
  cons: ['Takes screen space when keyboard closed', 'May need different approach for long messages'],
};

// =============================================================================
// Mock Messages
// =============================================================================

const INITIAL_MESSAGES = [
  { id: 1, text: 'Hello! This is a chat-style keyboard avoidance demo.', isUser: false },
  { id: 2, text: 'Try typing a message below.', isUser: false },
  { id: 3, text: 'The input stays fixed at the bottom.', isUser: false },
  { id: 4, text: 'When the keyboard opens, the input should move up smoothly.', isUser: false },
  { id: 5, text: 'This is useful for messaging apps!', isUser: true },
  { id: 6, text: 'Exactly! The keyboard avoidance ensures the input is always visible.', isUser: false },
  { id: 7, text: 'Try scrolling through the messages while the keyboard is open.', isUser: false },
  { id: 8, text: 'The input should stay docked above the keyboard.', isUser: false },
];

// =============================================================================
// Component
// =============================================================================

export function Method8FixedInput() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const { style, keyboardHeight, isKeyboardOpen, scale } = useKeyboardAvoidBestPractice({
    safeAreaBottom: 0,
    transitionDuration: 200,
    hideOnScroll: true,
    hideOnTouch: true,
  });

  const hasVKAPI = typeof navigator !== 'undefined' && 'virtualKeyboard' in navigator;

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { id: Date.now(), text: inputValue.trim(), isUser: true }]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method8Meta} />

        {/* Status Panel */}
        <div
          style={{
            backgroundColor: '#fef3c7',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #f59e0b',
          }}
        >
          <strong>Fixed Input Status:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>VirtualKeyboard API: {hasVKAPI ? '✅ Available' : '❌ Not available (using VisualViewport)'}</li>
            <li>Keyboard: {isKeyboardOpen ? `Open (${keyboardHeight}px)` : 'Closed'}</li>
            <li>Scale correction: {scale !== 1 ? `Active (${scale.toFixed(2)}x)` : 'Not needed'}</li>
            <li>Messages: {messages.length}</li>
          </ul>
        </div>

        {/* Message List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  backgroundColor: message.isUser ? '#3b82f6' : '#f3f4f6',
                  color: message.isUser ? '#fff' : '#1f2937',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Extra space for scrolling */}
        <div style={{ height: '100px' }} />
      </div>

      {/* Fixed Input Area */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          backgroundColor: '#fff',
          borderTop: '1px solid #e5e7eb',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          ...style,
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #d1d5db',
              borderRadius: '24px',
              outline: 'none',
              backgroundColor: '#f9fafb',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: inputValue.trim() ? '#3b82f6' : '#9ca3af',
              border: 'none',
              borderRadius: '24px',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
