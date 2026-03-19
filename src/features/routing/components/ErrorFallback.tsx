import type { FallbackProps } from 'react-error-boundary';

import { ErrorView } from '@/features/routing/components/ErrorView';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <ErrorView
      title="Něco se pokazilo"
      message="Omlouváme se, došlo k neočekávané chybě v aplikaci."
      technicalDetails={error instanceof Error ? error.message : String(error)}
      onReset={resetErrorBoundary}
    />
  );
};

export default ErrorFallback;
