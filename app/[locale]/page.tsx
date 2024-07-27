import { FC } from 'react';

import { RoutePath } from 'shared/lib/const';
import { redirect } from 'next/navigation';

const RootPage: FC = () => {
  redirect(RoutePath.UsersRoot);
};

export default RootPage;
