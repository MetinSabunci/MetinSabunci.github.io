import { useEffect, useRef } from 'react'
import './YouTubeEmbed.css'

const ORIGIN = 'https://www.youtube-nocookie.com'

/**
 * Privacy-friendly YouTube player (youtube-nocookie.com).
 * `onState` (optional) is called with 'playing', 'paused' or 'ended' when the visitor plays, pauses
 * or finishes the video. It listens to the player's own messages, no extra script is loaded.
 */
export default function YouTubeEmbed({ id, title, autoplay = false, onState }) {
  const frame = useRef(null)
  const params = `rel=0&playsinline=1&enablejsapi=1${autoplay ? '&autoplay=1' : ''}`

  useEffect(() => {
    if (!onState) return undefined
    const listen = (event) => {
      if (event.source !== frame.current?.contentWindow) return
      let data = event.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }
      const state = data?.event === 'onStateChange' ? data.info : data?.info?.playerState
      if (state === 1 || state === 3) onState('playing')
      else if (state === 2) onState('paused')
      else if (state === 0) onState('ended')
    }
    window.addEventListener('message', listen)
    return () => window.removeEventListener('message', listen)
  }, [onState])

  // Ask the player to start sending its state
  const subscribe = () => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1 }), ORIGIN)
  }

  return (
    <iframe
      ref={frame}
      className="yt"
      src={`${ORIGIN}/embed/${id}?${params}`}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      onLoad={subscribe}
    />
  )
}
