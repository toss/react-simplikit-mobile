import { useAvoidKeyboard } from '@react-simplikit/mobile';

import { FixedBottomCTA } from '../components/FixedBottomCTA.tsx';
import type { MethodMeta } from '../components/MethodInfo';
import { MethodInfo } from '../components/MethodInfo.tsx';
import { TestForm } from '../components/TestForm.tsx';

export const method1Meta: MethodMeta = {
  id: 'current',
  name: '1. Current useAvoidKeyboard',
  source: '@react-simplikit/mobile',
  sourceUrl: 'https://github.com/toss/react-simplikit',
  description:
    'The current implementation using visualViewport API to calculate keyboard height and return transform style.',
  keyFeatures: [
    'visualViewport.resize + scroll events',
    '16ms throttle (~60fps)',
    'Deduplication (skip if height unchanged)',
    'SSR safe with isServer() check',
  ],
  issues: [
    'iOS Safari: Screen jumps when input is focused',
    'Flickering during scroll/touch (VisualViewport event timing)',
    'No keyboard open/close state exposed',
  ],
  pros: ['Simple API - just returns style', 'Zero external dependencies', 'Good base implementation'],
  cons: [
    'No scroll/touch hiding',
    'No keyboard state (isOpen)',
    'SafeArea must be passed manually',
    'No iOS auto-scroll prevention',
  ],
};

export function Method1Current() {
  const { style } = useAvoidKeyboard({
    safeAreaBottom: 0,
    transitionDuration: 200,
  });

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '20px' }}>
        <MethodInfo meta={method1Meta} />
        <TestForm />
      </div>

      <FixedBottomCTA style={style}>Submit (Current)</FixedBottomCTA>
    </div>
  );
}
