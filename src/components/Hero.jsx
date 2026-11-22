import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button.jsx'
import { site } from '../data/site.js'
import './Hero.css'

const lines = ['Multimedia', 'Developer.']

export default function Hero() {
  const reduce = useReducedMotion()

  // Everything below the headline waits until the headline has "rendered".
  const reveal = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <h1 className="hero__title" aria-label="Multimedia Developer.">
          {lines.map((text, i) => (
            <span className="hero__line" key={text} aria-hidden="true">
              <span className="hero__text" style={{ '--i': i }}>
                {text}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__foot">
          <motion.div className="hero__intro" {...reveal(1.25)}>
            <p className="hero__lead">
              Hi, I'm {site.name}, a {site.title.toLowerCase()} from {site.location}.
            </p>
            <p className="hero__text-body">
              I'm studying Multimedia &amp; Creative Technologies at Karel de Grote University of Applied
              Sciences (KdG) in Antwerp. I enjoy working with Unity and Blender, especially creating games,
              3D environments and interactive experiences.
            </p>
          </motion.div>

          <motion.div className="hero__actions" {...reveal(1.4)}>
            <div className="hero__buttons">
              <Button href="#work">Explore my work</Button>
              <Button href="#contact" variant="ghost">
                Get in touch
              </Button>
            </div>
            <p className="hero__status">
              <span className="hero__dot" aria-hidden="true" />
              {site.availability}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
