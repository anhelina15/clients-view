import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/consts/queryKeys';
import {
  getCompanies,
  getCompanyDetail,
  getCompanyImage,
  type GetCompaniesParams,
} from '@/features/companies/api/companies';

export const useCompanies = (params?: GetCompaniesParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANIES, params],
    queryFn: () => getCompanies(params),
  });
};

export const useCompanyDetail = (id: number | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY_DETAIL, id],
    queryFn: () => getCompanyDetail(id as number),
    enabled: !!id,
  });
};

export const useCompanyImage = (fileId: number | null | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY_IMAGE, fileId],
    queryFn: () => getCompanyImage(fileId as number),
    enabled: !!fileId,
  });
};
