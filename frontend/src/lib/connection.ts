import { BACKEND_URL } from '@/config/global';

export const secureFetch = (url: string, options?: RequestInit) => {
  const token = localStorage.getItem('user-login-token');

  url = url.startsWith('/') ? url : `/${url}`;

  if (!options) {
    options = {};
  }

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Token ${token}`,
    };
  }

  return fetch(`${BACKEND_URL}${url}`, options);
};
