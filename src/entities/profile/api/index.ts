'use server';

import { Profile } from 'entities/profile';
import { ServerAPI } from 'shared/api/http';

export const getProfile = (slug: string) =>
  ServerAPI.GET<Profile>(`/user/${slug}`);

export const getCurrentUser = async () => {
  try {
    return await ServerAPI.GET<Profile>('/profile');
  } catch (error) {
    return null;
  }
};

export const getProfilesList = () => ServerAPI.GET<Profile[]>('/user');
