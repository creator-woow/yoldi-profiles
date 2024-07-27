'use client';

import { FC } from 'react';

import { User } from 'entities/user';
import { clientFetch } from 'shared/api/clientFetch';
import { useFetch } from 'shared/hooks/useFetch';
import { useTranslations } from 'shared/hooks/useTranslations';

import { UsersVirtualList } from './UsersVirtualList';

interface UsersPageProps {
  users: User[];
}

export const UsersPage: FC<UsersPageProps> = ({ users: prefetchedUsers }) => {
  const t = useTranslations();
  const { data: users } = useFetch('/user', clientFetch.GET<User[]>, {
    refreshInterval: 120000,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    fallbackData: prefetchedUsers,
  });

  return (
    <div className="content-container flex flex-col size-full pt-[50px] pb-[30px]">
      <h1 className="title-md  mb-[30px]">{t('users_page.title')}</h1>
      <div className="flex-auto">
        <UsersVirtualList users={users} />
      </div>
    </div>
  );
};
