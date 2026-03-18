import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';

import { getStatusCode } from '@/shared/utils/getStatusCode';

const STALE_TIME_MS = 2 * 60 * 1000; // 2 minutes
const CACHE_TIME_MS = 5 * 60 * 1000; // 5 minutes
const RETRY_COUNT = 3;

const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => console.error('[Query Error]:', error),
    }),
    mutationCache: new MutationCache({
      onError: (error: unknown) => console.error('[Mutation Error]:', error),
    }),
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        gcTime: CACHE_TIME_MS,
        retry: (failureCount: number, error: unknown) => {
          const statusCode = getStatusCode(error);

          // Do not retry for 4xx client errors
          if (statusCode && statusCode >= 400 && statusCode < 500) {
            return false;
          }

          return failureCount < RETRY_COUNT;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
