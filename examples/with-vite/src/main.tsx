import './index.css';
import '@radix-ui/themes/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import { KeyboardAvoidanceProvider } from '@react-simplikit/mobile';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeyboardAvoidanceProvider>
      <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
        <App />
      </Theme>
    </KeyboardAvoidanceProvider>
  </StrictMode>
);
