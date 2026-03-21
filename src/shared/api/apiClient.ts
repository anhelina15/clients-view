import axios, { type AxiosInstance } from 'axios';

import { getFromStorage } from '@/shared/utils/storage';
import { AUTH_DATA_STORAGE_KEY } from '@/shared/consts/storage';

const RAYNET_API_BASE_URL = 'https://app.raynet.cz/api/v2';

export interface AuthDataPayload {
  user: string;
  apiKey: string;
  instance: string;
}

const createApiClient = (
  baseURL: string,
): {
  apiClient: AxiosInstance;
  updateApiClientAuthData: (data: AuthDataPayload | null) => void;
} => {
  let currentAuthData: AuthDataPayload | null =
    getFromStorage<AuthDataPayload>(AUTH_DATA_STORAGE_KEY);

  const updateApiClientAuthData = (data: AuthDataPayload | null) => {
    currentAuthData = data;
  };

  const apiClient = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use((config) => {
    if (currentAuthData) {
      const { user, apiKey, instance } = currentAuthData;

      if (instance) {
        config.headers['X-Instance-Name'] = instance;
      }

      if (user && apiKey) {
        const auth = btoa(`${user}:${apiKey}`);
        config.headers.Authorization = `Basic ${auth}`;
      }
    }

    return config;
  });

  return { apiClient, updateApiClientAuthData };
};

export const { apiClient, updateApiClientAuthData } = createApiClient(RAYNET_API_BASE_URL);
