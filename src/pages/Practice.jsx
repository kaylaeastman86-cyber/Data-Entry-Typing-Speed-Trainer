import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getCurrentUser, getSessions, addSession, saveActiveSession, clearActiveSession, getActiveSession } from '../utils/storage.js'
import { calcSessionXP, addXP, getTotalXP } from '../utils/xp.js'
import { checkAndAwardBadges } from '../utils/badges.js'
import { getPromptForSkill } from '../data/prompts.js'
import { JOBS } from '../utils/jobs.js'

const DURATIONS = [60, 180, 300]

export default function Practice() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const username = getCurrentUser()

  const mode = params.get('mode') || 'skill'
  const jobId = params.get('job')
  const skillParam = params.get('skill') || 'typing'

  // Derive skill key
  const getSkillKey = () => {
    if (mode === 'job') {
      const job = JOBS.find(j => j.id === jobId)
      return job ? job.skillKeys[Math.floor(Math.random() * job.skillKeys.length)] : 'typing'
    }
    if (mode === 'daily') return 'mixed'
    return skillParam
  }

  const [phase, setPhase] = useState('setup') // setup | active | paused | done
  const [duration, setDuration] = useState(60)
  const [prompt, setPrompt] = useState('')
  const [typed, setTyped] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [startTime, setStartTime] = useState(null)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const skillKey = useRef(getSkillKey())

  // Resume active session if exists
  useEffect(() => {
    const active = getActiveSession()
    if (active && mode === active.mode && skillParam === active.skill) {
      setPrompt(active.prompt)
      setTyped(active.typed || '')
      setTimeLeft(active.timeLeft || 60)
      setDuration(active.duration || 60)
      setErrors(active.errors || 0)
      setPhase('active')
    }
  }, [])

  const startSession = () => {
    const p = getPromptForSkill(skillKey.current)
    setPrompt(p)
    setTyped('')
    setErrors(0)
    setTimeLeft(duration)
    setStartTime(Date.now())
    setPhase('active')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  useEffect(() => {
    if (phase === 'active') {
      if (!startTime) setStartTime(Date.now())
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            finishSession()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [phase])

  const finishSession = useCallback(() => {
    setPhase('done')
    clearInterval(intervalRef.current)
    clearActiveSession()
  }, [])

  useEffect(() => {
    if (phase === 'done' && prompt) {
      const elapsed = duration // full time used
      const correctChars = [...typed].filter((c, i) => c === prompt[i]).length
      const totalTyped = typed.length
      const wpm = Math.round((correctChars / 5) / (duration / 60))
      const accuracy = totalTyped > 0 ? Math.round((correctChars / (correctChars + errors)) * 100) : 0
      const score = Math.round(wpm * (accuracy / 100) * 10)
      const kph = skillKey.current === 'tenKey'
        ? Math.round((correctChars * 3600) / duration)
        : 0

      const prevSessions = getSessions(username)
      const prevBestWPM = prevSessions.length ? Math.max(...prevSessions.map(s=>s.wpm||0)) : 0
      const beatBest = wpm > prevBestWPM

      const xpEarned = calcSessionXP(wpm, accuracy, beatBest)
      addXP(username, xpEarned)

      const newSession = { wpm, accuracy, errors, score, kph, skill: skillKey.current, mode, duration }
      addSession(username, newSession)
      const newBadges = checkAndAwardBadges(username, { wpm, accuracy, kph, skill: skillKey.current })

      navigate(`/results?wpm=${wpm}&accuracy=${accuracy}&errors=${errors}&score=${score}&skill=${skillKey.current}&kph=${kph}&xp=${xpEarned}&badges=${newBadges.join(',')}`)
    }
  }, [phase, prompt])

  // Handle typing
  const handleInput = (e) => {
    if (phase !== 'active') return
    const val = e.target.value
    // Count new errors
    if (val.length > typed.length) {
      const i = val.length - 1
      if (val[i] !== prompt[i]) setErrors(prev => prev + 1)
    }
    setTyped(val)
    // Auto-finish if prompt complete
    if (val.length >= prompt.length) {
      finishSession()
    }
    // Save active session
    saveActiveSession({ prompt, typed: val, timeLeft, duration, skill: skillKey.current, mode, errors })
  }

  // Render prompt with coloring
  const renderPrompt = () => {
    return [...prompt].map((char, i) => {
      let cls = 'char-pending'
      if (i < typed.length) cls = typed[i] === char ? 'char-correct' : 'char-wrong'
      else if (i === typed.length) cls = 'char-current'
      return <span key={i} className={cls}>{char}</span>
    })
  }

  const liveWPM = startTime && typed.length > 0
    ? Math.round((typed.split(' ').length) / ((duration - timeLeft + 1) / 60))
    : 0
  const correctSoFar = [...typed].filter((c,i) => c === prompt[i]).length
  const liveAcc = typed.length > 0 ? Math.round((correctSoFar / (correctSoFar + errors)) * 100) : 100

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  return (
    <div className="page" style={{maxWidth:800}}>
      <div className="keyboard-banner">⌨️ Best used with a physical keyboard</div>
      <div style={{height:'1rem'}}/>

      {phase === 'setup' && (
        <div className="card card-lg" style={{textAlign:'center'}}>
          <h1 className="page-title">Ready to Train?</h1>
          <p className="page-subtitle">
            {mode === 'job' ? `Job: ${JOBS.find(j=>j.id===jobId)?.title}` :
             mode === 'daily' ? 'Daily Challenge' :
             `Skill: ${skillParam.charAt(0).toUpperCase()+skillParam.slice(1)}`}
          </p>
          <div style={{marginBottom:'2rem'}}>
            <p style={{fontWeight:600,marginBottom:'0.75rem',color:'var(--grey-700)'}}>Choose Session Length</p>
            <div style={{display:'flex',gap:'0.75rem',justifyContent:'center'}}>
              {DURATIONS.map(d => (
                <button key={d} onClick={()=>setDuration(d)}
                  className="btn btn-lg"
                  style={{background:duration===d?'var(--blue)':'var(--grey-200)',color:duration===d?'var(--white)':'var(--grey-700)',minWidth:90}}>
                  {d===60?'1 min':d===180?'3 min':'5 min'}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-lg" style={{minWidth:200}} onClick={startSession}>
            Start Session →
          </button>
        </div>
      )}

      {(phase === 'active' || phase === 'paused') && (
        <>
          {/* Stats bar */}
          <div style={{display:'flex',gap:'1rem',marginBottom:'1rem',flexWrap:'wrap'}}>
            <div className="stat-card" style={{flex:1,minWidth:100,padding:'0.75rem'}}>
              <div className={`timer-display${timeLeft<=10?' warning':''}`}>{formatTime(timeLeft)}</div>
              <div className="stat-label">Time Left</div>
            </div>
            <div className="stat-card" style={{flex:1,minWidth:80,padding:'0.75rem'}}>
              <div className="stat-value">{liveWPM}</div>
              <div className="stat-label">WPM</div>
            </div>
            <div className="stat-card" style={{flex:1,minWidth:80,padding:'0.75rem'}}>
              <div className="stat-value">{liveAcc}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-card" style={{flex:1,minWidth:80,padding:'0.75rem'}}>
              <div className="stat-value" style={{color:'var(--red)'}}>{errors}</div>
              <div className="stat-label">Errors</div>
            </div>
          </div>

          {/* Prompt */}
          <div className="practice-prompt">{renderPrompt()}</div>

          {/* Input */}
          {phase === 'active' && (
            <input
              ref={inputRef}
              className="practice-input"
              value={typed}
              onChange={handleInput}
              placeholder="Start typing here…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          )}

          {/* Controls */}
          <div style={{display:'flex',gap:'0.75rem',marginTop:'1rem'}}>
            {phase === 'active'
              ? <button className="btn btn-secondary" onClick={()=>{clearInterval(intervalRef.current);setPhase('paused')}}>⏸ Pause</button>
              : <button className="btn btn-primary" onClick={()=>{setPhase('active');inputRef.current?.focus()}}>▶ Resume</button>
            }
            <button className="btn btn-outline" onClick={()=>{clearInterval(intervalRef.current);clearActiveSession();navigate(-1)}}>✕ Quit</button>
          </div>

          {phase === 'paused' && (
            <div className="alert alert-info mt-2">⏸ Session paused. Click Resume to continue.</div>
          )}
        </>
      )}
    </div>
  )
}
