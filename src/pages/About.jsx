import { Link } from 'react-router-dom'
export default function About() {
  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 className="page-title">About Data Entry Speed Trainer</h1>
      <div className="card card-lg">
        <h2 style={{color:'var(--navy)',marginBottom:'0.75rem'}}>What Is This?</h2>
        <p style={{marginBottom:'1rem',lineHeight:1.8}}>
          Data Entry Speed Trainer is a free, browser-based practice tool designed to help job seekers and professionals
          build the typing speed and accuracy required for real data entry careers.
        </p>
        <h2 style={{color:'var(--navy)',marginBottom:'0.75rem'}}>Who Is It For?</h2>
        <p style={{marginBottom:'1rem',lineHeight:1.8}}>
          Anyone who wants to improve their data entry skills — whether you're applying for your first office job,
          preparing for a typing test, or looking to move into remote work. The app covers 10 real job categories and
          18 skill drills, from standard typing to 10-key number pad entry.
        </p>
        <h2 style={{color:'var(--navy)',marginBottom:'0.75rem'}}>Is It Really Free?</h2>
        <p style={{marginBottom:'1rem',lineHeight:1.8}}>
          Yes. All features are free. Your data stays entirely in your browser's localStorage — nothing is sent to any server.
        </p>
        <h2 style={{color:'var(--navy)',marginBottom:'0.75rem'}}>Practice Disclaimer</h2>
        <p style={{lineHeight:1.8,color:'var(--grey-600)'}}>
          This tool is for practice and self-improvement only. Completion reports and badge achievements are not
          official certifications and should not be represented as such to employers.
        </p>
        <hr className="divider" />
        <div style={{display:'flex',gap:'1rem'}}>
          <Link to="/privacy" className="link">Privacy Policy</Link>
          <Link to="/terms" className="link">Terms of Service</Link>
          <Link to="/" className="link">Home</Link>
        </div>
      </div>
    </div>
  )
}
