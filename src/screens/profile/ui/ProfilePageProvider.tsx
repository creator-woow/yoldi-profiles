import { FC } from 'react';

import { getProfile } from 'entities/profile';

import { ProfilePage } from './ProfilePage';

export interface ProfilePageProviderProps {
  params: {
    profileSlug: string;
  };
}

export const ProfilePageProvider: FC<ProfilePageProviderProps> = async ({
  params,
}) => {
  const profile = await getProfile(params.profileSlug);

  return <ProfilePage profile={profile} />;
};
