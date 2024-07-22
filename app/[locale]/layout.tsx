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
import { ThemeProvider } from 'app/providers/theme';
import { clsx } from 'shared/utils/clsx';

const interFont = Inter({
  style: 'normal',
  subsets: ['latin', 'cyrillic'],
});

type RootLayoutProps = PropsWithChildren<{
  params: {
    locale: string;
  };
}>;

export const metadata: Metadata = {
  title: 'Yoldi Profiles',
};

const Providers: FC<PropsWithChildren> = async (props) => {
  const messages = await getMessages();

  return (
    <IntlProvider messages={messages}>
      <AuthProvider profile={null}>
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
      <body className={clsx(interFont.className)}>
        <Providers>
          <div className="flex flex-col h-dvh">
            <Header />
            <main className="flex-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
