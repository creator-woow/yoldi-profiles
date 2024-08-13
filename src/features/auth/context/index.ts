'use client';

import { createContext } from 'react';

import { Profile } from 'entities/profile';

interface AuthContext {
  profile: Profile | null;
}

export const authContext = createContext<AuthContext>({ profile: null });
