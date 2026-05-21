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

// ── Draft helpers (hol_session_draft) ─────────────────────────────────────
const DRAFT_KEY = 'hol_session_draft'
const MAX_DRAFT_AGE_MS = 48 * 60 * 60 * 1000 // 48 hours — older drafts silently discarded

const getSessionDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const draft = JSON.parse(raw)
    if (!draft || !draft.savedAt) return null
    if (Date.now() - draft.savedAt > MAX_DRAFT_AGE_MS) {
      localStorage.removeItem(DRAFT_KEY)
      return null
    }
    return draft
  } catch { return null }
}
const saveSessionDraft = (data) =>
  localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...data, savedAt: Date.now() }))
const clearSessionDraft = () => localStorage.removeItem(DRAFT_KEY)

const draftTimeAgo = (ts) => {
  if (!ts) return 'earlier'
  const diff = Date.now() - ts
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (days >= 1) return days === 1 ? 'yesterday' : `${days} days ago`
  if (hours >= 1) return `${hours}h ago`
  if (mins  >= 1) return `${mins}m ago`
  return 'just now'
}

// ── Lesson-progress helpers (hol_lesson_progress) ─────────────────────────
const getLessonProgress = () => {
  try { return JSON.parse(localStorage.getItem('hol_lesson_progress') || '{}') }
  catch { return {} }
}
const saveLessonProgress = (data) =>
  localStorage.setItem('hol_lesson_progress', JSON.stringify(data))

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

// ── New: resume banner state ───────────────────────────────────────────────
const [showResumeBanner, setShowResumeBanner] = useState(false)
const [resumeDraft, setResumeDraft] = useState(null)

const inputRef = useRef(null)
const intervalRef = useRef(null)
const draftIntervalRef = useRef(null)
const skillKey = useRef(getSkillKey())
// Refs for safe access inside async timer callbacks
const typedRef = useRef('')
const promptRef = useRef('')
const totalCorrectRef = useRef(0)
const errorsRef = useRef(0)
const durationRef = useRef(isJobMode ? (lockedDuration || 300) : 60)
const promptsCompletedRef = useRef(0)
const keystrokesRef = useRef(0)         // Bug 4 fix: track real keystroke count for KPH
const timeLeftRef = useRef(isJobMode ? (lockedDuration || 300) : 60) // kept in sync by timer

const isVoiceJob = mode === 'job' && VOICE_JOB_IDS.includes(jobId)

// ── Apply a saved draft into all component state (used on resume) ─────────
const applyDraft = (draft) => {
const p = draft.prompt || ''
setPrompt(p); promptRef.current = p
setTyped(draft.typedSoFar || ''); typedRef.current = draft.typedSoFar || ''
const tl = typeof draft.timeLeft === 'number' ? draft.timeLeft : (draft.duration || 60)
setTimeLeft(tl); timeLeftRef.current = tl
setDuration(draft.duration || 60); durationRef.current = draft.duration || 60
setErrors(draft.errors || 0); errorsRef.current = draft.errors || 0
setTotalCorrectChars(draft.totalCorrectChars || 0); totalCorrectRef.current = draft.totalCorrectChars || 0
setPromptsCompleted(draft.promptsCompleted || 0); promptsCompletedRef.current = draft.promptsCompleted || 0
keystrokesRef.current = draft.keystrokes || 0
setShowResumeBanner(false)
setResumeDraft(null)
setPhase('active')
setTimeout(() => inputRef.current?.focus(), 50)
}

// ── On mount: restore active_session (existing) OR check for draft ────────
useEffect(() => {
// 1. Existing active_session restore (unchanged behaviour)
const active = getActiveSession()
if (active && mode === active.mode && skillParam === active.skill) {
const p = active.prompt || ''
setPrompt(p); promptRef.current = p
setTyped(active.typed || ''); typedRef.current = active.typed || ''
const tl = active.timeLeft || 60
setTimeLeft(tl); timeLeftRef.current = tl
setDuration(active.duration || 60); durationRef.current = active.duration || 60
setErrors(active.errors || 0); errorsRef.current = active.errors || 0
setTotalCorrectChars(active.totalCorrectChars || 0); totalCorrectRef.current = active.totalCorrectChars || 0
setPromptsCompleted(active.promptsCompleted || 0); promptsCompletedRef.current = active.promptsCompleted || 0
keystrokesRef.current = active.keystrokes || 0 // Bug 4 fix: restore keystrokes on resume
setPhase('active')
return
}

// 2. Pending auto-resume flag set by handleResume (cross-URL navigation)
const pendingResume = sessionStorage.getItem('hol_pending_resume')
const draft = getSessionDraft()
if (pendingResume && draft) {
sessionStorage.removeItem('hol_pending_resume')
applyDraft(draft)
clearSessionDraft()
return
}

// 3. Show resume banner if a valid draft exists
if (draft) {
setResumeDraft(draft)
setShowResumeBanner(true)
}
}, [])

