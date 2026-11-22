import { useCallback, useEffect, useRef, useState } from 'react'
import { asset } from '../utils/asset.js'
import { openPdf } from '../utils/pdf.js'
import './PdfViewer.css'

const ZOOM_MIN = 0.5
const ZOOM_MAX = 4
const ZOOM_STEP = 0.25

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

/**
 * A PDF reader: page buttons, page number, zoom, fullscreen and a link to open the file in a new tab.
 * Zoom 100% fits the whole page in the window; zooming in makes the page scroll.
 */
export default function PdfViewer({ path, title }) {
  const root = useRef(null)
  const stage = useRef(null)
  const canvas = useRef(null)
  const task = useRef(null)
  const [doc, setDoc] = useState(null)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [pageText, setPageText] = useState('1')
  const [zoom, setZoom] = useState(1)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [fullscreen, setFullscreen] = useState(false)
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled
  const pages = doc?.numPages ?? 0

  useEffect(() => {
    let cancelled = false
    openPdf(path)
      .then((d) => !cancelled && setDoc(d))
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [path])

  // Keep track of the size of the reading window
  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [doc])

  // Draw the current page
  useEffect(() => {
    if (!doc || !size.w || !size.h) return undefined
    let cancelled = false
    ;(async () => {
      const pdfPage = await doc.getPage(page)
      if (cancelled || !canvas.current) return
      const base = pdfPage.getViewport({ scale: 1 })
      const pad = 24
      const fit = Math.min((size.w - pad) / base.width, (size.h - pad) / base.height)
      const cssScale = fit * zoom
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = pdfPage.getViewport({ scale: cssScale * ratio })
      const el = canvas.current
      el.width = Math.floor(viewport.width)
      el.height = Math.floor(viewport.height)
      el.style.width = `${Math.floor(viewport.width / ratio)}px`
      el.style.height = `${Math.floor(viewport.height / ratio)}px`
      task.current?.cancel()
      task.current = pdfPage.render({ canvas: el, canvasContext: el.getContext('2d'), viewport })
      try {
        await task.current.promise
      } catch {
        /* a newer draw replaced this one */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [doc, page, zoom, size])

  const goTo = useCallback(
    (n) => {
      if (!pages) return
      const next = Math.min(Math.max(n, 1), pages)
      setPage(next)
      setPageText(String(next))
      if (stage.current) stage.current.scrollTo({ top: 0, left: 0 })
    },
    [pages],
  )

  const changeZoom = (delta) => setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 100) / 100)))

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === root.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else root.current?.requestFullscreen?.()
  }

  const onKeyDown = (e) => {
    if (e.target instanceof HTMLInputElement) return
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault()
      goTo(page + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault()
      goTo(page - 1)
    } else if (e.key === '+' || e.key === '=') changeZoom(ZOOM_STEP)
    else if (e.key === '-') changeZoom(-ZOOM_STEP)
  }

  const url = asset(path)

  return (
    <div ref={root} className={`pdf ${fullscreen ? 'pdf--fullscreen' : ''}`} onKeyDown={onKeyDown} tabIndex={-1}>
      <div className="pdf__bar" role="toolbar" aria-label={`${title} PDF controls`}>
        <div className="pdf__group">
          <button className="pdf__btn" onClick={() => goTo(page - 1)} disabled={page <= 1} aria-label="Previous page">
            <Icon><path d="m15 18-6-6 6-6" /></Icon>
          </button>
          <form
            className="pdf__page"
            onSubmit={(e) => {
              e.preventDefault()
              goTo(parseInt(pageText, 10) || page)
            }}
          >
            <input
              value={pageText}
              onChange={(e) => setPageText(e.target.value.replace(/\D/g, ''))}
              onBlur={() => setPageText(String(page))}
              inputMode="numeric"
              aria-label="Page number"
            />
            <span aria-live="polite">/ {pages || '–'}</span>
          </form>
          <button className="pdf__btn" onClick={() => goTo(page + 1)} disabled={!pages || page >= pages} aria-label="Next page">
            <Icon><path d="m9 18 6-6-6-6" /></Icon>
          </button>
        </div>

        <div className="pdf__group">
          <button className="pdf__btn" onClick={() => changeZoom(-ZOOM_STEP)} disabled={zoom <= ZOOM_MIN} aria-label="Zoom out">
            <Icon><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8 11h6" /></Icon>
          </button>
          <button className="pdf__zoom" onClick={() => setZoom(1)} aria-label="Fit page to window">
            {Math.round(zoom * 100)}%
          </button>
          <button className="pdf__btn" onClick={() => changeZoom(ZOOM_STEP)} disabled={zoom >= ZOOM_MAX} aria-label="Zoom in">
            <Icon><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8 11h6M11 8v6" /></Icon>
          </button>
        </div>

        <div className="pdf__group">
          {canFullscreen && (
            <button className="pdf__btn" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              <Icon>
                {fullscreen ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
              </Icon>
            </button>
          )}
          <a className="pdf__open" href={url} target="_blank" rel="noreferrer noopener">
            Open PDF
            <Icon><path d="M7 17 17 7M8 7h9v9" /></Icon>
          </a>
        </div>
      </div>

      <div ref={stage} className="pdf__stage">
        {error ? (
          <p className="pdf__message">
            The PDF could not be loaded. Check the file name in projects.js, or{' '}
            <a href={url} target="_blank" rel="noreferrer noopener">open it in a new tab</a>.
          </p>
        ) : !doc ? (
          <p className="pdf__message">Loading PDF…</p>
        ) : (
          <canvas ref={canvas} className="pdf__canvas" role="img" aria-label={`${title}, page ${page} of ${pages}`} />
        )}
      </div>
    </div>
  )
}
