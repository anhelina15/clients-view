import { RouterProvider } from 'react-router-dom';

import { router } from '@/features/routing/consts/router';
import WelcomeScreen from '@/features/auth/components/WelcomeScreen';
import { getFromStorage } from '@/shared/utils/storage';

const RoutingContainer = () => {
  const apiKey = getFromStorage('api_key');
  const user = getFromStorage('user');
  const instance = getFromStorage('instance');

  const isAuthenticated = !!(apiKey && user && instance);

  if (!isAuthenticated) {
    return <WelcomeScreen />;
  }

  return <RouterProvider router={router} />;
};

export default RoutingContainer;
