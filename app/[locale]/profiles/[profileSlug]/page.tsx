import { Metadata } from 'next';

import { ProfilePage, ProfilePageProps } from 'screens/profile';
import { getProfile } from 'entities/profile';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async ({
  params,
}: ProfilePageProps): Promise<Metadata> => {
  const [t, profile] = await Promise.all([
    getTranslations(),
    getProfile(params.profileSlug),
  ]);

  return {
    title: t('profile_page.title', { name: profile.name }),
  };
};

export default ProfilePage;
