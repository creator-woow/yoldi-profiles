'use client';

import { FC } from 'react';

import { Profile } from 'entities/profile';
import { ProfilesVirtualList } from 'screens/profilesRoot/ui/ProfilesVirtualList';
import { clientFetch } from 'shared/api/clientFetch';
import { useFetch } from 'shared/hooks/useFetch';
import { useTranslations } from 'shared/hooks/useTranslations';

interface ProfilesRootPageProps {
  profiles: Profile[];
}

export const ProfilesRootPage: FC<ProfilesRootPageProps> = ({
  profiles: prefetchedProfiles,
}) => {
  const t = useTranslations();
  const { data: profiles } = useFetch('/user', clientFetch.GET<Profile[]>, {
    refreshInterval: 120000,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    fallbackData: prefetchedProfiles,
  });

  return (
    <div className="content-container flex flex-col size-full pt-[50px] pb-[30px]">
      <h1 className="title-md  mb-[30px]">{t('profiles_root_page.title')}</h1>
      <div className="flex-auto">
        <ProfilesVirtualList profiles={profiles} />
      </div>
    </div>
  );
};
