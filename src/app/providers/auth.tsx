'use client';

import { FC, PropsWithChildren } from 'react';

import { Profile } from 'entities/profile';
import { authContext } from 'features/auth';

interface AuthProviderProps extends PropsWithChildren {
  profile: Profile | null;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children, profile }) => {
  return (
    <authContext.Provider value={{ profile }}>{children}</authContext.Provider>
  );
};
