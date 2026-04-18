import { getApiBaseUrl } from './base-url';

export type FetchJsonInit = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

/**
 * fetch com JSON: prefixa a base da API, serializa body e trata erros HTTP.
 */
export async function fetchJson<T>(path: string, init: FetchJsonInit = {}): Promise<T> {
  const base = getApiBaseUrl();
  const url = path.startsWith('http') ? path : `${base}${path}`;

  const headers = new Headers(init.headers);
  if (init.body !== undefined && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...init,
    headers,
    body:
      init.body !== undefined && !(init.body instanceof FormData)
        ? JSON.stringify(init.body)
        : (init.body as BodyInit | null | undefined),
  });

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    let message = `Erro ${response.status}`;
    if (typeof data === 'string') {
      message = data;
    } else if (typeof data === 'object' && data !== null) {
      const o = data as Record<string, unknown>;
      if (typeof o.message === 'string') {
        message = o.message;
      } else if (o.errors && typeof o.errors === 'object') {
        const errs = o.errors as Record<string, string[]>;
        const first = Object.values(errs).flat()[0];
        if (first) message = first;
      }
    }
    throw new Error(message);
  }

  return data as T;
}
