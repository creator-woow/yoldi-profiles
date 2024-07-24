'use server';

import { EditProfileData } from 'features/editProfile';
import { Profile } from 'entities/profile';
import { serverFetch } from 'shared/api/serverFetch';

export const getProfile = async (slug: string) =>
  serverFetch.GET<Profile>(`/user/${slug}`);

export const getCurrentUser = async () => {
  try {
    return await serverFetch.GET<Profile>('/profile');
  } catch (error) {
    return null;
  }
};

export const getProfilesList = async () => serverFetch.GET<Profile[]>('/user');

export const updateProfile = async (data: EditProfileData) =>
  serverFetch.PATCH<Profile>('/profile', { body: JSON.stringify(data) });
