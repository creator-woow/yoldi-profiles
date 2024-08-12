import { Metadata } from 'next';

import { UsersPage } from 'pages-view/users';
import { getTranslations } from 'shared/lib';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('users_page.title'),
  };
};

export default UsersPage;
