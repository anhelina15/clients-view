import { Image as ImageIcon } from 'lucide-react';

import Loader from '@/core-ui/components/atoms/Loader';
import { useCompanyImage } from '@/features/companies/hooks/useCompanies';

interface CompanyLogoBlockProps {
  logoId: number | null | undefined;
}

export const CompanyLogoBlock = ({ logoId }: CompanyLogoBlockProps) => {
  const { data: fileData, isLoading } = useCompanyImage(logoId);
  const imgData = fileData?.imgData;

  return (
    <div className="w-40 h-40 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-sm shrink-0 overflow-hidden">
      {isLoading && <Loader size="sm" />}

      {!isLoading && imgData && (
        <img src={imgData} alt="Company logo" className="w-full h-full object-contain" />
      )}

      {!isLoading && !imgData && (
        <div className="flex flex-col items-center justify-center text-slate-300 w-full h-full bg-slate-50/50">
          <ImageIcon size={32} strokeWidth={1.5} className="mb-2" />
          <span className="text-[10px] font-medium text-slate-400 text-center leading-tight">
            Nemáte přidané logo
          </span>
        </div>
      )}
    </div>
  );
};
