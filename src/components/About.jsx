import site from '../data/site.json'
import { Reveal } from './Reveal'

export function About() {
  const { about } = site.sections

  return (
    <section className="section" id="about">
      <Reveal as="p" className="section-label">
        {about.label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={100}>
        {about.title}
      </Reveal>
      <div className="about-grid">
        <Reveal className="panel compact" variant="left" delay={160}>
          <h3>{about.strengthsTitle}</h3>
          <ul className="bullet-list">
            {site.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="panel compact" variant="right" delay={280}>
          <h3>{about.focusTitle}</h3>
          <ul className="bullet-list">
            {site.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
