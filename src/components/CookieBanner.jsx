import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const handleClose = () => {
    localStorage.setItem('cookie_consent', 'dismissed')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#1e2a4a',
      color: '#cdd6f4',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      zIndex: 9999,
      borderTop: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 -2px 16px rgba(0,0,0,0.4)',
    }}>
      <p style={{ margin: 0, fontSize: '0.875rem', maxWidth: 700 }}>
        We use cookies to serve ads via{' '}
        <strong>Google AdSense</strong> and to remember your preferences.
        By clicking &ldquo;Accept&rdquo; you consent to our use of cookies.{' '}
        <Link to="/privacy" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
          Learn more
        </Link>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          onClick={handleAccept}
          style={{
            background: 'var(--primary, #7c3aed)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Accept
        </button>
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            color: '#cdd6f4',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6,
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
