import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/forgot-password'],
    },
    sitemap: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
  };
}
