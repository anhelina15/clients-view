import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

import { ErrorView } from '@/features/routing/components/ErrorView';

const ERROR_MESSAGES: Record<number, string> = {
  404: 'Stránka nebyla nalezena.',
  401: 'Nemáte oprávnění k přístupu.',
  503: 'Služba je dočasně nedostupná.',
};

const RouterErrorWrapper = () => {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;

  return <ErrorView status={status} message={ERROR_MESSAGES[status]} />;
};

export default RouterErrorWrapper;
