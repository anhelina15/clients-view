import { Badge } from '@/core-ui/components/atoms/Badge';
import Loader from '@/core-ui/components/atoms/Loader';
import { STATUS_CONFIG, ROLE_CONFIG } from '@/features/companies/consts/companyStatus';
import { useCompanyDetail } from '@/features/companies/hooks/useCompanies';
import { type CompanyDetail } from '@/types/company';
import { getColor } from '@/shared/utils/colorUtils';
import { CompanyContactInfo } from '@/features/companies/components/CompanyContactInfo';

interface CompanyDetailCardProps {
  companyId: number;
}

const CompanyDetailCard = ({ companyId }: CompanyDetailCardProps) => {
  const { data: companyDetail, isLoading: isDetailLoading, isError } = useCompanyDetail(companyId);

  const { name, regNumber, primaryAddress, logo, notice, owner, category, tags, state, role } =
    (companyDetail as CompanyDetail) || {};

  if (isDetailLoading) {
    return <Loader size="md" label="Načítání detailu..." />;
  }

  if (isError || !companyDetail) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500 p-8 text-center">
        Chyba při načítání detailu klienta.
      </div>
    );
  }

  const status = state ? STATUS_CONFIG[state] : undefined;
  const roleConfig = role ? ROLE_CONFIG[role] : undefined;

  const statusLabel = [status?.label, roleConfig?.label].filter(Boolean).join(' ') || 'Klient';
  const statusColor = status?.color || '#4CAF50';

  const headerLabel = category?.value || (tags && tags[0]);
  const { bgColor, textColor } = headerLabel
    ? getColor(headerLabel)
    : { bgColor: '', textColor: '' };

  return (
    <div className="flex flex-col h-full overflow-hidden relative gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {headerLabel && (
            <Badge variant="outline" style={{ backgroundColor: bgColor, color: textColor }}>
              {headerLabel}
            </Badge>
          )}
          <span className="font-bold text-sm tracking-tight" style={{ color: statusColor }}>
            {statusLabel}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <CompanyContactInfo
          name={name}
          regNumber={regNumber}
          address={primaryAddress?.address}
          logoId={logo?.id}
        />

        <p className="text-slate-600 text-sm">Poznámka: {notice}</p>

        <div className="flex gap-2 items-center">
          <span className="text-slate-400 text-sm tracking-wider">Vlastník:</span>
          <span className="text-slate-900 font-bold">{owner?.fullName}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailCard;
