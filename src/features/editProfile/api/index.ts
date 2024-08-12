import { Profile, refreshProfile } from 'entities/profile';
import { PATCH } from 'shared/api';

import { EditProfileData } from '../model/schema';

export const editProfile = async (data: EditProfileData) => {
  const response = await PATCH<Profile>('/profile', {
    body: JSON.stringify(data),
  });
  await refreshProfile();
  return response;
};
