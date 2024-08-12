import { PATCH } from 'shared/api';
import { Profile } from 'entities/profile';

import { EditProfileData } from '../model/schema';

export const editProfile = async (data: EditProfileData) =>
  PATCH<Profile>('/profile', { body: JSON.stringify(data) });
