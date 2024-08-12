'use server';

import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME } from 'shared/config';
import { GET } from 'shared/api';

import { Profile } from '../model';

export const refreshProfile = async () => {
  const token = cookies().get(API_KEY_COOKIE_NAME);
  if (!token) return;
  cookies().delete(API_KEY_COOKIE_NAME);
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const getProfile = async () => {
  try {
    return await GET<Profile>('/profile');
  } catch (error) {
    return null;
  }
};
