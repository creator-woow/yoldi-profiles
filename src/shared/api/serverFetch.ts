import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME, API_KEY_HEADER_NAME } from 'shared/config/auth';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const API_URL = `${SERVER_URL}/api`;

export interface ResponseError {
  statusCode: number;
  message: string;
}

export const serverFetch = {
  async _createRequest<TResponse>(url: string, options?: RequestInit) {
    const headers = {
      'Content-Type':
        options?.body instanceof FormData
          ? 'multipart/form-data'
          : 'application/json',
      [API_KEY_HEADER_NAME]: cookies().get(API_KEY_COOKIE_NAME)?.value ?? '',
    };

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: { ...options?.headers, ...headers },
    });

    const bodyText = (await res.text()) || JSON.stringify(null);

    if (!res.ok) {
      throw JSON.parse(bodyText);
    }

    return JSON.parse(bodyText) as TResponse;
  },

  POST<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'POST',
    });
  },

  GET<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'GET',
    });
  },

  PATCH<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'PATCH',
    });
  },
};
