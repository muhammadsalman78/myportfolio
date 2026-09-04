import site from '../data/site.json'
import { Stat } from './Stat'

export function Hero({ clock }) {
  return (
    <section className="section-hero" id="home">
      <p className="hero-place intro-in" style={{ animationDelay: '100ms' }}>
        {site.locationFull} · <span className="clock">{clock}</span>
      </p>
      <p className="section-label intro-in" style={{ animationDelay: '220ms' }}>
        {site.sections.hero.label}
      </p>
      <h2 className="hero-title intro-in" style={{ animationDelay: '340ms' }}>
        {site.title}
      </h2>
      <p className="lede intro-in" style={{ animationDelay: '480ms' }}>
        {site.intro}
      </p>
      <p className="summary intro-in" style={{ animationDelay: '600ms' }}>
        {site.summary}
      </p>

      <ul className="tag-list">
        {site.highlights.map((item, index) => (
          <li key={item} className="intro-in" style={{ animationDelay: `${720 + index * 90}ms` }}>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="stats">
        {site.stats.map((stat, index) => (
          <Stat key={stat.label} {...stat} delay={index * 140} />
        ))}
      </div>
    </section>
  )
}
