import { useEffect, useState } from 'react'

export function useCountUp(target, active) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    const start = performance.now()
    const duration = 1400
    let frame = 0

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target])

  return value
}
