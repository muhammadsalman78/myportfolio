import site from '../data/site.json'
import { Arrow } from './Arrow'

export function Sidebar() {
  return (
    <aside className="left-sidebar intro-in">
      <div className="sidebar-top">
        <a className="logo" href="#home">
          {site.shortName}
        </a>
        <span className="status-pill">
          <i className="status-dot" />
          {site.availability}
        </span>
      </div>

      <div className="avatar-card">
        <span className="avatar-mark">{site.shortName}</span>
      </div>

      <div className="sidebar-meta">
        <h1>{site.name}</h1>
        <p className="sidebar-role">{site.role}</p>
        <p>{site.locationFull}</p>
        <p>{site.email}</p>
        <p>{site.phone}</p>
      </div>

      <ul className="social">
        {site.social.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <Arrow />
            </a>
          </li>
        ))}
      </ul>

      <a className="started" href="#contact">
        <span>Contact Me</span>
        <span className="started-icon">
          <Arrow />
        </span>
      </a>
    </aside>
  )
}
