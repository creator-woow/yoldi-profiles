import { FC } from 'react';
import { redirect } from 'next/navigation';

import { RoutePath } from 'shared/lib/const';
import { getProfile } from 'entities/profile';

import { ProfilePage } from './ProfilePage';

export const ProfilePageProvider: FC = async () => {
  const profile = await getProfile();

  if (!profile) redirect(RoutePath.Login);

  return <ProfilePage profile={profile} />;
};
