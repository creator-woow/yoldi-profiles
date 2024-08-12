'use server';

import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME } from 'shared/config';

export const refreshSession = async () => {
  const token = cookies().get(API_KEY_COOKIE_NAME);
  if (!token) return;
  cookies().delete(API_KEY_COOKIE_NAME);
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};
