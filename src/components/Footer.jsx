import site from '../data/site.json'

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        {site.name} — {site.role}
      </p>
    </footer>
  )
}
