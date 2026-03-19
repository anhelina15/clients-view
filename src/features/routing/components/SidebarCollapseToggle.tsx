import { ChevronLeft } from 'lucide-react';

import Button from '@/core-ui/components/atoms/Button';
import { cn } from '@/shared/utils/cn';

interface SidebarCollapseToggleProps {
  open: boolean;
  toggle: () => void;
}

const SidebarCollapseToggle = ({ open, toggle }: SidebarCollapseToggleProps) => {
  return (
    <Button
      onClick={toggle}
      variant="outline"
      isFullWidth={false}
      className="flex group p-0 absolute h-7 w-7 -right-5 top-5 z-50 bg-white rounded-full shadow-lg border-slate-200 text-black hover:bg-[#0088a2] hover:border-[#0088a2]"
    >
      <ChevronLeft
        size={18}
        className={cn(
          'stroke-black group-hover:stroke-white transition-transform duration-300 origin-center',
          !open && 'rotate-180',
        )}
      />
    </Button>
  );
};

export default SidebarCollapseToggle;
