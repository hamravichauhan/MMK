import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()

    if (!query || query.length < 2) {
      return NextResponse.json({ articles: [], soldiers: [], videos: [], merchandise: [] })
    }

    const payload = await getPayload({ config: configPromise })

    const [articles, soldiers, videos, merch] = await Promise.all([
      payload.find({
        collection: 'articles',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { title: { like: query } },
                { excerpt: { like: query } },
              ],
            },
          ],
        },
        limit: 4,
        depth: 0,
      }),
      payload.find({
        collection: 'soldiers',
        where: {
          or: [
            { full_name: { like: query } },
            { rank: { like: query } },
            { regiment_unit: { like: query } },
          ],
        },
        limit: 4,
        depth: 0,
      }),
      payload.find({
        collection: 'videos',
        where: {
          and: [
            { status: { equals: 'published' } },
            { title: { like: query } },
          ],
        },
        limit: 4,
        depth: 0,
      }),
      payload.find({
        collection: 'merchandise',
        where: {
          title: { like: query },
        },
        limit: 3,
        depth: 0,
      }),
    ])

    return NextResponse.json({
      articles: articles.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        category: doc.category,
        type: 'article',
      })),
      soldiers: soldiers.docs.map((doc) => ({
        id: doc.id,
        title: `${doc.rank} ${doc.full_name}`,
        slug: doc.slug,
        branch: doc.branch,
        type: 'soldier',
      })),
      videos: videos.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        youtube_id: doc.youtube_id,
        category: doc.category,
        type: 'video',
      })),
      merchandise: merch.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        price: doc.price,
        type: 'merch',
      })),
    })
  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: error.message || 'Search execution failed' },
      { status: 500 }
    )
  }
}
