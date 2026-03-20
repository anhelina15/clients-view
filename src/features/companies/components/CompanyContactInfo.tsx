import { ExternalLink } from 'lucide-react';

import { CompanyLogoBlock } from '@/features/companies/components/CompanyLogoBlock';
import { type Address } from '@/types/company';

interface CompanyContactInfoProps {
  name: string | undefined;
  regNumber?: string;
  address?: Address;
  logoId: number | null | undefined;
}

export const CompanyContactInfo = ({
  name,
  regNumber,
  address,
  logoId,
}: CompanyContactInfoProps) => {
  const hasAddress = Boolean(address);

  const fullAddress = hasAddress
    ? [address?.street, address?.city, address?.country].filter(Boolean).join(', ')
    : '';

  const googleMapsUrl = hasAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
    : '';

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-900">{name}</h2>

      <div className="flex gap-6 items-start">
        <CompanyLogoBlock logoId={logoId} />

        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-slate-400 text-base uppercase">IČ</span>
            <span className="text-slate-700">{regNumber}</span>
          </div>

          <div className="flex flex-col gap-1 text-slate-600 text-sm">
            {hasAddress ? (
              <>
                {address?.street && <p className="font-medium">{address.street}</p>}
                <p className="font-medium">
                  {address?.zipCode && `${address.zipCode} `}
                  {address?.city}
                </p>
                {address?.country && <p className="text-slate-400">{address.country}</p>}

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zobrazit adresu na Google Maps"
                  className="text-cyan-500 text-sm font-bold mt-2 hover:underline inline-flex items-center gap-1 transition-all"
                >
                  Zobrazit na mapě
                  <ExternalLink size={12} />
                </a>
              </>
            ) : (
              <span className="text-slate-400 italic">Adresa neuvedena</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
