'use server';

import { cookies } from 'next/headers';

import { POST, ResponseError } from 'shared/api';
import { API_KEY_COOKIE_NAME } from 'shared/config';

import { LoginData, RegistrationData } from '../model/schema';

export const loginUser = async (data: LoginData) => {
  try {
    const token = await POST<{ value: string }>('/auth/login', {
      body: JSON.stringify(data),
    });
    cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
  } catch (error) {
    return error as ResponseError;
  }
};

export const registerUser = async (data: RegistrationData) => {
  try {
    const token = await POST<{ value: string }>('/auth/sign-up', {
      body: JSON.stringify(data),
    });
    cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
  } catch (error) {
    return error as ResponseError;
  }
};

export const refreshSessionUser = async () => {
  const token = cookies().get(API_KEY_COOKIE_NAME);
  if (!token) return;
  cookies().delete(API_KEY_COOKIE_NAME);
  cookies().set(API_KEY_COOKIE_NAME, token.value, { httpOnly: true });
};

export const logoutUser = async () => {
  cookies().delete(API_KEY_COOKIE_NAME);
};
