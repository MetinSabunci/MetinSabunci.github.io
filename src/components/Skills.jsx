import { skillGroups } from '../data/site.js'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section__title skills__title">Tools I work with</h2>

        <div className="skills__groups">
          {skillGroups.map((group) => (
            <div className="skills__group" key={group.title}>
              <div className="skills__meta">
                <h3 className="skills__group-title">{group.title}</h3>
                <p className="skills__note">{group.note}</p>
              </div>
              <ul className="skills__list">
                {group.skills.map((skill) => (
                  <li className="skills__item" key={skill}>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
