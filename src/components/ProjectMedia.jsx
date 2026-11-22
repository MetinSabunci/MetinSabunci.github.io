import PdfThumb from './PdfThumb.jsx'
import ProjectArt from './ProjectArt.jsx'
import PlayableVideo from './PlayableVideo.jsx'
import YouTubeEmbed from './YouTubeEmbed.jsx'
import { asset } from '../utils/asset.js'
import { youtubeId } from '../utils/youtube.js'

/**
 * Media for project cards and for projects without a gallery.
 *
 * - Projects with a `film` field (even an empty one) show a cover with a play button on the card.
 *   The film only plays when the visitor presses play. While the path is empty, a placeholder shows.
 * - Everything else shows the project's own video/image when set, otherwise the drawn placeholder.
 */
export default function ProjectMedia({ project, withVideo = false, onPlayStateChange }) {
  // Empty card waiting for its content (comingSoon: true in projects.js)
  if (project.comingSoon) {
    return (
      <div className="placeholder placeholder--empty">
        <span className="placeholder__tag">Media placeholder</span>
      </div>
    )
  }

  // A PDF project shows the first page of the PDF on its card
  if (project.pdf && !withVideo) return <PdfThumb path={project.pdf} art={project.art} />

  if (!withVideo && 'film' in project) {
    return <PlayableVideo film={project.film} poster={project.image} art={project.art} title={project.title}
        onPlayStateChange={onPlayStateChange}
      />
  }

  if (withVideo && youtubeId(project.video)) {
    return <YouTubeEmbed id={youtubeId(project.video)} title={project.title} />
  }
  if (withVideo && project.video) {
    return (
      <video
        className="media"
        src={asset(project.video)}
        poster={project.image ? asset(project.image) : undefined}
        controls
        playsInline
        preload="metadata"
      />
    )
  }
  if (project.image) {
    return (
      <img
        className="media"
        src={asset(project.image)}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return <ProjectArt type={project.art} />
}
