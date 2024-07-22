import { MiddlewareConfig, NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { LOCALE_PREFIX, SUPPORTED_LOCALES } from 'shared/config/intl';

const intlMiddleware = createIntlMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: SUPPORTED_LOCALES[0],
  localePrefix: LOCALE_PREFIX,
});

export const middleware = (req: NextRequest) => {
  return intlMiddleware(req);
};

export const config: MiddlewareConfig = {
  // todo: make regex more flexible
  matcher: [
    '/((?!api|_next/static|manifest|sw|workbox|robots|assets|favicon).*)',
  ],
};
