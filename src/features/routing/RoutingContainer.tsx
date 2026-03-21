import { RouterProvider } from 'react-router-dom';

import { useAuth } from '@/features/auth/contexts/AuthContext';
import { AuthenticatedRouter, UnauthenticatedRouter } from '@/features/routing/consts/routes';

const RoutingContainer = () => {
  const { isAuthenticated } = useAuth();

  const router = isAuthenticated ? AuthenticatedRouter() : UnauthenticatedRouter();

  return <RouterProvider router={router} />;
};

export default RoutingContainer;
