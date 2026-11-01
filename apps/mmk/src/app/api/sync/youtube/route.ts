import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })

    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })

    const channelHandle = (settings as any)?.youtube_automation?.channel_id || '@MajorMadhanKumar'
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            'YOUTUBE_API_KEY environment variable is not configured. Add YOUTUBE_API_KEY to enable live automated YouTube sync.',
          channel: channelHandle,
          syncedCount: 0,
        },
        { status: 200 }
      )
    }

    // Call YouTube Data API to fetch channel uploads
    const cleanHandle = channelHandle.replace(/^@/, '')
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(cleanHandle)}&key=${apiKey}`
    )
    const channelData = await channelRes.json()
    const uploadsPlaylistId = channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return NextResponse.json(
        {
          success: false,
          message: `Could not resolve uploads playlist for handle @${cleanHandle}. Verify channel handle or permissions in Site Settings.`,
        },
        { status: 400 }
      )
    }

    // Fetch latest 10 videos from playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`
    )
    const playlistData = await playlistRes.json()
    const items = playlistData?.items || []

    let syncedCount = 0
    const results: Array<{ youtubeId: string; title: string; status: string }> = []

    for (const item of items) {
      const youtubeId = item.snippet?.resourceId?.videoId
      const title = item.snippet?.title
      const description = item.snippet?.description

      if (!youtubeId || title === 'Private video') continue

      const existing = await payload.find({
        collection: 'videos',
        where: { youtube_id: { equals: youtubeId } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'videos',
          data: {
            title,
            youtube_id: youtubeId,
            category: 'defence',
            status: 'published',
            description: description || '',
          },
        })
        syncedCount++
        results.push({ youtubeId, title, status: 'created' })
      } else {
        results.push({ youtubeId, title, status: 'already_exists' })
      }
    }

    return NextResponse.json({
      success: true,
      channel: channelHandle,
      syncedCount,
      totalExamined: items.length,
      items: results,
    })
  } catch (error: any) {
    console.error('YouTube automated sync failed:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown server error during sync' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  return GET(request)
}
