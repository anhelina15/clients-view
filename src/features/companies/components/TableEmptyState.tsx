import { TableCell, TableRow } from '@/core-ui/components/atoms/TablePrimitive';

interface TableEmptyStateProps {
  colSpan: number;
  message?: string;
  description?: string;
}

export const TableEmptyState = ({
  colSpan,
  message = 'Nebyla nalezena žádná data.',
  description = 'Zkuste upravit parametry vyhledávání.',
}: TableEmptyStateProps) => (
  <TableRow variant="header">
    <TableCell colSpan={colSpan} className="h-[400px] text-center">
      <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <span className="text-sm font-medium">{message}</span>
        {description && <p className="text-xs text-slate-300">{description}</p>}
      </div>
    </TableCell>
  </TableRow>
);
