import { useCallback, useState } from 'react'
import site from '../data/site.json'
import { Arrow } from './Arrow'
import { Reveal } from './Reveal'
import { Toast } from './Toast'

export function Contact() {
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' })
  const { contact } = site.sections

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }))
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    if (status === 'sending') return

    const accessKey = String(site.formAccessKey || '').trim()
    if (!accessKey) {
      setStatus('idle')
      setToast({ open: true, type: 'error', message: contact.setupError })
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const message = String(data.get('message') || '').trim()

    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio inquiry from ${email}`,
          from_name: 'Portfolio Contact',
          email,
          phone,
          message,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Request failed')
      }

      form.reset()
      setStatus('idle')
      setToast({ open: true, type: 'success', message: contact.success })
    } catch {
      setStatus('idle')
      setToast({ open: true, type: 'error', message: contact.error })
    }
  }

  const buttonLabel = status === 'sending' ? contact.submitting : contact.submit

  return (
    <section className="section section-contact" id="contact">
      <Reveal className="contact-card">
        <p className="section-label">{contact.label}</p>
        <h2 className="section-title">{contact.title}</h2>
        <form onSubmit={onSubmit}>
          <label>
            {contact.emailLabel}
            <input name="email" type="email" required placeholder={contact.emailPlaceholder} />
          </label>
          <label>
            {contact.phoneLabel}
            <input name="phone" type="tel" required placeholder={contact.phonePlaceholder} />
          </label>
          <label>
            {contact.messageLabel}
            <textarea name="message" rows="4" required placeholder={contact.messagePlaceholder} />
          </label>
          <button className="started" type="submit" disabled={status === 'sending'}>
            <span>{buttonLabel}</span>
            <span className="started-icon">
              <Arrow />
            </span>
          </button>
        </form>
      </Reveal>

      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />
    </section>
  )
}
