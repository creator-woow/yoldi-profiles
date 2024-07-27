import { Metadata } from 'next';

import { ProfilePage } from 'screens/profile';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('profile_page.title'),
  };
};

export default ProfilePage;
