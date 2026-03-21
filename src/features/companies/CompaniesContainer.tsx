import { useState, useEffect } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';

import { CompanyTableBlock } from '@/features/companies/components/CompanyTableBlock';
import CompanyDetailCard from '@/features/companies/components/CompanyDetailCard';
import { CompanyDetailCardPlaceholder } from '@/features/companies/components/CompanyDetailCardPlaceholder';
import { SearchInput } from '@/core-ui/components/molecules/SearchInput';
import { useSearchParams } from '@/shared/hooks/useSearchParams';
import { usePagination } from '@/core-ui/hooks/usePagination';
import { useCompanies } from '@/features/companies/hooks/useCompanies';
import { useDisclosure } from '@/core-ui/hooks/useDisclosure';
import Button from '@/core-ui/components/atoms/Button';
import ApiAccessSetupModal from '@/features/auth/components/ApiAccessSetupModal';
import { useAuth } from '@/features/auth/contexts/AuthContext';

const SEARCH_COMPANY_DEBOUNCE_DELAY = 800;

const CompaniesContainer = () => {
  const [isAuthModalOpen, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);
  const [selectedIdStr, setSelectedId] = useSearchParams('companyId');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebounceValue(
    searchQuery,
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

  const handleUpdateSearchQuery = (value: string, isImmediately = false) => {
    setSearchQuery(value);
    setDebouncedSearchValue(value);
    if (isImmediately) {
      setDebouncedSearchValue.flush();
    }
    setPage(1);
  };

  const isSearchQueryValid = debouncedSearchValue.length >= 3 || !debouncedSearchValue;

  const { data, isLoading, isError, error } = useCompanies(
    {
      fulltext: debouncedSearchValue,
      offset: (page - 1) * perPage,
      limit: perPage,
    },
    isSearchQueryValid,
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / perPage));
    }
  }, [data, setTotalItems, setTotalPages, perPage]);

  const { logout } = useAuth();

  return (
    <>
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
              onClick={logout}
            >
              <LogOut className="size-4 mr-2" />
              Odhlásit se
            </Button>
          </div>
        </div>

        <div className="max-w-xs">
          <SearchInput
            placeholder="Hledat..."
            value={searchQuery}
            onChange={(e) => handleUpdateSearchQuery(e.target.value)}
            onBlur={() => handleUpdateSearchQuery(searchQuery, true)}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdateSearchQuery(searchQuery, true)}
            onClear={() => handleUpdateSearchQuery('', true)}
            showClearButton
          />

          {!isSearchQueryValid && (
            <p className="text-red-500 text-sm mt-2">Hledaný výraz musí mít alespoň 3 znaky</p>
          )}
        </div>

        <div className="flex-1 flex overflow-hidden gap-4">
          <CompanyTableBlock
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onSelect={(company) => setSelectedId(company.id.toString())}
            selectedId={selectedIdStr ? parseInt(selectedIdStr, 10) : null}
            totalItems={totalItems}
            page={page}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />

          <div className="flex-[0.3] p-6 flex flex-col h-full min-w-80 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
            {selectedIdStr ? (
              <CompanyDetailCard companyId={parseInt(selectedIdStr, 10)} />
            ) : (
              <CompanyDetailCardPlaceholder />
            )}
          </div>
        </div>
      </div>
      <ApiAccessSetupModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default CompaniesContainer;
