import { Metadata } from 'next';

import { UsersPage } from 'screens/users';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('users_page.title'),
  };
};

export default UsersPage;
