import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { cn } from '@/shared/utils/cn';
import { focusable } from '@/core-ui/utils/focusable';

interface SidebarOptionProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isActive?: boolean;
  isOpen?: boolean;
}

const sidebarOptionVariants = tv({
  extend: focusable,
  base: 'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative select-none',
  variants: {
    isActive: {
      true: 'bg-[#008ea9] text-white',
      false: 'text-white/80 hover:bg-white/10 hover:text-white',
    },
    isOpen: {
      true: '',
      false: 'justify-center',
    },
  },
  defaultVariants: {
    active: false,
    isOpen: true,
  },
});

const SidebarOption = ({ icon: Icon, label, to, isActive, isOpen }: SidebarOptionProps) => {
  return (
    <NavLink to={to} className={cn(sidebarOptionVariants({ isActive, isOpen }))}>
      <Icon size={isOpen ? 20 : 25} className={cn('shrink-0 transition-transform duration-300')} />
      {isOpen && (
        <span className="font-medium text-sm overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 items-center flex">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarOption;
