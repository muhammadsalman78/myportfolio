import site from '../data/site.json'
import { Reveal } from './Reveal'

export function Experience() {
  const { experience } = site.sections

  return (
    <section className="section" id="experience">
      <Reveal as="p" className="section-label">
        {experience.label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={90}>
        {experience.title}
      </Reveal>
      <div className="experience-list">
        {site.experience.map((job, index) => (
          <Reveal
            as="article"
            key={job.company}
            className="experience-item"
            variant="left"
            delay={index * 150}
          >
            <div className="job-row">
              <div>
                <p className="company">{job.company}</p>
                <h3 className="job-title">{job.title}</h3>
                {job.location ? <p className="job-location">{job.location}</p> : null}
              </div>
              <span className="chip">{job.period}</span>
            </div>
            <ul className="bullet-list muted-list">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
