import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const LOCALES = [
  'en',
  // More locales can go here. Just be sure a corresponding file exists
  // in the "messages" directory.
];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!LOCALES.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
