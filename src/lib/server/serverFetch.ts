import { cookies } from 'next/headers';

import { FetchError } from '../../types/errors';

/**
 * Perform a fetch request on your front-end server to your back-end API server.
 * For making client to server requests in your NextJS application, @see clientFetch
 *
 * @param path
 * @param init
 * @returns
 */
export const serverFetch = async <T>(path: string, init: RequestInit = {}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const fetchInit = {
    ...init,
    headers: {
      ...init.headers,
      accept: 'application/json',
      referer: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
  };

  const response = await fetch(
    `${backendUrl}/${path.replace(/^\/+/, '')}`,
    fetchInit,
  );

  if (!response.ok) {
    throw new FetchError(response);
  }

  return (await response.json()) as T;
};
