'use client';

import { createContext, useContext } from 'react';

import { Profile } from 'entities/profile';

interface AuthContext {
  profile: Profile | null;
}

export const authContext = createContext<AuthContext>({ profile: null });

export const useAuth = () => useContext(authContext);
