import Axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = '';
  if (token) {
    config.headers = config.headers || {}; // Initialize headers if undefined
    config.headers.Authorization = `${token}`;
  }
  config.headers = config.headers || {}; // Initialize headers if undefined
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_SERVER_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    notifications.show({
      color: 'red',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
