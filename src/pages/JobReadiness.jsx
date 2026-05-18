import { Link } from 'react-router-dom'
import { getCurrentUser, getSessions } from '../utils/storage.js'
import { JOBS, calcJobReadiness } from '../utils/jobs.js'

export default function JobReadiness() {
  const username = getCurrentUser()
  const sessions = getSessions(username)

  return (
    <div className="page">
      <h1 className="page-title">Job Readiness</h1>
      <p className="page-subtitle">See how close you are to meeting real employer requirements for each role.</p>

      <div className="grid grid-2" style={{gap:'1.25rem'}}>
        {JOBS.map(job => {
          const pct = calcJobReadiness(sessions, job)
          const color = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--blue)' : 'var(--grey-400)'
          return (
            <div key={job.id} className="card">
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.875rem'}}>
                <span style={{fontSize:'1.75rem'}}>{job.icon}</span>
                <div>
                  <div style={{fontWeight:700,color:'var(--navy)'}}>{job.title}</div>
                  <div style={{fontSize:'0.8rem',color:'var(--grey-500)'}}>
                    {job.wpmGoal ? `${job.wpmGoal}+ WPM` : `${job.kphGoal?.toLocaleString()}+ KPH`} · {job.accGoal}%+ accuracy
                  </div>
                </div>
                <div style={{marginLeft:'auto',fontWeight:700,fontSize:'1.25rem',color}}>{pct}%</div>
              </div>

              <div className="progress-bar-wrap thick" style={{marginBottom:'0.75rem'}}>
                <div className="progress-bar-fill" style={{width:`${pct}%`,background:pct>=80?'var(--green)':undefined}} />
              </div>

              <div style={{fontSize:'0.8rem',color:'var(--grey-600)',marginBottom:'0.875rem'}}>
                <strong>Required skills:</strong> {job.skills.join(', ')}
              </div>

              <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                {pct >= 100
                  ? <span className="badge badge-green">✅ Ready!</span>
                  : pct >= 80
                  ? <span className="badge badge-blue">Almost there!</span>
                  : <span className="badge badge-grey">Keep training</span>
                }
                <Link to={`/practice?mode=job&job=${job.id}`} className="btn btn-primary btn-sm" style={{marginLeft:'auto'}}>
                  {pct > 0 ? 'Continue Path' : 'Start Path'} →
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
