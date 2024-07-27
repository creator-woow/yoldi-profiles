import { FC, PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getMessages } from 'next-intl/server';

import 'app/styles/globals.css';
import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  Theme,
} from 'shared/config/theme';
import { AuthProvider } from 'app/providers/auth';
import { Header } from 'widgets/header';
import { IntlProvider } from 'app/providers/intl';
import { MODAL_CONTAINER_ID } from 'shared/ui/modal';
import { ThemeProvider } from 'app/providers/theme';
import { clsx } from 'shared/utils/clsx';
import { getProfile } from 'entities/profile';
import { getTranslations } from 'shared/lib/intl';

const interFont = Inter({
  style: 'normal',
  subsets: ['latin', 'cyrillic'],
});

type RootLayoutProps = PropsWithChildren<{
  params: {
    locale: string;
  };
}>;

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return {
    title: 'Yoldi Profiles',
    description: t('root.seo_description'),
  };
};

const Providers: FC<PropsWithChildren> = async (props) => {
  const [messages, profile] = await Promise.all([getMessages(), getProfile()]);

  return (
    <IntlProvider messages={messages}>
      <AuthProvider profile={profile}>
        <ThemeProvider>{props.children}</ThemeProvider>
      </AuthProvider>
    </IntlProvider>
  );
};

const RootLayout: FC<RootLayoutProps> = ({ params, children }) => {
  const theme = cookies().get(THEME_COOKIE_NAME)?.value ?? Theme.default;

  const htmlAttributes = {
    lang: params.locale,
    [THEME_ATTRIBUTE_NAME]: theme,
  };

  return (
    <html {...htmlAttributes}>
      <body className={clsx(interFont.className, 'bg-primary text-primary')}>
        <Providers>
          <div className="flex flex-col h-dvh">
            <Header />
            <div className="flex flex-col flex-auto overflow-hidden relative">
              <main className="flex-auto overflow-auto">{children}</main>
              <div
                className="absolute inset-0 empty:hidden z-50"
                id={MODAL_CONTAINER_ID}
              />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
