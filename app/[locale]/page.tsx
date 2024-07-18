import { FC } from 'react';
import { getTranslations } from 'shared/lib/intl';

const Home: FC = async () => {
  const t = await getTranslations();

  return <main>{t('registration_page.name_field')}</main>;
};

export default Home;