// ── Resume / Start-fresh handlers ─────────────────────────────────────────
const handleResume = () => {
if (!resumeDraft) return
const draftMode  = resumeDraft.mode      || 'skill'
const draftJob   = resumeDraft.jobType   || ''
const draftSkill = resumeDraft.skillParam || 'typing'

const modeMatches  = draftMode === mode
const jobMatches   = !isJobMode || draftJob === jobId
const skillMatches = isJobMode  || draftSkill === skillParam

if (modeMatches && jobMatches && skillMatches) {
// Same URL context — load state directly without navigating
applyDraft(resumeDraft)
clearSessionDraft()
} else {
// Different URL — navigate to the right page; applyDraft fires on next mount
sessionStorage.setItem('hol_pending_resume', '1')
if (draftMode === 'job') {
navigate(`/practice?mode=job&job=${draftJob}`)
} else if (draftMode === 'daily') {
navigate('/practice?mode=daily')
} else {
navigate(`/practice?mode=${draftMode}&skill=${draftSkill}`)
}
}
}

const handleStartFresh = () => {
clearSessionDraft()
setShowResumeBanner(false)
setResumeDraft(null)
}

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
clearSessionDraft() // discard any leftover draft on explicit new start
const p = pickPrompt(useVoice)
setPrompt(p); promptRef.current = p
setTyped(''); typedRef.current = ''
setErrors(0); errorsRef.current = 0
setTotalCorrectChars(0); totalCorrectRef.current = 0
setPromptsCompleted(0); promptsCompletedRef.current = 0
keystrokesRef.current = 0 // Bug 4 fix: reset keystroke counter on new session
setPromptRevealed(false)
setTimeLeft(duration); timeLeftRef.current = duration; durationRef.current = duration
setStartTime(Date.now())
setListenMode(useVoice)
setPhase('active')
if (useVoice) {
setTimeout(() => speakPrompt(p), 300)
}
setTimeout(() => inputRef.current?.focus(), 50)
}

// ── Timer (unchanged logic, now also keeps timeLeftRef in sync) ───────────
useEffect(() => {
if (phase === 'active') {
if (!startTime) setStartTime(Date.now())
intervalRef.current = setInterval(() => {
setTimeLeft(prev => {
const next = prev <= 1 ? 0 : prev - 1
timeLeftRef.current = next // keep ref in sync for draft saves
if (next <= 0) {
clearInterval(intervalRef.current)
setPhase('done')
return 0
}
return next
})
}, 1000)
}
return () => clearInterval(intervalRef.current)
}, [phase])

// ── Draft auto-save every 5 seconds while session is active ──────────────
useEffect(() => {
if (phase === 'active') {
draftIntervalRef.current = setInterval(() => {
const elapsed  = durationRef.current - timeLeftRef.current
const correct  = totalCorrectRef.current
const errs     = errorsRef.current
const liveWpm  = correct > 0 ? Math.round((correct / 5) / Math.max(1, elapsed / 60)) : 0
const liveAcc  = (correct + errs) > 0 ? Math.round((correct / (correct + errs)) * 100) : 100
saveSessionDraft({
mode,
jobType:        jobId || '',
skillParam:     skillKey.current,
typedSoFar:     typedRef.current,
timeLeft:       timeLeftRef.current,
elapsedSeconds: elapsed,
wpm:            liveWpm,
accuracy:       liveAcc,
keystrokes:     keystrokesRef.current,
errors:         errs,
totalCorrectChars: correct,
promptsCompleted:  promptsCompletedRef.current,
prompt:         promptRef.current,
duration:       durationRef.current,
})
}, 5000)
} else {
clearInterval(draftIntervalRef.current)
}
return () => clearInterval(draftIntervalRef.current)
}, [phase])

