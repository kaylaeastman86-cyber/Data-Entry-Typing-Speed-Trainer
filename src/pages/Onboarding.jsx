import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, saveUserProfile } from '../utils/storage.js'

const GOALS = ['Get a data entry job', 'Improve existing skills', 'Pass a typing test', 'Work from home', 'General practice']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ name:'', goal:'', level:'' })

  const username = getCurrentUser()

  const handleFinish = () => {
    saveUserProfile(username, { ...data, onboarded: true })
    navigate('/dashboard')
  }

  return (
    <div className="page-narrow" style={{marginTop:'3rem'}}>
      <div className="card card-lg">
        <div className="steps-indicator">
          {[1,2,3].map(n => (
            <div key={n} className={`step-dot${step===n?' active':step>n?' done':''}`} />
          ))}
        </div>

        {step === 1 && (
          <>
            <h2 style={{fontWeight:700,color:'var(--navy)',marginBottom:'0.5rem'}}>What should we call you?</h2>
            <p className="text-muted text-sm mb-2">This is your display name inside the app.</p>
            <div className="form-group">
              <label className="form-label">First Name or Nickname</label>
              <input className="form-input" value={data.name} onChange={e=>setData({...data,name:e.target.value})} placeholder="e.g. Ashley" autoFocus />
            </div>
            <button className="btn btn-primary btn-full" disabled={!data.name.trim()} onClick={()=>setStep(2)}>Next →</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{fontWeight:700,color:'var(--navy)',marginBottom:'0.5rem'}}>What's your main goal?</h2>
            <p className="text-muted text-sm mb-2">This helps us personalize your training.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.625rem',marginBottom:'1.25rem'}}>
              {GOALS.map(g => (
                <button key={g} onClick={()=>setData({...data,goal:g})}
                  className="btn" style={{
                    textAlign:'left',justifyContent:'flex-start',
                    background: data.goal===g ? 'var(--blue)' : 'var(--grey-100)',
                    color: data.goal===g ? 'var(--white)' : 'var(--grey-700)',
                    border: `2px solid ${data.goal===g?'var(--blue)':'var(--grey-200)'}`,
                  }}>
                  {g}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:'0.75rem'}}>
              <button className="btn btn-secondary" onClick={()=>setStep(1)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1}} disabled={!data.goal} onClick={()=>setStep(3)}>Next →</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{fontWeight:700,color:'var(--navy)',marginBottom:'0.5rem'}}>What's your current level?</h2>
            <p className="text-muted text-sm mb-2">Be honest — we'll start you at the right pace.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.625rem',marginBottom:'1.25rem'}}>
              {[
                ['Beginner','Under 25 WPM or just starting out'],
                ['Intermediate','25–45 WPM, some experience'],
                ['Advanced','45+ WPM, looking to specialize'],
              ].map(([lvl,desc]) => (
                <button key={lvl} onClick={()=>setData({...data,level:lvl})}
                  className="btn" style={{
                    textAlign:'left',justifyContent:'flex-start',flexDirection:'column',alignItems:'flex-start',padding:'0.875rem',
                    background: data.level===lvl ? 'var(--blue)' : 'var(--grey-100)',
                    color: data.level===lvl ? 'var(--white)' : 'var(--grey-700)',
                    border: `2px solid ${data.level===lvl?'var(--blue)':'var(--grey-200)'}`,
                  }}>
                  <span style={{fontWeight:600}}>{lvl}</span>
                  <span style={{fontSize:'0.8rem',opacity:0.8}}>{desc}</span>
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:'0.75rem'}}>
              <button className="btn btn-secondary" onClick={()=>setStep(2)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1}} disabled={!data.level} onClick={handleFinish}>Start Training 🚀</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
