import { PATCH } from 'shared/api';
import { Profile } from 'entities/profile';
import { refreshSessionUser } from 'features/auth';

import { EditProfileData } from '../model/schema';

export const editProfile = async (data: EditProfileData) => {
  const response = await PATCH<Profile>('/profile', {
    body: JSON.stringify(data),
  });
  await refreshSessionUser();
  return response;
};
