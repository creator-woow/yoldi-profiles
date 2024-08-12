import { FC } from 'react';
import { redirect } from 'next/navigation';

import { RoutePath } from 'shared/lib';

const RootPage: FC = () => {
  redirect(RoutePath.UsersRoot);
};

export default RootPage;
