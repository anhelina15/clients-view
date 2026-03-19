import {
  LayoutDashboard,
  AtSign,
  Calendar,
  Users,
  Briefcase,
  Clock,
  FileText,
  BarChart3,
} from 'lucide-react';

import SidebarOption from '@/features/routing/components/SidebarOption';
import SidebarCollapseToggle from '@/features/routing/components/SidebarCollapseToggle';
import { ROUTES } from '@/features/routing/consts/routesPath';
import { useDisclosure } from '@/core-ui/hooks/useDisclosure';
import AppLogo from '@/core-ui/components/atoms/AppLogo';
import { cn } from '@/shared/utils/cn';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Nástěnka', to: ROUTES.DASHBOARD },
  { icon: AtSign, label: 'Pošta', to: ROUTES.MAIL },
  { icon: Calendar, label: 'Kalendář', to: ROUTES.CALENDAR },
  { icon: Users, label: 'Adresář', to: ROUTES.CLIENTS },
  { icon: Briefcase, label: 'Obchod', to: ROUTES.DEALS },
  { icon: Clock, label: 'Aktivity', to: ROUTES.ACTIVITIES },
  { icon: FileText, label: 'Dokumenty', to: ROUTES.DOCUMENTS },
  { icon: BarChart3, label: 'Analýzy', to: ROUTES.ANALYSIS },
];

const Sidebar = () => {
  const [isOpen, { toggle }] = useDisclosure(false);

  return (
    <nav
      className={cn(
        'relative h-full shrink-0 transition-all duration-300 ease-in-out z-40',
        'flex flex-col gap-1 shadow-2xl border-r border-white/10 px-3',
        'bg-[linear-gradient(rgb(0,169,202)_0%,rgb(0,169,202)_0.34%,rgb(0,70,85)_100%)]',
        isOpen ? 'w-[180px]' : 'w-20',
      )}
    >
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        <AppLogo isOpen={isOpen} />

        <div className="flex flex-col flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <SidebarOption
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isOpen={isOpen}
            />
          ))}
        </div>
      </div>

      <SidebarCollapseToggle open={isOpen} toggle={toggle} />
    </nav>
  );
};

export default Sidebar;
