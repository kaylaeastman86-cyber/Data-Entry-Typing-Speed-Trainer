import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy, #1e2a4a)',
      color: '#cdd6f4',
      padding: '2rem 1.5rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>
              Data Entry Speed Trainer
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Link to="/" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Home</Link>
              <Link to="/practice" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Practice</Link>
              <Link to="/about" style={{ color: '#cdd6f4', textDecoration: 'none' }}>About</Link>
              <Link to="/tips" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Tips &amp; Articles</Link>
            </nav>
          </div>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>Legal &amp; Support</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Link to="/contact" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Contact</Link>
              <Link to="/privacy" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms" style={{ color: '#cdd6f4', textDecoration: 'none' }}>Terms of Service</Link>
            </nav>
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#8899bb', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Data Entry Typing Speed Trainer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
