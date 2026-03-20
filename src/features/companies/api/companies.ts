import apiClient from '@/shared/api/apiClient';
import type { Company, CompanyDetail, ApiResponse, PaginatedApiResponse } from '@/types/company';
import { API_ENDPOINTS } from '@/features/companies/consts/api';

export interface GetCompaniesParams {
  fulltext?: string;
  offset?: number;
  limit?: number;
}

export const getCompanies = async (params?: GetCompaniesParams) => {
  const response = await apiClient.get<PaginatedApiResponse<Company>>(API_ENDPOINTS.COMPANY, {
    params: {
      fulltext: params?.fulltext,
      offset: params?.offset,
      limit: params?.limit,
    },
  });

  return {
    items: response.data.data,
    totalCount: response.data.totalCount,
  };
};

export const getCompanyDetail = async (id: number) => {
  const response = await apiClient.get<ApiResponse<CompanyDetail>>(
    `${API_ENDPOINTS.COMPANY}${id}/`,
  );

  return response.data.data;
};

export const getCompanyImage = async (fileId: number) => {
  const response = await apiClient.get<{ imgData: string }>(`${API_ENDPOINTS.FILE}${fileId}/`);

  return response.data;
};
