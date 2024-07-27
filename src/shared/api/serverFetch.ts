import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME, API_KEY_HEADER_NAME } from 'shared/config/auth';
import { API_URL } from 'shared/config/api';

export interface ResponseError {
  statusCode: number;
  message: string;
}

export const serverFetch = {
  async _createRequest<TResponse>(url: string, options?: RequestInit) {
    const headers = new Headers({
      ...options?.headers,
      [API_KEY_HEADER_NAME]: cookies().get(API_KEY_COOKIE_NAME)?.value ?? '',
    });

    if (typeof options?.body === 'string') {
      headers.append('Content-Type', 'application/json');
    }

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
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
