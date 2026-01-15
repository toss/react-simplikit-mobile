'use client';

import type { ReactNode } from 'react';
import { ErrorBoundary } from '@suspensive/react';
import { ErrorFallback } from '@examples/shared';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary fallback={({ error, reset }) => <ErrorFallback error={error} resetErrorBoundary={reset} />}>
      {children}
    </ErrorBoundary>
  );
}
