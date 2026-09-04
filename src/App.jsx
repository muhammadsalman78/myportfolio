import { useEffect, useMemo, useState } from 'react'
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  Hero,
  Menu,
  Projects,
  Seo,
  Sidebar,
  Skills,
} from './components'
import site from './data/site.json'
import { useActiveSection, useClock, useScrollProgress } from './hooks'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const clock = useClock(site.timezone)
  const ids = useMemo(() => site.nav.map((item) => item.id), [])
  const active = useActiveSection(ids)
  const progress = useScrollProgress()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="page">
      <Seo />
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="ambient" aria-hidden="true">
        <span className="ambient-glow one" />
        <span className="ambient-glow two" />
      </div>

      <button
        className="menu-btn"
        type="button"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
      <Sidebar />

      <main className="main" id="main-content">
        <Hero clock={clock} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
