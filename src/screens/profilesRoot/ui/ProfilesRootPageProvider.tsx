import { FC } from 'react';

import { getProfilesList } from 'entities/profile';

import { ProfilesRootPage } from './ProfilesRootPage';

export const ProfilesRootPageProvider: FC = async () => {
  const profiles = await getProfilesList();

  return <ProfilesRootPage profiles={profiles} />;
};
