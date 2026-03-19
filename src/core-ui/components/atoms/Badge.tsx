import { tv, type VariantProps } from 'tailwind-variants';
import { type HTMLAttributes } from 'react';

const badgeVariants = tv({
  base: 'inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-[3px] text-xs leading-none font-medium whitespace-nowrap truncate',
  variants: {
    variant: {
      default: 'bg-slate-100 text-slate-600 border-slate-200',
      outline: 'bg-transparent border-slate-200 text-slate-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ children, variant, className, style, ...props }: BadgeProps) => {
  return (
    <span className={badgeVariants({ variant, class: className })} style={style} {...props}>
      {children}
    </span>
  );
};

export default Badge;
