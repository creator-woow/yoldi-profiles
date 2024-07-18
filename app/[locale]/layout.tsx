import { FC, PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getMessages } from 'next-intl/server';

const interFont = Inter({
  style: 'normal',
  subsets: ['latin', 'cyrillic'],
});

import 'app/styles/globals.css';
import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  Theme,
} from 'shared/config/theme';
import { IntlProvider } from 'app/providers/intlProvider';
import { ThemeProvider } from 'app/providers/themeProvider';
import { clsx } from 'shared/utils/clsx';

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
      <ThemeProvider>{props.children}</ThemeProvider>
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
