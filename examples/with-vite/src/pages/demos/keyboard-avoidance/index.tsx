import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DebugPanel } from './components/DebugPanel.tsx';
import { Method0BestPractice, method0Meta } from './methods/Method0BestPractice.tsx';
import { Method1Current, method1Meta } from './methods/Method1Current.tsx';
import { method2Meta, Method2TDS } from './methods/Method2TDS.tsx';
import { method3Meta, Method3Tossbank } from './methods/Method3Tossbank.tsx';
import { Method4FrontendMobile, method4Meta } from './methods/Method4FrontendMobile.tsx';
import { Method5FreezeGuard, method5Meta } from './methods/Method5FreezeGuard.tsx';
import { method6Meta, Method6Proposed } from './methods/Method6Proposed.tsx';
import { method7Meta, Method7NotionComplete } from './methods/Method7NotionComplete.tsx';

const METHODS = [
  { id: method0Meta.id, name: method0Meta.name, Component: Method0BestPractice },
  { id: method1Meta.id, name: method1Meta.name, Component: Method1Current },
  { id: method2Meta.id, name: method2Meta.name, Component: Method2TDS },
  { id: method3Meta.id, name: method3Meta.name, Component: Method3Tossbank },
  { id: method4Meta.id, name: method4Meta.name, Component: Method4FrontendMobile },
  { id: method5Meta.id, name: method5Meta.name, Component: Method5FreezeGuard },
  { id: method6Meta.id, name: method6Meta.name, Component: Method6Proposed },
  { id: method7Meta.id, name: method7Meta.name, Component: Method7NotionComplete },
] as const;

/**
 * Keyboard Avoidance Methods Comparison Demo
 *
 * Compare different approaches to handling iOS Safari keyboard issues:
 * 0. Best Practice (Recommended) - All best features combined
 * 1. Current useAvoidKeyboard - Basic transform
 * 2. TDS Method - Opacity hiding during scroll/touch
 * 3. Tossbank Method - Scroll position restore
 * 4. Frontend-Mobile Method - VirtualKeyboard API + rAF
 * 5. Freeze + Guard Method - Complete prevention
 * 6. Proposed Improvement - Best practices combined
 * 7. Notion Complete - Provider+Composer pattern (full implementation)
 */
export function KeyboardAvoidanceDemo() {
  const [activeMethod, setActiveMethod] = useState(METHODS[0].id);

  const ActiveComponent = METHODS.find(m => m.id === activeMethod)?.Component ?? Method0BestPractice;
  const activeMethodName = METHODS.find(m => m.id === activeMethod)?.name ?? '';

  const handleMethodChange = (methodId: string) => {
    setActiveMethod(methodId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Sticky Header with DebugPanel */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Debug Panel */}
        <DebugPanel methodName={activeMethodName} />

        {/* Navigation */}
        <div
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '12px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>
              ← Back
            </Link>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Keyboard Avoidance Comparison</h1>
          </div>

          {/* Method Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              overflowX: 'auto',
              paddingBottom: '4px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => handleMethodChange(method.id)}
                style={{
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: activeMethod === method.id ? 600 : 400,
                  color: activeMethod === method.id ? '#fff' : '#4b5563',
                  backgroundColor: activeMethod === method.id ? '#3b82f6' : '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {method.name.split('.')[0]}. {method.name.split(' ').slice(1, 3).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Method Content */}
      <ActiveComponent />

      {/* Instructions Footer */}
      <div
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          zIndex: 50,
          whiteSpace: 'nowrap',
        }}
      >
        📱 Test on iOS Safari for best results
      </div>
    </div>
  );
}

export default KeyboardAvoidanceDemo;
