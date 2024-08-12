import { Metadata } from 'next';

import { UserPage, UserPageProps } from 'pages-view/user';
import { getTranslations } from 'shared/lib';
import { getUser } from 'entities/user';

export const generateMetadata = async ({
  params,
}: UserPageProps): Promise<Metadata> => {
  const [t, user] = await Promise.all([
    getTranslations(),
    getUser(params.userSlug),
  ]);

  return {
    title: t('user_page.title', { name: user.name }),
  };
};

export default UserPage;
