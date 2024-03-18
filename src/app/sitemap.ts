import { MetadataRoute } from 'next';

const url = (path: string) => `${URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url(''),
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: url('/login'),
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: url('/register'),
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
