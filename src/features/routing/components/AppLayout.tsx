import { Outlet } from 'react-router-dom';

import Sidebar from '@/features/routing/components/Sidebar';

const AppLayout = () => {
  return (
    <div className="flex h-dvh w-dvw overflow-hidden bg-slate-50 font-sans text-slate-900">
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col grow min-w-0 h-full relative">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
