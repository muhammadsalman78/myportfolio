import site from '../data/site.json'
import { Reveal } from './Reveal'

export function Skills() {
  const { skills } = site.sections

  return (
    <section className="section" id="skills">
      <Reveal as="p" className="section-label">
        {skills.label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={90}>
        {skills.title}
      </Reveal>
      <div className="skill-groups">
        {site.skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} className="panel compact" delay={groupIndex * 100}>
            <h3>{group.title}</h3>
            <ul className="skill-grid">
              {group.items.map((item, index) => (
                <li key={item} style={{ '--skill-delay': `${index * 40}ms` }}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
