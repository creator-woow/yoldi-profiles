import { Metadata } from 'next';

import { RegistrationPage } from 'screens/registration';
import { getTranslations } from 'shared/lib/intl';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t('registration_page.title'),
  };
};

export default RegistrationPage;
