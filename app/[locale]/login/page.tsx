import { Metadata } from 'next';

import { LoginPage } from 'pages/login';
import { getTranslations } from 'shared/lib';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('login_page.title'),
  };
};

export default LoginPage;
