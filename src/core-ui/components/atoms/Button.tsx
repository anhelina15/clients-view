import { tv, type VariantProps } from 'tailwind-variants';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { focusable } from '@/core-ui/utils/focusable';

const buttonVariants = tv({
  extend: focusable,
  base: 'inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all active:scale-[0.98]',
  variants: {
    variant: {
      primary: 'bg-[#00a9ca] text-white hover:bg-[#008ea9]',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      outline: 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'bg-transparent text-inherit hover:bg-black/5',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: 'cursor-pointer',
    },
    isFullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
    size: {
      auto: 'h-fit',
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    isFullWidth: true,
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isDisabled?: boolean;
    isFullWidth?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, onClick, isDisabled = false, isFullWidth, className, size, variant, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={isDisabled}
        className={buttonVariants({
          isDisabled,
          size,
          variant,
          isFullWidth,
          className,
        })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
