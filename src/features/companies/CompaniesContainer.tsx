import { useState, useEffect, useMemo } from 'react';

import { CompanyTableBlock } from '@/features/companies/components/CompanyTableBlock';
import CompanyDetailCard from '@/features/companies/components/CompanyDetailCard';
import { CompanyDetailCardPlaceholder } from '@/features/companies/components/CompanyDetailCardPlaceholder';
import { SearchInput } from '@/core-ui/components/molecules/SearchInput';
import { useDebouncedValue } from '@/core-ui/hooks/useDebouncedValue';
import { useSearchId } from '@/shared/hooks/useSearchId';
import { usePagination } from '@/core-ui/hooks/usePagination';
import { useCompanies } from '@/features/companies/hooks/useCompanies';

const SEARCH_COMPANY_DEBOUNCE_DELAY = 800;

const CompaniesContainer = () => {
  const [selectedId, setSelectedId] = useSearchId('companyId');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchValue, cancelDebounce, setDebouncedSearchTerm] = useDebouncedValue(
    searchTerm,
    SEARCH_COMPANY_DEBOUNCE_DELAY,
  );

  const {
    page,
    perPage,
    setTotalItems,
    setTotalPages,
    setPage,
    setPerPage,
    totalItems,
    totalPages,
  } = usePagination();

  const normalizedSearch = useMemo(() => {
    return debouncedSearchValue.length >= 3 || debouncedSearchValue.length === 0
      ? debouncedSearchValue
      : '';
  }, [debouncedSearchValue]);

  const triggerSearch = (value: string) => {
    cancelDebounce();
    setDebouncedSearchTerm(value);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useCompanies({
    fulltext: normalizedSearch,
    offset: (page - 1) * perPage,
    limit: perPage,
  });

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / perPage));
    }
  }, [data, setTotalItems, setTotalPages, perPage]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-sans p-6 gap-6">
      <h1 className="text-4xl font-light text-slate-700 tracking-tight">Klienti</h1>

      <div className="max-w-xs">
        <SearchInput
          placeholder="Hledat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => triggerSearch(searchTerm)}
          onKeyDown={(e) => e.key === 'Enter' && triggerSearch(searchTerm)}
          onClear={() => triggerSearch('')}
          showClearButton
        />
      </div>

      <div className="flex-1 flex overflow-hidden gap-4">
        <CompanyTableBlock
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onSelect={(company) => setSelectedId(company.id)}
          selectedId={selectedId}
          totalItems={totalItems}
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />

        <div className="flex-[0.3] p-6 flex flex-col h-full min-w-80 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
          {selectedId ? (
            <CompanyDetailCard companyId={selectedId} />
          ) : (
            <CompanyDetailCardPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesContainer;
