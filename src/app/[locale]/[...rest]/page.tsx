import { notFound } from 'next/navigation';

/**
 * This page is required for the next-i18n plugin to make sure 404 errors navigate the user to the "not-found"
 * page inside the "app/[locale]" directory.
 *
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files#catching-unknown-routes
 */
export default function CatchAllPage() {
  notFound();
}
