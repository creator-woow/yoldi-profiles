import { API_URL } from 'shared/config';

export const clientFetch = {
  async _createRequest<TResponse>(url: string, options?: RequestInit) {
    const headers = {
      'Content-Type':
        options?.body instanceof FormData
          ? 'multipart/form-data'
          : 'application/json',
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
    return clientFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'POST',
    });
  },

  GET<TResponse>(url: string, options?: RequestInit) {
    return clientFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'GET',
    });
  },

  PATCH<TResponse>(url: string, options?: RequestInit) {
    return clientFetch._createRequest<TResponse>(url, {
      ...options,
      method: 'PATCH',
    });
  },
};
