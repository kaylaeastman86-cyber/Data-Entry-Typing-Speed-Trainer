import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1 className="page-title">About Data Entry Speed Trainer</h1>
      <div className="card card-lg" style={{ lineHeight: 1.8 }}>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>What Is This App?</h2>
        <p style={{ marginBottom: '1rem' }}>
          Data Entry Speed Trainer is a free, browser-based typing and data entry practice tool designed to help
          job seekers and working professionals build the speed and accuracy needed for real-world data entry
          careers. Whether you&apos;re applying for your first office job, preparing for an employer typing test,
          or trying to increase your WPM and KPH scores, this app gives you structured, job-relevant practice
          &mdash; completely free.
        </p>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Who Built It?</h2>
        <p style={{ marginBottom: '1rem' }}>
          This app was designed and built by <strong>Kayla Eastman</strong>, a solo developer and digital
          entrepreneur. Kayla built this tool to fill a real gap: most typing test sites are generic and
          disconnected from the actual demands of data entry jobs. This app is different &mdash; it&apos;s built
          around real job categories and the actual skills employers test for.
        </p>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Practice Modes</h2>
        <p style={{ marginBottom: '0.5rem' }}>The app includes multiple practice modes to match your goals:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.4rem' }}><strong>Free Practice</strong> &mdash; Practice typing freely without time pressure. Build muscle memory and speed at your own pace.</li>
          <li style={{ marginBottom: '0.4rem' }}><strong>Timed Mode</strong> &mdash; Test yourself with a countdown timer. Simulates the pressure of a real employer typing test.</li>
          <li style={{ marginBottom: '0.4rem' }}><strong>Job-Specific Training</strong> &mdash; Practice with content tailored to specific roles:
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
              <li><strong>Data Entry Clerk</strong> &mdash; Numbers, alphanumeric strings, addresses, and forms.</li>
              <li><strong>Medical Transcriptionist</strong> &mdash; Medical terminology, patient records, and clinical notes.</li>
              <li><strong>Legal Secretary</strong> &mdash; Legal documents, case citations, and formal correspondence.</li>
              <li><strong>Customer Service Rep</strong> &mdash; Chat responses, ticket entries, and customer data fields.</li>
            </ul>
          </li>
        </ul>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Badges &amp; XP System</h2>
        <p style={{ marginBottom: '1rem' }}>
          As you practice, you earn XP (experience points) and unlock badges for reaching speed milestones,
          maintaining high accuracy, completing sessions, and hitting streak goals. Your badges and XP are
          stored locally in your browser &mdash; they&apos;re yours, on your device, always available. The
          badge system is designed to keep you motivated and give you a real sense of progress over time.
        </p>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Why It Was Built</h2>
        <p style={{ marginBottom: '1rem' }}>
          Millions of people apply for data entry, administrative, and clerical jobs every year. Many of those
          jobs require a minimum typing speed &mdash; often 40&ndash;60 WPM with 95%+ accuracy. Generic typing
          websites don&apos;t prepare you for this. Data Entry Speed Trainer was built specifically to close that
          gap: to give anyone, regardless of background or budget, a real tool to build the skills they need.
        </p>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>100% Free &mdash; Always</h2>
        <p style={{ marginBottom: '1rem' }}>
          Every feature of this app is completely free. There are no subscriptions, no premium tiers, and no
          paywalls. Your practice data is stored in your own browser&apos;s localStorage &mdash; nothing is
          sent to any server.
        </p>

        <h2 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Contact</h2>
        <p style={{ marginBottom: '1rem' }}>
          Have feedback, found a bug, or just want to say hi? Reach us at{' '}
          <a href="mailto:lushellabrands@gmail.com" className="link">lushellabrands@gmail.com</a>.
        </p>

        <hr className="divider" />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="link">Home</Link>
          <Link to="/tips" className="link">Tips &amp; Articles</Link>
          <Link to="/contact" className="link">Contact</Link>
          <Link to="/privacy" className="link">Privacy Policy</Link>
          <Link to="/terms" className="link">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
