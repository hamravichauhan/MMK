import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://majormadhankumar.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/articles', '/articles/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
