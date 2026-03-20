import CompanyTable from '@/features/companies/components/CompanyTable';
import PaginationBar from '@/features/companies/components/PaginationBar';
import type { Company } from '@/types/company';

interface CompanyTableBlockProps {
  data: { items: Company[]; totalCount: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onSelect: (company: Company) => void;
  selectedId: number | null;
  totalItems: number;
  page: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const CompanyTableBlock = ({
  data,
  isLoading,
  isError,
  error,
  onSelect,
  selectedId,
  totalItems,
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}: CompanyTableBlockProps) => {
  return (
    <div className="flex-[0.75] border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white flex flex-col">
      <div className="flex-1 overflow-auto">
        <CompanyTable
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      </div>

      <PaginationBar
        totalItems={totalItems}
        page={page}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
      />
    </div>
  );
};
