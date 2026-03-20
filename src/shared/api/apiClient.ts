import axios from 'axios';

const RAYNET_API_BASE_URL = 'https://app.raynet.cz/api/v2';

const RAYNET_USER = import.meta.env.VITE_RAYNET_USER;
const RAYNET_API_KEY = import.meta.env.VITE_RAYNET_API_KEY;
const RAYNET_INSTANCE = import.meta.env.VITE_RAYNET_INSTANCE;

const apiClient = axios.create({
  baseURL: RAYNET_API_BASE_URL,
  headers: {
    'X-Instance-Name': RAYNET_INSTANCE,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (RAYNET_USER && RAYNET_API_KEY) {
    const auth = btoa(`${RAYNET_USER}:${RAYNET_API_KEY}`);
    config.headers.Authorization = `Basic ${auth}`;
  }

  return config;
});

export default apiClient;
