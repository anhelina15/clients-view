import { type ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

const table = tv({ base: 'w-full caption-bottom text-sm' });
const tableHeader = tv({
  base: 'bg-[#00a9ca] sticky top-0 z-10 shadow-sm border-none [&_tr]:border-none [&_tr]:hover:bg-transparent',
});
const tableBody = tv({ base: '[&_tr:last-child]:border-0' });
const tableFooter = tv({
  base: 'bg-gray-50 border-t border-gray-200 font-medium [&>tr]:last:border-b-0',
});

const tableRow = tv({
  base: 'cursor-pointer border-b border-gray-100 transition-colors',
  variants: {
    variant: {
      default: 'hover:bg-[#E4F7FF] data-[state=selected]:bg-[#e0fcd4]',
      header: 'hover:bg-transparent border-none pointer-events-none',
    },
    striped: {
      true: 'even:bg-slate-50/50 bg-white',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    striped: false,
  },
});

const tableHead = tv({
  base: 'text-white font-bold uppercase text-[11px] px-3 py-3 text-left align-middle bg-transparent whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
});
const tableCell = tv({
  base: 'px-3 py-1.5 align-middle whitespace-nowrap sm:px-4 sm:py-1.5 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  variants: {
    variant: {
      default: 'text-slate-500 font-medium',
      primary: 'font-bold text-slate-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
const tableCaption = tv({ base: 'text-muted-foreground mt-4 text-sm' });

const Table = ({ className, ...props }: ComponentProps<'table'>) => (
  <div
    data-slot="table-container"
    className="relative w-full overflow-x-auto h-full overflow-y-auto"
  >
    <table data-slot="table" className={table({ class: className })} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }: ComponentProps<'thead'>) => (
  <thead data-slot="table-header" className={tableHeader({ class: className })} {...props} />
);

const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody data-slot="table-body" className={tableBody({ class: className })} {...props} />
);

const TableFooter = ({ className, ...props }: ComponentProps<'tfoot'>) => (
  <tfoot data-slot="table-footer" className={tableFooter({ class: className })} {...props} />
);

interface TableRowProps extends ComponentProps<'tr'> {
  variant?: 'default' | 'header';
  striped?: boolean;
}

const TableRow = ({ className, variant, striped, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    className={tableRow({ variant, striped, class: className })}
    {...props}
  />
);

const TableHead = ({ className, ...props }: ComponentProps<'th'>) => (
  <th data-slot="table-head" className={tableHead({ class: className })} {...props} />
);

interface TableCellProps extends ComponentProps<'td'> {
  variant?: 'default' | 'primary';
}

const TableCell = ({ className, variant, ...props }: TableCellProps) => (
  <td data-slot="table-cell" className={tableCell({ variant, class: className })} {...props} />
);

const TableCaption = ({ className, ...props }: ComponentProps<'caption'>) => (
  <caption data-slot="table-caption" className={tableCaption({ class: className })} {...props} />
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
