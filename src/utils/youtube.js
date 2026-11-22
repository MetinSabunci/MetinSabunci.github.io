/**
 * Accepts any normal YouTube link (or a bare 11-character video id) and returns the video id,
 * or null when the value is not a YouTube video (for example a local file such as 'media/x.mp4').
 */
export function youtubeId(value) {
  if (!value || typeof value !== 'string') return null
  const text = value.trim()
  if (/^[\w-]{11}$/.test(text)) return text
  try {
    const url = new URL(text)
    const host = url.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (url.searchParams.get('v')) return url.searchParams.get('v')
      const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/)
      return match ? match[1] : null
    }
  } catch {
    /* not a URL */
  }
  return null
}

/** Widescreen (16:9) cover picture of a video. */
export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

/** Smaller cover that exists for every video; used if the widescreen one is not available yet. */
export const youtubeThumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
