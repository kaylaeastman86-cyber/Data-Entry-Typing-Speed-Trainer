import { Link } from 'react-router-dom'
import { getCurrentUser } from '../utils/storage.js'
import { Navigate } from 'react-router-dom'

export default function Landing() {
  if (getCurrentUser()) return <Navigate to="/dashboard" replace />
  return (
    <div className="landing-hero">
      <div style={{maxWidth:600}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>⌨️</div>
        <h1 className="landing-title">Data Entry Speed Trainer</h1>
        <p className="landing-tagline">Train for real data entry jobs.</p>
        <p style={{opacity:0.7,marginBottom:'2rem',fontSize:'1rem'}}>
          Build the speed and accuracy employers need — for free.
        </p>
        <div className="landing-notice">
          <span>⌨️</span> Best used with a physical keyboard
        </div>
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-white btn-lg">Log In</Link>
          <Link to="/create-account" className="btn btn-outline-white btn-lg">Create Free Account</Link>
        </div>
        <div style={{marginTop:'3rem',display:'flex',gap:'2rem',justifyContent:'center',flexWrap:'wrap'}}>
          {[['10', 'Job Paths'],['18+','Skill Drills'],['40+','Badges'],['100%','Free']].map(([n,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:'1.75rem',fontWeight:800}}>{n}</div>
              <div style={{fontSize:'0.85rem',opacity:0.7}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'3rem',display:'flex',gap:'1.5rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/about" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.85rem'}}>About</Link>
          <Link to="/privacy" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.85rem'}}>Privacy</Link>
          <Link to="/terms" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.85rem'}}>Terms</Link>
        </div>
      </div>
    </div>
  )
}
