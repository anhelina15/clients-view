import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core-ui/components/atoms/TablePrimitive';
import type { Company } from '@/types/company';
import { TABLE_COLUMNS } from '@/features/companies/consts/companyTable';
import { TableList } from '@/features/companies/components/TableList';
import Loader from '@/core-ui/components/atoms/Loader';

interface CompanyTableProps {
  data: { items: Company[]; totalCount: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onSelect?: (company: Company) => void;
  selectedId?: number | null;
}

const CompanyTable = ({
  data,
  isLoading,
  isError,
  error,
  onSelect,
  selectedId,
}: CompanyTableProps) => {
  if (isLoading) {
    return <Loader variant="block" size="lg" label="Načítání klientů..." />;
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center h-full text-red-500 p-8 text-center">
        Chyba při načítání dat: {error?.message || 'Neznámá chyba'}
      </div>
    );
  }

  const companies = data?.items || [];

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow variant="header">
              {TABLE_COLUMNS.map((col) => {
                const column = col as { id: string; label: string; align?: string };

                return (
                  <TableHead
                    key={column.id}
                    className={column.align === 'center' ? 'text-center' : ''}
                  >
                    {column.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableList companies={companies} onSelect={onSelect} selectedId={selectedId} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyTable;
