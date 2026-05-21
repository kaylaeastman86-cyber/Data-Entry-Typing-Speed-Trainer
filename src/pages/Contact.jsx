import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <h1 className="page-title">Contact Us</h1>
      <div className="card card-lg" style={{ lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Have a question, found a bug, or want to share feedback? We&apos;d love to hear from you.
          Data Entry Speed Trainer is a solo-built project and every message is read personally.
        </p>

        <div style={{
          background: 'rgba(79, 70, 229, 0.08)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>Email Us Directly</p>
          <a
            href="mailto:lushellabrands@gmail.com?subject=Data Entry Speed Trainer Feedback"
            className="link"
            style={{ fontSize: '1.05rem', fontWeight: 500 }}
          >
            lushellabrands@gmail.com
          </a>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1rem' }}>Send a Message</p>

          <div style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem' }}>Your Name</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--grey-600, #888)' }}>Include your name in the email subject or body.</p>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem' }}>Subject</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--grey-600, #888)' }}>Bug report, feature request, general feedback, etc.</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem' }}>Message</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--grey-600, #888)' }}>Describe your issue or suggestion in as much detail as you like.</p>
          </div>

          <a
            href="mailto:lushellabrands@gmail.com?subject=Data Entry Speed Trainer Feedback"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.5rem',
              background: 'var(--primary, #4f46e5)',
              color: '#fff',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Open Email Client &#8594;
          </a>
        </div>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>What to Include</h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.4rem' }}>For <strong>bug reports</strong>: describe what happened, what you expected, and your browser/OS.</li>
          <li style={{ marginBottom: '0.4rem' }}>For <strong>feature requests</strong>: describe what you&apos;d like to see and why it would help.</li>
          <li style={{ marginBottom: '0.4rem' }}>For <strong>general feedback</strong>: anything helps &mdash; we appreciate every message!</li>
        </ul>

        <p style={{ fontSize: '0.9rem', color: 'var(--grey-600, #888)', marginBottom: '1.5rem' }}>
          Response times may vary. We aim to respond within 3&ndash;5 business days.
        </p>

        <hr className="divider" />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="link">&#8592; Home</Link>
          <Link to="/about" className="link">About</Link>
          <Link to="/privacy" className="link">Privacy Policy</Link>
          <Link to="/terms" className="link">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
