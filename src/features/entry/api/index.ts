'use server';

import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME } from 'shared/config/auth';
import { serverFetch } from 'shared/api/serverFetch';

import { LoginData, RegistrationData } from '../model/schema';

export const loginUser = async (data: LoginData) => {
  const token = await serverFetch.POST<{ value: string }>('/auth/login', {
    body: JSON.stringify(data),
  });
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const registerUser = async (data: RegistrationData) => {
  const token = await serverFetch.POST<{ value: string }>('/auth/sign-up', {
    body: JSON.stringify(data),
  });
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const logoutUser = async () => {
  cookies().delete(API_KEY_COOKIE_NAME);
};
