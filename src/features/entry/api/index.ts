'use server';

import { cookies } from 'next/headers';

import { ResponseError, serverFetch } from 'shared/api/serverFetch';
import { API_KEY_COOKIE_NAME } from 'shared/config/auth';

import { LoginData, RegistrationData } from '../model/schema';

export const loginUser = async (data: LoginData) => {
  try {
    const token = await serverFetch.POST<{ value: string }>('/auth/login', {
      body: JSON.stringify(data),
    });
    cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
  } catch (error) {
    return error as ResponseError;
  }
};

export const registerUser = async (data: RegistrationData) => {
  try {
    const token = await serverFetch.POST<{ value: string }>('/auth/sign-up', {
      body: JSON.stringify(data),
    });
    cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
  } catch (error) {
    return error as ResponseError;
  }
};

export const logoutUser = async () => {
  cookies().delete(API_KEY_COOKIE_NAME);
};
