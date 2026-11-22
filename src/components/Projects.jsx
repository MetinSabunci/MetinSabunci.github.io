import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const trigger = useRef(null)

  const open = useCallback((project, el) => {
    trigger.current = el
    setSelected(project)
  }, [])

  const close = useCallback(() => {
    setSelected(null)
    // Return focus to whatever opened the dialog
    requestAnimationFrame(() => trigger.current?.focus?.({ preventScroll: true }))
  }, [])

  // Featured projects get their own full-width row above the grid.
  const featured = projects.filter((p) => p.size === 'full')
  const regular = projects.filter((p) => p.size !== 'full')

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="projects__intro">
          <h2 className="section__title">Selected projects</h2>
          <p className="projects__lede">
            Games, AR/VR and 3D work from my studies and my own experiments. Open a project to see
            what it is built with.
          </p>
        </div>

        {featured.length > 0 && (
          <div className="projects__featured">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={open} />
            ))}
          </div>
        )}

        <div className="projects__grid">
          {regular.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={open} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
