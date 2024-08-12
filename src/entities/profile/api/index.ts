'use server';

import { GET } from 'shared/api';

import { Profile } from '../model';

export const getProfile = async () => {
  try {
    return await GET<Profile>('/profile');
  } catch (error) {
    return null;
  }
};
