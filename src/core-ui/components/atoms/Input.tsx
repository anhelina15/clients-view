import { tv } from 'tailwind-variants';
import { forwardRef } from 'react';

import { focusable } from '@/core-ui/utils/focusable';

const inputStyles = tv({
  extend: focusable,
  base: 'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm',
  variants: {
    error: {
      true: 'border-destructive focus-visible:ring-destructive',
      false: 'focus-visible:ring-primary',
    },
  },
  defaultVariants: {
    error: false,
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={error}
        data-slot="input"
        className={inputStyles({ error, class: className })}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
