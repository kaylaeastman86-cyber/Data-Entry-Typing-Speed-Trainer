import { Link } from 'react-router-dom'
export default function Privacy() {
  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 className="page-title">Privacy Policy</h1>
      <div className="card card-lg" style={{lineHeight:1.8}}>
        <p className="text-muted text-sm mb-2">Last updated: January 1, 2025</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Data Storage</h2>
        <p>All data — including your username, hashed password, practice sessions, and progress — is stored exclusively in your browser's <code>localStorage</code>. No data is transmitted to any external server. Clearing your browser data will permanently delete your account and progress.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Passwords</h2>
        <p>Passwords are hashed using bcrypt before being stored in localStorage. We never store plain-text passwords.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Cookies</h2>
        <p>This app does not use cookies. Session state is managed entirely through localStorage.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Advertising (Google AdSense)</h2>
        <p>This site may display advertisements served by Google AdSense. Google may use cookies and web beacons to serve ads based on your visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="link">Google Ads Settings</a>.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>GDPR / CCPA</h2>
        <p>Because all data is stored locally in your browser, we do not collect, process, or transfer any personal data to our servers. You have full control over your data at all times. To delete your data, clear your browser's localStorage for this site.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Children's Privacy</h2>
        <p>This service is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>

        <h2 style={{color:'var(--navy)',margin:'1.25rem 0 0.5rem'}}>Practice Disclaimer</h2>
        <p>Data Entry Speed Trainer is a practice tool. Any practice reports or achievement records generated are for personal use only and do not constitute official certifications of any kind.</p>

        <hr className="divider" />
        <Link to="/" className="link">← Back to Home</Link>
      </div>
    </div>
  )
}
