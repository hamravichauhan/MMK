/**
 * Centralized Media URL Resolver
 * Guarantees every image renders cleanly as modern WebP with zero broken icons.
 * Automatically maps internal /api/media/file/ references directly to the Cloudinary CDN.
 */

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media'

export const getCloudinaryUrl = (
  mediaObj: any,
  fallbackName: string = 'drone-shield'
): string => {
  if (!mediaObj) {
    return `${CLOUDINARY_BASE}/${fallbackName}.webp`
  }

  let rawUrl = ''
  if (typeof mediaObj === 'string') {
    rawUrl = mediaObj.trim()
  } else if (typeof mediaObj === 'object') {
    rawUrl = mediaObj.url || (mediaObj.filename ? `/api/media/file/${mediaObj.filename}` : '')
  }

  if (!rawUrl) {
    return `${CLOUDINARY_BASE}/${fallbackName}.webp`
  }

  // 1. Direct Cloudinary asset
  if (rawUrl.includes('res.cloudinary.com')) {
    let clean = rawUrl.replace(/\.webp\.webp/g, '.webp')
    if (!clean.includes('f_webp')) {
      clean = clean.replace('/upload/', '/upload/f_webp,q_auto/')
    }
    return clean
  }

  // 2. Relative API upload proxy -> convert directly to Cloudinary CDN WebP asset
  if (rawUrl.startsWith('/api/media/file/')) {
    const filename = rawUrl.replace('/api/media/file/', '').split('?')[0]
    const baseName = filename.split('.')[0]
    return `${CLOUDINARY_BASE}/${baseName}.webp`
  }

  // 3. Fallback placeholder or relative local asset
  if (rawUrl.startsWith('/') || rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  return `${CLOUDINARY_BASE}/${rawUrl.split('.')[0]}.webp`
}

export default getCloudinaryUrl
