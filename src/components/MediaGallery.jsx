import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProjectArt from './ProjectArt.jsx'
import YouTubeEmbed from './YouTubeEmbed.jsx'
import { asset } from '../utils/asset.js'
import { youtubeId, youtubeThumb } from '../utils/youtube.js'
import './MediaGallery.css'

const slideVariants = {
  enter: ({ dir, reduce }) => ({ opacity: 0, x: reduce ? 0 : dir >= 0 ? '14%' : '-14%', scale: reduce ? 1 : 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: ({ dir, reduce }) => ({ opacity: 0, x: reduce ? 0 : dir >= 0 ? '-14%' : '14%', scale: reduce ? 1 : 0.98 }),
}

const Arrow = ({ direction }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M4 17l5-5 4 4 3-3 4 4" />
  </svg>
)

/** One slide. Shows the real file when `src` is set, otherwise a labelled placeholder. */
function Slide({ item, index, title, art }) {
  const label = `${item.type === 'video' ? 'Video' : 'Image'} ${index + 1}`

  const yt = item.type === 'video' ? youtubeId(item.src) : null
  if (yt) return <YouTubeEmbed id={yt} title={item.caption || `${title}, video ${index + 1}`} />

  if (item.src && item.type === 'video') {
    return (
      <video
        className="gallery__media"
        src={asset(item.src)}
        poster={item.poster ? asset(item.poster) : undefined}
        controls
        playsInline
        preload="metadata"
      />
    )
  }
  if (item.src) {
    return (
      <img
        className="gallery__media"
        src={asset(item.src)}
        alt={item.alt || `${title}, image ${index + 1}`}
        decoding="async"
        draggable="false"
      />
    )
  }
  return (
    <div className="placeholder placeholder--gallery">
      <ProjectArt type={art} />
      {item.type === 'video' && (
        <span className="gallery__play" aria-hidden="true">
          <PlayIcon />
        </span>
      )}
      <span className="placeholder__tag">Placeholder {label.toLowerCase()}: add your file in projects.js</span>
    </div>
  )
}

function Thumb({ item }) {
  const yt = item.type === 'video' ? youtubeId(item.src) : null
  const thumb = item.thumb || (item.type === 'video' ? item.poster : item.src)
  if (thumb) return <img src={asset(thumb)} alt="" loading="lazy" decoding="async" />
  if (yt) return <img src={youtubeThumb(yt)} alt="" loading="lazy" decoding="async" />
  return <span className="gallery__thumb-icon">{item.type === 'video' ? <PlayIcon /> : <ImageIcon />}</span>
}

export default function MediaGallery({ items, title, art = 'lego' }) {
  const reduce = useReducedMotion()
  const count = items.length
  const [[index, dir], setPage] = useState([0, 0])

  const go = useCallback(
    (step) => setPage(([i]) => [(i + step + count) % count, step]),
    [count],
  )
  const jump = (n) => setPage(([i]) => [n, n >= i ? 1 : -1])

  // Left and right arrow keys, unless the visitor is using a video's own controls
  useEffect(() => {
    if (count < 2) return undefined
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && ['VIDEO', 'INPUT'].includes(e.target.tagName)) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [count, go])

  const item = items[index]
  const canSwipe = item.type === 'image' && count > 1

  return (
    <section className="gallery" aria-roledescription="carousel" aria-label={`${title} media`}>
      <div className="gallery__stage">
        <AnimatePresence initial={false} custom={{ dir, reduce }}>
          <motion.div
            key={index}
            className="gallery__slide"
            custom={{ dir, reduce }}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag={canSwipe ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          >
            <Slide item={item} index={index} title={title} art={art} />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button className="gallery__arrow gallery__arrow--prev" onClick={() => go(-1)} aria-label="Previous media">
              <Arrow direction="left" />
            </button>
            <button className="gallery__arrow gallery__arrow--next" onClick={() => go(1)} aria-label="Next media">
              <Arrow direction="right" />
            </button>
          </>
        )}
      </div>

      <div className="gallery__bar">
        <p className="gallery__caption" aria-live="polite">
          {item.caption}
        </p>
        {count > 1 && (
          <p className="gallery__count">
            {index + 1} / {count}
          </p>
        )}
      </div>

      {count > 1 && (
        <ul className="gallery__thumbs">
          {items.map((it, i) => (
            <li key={i}>
              <button
                className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => jump(i)}
                aria-label={`Show ${it.type} ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <Thumb item={it} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
