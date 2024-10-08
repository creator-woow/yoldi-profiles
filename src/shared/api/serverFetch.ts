'use server';

import { cookies } from 'next/headers';

import {
  API_KEY_COOKIE_NAME,
  API_KEY_HEADER_NAME,
  API_URL,
} from 'shared/config';

export interface ResponseError {
  statusCode: number;
  message: string;
}

const serverFetch = {
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

  async POST<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'POST',
    });
  },

  async GET<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'GET',
    });
  },

  async PATCH<TResponse>(url: string, options?: RequestInit) {
    return serverFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'PATCH',
    });
  },
};

const { POST, GET, PATCH } = serverFetch;
export { POST, GET, PATCH };
