import { Link } from 'react-router-dom'
import { getCurrentUser, getSessions } from '../utils/storage.js'
import { JOBS, calcJobReadiness } from '../utils/jobs.js'

export default function TrainJob() {
  const username = getCurrentUser()
  const sessions = getSessions(username)

  return (
    <div className="page">
      <div className="keyboard-banner">⌨️ Best used with a physical keyboard</div>
      <div style={{height:'1rem'}}/>
      <h1 className="page-title">Train by Job</h1>
      <p className="page-subtitle">Choose a job path and train for its specific speed and accuracy requirements.</p>
      <div className="grid grid-2" style={{gap:'1.25rem'}}>
        {JOBS.map(job => {
          const readiness = calcJobReadiness(sessions, job)
          return (
            <div key={job.id} className="job-card">
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                <span style={{fontSize:'2rem'}}>{job.icon}</span>
                <div>
                  <div className="job-card-title">{job.title}</div>
                  <div className="job-card-skills">{job.skills.join(' · ')}</div>
                </div>
              </div>
              <p style={{fontSize:'0.85rem',color:'var(--grey-600)'}}>{job.desc}</p>
              <div style={{fontSize:'0.8rem',color:'var(--grey-500)'}}>
                Goal: {job.wpmGoal ? `${job.wpmGoal}+ WPM` : `${job.kphGoal?.toLocaleString()}+ KPH`} · {job.accGoal}%+ accuracy
              </div>
              <div className="job-card-readiness">
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.25rem'}}>
                    <span style={{fontSize:'0.8rem',color:'var(--grey-500)'}}>Readiness</span>
                    <span style={{fontSize:'0.8rem',fontWeight:600,color:readiness>=80?'var(--green)':readiness>=50?'var(--blue)':'var(--grey-500)'}}>{readiness}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{width:`${readiness}%`}} />
                  </div>
                </div>
              </div>
              <Link to={`/practice?mode=job&job=${job.id}`} className="btn btn-primary btn-sm" style={{alignSelf:'flex-start'}}>
                Start Training →
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
