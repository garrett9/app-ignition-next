'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { User } from '../types/api';

interface AuthProviderProps extends PropsWithChildren {
  user?: User;
}

const AuthContext = createContext<
  ReturnType<typeof useState<User | undefined>> | undefined
>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No AuthContext.Provider found when calling useAuth!');
  }
  return context;
};

export function AuthProvider({ children, user: userProp }: AuthProviderProps) {
  const state = useState<User | undefined>(userProp);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
