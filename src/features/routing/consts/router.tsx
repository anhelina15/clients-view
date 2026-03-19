import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/features/routing/consts/routesPath';
import AppLayout from '@/features/routing/components/AppLayout';
import RouterErrorWrapper from '@/features/routing/components/RouterErrorWrapper';
import ClientsContainer from '@/features/clients/ClientsContainer';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    errorElement: <RouterErrorWrapper />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.CLIENTS} replace />,
      },
      {
        path: ROUTES.CLIENTS,
        element: <ClientsContainer />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.CLIENTS} replace />,
      },
    ],
  },
]);
