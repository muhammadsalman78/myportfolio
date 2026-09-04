import site from '../data/site.json'
import { Reveal } from './Reveal'

export function Education() {
  const { education } = site.sections

  return (
    <section className="section" id="education">
      <Reveal as="p" className="section-label">
        {education.label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={90}>
        {education.title}
      </Reveal>
      <div className="education-list">
        {site.education.map((item, index) => (
          <Reveal as="article" key={item.title} className="education-item" variant="scale" delay={index * 150}>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
