// apps/mmk/src/utils/youtube.ts

export interface LiveVideoMetadata {
  title: string
  thumbnail: string
  duration: string
  viewCount: string
  publishedAt: string
}

export async function fetchLiveYouTubeData(youtubeId: string): Promise<LiveVideoMetadata | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    console.warn('Missing YOUTUBE_API_KEY in environment variables.')
    return null
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=snippet,contentDetails,statistics`

  try {
    // Next.js Cache optimization layer: Revalidates background streams every 6 hours (21600s)
    const res = await fetch(url, { next: { revalidate: 21600 } })
    const data = await res.json()
    const item = data?.items?.[0]

    if (!item) return null

    return {
      title: item.snippet?.title || 'Geopolitical Analysis Stream',
      thumbnail: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url || '',
      duration: item.contentDetails?.duration || '',
      viewCount: item.statistics?.viewCount || '0',
      publishedAt: item.snippet?.publishedAt || '',
    }
  } catch (error) {
    console.error(`Error querying live YouTube Data for ID ${youtubeId}:`, error)
    return null
  }
}