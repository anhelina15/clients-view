import { createHashRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/features/routing/consts/routesPath';
import AppLayout from '@/features/routing/components/AppLayout';
import RouterErrorWrapper from '@/features/routing/components/RouterErrorWrapper';
import CompaniesContainer from '@/features/companies/CompaniesContainer';
import WelcomeScreen from '@/features/auth/components/WelcomeScreen';

export const AuthenticatedRouter = () =>
  createHashRouter([
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

export const UnauthenticatedRouter = () =>
  createHashRouter([
    {
      path: ROUTES.HOME,
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
    {
      path: ROUTES.LOGIN,
      element: <WelcomeScreen />,
      errorElement: <RouterErrorWrapper />,
    },
    {
      path: '*',
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ]);
