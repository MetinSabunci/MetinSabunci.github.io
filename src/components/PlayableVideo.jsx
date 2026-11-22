import { useEffect, useRef, useState } from 'react'
import ProjectArt from './ProjectArt.jsx'
import YouTubeEmbed from './YouTubeEmbed.jsx'
import { asset } from '../utils/asset.js'
import { youtubeId, youtubeThumb, youtubeThumbFallback } from '../utils/youtube.js'
import './PlayableVideo.css'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

/**
 * A video that waits for the visitor: it shows a cover (poster or first frame) with a play
 * button, and only plays, with sound and controls, after the button is pressed.
 * When no `film` is set yet, a labelled placeholder is shown instead.
 */
export default function PlayableVideo({ film, poster, art, title, onPlayStateChange }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const report = (state) => onPlayStateChange?.(state)

  // Pause the film if it scrolls out of view
  useEffect(() => {
    const video = ref.current
    if (!video || !started) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [started])

  // YouTube link: show a cover with a play button, load the player only after it is pressed.
  const ytId = youtubeId(film)
  if (ytId) {
    if (started) {
      return (
        <div className="player">
          <YouTubeEmbed
            id={ytId}
            title={title}
            autoplay
            onState={(s) => report(s === 'playing' ? 'playing' : 'paused')}
          />
        </div>
      )
    }
    return (
      <div className="player">
        <img
          className="media"
          src={poster ? asset(poster) : youtubeThumb(ytId)}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (!poster && !e.currentTarget.dataset.fallback) {
              e.currentTarget.dataset.fallback = 'true'
              e.currentTarget.src = youtubeThumbFallback(ytId)
            }
          }}
        />
        <button
          className="player__cover"
          onClick={() => {
            setStarted(true)
            report('playing')
          }}
          aria-label={`Play ${title}`}>
          <span className="player__play">
            <PlayIcon />
          </span>
        </button>
      </div>
    )
  }

  if (!film) {
    return (
      <div className="placeholder player">
        <ProjectArt type={art} />
        <span className="player__play" aria-hidden="true">
          <PlayIcon />
        </span>
        <span className="placeholder__tag">Placeholder: add your film in projects.js</span>
      </div>
    )
  }

  const play = () => {
    const video = ref.current
    if (!video) return
    setStarted(true)
    video.play().catch(() => {})
  }

  const reset = () => {
    setStarted(false)
    report('idle')
    if (ref.current) ref.current.currentTime = 0.1
  }

  return (
    <div className="player">
      <video
        ref={ref}
        className="media"
        // Without a cover image, #t=0.1 makes the browser show the film's first frame.
        // With a cover image it must not be added, or the first frame would replace the cover.
        src={poster ? asset(film) : `${asset(film)}#t=0.1`}
        poster={poster ? asset(poster) : undefined}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => report('playing')}
        onPause={(e) => !e.currentTarget.ended && report('paused')}
        onEnded={reset}
      />
      {!started && (
        <button className="player__cover" onClick={play} aria-label={`Play ${title}`}>
          <span className="player__play">
            <PlayIcon />
          </span>
        </button>
      )}
    </div>
  )
}
