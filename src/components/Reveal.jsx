import { useInView } from '../hooks'

export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, variant = 'up', ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
