import Cookies from 'js-cookie';

import { FetchError } from '../../types/errors';

export type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export interface ClientFetchRequest<D>
  extends Omit<RequestInit, 'method' | 'body'> {
  method?: Method;
  body?: D;
}

const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

/**
 * Initialize the CSRF token with the server for handling modifications.
 * If a CSRF token already is present in the client's cookies, use that
 * token instead.
 *
 * @returns
 */
const initCsrf = async (): Promise<string | undefined> => {
  const existingToken = Cookies.get(CSRF_COOKIE);

  if (existingToken) {
    return existingToken;
  }

  await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });

  return Cookies.get(CSRF_COOKIE);
};

/**
 * Perform a fetch request on the client side to your back-end API server.
 * For making server to server requests in your NextJS application, @see serverFetch
 *
 * @param path
 * @param init
 * @returns
 */
export const clientFetch = async <T = void, D = any>(
  path: string,
  init?: ClientFetchRequest<D>,
) => {
  const method = init?.method || (init?.body ? 'POST' : 'GET');
  const csrfMethods: Method[] = ['POST', 'PUT', 'DELETE'];
  const customHeaders: Record<string, string> = {};
  if (method && csrfMethods.includes(method)) {
    const token = await initCsrf();
    customHeaders[CSRF_HEADER] = token || '';
  }

  const fetchInit: RequestInit = {
    ...init,
    method,
    headers: {
      ...(init?.headers || {}),
      ...customHeaders,
      accept: 'application/json',
      referer: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: init?.body ? JSON.stringify(init.body) : undefined,
  };

  const response = await fetch(
    `${BACKEND_URL}/${path.replace(/^\/+/, '')}`,
    fetchInit,
  );

  if (!response.ok) {
    throw new FetchError(response);
  }

  if (response.status === 204) {
    // 204 doesn't have JSON to parse.
    return response.text() as T;
  }

  return (await response.json()) as T;
};
