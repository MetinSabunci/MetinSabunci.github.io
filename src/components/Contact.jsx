import Button from './Button.jsx'
import { site } from '../data/site.js'
import './Contact.css'

export default function Contact() {
  const links = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <p className="contact__status">
          <span className="contact__dot" aria-hidden="true" />
          {site.availability}
        </p>
        <h2 className="contact__title">Looking for an internship. Let's talk.</h2>
        <p className="contact__lede">
          I'm a New Technology student in {site.location} looking for an internship with a studio,
          agency or game company. Send me a message and I'll get back to you.
        </p>

        <div className="contact__cta">
          <Button href={`mailto:${site.email}`}>Email me</Button>
        </div>

        <ul className="contact__links">
          {links.map((l) => (
            <li key={l.label}>
              <a
                className="contact__link"
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              >
                <span className="contact__link-label">{l.label}</span>
                <span className="contact__link-value">{l.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
