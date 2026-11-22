import { interests, site } from '../data/site.js'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <h2 className="section__title about__title">A developer who likes making things you can step into.</h2>

        <div className="about__copy">
          <p className="about__lead">
            I'm a multimedia developer from {site.location}, studying {site.programme} at{' '}
            {site.school}.
          </p>
          <p>
            I like building things people can step into or play with: games, 3D scenes, AR and VR
            experiences, and interactive applications. What keeps me hooked is the moment an idea
            stops being a sketch and becomes something you can see, move around in and react to.
          </p>
          <p>
            Even in areas where I have less experience, I work hard to close the gap and learn what a
            project needs. I want to keep learning new things and work more in design and game
            development, while staying open to other topics related to my studies. I'm looking for an
            internship where I can contribute to real products, work with a creative team and learn from
            people with more experience.
          </p>
        </div>

        <div className="about__interests">
          <h3 className="about__interests-title">What pulls me in</h3>
          <ul>
            {interests.map((item) => (
              <li key={item} className="about__interest">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
