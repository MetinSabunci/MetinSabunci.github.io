import { useEffect, useRef, useState } from 'react'
import ProjectArt from './ProjectArt.jsx'
import { openPdf } from '../utils/pdf.js'

/** The first page of the PDF, drawn on the project card. It loads when the card comes into view. */
export default function PdfThumb({ path, art }) {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    let cancelled = false
    ;(async () => {
      try {
        const doc = await openPdf(path)
        const page = await doc.getPage(1)
        if (cancelled || !canvas.current) return
        const base = page.getViewport({ scale: 1 })
        const scale = Math.min(2, 1000 / base.width)
        const viewport = page.getViewport({ scale })
        const el = canvas.current
        el.width = Math.floor(viewport.width)
        el.height = Math.floor(viewport.height)
        await page.render({ canvas: el, canvasContext: el.getContext('2d'), viewport }).promise
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [visible, path])

  if (failed) return <ProjectArt type={art} />
  return (
    <div ref={wrap} className="pdf-thumb">
      <canvas ref={canvas} className="media" aria-hidden="true" />
    </div>
  )
}
