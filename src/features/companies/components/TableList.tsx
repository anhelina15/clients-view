import type { Company } from '@/types/company';
import { TABLE_COLUMNS } from '@/features/companies/consts/companyTable';
import { TableEmptyState } from '@/features/companies/components/TableEmptyState';
import { TableRowItem } from '@/features/companies/components/TableRowItem';

interface TableListProps {
  companies: Company[];
  onSelect?: (company: Company) => void;
  selectedId?: number | null;
}

export const TableList = ({ companies, onSelect, selectedId }: TableListProps) => {
  if (!companies.length) {
    return (
      <TableEmptyState colSpan={TABLE_COLUMNS.length} message="Nebyly nalezeny žádné firmy." />
    );
  }

  return (
    <>
      {companies.map((company) => (
        <TableRowItem
          key={company.id}
          company={company}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </>
  );
};
