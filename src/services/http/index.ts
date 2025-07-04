import axios, { AxiosError } from 'axios';
import { Toast } from '@/components';
import { KeyStorageConfig } from '@/config/KeyStorageConfig';
import i18n from '@/core/i18n';
import { ApiError } from '@/core/models/errorResponse';
import type { ApiResponse } from '@/core/models/apiResponse';

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
  (error: AxiosError) => {
    const status = error.response?.status || 0;
    let message = error.message || 'An unexpected error occurred. Please try again later.';
    let errors = [message];


    if (!error.response) {
      message = 'An unexpected error occurred. Please try again later.';
      errors = [message];

      Toast.error({ title: "Oops!", description: message }, { id: 'global-error' });

      throw new ApiError({
        success: false,
        message,
        errors,
        status: 0,
      });
    } 
    
    const apiData = error.response.data as Partial<ApiResponse<any>>;
    message = apiData.message || message;
    errors = apiData.errors || [message];
    if (status === 500) {
      Toast.error({ title: 'Erro interno', description: errors[0] }, { id: 'global-error' });
    }

    throw new ApiError({
      success: false,
      message,
      errors,
      status,
    });
  }
);

