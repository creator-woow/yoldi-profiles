'use server';

import { cookies } from 'next/headers';

import { API_KEY_COOKIE_NAME } from 'shared/config/auth';
import { ServerAPI } from 'shared/api/http';

import { LoginData, RegistrationData } from '../model/schema';

export const loginUser = async (data: LoginData) => {
  const token = await ServerAPI.POST<{ value: string }>('/auth/login', {
    body: JSON.stringify(data),
  });
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const registerUser = async (data: RegistrationData) => {
  const token = await ServerAPI.POST<{ value: string }>('/auth/sign-up', {
    body: JSON.stringify(data),
  });
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const logoutUser = async () => {
  cookies().delete(API_KEY_COOKIE_NAME);
};
