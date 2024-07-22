import { FC } from 'react';

import { ProfilesVirtualList } from 'screens/profilesRoot/ui/ProfilesVirtualList';
import { getProfilesList } from 'entities/profile';
import { getTranslations } from 'shared/lib/intl';

export const ProfilesRootPage: FC = async () => {
  const [t, profiles] = await Promise.all([
    getTranslations(),
    getProfilesList(),
  ]);

  return (
    <div className="content-container flex flex-col size-full pt-[50px] pb-[30px]">
      <h1 className="title-md  mb-[30px]">{t('profiles_root_page.title')}</h1>
      <div className="flex-auto">
        <ProfilesVirtualList profiles={profiles} />
      </div>
    </div>
  );
};
