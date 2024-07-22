const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const API_URL = `${SERVER_URL}/api`;

export class ServerAPI {
  private static async _createRequest<TResponse>(
    url: string,
    options?: RequestInit,
  ) {
    const headers = {
      'Content-Type': 'application/json',
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
  }

  static async POST<TResponse>(url: string, options?: RequestInit) {
    return ServerAPI._createRequest<TResponse>(url, {
      ...options,
      method: 'POST',
    });
  }

  static async GET<TResponse>(url: string, options?: RequestInit) {
    return ServerAPI._createRequest<TResponse>(url, {
      ...options,
      method: 'GET',
    });
  }
}
