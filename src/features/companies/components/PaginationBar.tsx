import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Button from '@/core-ui/components/atoms/Button';
import { Input } from '@/core-ui/components/atoms/Input';
import PageSizeSelect from '@/features/companies/components/PageSizeSelect';
import { clamp, parseNumber } from '@/shared/utils/numbers.utils';

const PAGE_SIZE_OPTIONS = [
  { value: 5, label: '5 položek' },
  { value: 10, label: '10 položek' },
  { value: 20, label: '20 položek' },
  { value: 50, label: '50 položek' },
  { value: 100, label: '100 položek' },
];

interface PaginationBarProps {
  totalItems: number;
  page: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const PaginationBar = ({
  totalItems,
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationBarProps) => {
  const [localPage, setLocalPage] = useState(page.toString());

  // Sync local state when external page changes
  useEffect(() => {
    setLocalPage(page.toString());
  }, [page]);

  const commitPageChange = () => {
    const parsedValue = parseNumber(localPage, 1);
    const nextPage = clamp(parsedValue, 1, totalPages || 1);

    onPageChange(nextPage);
    setLocalPage(nextPage.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitPageChange();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex items-center justify-between text-sm px-8 py-0 bg-[#f8f9fa] border-t border-slate-200 text-slate-400 h-12 flex-none select-none">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <span className="uppercase">Počet</span>
          <span className="text-slate-700 text-sm font-medium">{totalItems}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Na stránce</span>
          <PageSizeSelect value={perPage} onChange={onPerPageChange} options={PAGE_SIZE_OPTIONS} />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>Stránka</span>
            <Input
              type="number"
              min={1}
              max={totalPages || 1}
              value={localPage}
              onChange={handleInputChange}
              onBlur={commitPageChange}
              onKeyDown={handleKeyDown}
              className="w-12 h-7 border border-slate-200 rounded-lg text-center text-slate-700 bg-white transition-all font-bold text-xs p-0 hover:border-slate-300"
            />
            <span className="text-black font-medium">z {totalPages || 1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="auto"
              isDisabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="p-1 hover:bg-slate-200 rounded-md disabled:opacity-20 transition-colors text-slate-500"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </Button>
            <Button
              variant="ghost"
              size="auto"
              isDisabled={page >= (totalPages || 1)}
              onClick={() => onPageChange(page + 1)}
              className="p-1 hover:bg-slate-200 rounded-md disabled:opacity-20 transition-colors text-slate-500"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
