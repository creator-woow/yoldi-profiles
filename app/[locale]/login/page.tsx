import { Metadata } from 'next';

import { LoginPage } from 'screens/login';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('login_page.title'),
  };
};

export default LoginPage;
