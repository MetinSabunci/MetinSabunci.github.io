import { site } from '../data/site.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed and built with React and Vite.</p>
        <a href="#top" className="footer__top">
          Back to top
        </a>
      </div>
    </footer>
  )
}
