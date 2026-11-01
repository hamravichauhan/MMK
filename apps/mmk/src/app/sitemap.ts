import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://majormadhankumar.in'
  const payload = await getPayload({ config: configPromise })

  const [articles, soldiers, events, galleries] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 0,
    }),
    payload.find({
      collection: 'soldiers',
      limit: 100,
      depth: 0,
    }),
    payload.find({
      collection: 'events',
      limit: 50,
      depth: 0,
    }),
    payload.find({
      collection: 'gallery-albums',
      limit: 50,
      depth: 0,
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/know-your-soldiers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/merchandise`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.docs.map((doc) => ({
    url: `${baseUrl}/articles/${doc.slug}`,
    lastModified: new Date(doc.updatedAt || doc.createdAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const soldierRoutes: MetadataRoute.Sitemap = soldiers.docs.map((doc) => ({
    url: `${baseUrl}/know-your-soldiers/${doc.slug}`,
    lastModified: new Date(doc.updatedAt || doc.createdAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.docs.map((doc) => ({
    url: `${baseUrl}/events/${doc.slug}`,
    lastModified: new Date(doc.updatedAt || doc.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const galleryRoutes: MetadataRoute.Sitemap = galleries.docs.map((doc) => ({
    url: `${baseUrl}/gallery/${doc.slug}`,
    lastModified: new Date(doc.updatedAt || doc.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes, ...soldierRoutes, ...eventRoutes, ...galleryRoutes]
}
