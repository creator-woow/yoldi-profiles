import { Metadata } from 'next';

import { ProfilesRootPage } from 'screens/profilesRoot';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('profiles_root_page.title'),
  };
};

export default ProfilesRootPage;
