import type { AxiosError } from 'axios';

export const getStatusCode = (error: unknown): number | undefined => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError
  ) {
    return (error as AxiosError).response?.status;
  }

  return undefined;
};
