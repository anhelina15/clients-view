import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/features/routing/consts/routesPath';
import AppLayout from '@/features/routing/components/AppLayout';
import RouterErrorWrapper from '@/features/routing/components/RouterErrorWrapper';
import CompaniesContainer from '@/features/companies/CompaniesContainer';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    errorElement: <RouterErrorWrapper />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.COMPANIES} replace />,
      },
      {
        path: ROUTES.COMPANIES,
        element: <CompaniesContainer />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.COMPANIES} replace />,
      },
    ],
  },
]);
