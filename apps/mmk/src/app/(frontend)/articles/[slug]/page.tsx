import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Media, Video, Article } from '@/payload-types'
import { format } from 'date-fns'
import ArticleReaderView from '@/components/ArticleReaderView'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const articleResult = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })

  const article = articleResult.docs[0]
  if (!article) {
    return {
      title: 'Strategic Briefing Not Found',
    }
  }

  const imageUrl = getCloudinaryUrl(article.featured_image, 'drone-shield')
  const description =
    article.excerpt ||
    'In-depth defense intelligence and geopolitical assessment by veteran Indian Army officer Major Madhan Kumar.'

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.published_at || undefined,
      authors: ['Major Madhan Kumar (Retd)'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Article with maximal depth to ensure 'body' (Lexical JSON) is fully populated
  const articleResult = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 2, // Required to resolve nested relationship fields like Tags and Media
  })

  const article = articleResult.docs[0]

  // ⚡ Robust safety check: If no article is found, return 404
  if (!article) return notFound()

  // ⚡ Debugging hook: If you see "Unknown" in the UI, check your terminal for this output.
  // If this is null or empty, your Payload collection isn't saving the data correctly.
  console.log('Article Data Resolved:', article.title, !!article.body)

  const currentTagIds =
    (article.tags as any[])?.map((t) => (typeof t === 'object' ? t.id : t)) || []

  // 2. Parallel Data Fetching for high performance
  const [adResult, videoMatch, relatedArticles, recommendedVideos] = await Promise.all([
    payload.find({
      collection: 'ads',
      where: { and: [{ active: { equals: true } }, { 'targeting.tags': { in: currentTagIds } }] },
      limit: 1,
      depth: 2,
    }),
    currentTagIds.length > 0
      ? payload.find({
          collection: 'videos',
          where: { and: [{ status: { equals: 'published' } }, { tags: { in: currentTagIds } }] },
          limit: 1,
          depth: 1,
        })
      : { docs: [] },
    payload.find({
      collection: 'articles',
      where: {
        and: [
          { slug: { not_equals: slug } },
          { status: { equals: 'published' } },
          { tags: { in: currentTagIds } },
        ],
      },
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'videos',
      where: { and: [{ status: { equals: 'published' } }, { tags: { in: currentTagIds } }] },
      limit: 3,
      depth: 1,
    }),
  ])

  // 3. Normalization logic
  const targetAd = adResult.docs[0] || null
  const matchedVideo = (videoMatch.docs[0] as Video) || null
  const image =
    typeof article.featured_image === 'object' ? (article.featured_image as Media) : null
  const formattedDate = article.published_at
    ? format(new Date(article.published_at), 'MMMM dd, yyyy')
    : 'Date Unavailable'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || article.title,
    image: [getCloudinaryUrl(article.featured_image, 'drone-shield')],
    datePublished: article.published_at,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Major Madhan Kumar (Retd)',
      jobTitle: 'Defense Analyst & Geopolitical Strategist',
      url: 'https://majormadhankumar.in/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Major Madhan Kumar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media/major-madhan.webp',
      },
    },
  }

  // ⚡ Final check: ensure body exists before passing to client component
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleReaderView
        article={article}
        formattedDate={formattedDate}
        image={image}
        matchedVideo={matchedVideo}
        adsData={targetAd}
        relatedArticles={relatedArticles.docs as Article[]}
        recommendedVideos={recommendedVideos.docs as Video[]}
      />
    </>
  )
}
