import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { LOCALES } from './i18n';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: 'en',
    localePrefix: 'as-needed',
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
