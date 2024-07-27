'use server';

import { EditProfileData } from 'features/editProfile';
import { refreshSession } from 'features/auth';
import { serverFetch } from 'shared/api/serverFetch';

import { Profile } from '../model';

export const getProfile = async () => {
  try {
    return await serverFetch.GET<Profile>('/profile');
  } catch (error) {
    return null;
  }
};

export const patchProfile = async (data: Partial<EditProfileData>) => {
  const response = await serverFetch.PATCH<Profile>('/profile', {
    body: JSON.stringify(data),
  });
  await refreshSession();
  return response;
};
