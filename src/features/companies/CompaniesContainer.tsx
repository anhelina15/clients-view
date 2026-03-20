import { useState, useEffect, useMemo } from 'react';
import { Settings, LogOut } from 'lucide-react';

import { CompanyTableBlock } from '@/features/companies/components/CompanyTableBlock';
import CompanyDetailCard from '@/features/companies/components/CompanyDetailCard';
import { CompanyDetailCardPlaceholder } from '@/features/companies/components/CompanyDetailCardPlaceholder';
import { SearchInput } from '@/core-ui/components/molecules/SearchInput';
import { useDebouncedValue } from '@/core-ui/hooks/useDebouncedValue';
import { useSearchId } from '@/shared/hooks/useSearchId';
import { usePagination } from '@/core-ui/hooks/usePagination';
import { useCompanies } from '@/features/companies/hooks/useCompanies';
import { useDisclosure } from '@/core-ui/hooks/useDisclosure';
import Button from '@/core-ui/components/atoms/Button';
import ApiAccessSetupModal from '@/features/auth/components/ApiAccessSetupModal';

const SEARCH_COMPANY_DEBOUNCE_DELAY = 800;

const CompaniesContainer = () => {
  const [isAuthModalOpen, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-sans p-6 gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-light text-slate-700 tracking-tight">Klienti</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            isFullWidth={false}
            className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 font-semibold"
            onClick={openAuthModal}
          >
            <Settings className="size-4 mr-2" />
            Nastavení API
          </Button>
          <Button
            variant="ghost"
            size="sm"
            isFullWidth={false}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="size-4 mr-2" />
            Odhlásit se
          </Button>
        </div>
      </div>

      <ApiAccessSetupModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

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
