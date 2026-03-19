import { RouterProvider } from 'react-router-dom';

import { router } from '@/features/routing/consts/router';

const RoutingContainer = () => {
  return <RouterProvider router={router} />;
};

export default RoutingContainer;
