import { FC } from 'react';

import { getUsers } from 'entities/user';

import { UsersPage } from './UsersPage';

export const UsersPageProvider: FC = async () => {
  const users = await getUsers();

  return <UsersPage users={users} />;
};
