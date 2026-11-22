import { useState } from 'react'
import Button from './Button.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import './ProjectCard.css'

export default function ProjectCard({ project, onOpen }) {
  // Projects with a playable film use the picture for the play button, not for opening details.
  const playable = 'film' in project
  // Empty card waiting for its content: nothing opens yet
  const empty = Boolean(project.comingSoon)
  const open = (p, el) => !empty && onOpen(p, el)
  // 'idle' (cover), 'playing' or 'paused' (paused or ended, player still on screen)
  const [playState, setPlayState] = useState('idle')

  return (
    <article className={`project project--${project.size} ${playState !== 'idle' ? `project--${playState}` : ''} ${project.fit === 'contain' ? 'project--contain' : ''}`}>
      {/* Mouse users can click the picture; keyboard users use the button below. */}
      <div
        className={`project__visual ${playable || empty ? 'project__visual--static' : ''}`}
        onClick={playable || empty ? undefined : (e) => onOpen(project, e.currentTarget)}
        role={playable || empty ? undefined : 'presentation'}
      >
        <ProjectMedia project={project} onPlayStateChange={setPlayState} />
        {!playable && !empty && (
          <span className="project__veil" aria-hidden="true">
            View details
          </span>
        )}
      </div>

      <div className="project__body">
        <div className="project__head">
          <h3 className="project__title">{project.title}</h3>
          {project.subtitle && <span className="project__badge">{project.subtitle}</span>}
        </div>
        <p className="project__summary">{project.summary}</p>

        {project.tech.length > 0 && (
          <ul className="project__tech" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        <Button
          variant="ghost"
          className="btn--small"
          onClick={(e) => open(project, e.currentTarget)}
          aria-disabled={empty || undefined}
          aria-label={`View details for ${project.title}`}
        >
          View details
        </Button>
      </div>
    </article>
  )
}
