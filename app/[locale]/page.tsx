import { FC } from 'react';

import { RoutePath } from 'shared/lib/const';
import { redirect } from 'next/navigation';

const RootPage: FC = () => {
  redirect(RoutePath.ProfilesRoot);
};

export default RootPage;
