import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { FC, PropsWithChildren } from 'react';

type IntlProviderProps = PropsWithChildren<{
  messages?: AbstractIntlMessages;
}>;

export const IntlProvider: FC<IntlProviderProps> = (props) => {
  return (
    <NextIntlClientProvider messages={props.messages}>
      {props.children}
    </NextIntlClientProvider>
  );
};
