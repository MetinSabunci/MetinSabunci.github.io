import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PdfViewer from './PdfViewer.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import MediaGallery from './MediaGallery.jsx'
import Button from './Button.jsx'
import useLockBodyScroll from '../hooks/useLockBodyScroll.js'
import './ProjectModal.css'

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const reduce = useReducedMotion()

  useLockBodyScroll(true)

  // Focus the close button on open, keep Tab inside the dialog, close on Escape.
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const items = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        className={`modal__panel ${project.gallery?.length || project.pdf ? 'modal__panel--large' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close project details">
          <span aria-hidden="true" />
        </button>

        {project.pdf ? (
          <PdfViewer path={project.pdf} title={project.title} />
        ) : project.gallery?.length ? (
          <MediaGallery items={project.gallery} title={project.title} art={project.art} />
        ) : project.detailsMedia === false ? null : (
          <div className="modal__media">
            <ProjectMedia project={project} withVideo />
          </div>
        )}

        <div className="modal__content">
          <div className="modal__main">
            <h2 id="modal-title" className="modal__title">
              {project.title}
              {project.subtitle && <span className="modal__subtitle">{project.subtitle}</span>}
            </h2>
            {project.description.split('\n\n').map((paragraph) => (
              <p className="modal__text" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="modal__side">
            <dl className="modal__facts">
              {(project.details ?? []).map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
              <div>
                <dt>Built with</dt>
                <dd>
                  <ul className="modal__tech">
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            {project.links?.length > 0 && (
              <div className="modal__links">
                {project.links.map((l) => (
                  <Button key={l.label} href={l.href} variant="ghost" className="btn--small">
                    {l.label}
                  </Button>
                ))}
              </div>
            )}
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}
