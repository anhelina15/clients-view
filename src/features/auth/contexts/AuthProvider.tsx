import { useCallback, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';

import { updateApiClientAuthData, type AuthDataPayload } from '@/shared/api/apiClient';
import { AUTH_DATA_STORAGE_KEY } from '@/shared/consts/storage';
import { AuthContext } from '@/features/auth/contexts/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [authData, setAuthData, removeAuthData] = useLocalStorage<AuthDataPayload | null>(
    AUTH_DATA_STORAGE_KEY,
    null,
  );

  const apiKey = authData?.apiKey ?? null;
  const user = authData?.user ?? null;
  const instance = authData?.instance ?? null;

  const isAuthenticated = Boolean(authData?.apiKey && authData?.user && authData?.instance);

  const login = useCallback(
    (newApiKey: string, newUser: string, newInstance: string) => {
      const newData: AuthDataPayload = { apiKey: newApiKey, user: newUser, instance: newInstance };
      setAuthData(newData);
      updateApiClientAuthData(newData);
      // Clear all queries so that the new user doesn't see old cached data
      // or to force refetching with new auth headers
      queryClient.clear();
    },
    [setAuthData, queryClient],
  );

  const logout = useCallback(() => {
    removeAuthData();
    updateApiClientAuthData(null);
    queryClient.clear();
  }, [removeAuthData, queryClient]);

  const value = useMemo(
    () => ({ apiKey, user, instance, isAuthenticated, login, logout }),
    [apiKey, user, instance, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
