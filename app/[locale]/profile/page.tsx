import { Metadata } from 'next';

import { ProfilePage } from 'pages/profile';
import { getTranslations } from 'shared/lib';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('profile_page.title'),
  };
};

export default ProfilePage;
