import { redirect } from 'next/navigation';

import { User } from '../../types/api';
import { serverFetch } from './serverFetch';

export type Middleware = 'auth' | 'guest' | 'verified' | 'unverified';
export interface MiddlewareConfig {
  redirect: string;
  shouldRedirect: (user?: User) => boolean;
}

export type Middlewares = {
  [middleware in Middleware]: MiddlewareConfig;
};

const middlewareConfigs: Middlewares = {
  /**
   * Pages that require this middleware will redirect the user to the Login page if the user
   * is not authenticated.
   */
  auth: {
    redirect: '/login',
    shouldRedirect: (user?: User) => !user,
  },

  /**
   * Pages that require this middleware will redirect the user to the Dashboard if the user
   * is authenticated.
   */
  guest: {
    redirect: '/dashboard',
    shouldRedirect: (user?: User) => !!user,
  },

  /**
   * Pages that require this middleware will redirect the user to the Email Verification page
   * if the user hasn't yet verified his/her email.
   */
  verified: {
    redirect: '/verify-email',
    shouldRedirect: (user?: User) => !user?.email_verified_at,
  },

  /**
   * Pages that require this middleware will redirect the user to the Dashboard if the user
   * has already verified his/her email.
   */
  unverified: {
    redirect: '/dashboard',
    shouldRedirect: (user?: User) => !!user?.email_verified_at,
  },
};

const BACKEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(
  /\/+$/,
  '',
);

const getUser = async (): Promise<User | undefined> => {
  try {
    return await serverFetch<User>('/api/user');
  } catch (e) {
    return undefined;
  }
};

export const authMiddleware = async (
  middlewares: Middleware[] = [],
): Promise<User | undefined> => {
  const user = await getUser();

  const config = middlewares.find((middleware) =>
    middlewareConfigs[middleware].shouldRedirect(user),
  );

  if (config) {
    const path = middlewareConfigs[config].redirect;
    redirect(`${BACKEND_URL}${path}`);
  }

  return user;
};
