import { useCountUp, useInView } from '../hooks'

export function Stat({ label, value, suffix, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const count = useCountUp(value, inView)

  return (
    <div
      ref={ref}
      className={`stat-card reveal reveal-up${inView ? ' is-visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <p className="section-label">{label}</p>
      <p className="stat-value">
        {count}
        <span>{suffix}</span>
      </p>
    </div>
  )
}
