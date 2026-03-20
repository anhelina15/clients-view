import { tv } from 'tailwind-variants';
import { forwardRef, type LabelHTMLAttributes } from 'react';

const labelStyles = tv({
  base: 'text-sm font-medium leading-none text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-disabled:opacity-70',
});

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={labelStyles({ className })} {...props} />
  ),
);

Label.displayName = 'Label';

export { Label };
