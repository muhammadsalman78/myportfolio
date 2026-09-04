import { useEffect } from 'react'

export function Toast({ open, type = 'success', message, onClose, duration = 4200 }) {
  useEffect(() => {
    if (!open || !message) return undefined

    const id = setTimeout(() => {
      onClose?.()
    }, duration)

    return () => clearTimeout(id)
  }, [open, message, duration, onClose])

  if (!open || !message) return null

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <p>{message}</p>
      <button type="button" className="toast-close" aria-label="Close notification" onClick={onClose}>
        ×
      </button>
    </div>
  )
}
