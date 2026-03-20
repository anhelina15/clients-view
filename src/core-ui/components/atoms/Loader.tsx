import { tv, type VariantProps } from 'tailwind-variants';

const loaderVariants = tv({
  slots: {
    base: 'flex flex-col items-center justify-center gap-2',
    spinner: 'border-slate-200 border-t-cyan-500 rounded-full animate-spin',
    label: 'text-sm font-medium animate-pulse text-slate-400',
  },
  variants: {
    size: {
      sm: {
        base: 'gap-2',
        spinner: 'w-5 h-5 border-2',
      },
      md: {
        base: 'gap-4',
        spinner: 'w-8 h-8 border-2',
      },
      lg: {
        base: 'gap-6',
        spinner: 'w-10 h-10 border-4',
      },
    },
    variant: {
      default: {
        base: 'h-auto',
      },
      block: {
        base: 'h-full w-full flex-1',
      },
      fullPage: {
        base: 'h-dvh w-full',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'block',
  },
});

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
  label?: string;
}

const Loader = ({ className, size, variant, label }: LoaderProps) => {
  const { base, spinner, label: labelSlot } = loaderVariants({ size, variant });

  return (
    <div className={base({ className })}>
      <div className={spinner()}></div>
      {label && <span className={labelSlot()}>{label}</span>}
    </div>
  );
};

export default Loader;
