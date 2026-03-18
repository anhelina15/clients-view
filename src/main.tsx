import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import RoutingContainer from '@/features/routing/RoutingContainer.tsx';
import ErrorFallback from '@/features/routing/components/ErrorFallback.tsx';
import { QueryProvider } from '@/shared/providers/QueryProvider.tsx';

import '@/index.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
        <RoutingContainer />
      </ErrorBoundary>
    </QueryProvider>
  </StrictMode>,
);
