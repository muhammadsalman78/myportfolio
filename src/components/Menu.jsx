import site from '../data/site.json'

export function Menu({ open, onClose, active }) {
  return (
    <div className={`canvas-menu${open ? ' is-open' : ''}`}>
      <button className="canvas-overlay" type="button" aria-label="Close menu" onClick={onClose} />
      <div className="canvas-panel">
        <div className="canvas-head">
          <p className="section-label">Navigation</p>
          <button type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <ul>
          {site.nav.map((item, index) => (
            <li key={item.id} style={{ '--menu-delay': `${index * 60}ms` }}>
              <a className={active === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
