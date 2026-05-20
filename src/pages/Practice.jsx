import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getCurrentUser, getSessions, addSession, saveActiveSession, clearActiveSession, getActiveSession } from '../utils/storage.js'
import { calcSessionXP, addXP } from '../utils/xp.js'
import { checkAndAwardBadges } from '../utils/badges.js'
import { getPromptForSkill, voiceCallScenarios } from '../data/prompts.js'
import { JOBS } from '../utils/jobs.js'

const DURATIONS = [60, 180, 300]
const VOICE_JOB_IDS = ['receptionist', 'customer_service', 'virtual_assistant']

// Bug 6: job mode requires a minimum session length
const JOB_REQUIREMENTS = {
  'data_entry_clerk': { minMinutes: 5 },
  'admin_assistant': { minMinutes: 5 },
  'customer_service': { minMinutes: 5 },
  'receptionist': { minMinutes: 5 },
  'medical_office': { minMinutes: 5 },
  'billing_clerk': { minMinutes: 3 },
  'accounting_assistant': { minMinutes: 3 },
  'warehouse_clerk': { minMinutes: 3 },
  'ecommerce_processor': { minMinutes: 5 },
  'virtual_assistant': { minMinutes: 5 },
}

const backBtnStyle = {
  position: 'absolute', top: '1rem', left: '1rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
  padding: '0.4rem 1.2rem',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  backdropFilter: 'blur(4px)',
  zIndex: 10
}

