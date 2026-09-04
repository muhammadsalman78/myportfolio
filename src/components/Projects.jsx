import site from '../data/site.json'
import { Arrow } from './Arrow'
import { Reveal } from './Reveal'

export function Projects() {
  const { projects } = site.sections

  return (
    <section className="section" id="projects">
      <Reveal as="p" className="section-label">
        {projects.label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={90}>
        {projects.title}
      </Reveal>
      <div className="project-grid">
        {site.projects.map((project, index) => (
          <Reveal
            as="article"
            key={project.title}
            className="project-card"
            variant="scale"
            delay={index * 110}
          >
            <div className="project-head">
              <div>
                <p className="company">{project.category}</p>
                <h3>{project.title}</h3>
              </div>
              <span className="chip">{project.year}</span>
            </div>
            <p className="project-copy">{project.summary}</p>
            <ul className="tag-list small">
              {project.stack.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {project.link ? (
              <a
                className="project-link"
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.link.label}
                <Arrow />
              </a>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
