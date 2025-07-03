import axios from 'axios';
import type { ApiResponse } from './apiResponse';
import { Toast } from '@/components';
import { KeyStorageConfig } from '@/config/KeyStorageConfig';
import i18n from '@/core/i18n';

export const http = axios.create({
    baseURL : import.meta.env.VITE_API_URL
});

http.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem(KeyStorageConfig.user);
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.accessToken) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
      }
    }
    
    config.headers = config.headers || {};
    config.headers['Accept-Language'] = i18n.language;
    
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  response => response,
  error => {
    let message = error?.message || 'An unexpected error occurred. Please try again later.';
    let status = error?.response?.status;

    if (!error.response) {
      message = 'Network error: Unable to connect to the server. Please try again later.';
      error.response = {
        data: {
          success: false,
          data: null,
          errors: [message],
          message
        }
      };
      Toast.error({ title: "Oops!", description: message }, { id: 'global-error' });
    } else {
      const apiResponse: ApiResponse<null> = {
        success: false,
        data: null,
        errors: error.response?.data?.errors || [message],
        message
      };
      error.response.data = apiResponse;

      if (status === 500) {
        Toast.error({ title: "Oops!", description: apiResponse.errors[0] }, { id: 'global-error' });
      }  
    }
    return Promise.reject(error);
  }
);