// ── Phase 'done': record lesson, clear draft, navigate to Results ─────────
useEffect(() => {
if (phase === 'done') {
clearActiveSession()
clearSessionDraft() // clear draft on normal completion so resume prompt doesn't reappear

const lastCorrect = [...typedRef.current].filter((c, i) => c === promptRef.current[i]).length
const finalCorrect = totalCorrectRef.current + lastCorrect
const finalErrors  = errorsRef.current
const dur          = durationRef.current
const wpm      = Math.round((finalCorrect / 5) / (dur / 60))
const accuracy = (finalCorrect + finalErrors) > 0
? Math.round((finalCorrect / (finalCorrect + finalErrors)) * 100)
: 100
const score = Math.round(wpm * (accuracy / 100) * 10)
const kph   = Math.round((keystrokesRef.current / dur) * 3600) // Bug 4 fix: real KPH

// ── Feature 2: save lesson completion to hol_lesson_progress ─────────
try {
const trackKey = mode === 'job' && jobId
? `job_${jobId}`
: mode === 'daily'
? 'daily'
: `free_${skillKey.current}`
const progress    = getLessonProgress()
const lessonCount = Object.keys(progress).filter(k => k.startsWith(trackKey + '_')).length
const lessonKey   = `${trackKey}_${lessonCount}`
progress[lessonKey] = { completedAt: Date.now(), wpm, accuracy }
saveLessonProgress(progress)
} catch (e) { /* non-fatal — don't block navigation */ }

const prevSessions = getSessions(username)
const prevBestWPM  = prevSessions.length ? Math.max(...prevSessions.map(s => s.wpm || 0)) : 0
const xpEarned     = calcSessionXP(wpm, accuracy, wpm > prevBestWPM)
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

// Also save draft on each completed prompt (covers between 5-second intervals)
const elapsed = durationRef.current - timeLeftRef.current
const correct = totalCorrectRef.current
const errs    = errorsRef.current
saveSessionDraft({
mode,
jobType:        jobId || '',
skillParam:     skillKey.current,
typedSoFar:     '',
timeLeft:       timeLeftRef.current,
elapsedSeconds: elapsed,
wpm:  correct > 0 ? Math.round((correct / 5) / Math.max(1, elapsed / 60)) : 0,
accuracy: (correct + errs) > 0 ? Math.round((correct / (correct + errs)) * 100) : 100,
keystrokes:       keystrokesRef.current,
errors:           errs,
totalCorrectChars: correct,
promptsCompleted:  promptsCompletedRef.current,
prompt:   nextP,
duration: durationRef.current,
})
}

const handleInput = (e) => {
if (phase !== 'active') return
const val = e.target.value
if (val.length > typedRef.current.length) {
keystrokesRef.current += 1 // Bug 4 fix: count every keystroke
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
keystrokes: keystrokesRef.current // Bug 4 fix: persist keystroke count for session restore
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

{/* ── Resume Banner (Feature 1) ──────────────────────────────────── */}
{showResumeBanner && resumeDraft && phase === 'setup' && (
<div style={{
background: 'rgba(99,102,241,0.15)',
border: '1px solid rgba(99,102,241,0.45)',
borderRadius: '12px',
padding: '1rem 1.25rem',
marginBottom: '1.25rem',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
flexWrap: 'wrap',
gap: '0.75rem',
}}>
<div>
<div style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#fff' }}>
📝 Unfinished session from {draftTimeAgo(resumeDraft.savedAt)}
</div>
<div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
{resumeDraft.mode === 'job'
? `Job: ${JOBS.find(j => j.id === resumeDraft.jobType)?.title || resumeDraft.jobType}`
: resumeDraft.mode === 'daily'
? 'Daily Challenge'
: `Skill: ${(resumeDraft.skillParam || 'typing').charAt(0).toUpperCase() + (resumeDraft.skillParam || 'typing').slice(1)}`}
{resumeDraft.wpm > 0 && ` · ${resumeDraft.wpm} WPM · ${resumeDraft.accuracy}% acc`}
{typeof resumeDraft.timeLeft === 'number' && ` · ${formatTime(resumeDraft.timeLeft)} remaining`}
</div>
</div>
<div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
<button
style={{
background: 'rgba(99,102,241,0.8)', color: '#fff',
border: '1px solid rgba(99,102,241,0.6)', borderRadius: '8px',
padding: '0.4rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
}}
onClick={handleResume}
>Resume &#8594;</button>
<button
style={{
background: 'transparent', color: 'rgba(255,255,255,0.7)',
border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px',
padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem'
}}
onClick={handleStartFresh}
>Start Fresh</button>
</div>
</div>
)}

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
