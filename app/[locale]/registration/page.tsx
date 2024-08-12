import { Metadata } from 'next';

import { RegistrationPage } from 'pages-view/registration';
import { getTranslations } from 'shared/lib';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('registration_page.title'),
  };
};

export default RegistrationPage;
