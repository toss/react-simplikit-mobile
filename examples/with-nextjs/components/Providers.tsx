'use client';

import type { ReactNode } from 'react';
import { Theme } from '@radix-ui/themes';
import { ErrorFallback } from '@examples/shared';
import { ErrorBoundary } from '@suspensive/react';

import '@radix-ui/themes/styles.css';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
      <ErrorBoundary fallback={({ error, reset }) => <ErrorFallback error={error} resetErrorBoundary={reset} />}>
        {children}
      </ErrorBoundary>
    </Theme>
  );
}
