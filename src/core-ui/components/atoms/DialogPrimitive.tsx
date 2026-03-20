import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { focusable } from '@/core-ui/utils/focusable';

const dialogOverlay = tv({
  base: 'fixed inset-0 z-50 backdrop-blur-[3px] bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
});

const dialogContentVariants = tv({
  base: 'bg-white focus:outline-none fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border border-slate-300 p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
  variants: {
    size: {
      sm: 'w-125',
      md: 'w-200',
      lg: 'w-300',
      fit: 'w-auto max-w-[calc(100%-2rem)]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const closeButton = tv({
  extend: focusable,
  base: 'cursor-pointer absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-5',
});

const dialogHeader = tv({
  base: 'flex flex-col gap-2 text-center sm:text-left',
});

const dialogFooter = tv({
  base: 'flex justify-end gap-2',
});

const dialogTitle = tv({
  base: 'text-lg font-semibold leading-7',
});

const dialogDescription = tv({
  base: 'text-sm text-slate-500',
});

const Dialog = (props: DialogPrimitive.DialogProps) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);
const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);
const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);
const DialogClose = (props: DialogPrimitive.DialogCloseProps) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

const DialogOverlay = ({ className, ...props }: DialogPrimitive.DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={dialogOverlay({ className })}
    {...props}
  />
);

interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'fit';
}

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  size,
  ...props
}: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={dialogContentVariants({ size, className })}
      onOpenAutoFocus={(e) => e.preventDefault()}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close data-slot="dialog-close" className={closeButton()}>
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-header" className={dialogHeader({ className })} {...props} />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-footer" className={dialogFooter({ className })} {...props} />
);

const DialogTitle = ({ className, ...props }: DialogPrimitive.DialogTitleProps) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={dialogTitle({ className })}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }: DialogPrimitive.DialogDescriptionProps) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={dialogDescription({ className })}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
