import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { ALL_BADGES } from '../utils/badges.js'

const getGrade = (score) => {
  if (score >= 900) return { letter:'A+', cls:'grade-A-plus', msg:"Outstanding! You're performing at a professional level." }
  if (score >= 800) return { letter:'A',  cls:'grade-A',     msg:"Excellent work! Your speed and accuracy are impressive." }
  if (score >= 600) return { letter:'B',  cls:'grade-B',     msg:"Good job! Keep practicing to push into the A range." }
  if (score >= 400) return { letter:'C',  cls:'grade-C',     msg:"Decent effort. Focus on accuracy before speed." }
  return { letter:'D', cls:'grade-D', msg:"Keep at it! Consistency is the key to improvement." }
}

export default function Results() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const wpm      = parseInt(params.get('wpm')) || 0
  const accuracy = parseInt(params.get('accuracy')) || 0
  const errors   = parseInt(params.get('errors')) || 0
  const score    = parseInt(params.get('score')) || 0
  const skill    = params.get('skill') || ''
  const kph      = parseInt(params.get('kph')) || 0
  const xp       = parseInt(params.get('xp')) || 0
  const newBadges = (params.get('badges') || '').split(',').filter(Boolean)

  const grade = getGrade(score)
  const earnedBadgeDetails = newBadges.map(id => ALL_BADGES.find(b=>b.id===id)).filter(Boolean)

  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 className="page-title">Session Results</h1>

      {/* Grade */}
      <div className="card card-lg text-center" style={{marginBottom:'1.25rem'}}>
        <div className={`grade-display ${grade.cls}`}>{grade.letter}</div>
        <p style={{marginTop:'0.5rem',color:'var(--grey-600)'}}>{grade.msg}</p>
        <div className="badge badge-blue mt-1">+{xp} XP earned</div>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{marginBottom:'1.25rem'}}>
        {[
          ['WPM',wpm,'⚡'],
          ['Accuracy',accuracy+'%','🎯'],
          ['Errors',errors,'❌'],
          ['Score',score,'📊'],
        ].map(([l,v,icon])=>(
          <div className="stat-card" key={l}>
            <div style={{fontSize:'1.25rem'}}>{icon}</div>
            <div className="stat-value">{v}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      {kph > 0 && (
        <div className="card text-center" style={{marginBottom:'1.25rem'}}>
          <div className="stat-value">{kph.toLocaleString()}</div>
          <div className="stat-label">Keystrokes Per Hour (KPH)</div>
        </div>
      )}

      {/* New badges */}
      {earnedBadgeDetails.length > 0 && (
        <div className="card" style={{marginBottom:'1.25rem'}}>
          <div className="section-title">🎉 New Badges Earned!</div>
          <div className="grid grid-4" style={{gap:'0.75rem'}}>
            {earnedBadgeDetails.map(b=>(
              <div key={b.id} className="badge-item earned">
                <div className="badge-item-icon">{b.icon}</div>
                <div className="badge-item-name">{b.name}</div>
                <div className="badge-item-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
        <button onClick={()=>navigate(-1)} className="btn btn-primary">Practice Again</button>
        <Link to="/train/skill" className="btn btn-secondary">Choose Skill</Link>
        <Link to="/progress" className="btn btn-secondary">View Progress</Link>
        <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
      </div>

      <div className="ad-placeholder">Advertisement</div>
    </div>
  )
}
