import axios, { type AxiosInstance } from 'axios';

import { getFromStorage } from '@/shared/utils/storage';

const RAYNET_API_BASE_URL = 'https://app.raynet.cz/api/v2';

export const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const user = getFromStorage('user');
    const apiKey = getFromStorage('api_key');
    const instance = getFromStorage('instance') || '';

    if (instance) {
      config.headers['X-Instance-Name'] = instance;
    }

    if (user && apiKey) {
      const auth = btoa(`${user}:${apiKey}`);
      config.headers.Authorization = `Basic ${auth}`;
    }

    return config;
  });

  return client;
};

const apiClient = createApiClient(RAYNET_API_BASE_URL);

export default apiClient;