export default function Practice() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const username = getCurrentUser()

  const mode = params.get('mode') || 'skill'
  const jobId = params.get('job')
  const skillParam = params.get('skill') || 'typing'

  // Bug 6: derive locked duration for job mode before state init
  const isJobMode = mode === 'job'
  const lockedDuration = isJobMode ? (JOB_REQUIREMENTS[jobId]?.minMinutes || 5) * 60 : null

  const getSkillKey = () => {
    if (mode === 'job') {
      const job = JOBS.find(j => j.id === jobId)
      return job ? job.skillKeys[Math.floor(Math.random() * job.skillKeys.length)] : 'typing'
    }
    if (mode === 'daily') return 'mixed'
    return skillParam
  }

  const [phase, setPhase] = useState('setup')
  // Bug 6: pre-set duration to locked value in job mode
  const [duration, setDuration] = useState(isJobMode ? (lockedDuration || 300) : 60)
  const [prompt, setPrompt] = useState('')
  const [typed, setTyped] = useState('')
  const [timeLeft, setTimeLeft] = useState(isJobMode ? (lockedDuration || 300) : 60)
  const [startTime, setStartTime] = useState(null)
  const [errors, setErrors] = useState(0)
  const [totalCorrectChars, setTotalCorrectChars] = useState(0)
  const [promptsCompleted, setPromptsCompleted] = useState(0)
  const [listenMode, setListenMode] = useState(false)
  const [promptRevealed, setPromptRevealed] = useState(false)

  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const skillKey = useRef(getSkillKey())
  // Refs for safe access inside async timer callbacks
  const typedRef = useRef('')
  const promptRef = useRef('')
  const totalCorrectRef = useRef(0)
  const errorsRef = useRef(0)
  const durationRef = useRef(isJobMode ? (lockedDuration || 300) : 60)
  const promptsCompletedRef = useRef(0)
  const keystrokesRef = useRef(0)  // Bug 4 fix: track real keystroke count for KPH

  const isVoiceJob = mode === 'job' && VOICE_JOB_IDS.includes(jobId)

  useEffect(() => {
    const active = getActiveSession()
    if (active && mode === active.mode && skillParam === active.skill) {
      const p = active.prompt || ''
      setPrompt(p); promptRef.current = p
      setTyped(active.typed || ''); typedRef.current = active.typed || ''
      setTimeLeft(active.timeLeft || 60)
      setDuration(active.duration || 60); durationRef.current = active.duration || 60
      setErrors(active.errors || 0); errorsRef.current = active.errors || 0
      setTotalCorrectChars(active.totalCorrectChars || 0); totalCorrectRef.current = active.totalCorrectChars || 0
      setPromptsCompleted(active.promptsCompleted || 0); promptsCompletedRef.current = active.promptsCompleted || 0
      keystrokesRef.current = active.keystrokes || 0  // Bug 4 fix: restore keystrokes on resume
      setPhase('active')
    }
  }, [])

  const pickPrompt = (useVoice) => {
    if (useVoice && voiceCallScenarios && voiceCallScenarios.length) {
      return voiceCallScenarios[Math.floor(Math.random() * voiceCallScenarios.length)]
    }
    return getPromptForSkill(skillKey.current)
  }

  const speakPrompt = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.85
    utterance.pitch = 1.0
    utterance.volume = 1.0
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
      || voices.find(v => v.lang === 'en-US')
      || voices[0]
    if (voice) utterance.voice = voice
    window.speechSynthesis.speak(utterance)
  }

  const startSession = (useVoice = false) => {
    const p = pickPrompt(useVoice)
    setPrompt(p); promptRef.current = p
    setTyped(''); typedRef.current = ''
    setErrors(0); errorsRef.current = 0
    setTotalCorrectChars(0); totalCorrectRef.current = 0
    setPromptsCompleted(0); promptsCompletedRef.current = 0
    keystrokesRef.current = 0  // Bug 4 fix: reset keystroke counter on new session
    setPromptRevealed(false)
    setTimeLeft(duration); durationRef.current = duration
    setStartTime(Date.now())
    setListenMode(useVoice)
    setPhase('active')
    if (useVoice) {
      setTimeout(() => speakPrompt(p), 300)
    }
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  useEffect(() => {
    if (phase === 'active') {
      if (!startTime) setStartTime(Date.now())
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setPhase('done')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') {
      clearActiveSession()
      const lastCorrect = [...typedRef.current].filter((c, i) => c === promptRef.current[i]).length
      const finalCorrect = totalCorrectRef.current + lastCorrect
      const finalErrors = errorsRef.current
      const dur = durationRef.current
      const wpm = Math.round((finalCorrect / 5) / (dur / 60))
      const accuracy = (finalCorrect + finalErrors) > 0
        ? Math.round((finalCorrect / (finalCorrect + finalErrors)) * 100)
        : 100
      const score = Math.round(wpm * (accuracy / 100) * 10)
      const kph = Math.round((keystrokesRef.current / dur) * 3600)  // Bug 4 fix: real KPH from keystroke counter
      const prevSessions = getSessions(username)
      const prevBestWPM = prevSessions.length ? Math.max(...prevSessions.map(s => s.wpm || 0)) : 0
      const xpEarned = calcSessionXP(wpm, accuracy, wpm > prevBestWPM)
      addXP(username, xpEarned)
      const newSession = {
        wpm, accuracy, errors: finalErrors, score, kph,
        skill: skillKey.current, mode, duration: dur,
        ...(mode === 'job' && jobId ? { jobId } : {})
      }
      addSession(username, newSession)
      const newBadges = checkAndAwardBadges(username, { wpm, accuracy, kph, skill: skillKey.current })
      navigate('/results', {
        state: {
          wpm,
          accuracy,
          errors: finalErrors,
          score,
          skill: skillKey.current,
          kph,
          xp: xpEarned,
          badges: newBadges,
          mode,
          duration: dur,
          promptsCompleted: promptsCompletedRef.current,
          totalErrors: finalErrors
        }
      })
    }
  }, [phase])

  const loadNextPrompt = () => {
    const correctInThis = [...typedRef.current].filter((c, i) => c === promptRef.current[i]).length
    totalCorrectRef.current += correctInThis
    setTotalCorrectChars(prev => prev + correctInThis)
    promptsCompletedRef.current += 1
    setPromptsCompleted(prev => prev + 1)
    const nextP = pickPrompt(listenMode)
    promptRef.current = nextP
    typedRef.current = ''
    setPrompt(nextP)
    setTyped('')
    setPromptRevealed(false)
    if (listenMode) setTimeout(() => speakPrompt(nextP), 200)
    setTimeout(() => inputRef.current?.focus(), 20)
  }

  const handleInput = (e) => {
    if (phase !== 'active') return
    const val = e.target.value
    if (val.length > typedRef.current.length) {
      keystrokesRef.current += 1  // Bug 4 fix: count every keystroke
      const i = val.length - 1
      if (val[i] !== promptRef.current[i]) {
        setErrors(prev => prev + 1)
        errorsRef.current += 1
      }
    }
    typedRef.current = val
    setTyped(val)
    if (val.length >= promptRef.current.length) {
      loadNextPrompt()
      return
    }
    saveActiveSession({
      prompt: promptRef.current, typed: val, timeLeft, duration: durationRef.current,
      skill: skillKey.current, mode, errors: errorsRef.current,
      totalCorrectChars: totalCorrectRef.current, promptsCompleted: promptsCompletedRef.current,
      keystrokes: keystrokesRef.current  // Bug 4 fix: persist keystroke count for session restore
    })
  }

  const renderPrompt = () => {
    return [...prompt].map((char, i) => {
      let cls = 'char-pending'
      if (i < typed.length) cls = typed[i] === char ? 'char-correct' : 'char-wrong'
      else if (i === typed.length) cls = 'char-current'
      return <span key={i} className={cls}>{char}</span>
    })
  }

  const elapsedSec = startTime ? Math.max(1, duration - timeLeft) : 1
  const correctSoFar = [...typed].filter((c, i) => c === prompt[i]).length
  const totalNow = totalCorrectChars + correctSoFar
  const liveWPM = totalNow > 0 ? Math.round((totalNow / 5) / (elapsedSec / 60)) : 0
  const liveAcc = (totalNow + errors) > 0 ? Math.round((totalNow / (totalNow + errors)) * 100) : 100
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="page" style={{ maxWidth: 800, position: 'relative' }}>
      <button onClick={() => navigate('/')} style={backBtnStyle}>&#8592; Back</button>
      <div className="keyboard-banner">&#9000;&#65039; Best used with a physical keyboard</div>
      <div style={{ height: '1rem' }} />

      {phase === 'setup' && (
        <div className="card card-lg" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Ready to Train?</h1>
          <p className="page-subtitle">
            {mode === 'job' ? `Job: ${JOBS.find(j => j.id === jobId)?.title}` :
             mode === 'daily' ? 'Daily Challenge' :
             `Skill: ${skillParam.charAt(0).toUpperCase() + skillParam.slice(1)}`}
          </p>

          {/* Bug 6 fix: lock duration selector in job mode */}
          {isJobMode ? (
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--grey-700)' }}>
                &#9201; Session length: {(lockedDuration || 300) / 60} minutes (required)
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--grey-500)', margin: 0 }}>
                Job training sessions use a fixed duration to match real job requirements.
              </p>
            </div>
          ) : (
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--grey-700)' }}>Choose Session Length</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {DURATIONS.map(d => (
                  <button key={d} onClick={() => setDuration(d)} className="btn btn-lg"
                    style={{ background: duration === d ? 'var(--blue)' : 'var(--grey-200)', color: duration === d ? 'var(--white)' : 'var(--grey-700)', minWidth: 90 }}>
                    {d === 60 ? '1 min' : d === 180 ? '3 min' : '5 min'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" style={{ minWidth: 200 }} onClick={() => startSession(false)}>
              Start Session &#8594;
            </button>
            {isVoiceJob && (
              <button className="btn btn-secondary btn-lg" style={{ minWidth: 200 }} onClick={() => startSession(true)}>
                &#128266; Listen &amp; Type
              </button>
            )}
          </div>
        </div>
      )}

      {(phase === 'active' || phase === 'paused') && (
        <>
          {listenMode && (
            <div className="card" style={{ textAlign: 'center', marginBottom: '1rem', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>&#128266; Listen &amp; Type Mode</div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => speakPrompt(prompt)}>&#9654; Play / Replay</button>
                <button className="btn btn-secondary" onClick={() => setPromptRevealed(v => !v)}>
                  {promptRevealed ? '👁️ Hide Prompt' : '👁️ Show Prompt'}
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div className="stat-card" style={{ flex: 1, minWidth: 100, padding: '0.75rem' }}>
              <div className={`timer-display${timeLeft <= 10 ? ' warning' : ''}`}>{formatTime(timeLeft)}</div>
              <div className="stat-label">Time Left</div>
            </div>
            <div className="stat-card" style={{ flex: 1, minWidth: 80, padding: '0.75rem' }}>
              <div className="stat-value">{liveWPM}</div>
              <div className="stat-label">WPM</div>
            </div>
            <div className="stat-card" style={{ flex: 1, minWidth: 80, padding: '0.75rem' }}>
              <div className="stat-value">{liveAcc}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-card" style={{ flex: 1, minWidth: 80, padding: '0.75rem' }}>
              <div className="stat-value" style={{ color: 'var(--red)' }}>{errors}</div>
              <div className="stat-label">Errors</div>
            </div>
            <div className="stat-card" style={{ flex: 1, minWidth: 80, padding: '0.75rem' }}>
              <div className="stat-value">{promptsCompleted}</div>
              <div className="stat-label">Done</div>
            </div>
          </div>

          {listenMode && !promptRevealed
            ? <div className="practice-prompt" style={{ textAlign: 'center', color: 'var(--grey-500)', fontStyle: 'italic' }}>
                &#128266; Listen to the audio and type what you hear
              </div>
            : <div className="practice-prompt">{renderPrompt()}</div>
          }

          {phase === 'active' && (
            <input
              ref={inputRef}
              className="practice-input"
              value={typed}
              onChange={handleInput}
              placeholder="Start typing here..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            {phase === 'active'
              ? <button className="btn btn-secondary" onClick={() => { clearInterval(intervalRef.current); setPhase('paused') }}>&#9208; Pause</button>
              : <button className="btn btn-primary" onClick={() => { setPhase('active'); inputRef.current?.focus() }}>&#9654; Resume</button>
            }
            <button className="btn btn-outline" onClick={() => { clearInterval(intervalRef.current); clearActiveSession(); navigate(-1) }}>&#10005; Quit</button>
          </div>

          {phase === 'paused' && (
            <div className="alert alert-info mt-2">&#9208; Session paused. Click Resume to continue.</div>
          )}
        </>
      )}
    </div>
  )
}
