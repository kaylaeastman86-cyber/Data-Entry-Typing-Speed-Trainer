import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, saveDailyChallenge, getDailyChallenges } from '../utils/storage.js'
import { getDailyPrompts } from '../data/prompts.js'
import { addXP } from '../utils/xp.js'
import { checkAndAwardBadges, awardBadge } from '../utils/badges.js'

const today = new Date().toISOString().split('T')[0]

export default function DailyChallenge() {
  const username = getCurrentUser()
  const navigate = useNavigate()
  const challenges = getDailyChallenges(username)
  const alreadyDone = !!challenges[today]

  const prompts = getDailyPrompts()
  const STEPS = [
    { key:'name',    label:'Enter the name:',           prompt: prompts.name },
    { key:'address', label:'Enter the address:',        prompt: prompts.address },
    { key:'invoice', label:'Enter the invoice number:', prompt: prompts.invoice },
    { key:'tenKey',  label:'Enter the number sequence:',prompt: prompts.tenKey },
    { key:'email',   label:'Enter the email address:',  prompt: prompts.email },
  ]

  const [phase, setPhase]   = useState(alreadyDone ? 'done' : 'intro')
  const [step, setStep]     = useState(0)
  const [typed, setTyped]   = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  // Calc streak
  const sortedDates = Object.keys(challenges).sort().reverse()
  let streak = 0
  let check = new Date(today)
  for (const d of sortedDates) {
    const dd = d.replace(/-/g,'')
    const cc = check.toISOString().split('T')[0].replace(/-/g,'')
    if (dd === cc) { streak++; check.setDate(check.getDate()-1) } else break
  }

  useEffect(() => {
    if (phase === 'active') setTimeout(()=>inputRef.current?.focus(), 100)
  }, [phase, step])

  const handleNext = () => {
    const current = STEPS[step]
    const correct = [...typed].filter((c,i)=>c===current.prompt[i]).length
    const acc = typed.length ? Math.round((correct/(correct+Math.max(0,typed.length-correct)))*100) : 0
    const res = { key: current.key, label: current.label, prompt: current.prompt, typed, accuracy: acc }
    const newResults = [...results, res]
    setResults(newResults)
    setTyped('')

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      // Finish
      const avgAcc = Math.round(newResults.reduce((a,r)=>a+r.accuracy,0)/newResults.length)
      saveDailyChallenge(username, today, { completed: true, accuracy: avgAcc, date: today })
      addXP(username, 20)
      awardBadge(username, 'first_daily')
      checkAndAwardBadges(username, { wpm: 0, accuracy: avgAcc, kph: 0, skill: 'daily' })
      setPhase('done')
    }
  }

  const allResults = results

  return (
    <div className="page" style={{maxWidth:700}}>
      <div className="keyboard-banner">⌨️ Best used with a physical keyboard</div>
      <div style={{height:'1rem'}}/>
      <h1 className="page-title">Daily Challenge</h1>

      <div style={{display:'flex',gap:'1rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        <div className="stat-card" style={{flex:1}}>
          <div className="stat-value" style={{color:'var(--yellow)'}}>🔥 {streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card" style={{flex:1}}>
          <div className="stat-value">{sortedDates.length}</div>
          <div className="stat-label">Total Completed</div>
        </div>
      </div>

      {phase === 'intro' && (
        <div className="card card-lg text-center">
          <div style={{fontSize:'3rem',marginBottom:'0.75rem'}}>📅</div>
          <h2 style={{color:'var(--navy)',marginBottom:'0.5rem'}}>Today's Challenge</h2>
          <p className="text-muted" style={{marginBottom:'1.5rem'}}>
            5 data entry prompts — a name, address, invoice number, number sequence, and email. New challenge every day!
          </p>
          <p style={{marginBottom:'1.5rem',fontSize:'0.875rem',color:'var(--grey-600)'}}>+20 XP on completion</p>
          <button className="btn btn-primary btn-lg" onClick={()=>setPhase('active')}>Start Challenge →</button>
        </div>
      )}

      {phase === 'active' && (
        <div className="card card-lg">
          {/* Step indicator */}
          <div style={{display:'flex',gap:'0.5rem',marginBottom:'1.5rem'}}>
            {STEPS.map((_,i)=>(
              <div key={i} style={{
                flex:1, height:6, borderRadius:3,
                background: i<step?'var(--teal)':i===step?'var(--blue)':'var(--grey-200)'
              }} />
            ))}
          </div>
          <p style={{fontSize:'0.8rem',color:'var(--grey-500)',marginBottom:'0.375rem'}}>Step {step+1} of {STEPS.length}</p>
          <p style={{fontWeight:600,color:'var(--grey-700)',marginBottom:'0.75rem'}}>{STEPS[step].label}</p>

          {/* Prompt */}
          <div className="practice-prompt" style={{fontSize:'1.1rem',minHeight:80}}>
            {[...STEPS[step].prompt].map((c,i)=>{
              let cls = 'char-pending'
              if (i < typed.length) cls = typed[i]===c ? 'char-correct' : 'char-wrong'
              else if (i===typed.length) cls='char-current'
              return <span key={i} className={cls}>{c}</span>
            })}
          </div>

          <input
            ref={inputRef}
            className="practice-input"
            value={typed}
            onChange={e=>setTyped(e.target.value)}
            placeholder="Type here…"
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            onKeyDown={e=>{ if(e.key==='Enter' && typed.length>0) handleNext() }}
          />

          <div style={{marginTop:'1rem',display:'flex',gap:'0.75rem',alignItems:'center'}}>
            <button className="btn btn-primary" onClick={handleNext} disabled={!typed.length}>
              {step < STEPS.length-1 ? 'Next →' : 'Finish ✓'}
            </button>
            <span className="text-xs text-muted">Press Enter or click to advance</span>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="card card-lg">
          <div style={{textAlign:'center',marginBottom:'1.5rem'}}>
            <div style={{fontSize:'3rem'}}>🎉</div>
            <h2 style={{color:'var(--green)',marginTop:'0.5rem'}}>Challenge Complete!</h2>
            {!alreadyDone && <p className="text-muted mt-1">+20 XP earned · Streak: 🔥 {streak+1} days</p>}
          </div>

          {allResults.length > 0 && (
            <div style={{marginBottom:'1.5rem'}}>
              <div className="section-title">Your Results</div>
              {allResults.map((r,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 0',borderBottom:'1px solid var(--grey-100)',fontSize:'0.875rem'}}>
                  <span style={{color:'var(--grey-600)'}}>{STEPS[i]?.label.replace(':','')}</span>
                  <span style={{fontWeight:600,color:r.accuracy>=95?'var(--green)':r.accuracy>=80?'var(--blue)':'var(--red)'}}>
                    {r.accuracy}% accuracy
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
            <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            <Link to="/train/skill" className="btn btn-secondary">Keep Practicing</Link>
          </div>
        </div>
      )}
    </div>
  )
}
