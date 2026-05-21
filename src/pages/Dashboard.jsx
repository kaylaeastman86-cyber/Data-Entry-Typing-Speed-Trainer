import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, getUserProfile, getSessions, getActiveSession } from '../utils/storage.js'
import { getTotalXP, getLevelInfo } from '../utils/xp.js'
import { getEarnedBadges, ALL_BADGES, getCalcStreak } from '../utils/badges.js'
import { JOBS } from '../utils/jobs.js'

// Passing-session targets per job (mirrors TrainJob.jsx)
const JOB_PASS_SESSIONS = {
data_entry_clerk: 3, admin_assistant: 3, customer_service: 3,
receptionist: 3, medical_office: 5, billing_clerk: 5,
accounting_assistant: 5, warehouse_clerk: 3, ecommerce_processor: 3, virtual_assistant: 3,
}

const getLessonProgress = () => {
try { return JSON.parse(localStorage.getItem('hol_lesson_progress') || '{}') }
catch { return {} }
}

const getTrackName = (trackKey) => {
if (trackKey.startsWith('job_')) {
const jId = trackKey.replace('job_', '')
const job = JOBS.find(j => j.id === jId)
return job ? `${job.icon} ${job.title}` : trackKey
}
if (trackKey === 'daily') return '📅 Daily Challenge'
if (trackKey.startsWith('free_')) {
const skill = trackKey.replace('free_', '')
return `🎯 Free Practice (${skill.charAt(0).toUpperCase() + skill.slice(1)})`
}
return trackKey
}

const getTrackTarget = (trackKey) => {
if (trackKey.startsWith('job_')) {
const jId = trackKey.replace('job_', '')
return JOB_PASS_SESSIONS[jId] || 5
}
return 10 // milestone target for free / daily tracks
}

export default function Dashboard() {
const username = getCurrentUser()
const profile = getUserProfile(username) || {}
const sessions = getSessions(username)
const xp = getTotalXP(username)
const levelInfo = getLevelInfo(xp)
const earnedBadges = getEarnedBadges(username)
const streak = getCalcStreak(username)
const activeSession = getActiveSession()

const bestWPM = sessions.length ? Math.max(...sessions.map(s=>s.wpm||0)) : 0
const bestKPH = sessions.length ? Math.max(...sessions.map(s=>s.kph||0)) : 0

const recentBadges = ALL_BADGES
.filter(b => earnedBadges[b.id])
.sort((a,b) => new Date(earnedBadges[b.id]) - new Date(earnedBadges[a.id]))
.slice(0, 6)

// Bug 3 fix: last 5 sessions newest-first
const recentSessions = [...sessions].reverse().slice(0, 5)

const today = new Date().toISOString().split('T')[0]
const dailyDone = JSON.parse(localStorage.getItem('daily_challenges')||'{}')[username]?.[today]

// ── Lesson progress (hol_lesson_progress) ────────────────────────────────
const lessonProgress = getLessonProgress()

// Group individual lesson entries by track key
const trackMap = {}
Object.entries(lessonProgress).forEach(([key, val]) => {
// key format: job_data_entry_clerk_2, free_typing_0, daily_1, etc.
// last segment after the final underscore+digit is the index
const lastUnderscore = key.lastIndexOf('_')
const trackKey = key.slice(0, lastUnderscore)
if (!trackMap[trackKey]) trackMap[trackKey] = []
trackMap[trackKey].push({ lessonKey: key, lessonIndex: parseInt(key.slice(lastUnderscore + 1), 10), ...val })
})

// Sort tracks by most recently completed lesson
const sortedTracks = Object.entries(trackMap).sort((a, b) => {
const latestA = Math.max(...a[1].map(l => l.completedAt || 0))
const latestB = Math.max(...b[1].map(l => l.completedAt || 0))
return latestB - latestA
})

const formatDate = (iso) => {
if (!iso) return '—'
return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatLessonDate = (ts) => {
if (!ts) return '—'
return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

return (
<div className="page" style={{maxWidth:1100}}>
{/* Header */}
<div style={{marginBottom:'1.5rem'}}>
<h1 className="page-title">Welcome back, {profile.name || username}! 👋</h1>
<p className="page-subtitle">Keep going — every session builds your skills.</p>
</div>

{/* Resume card */}
{activeSession && (
<div className="alert alert-info" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
<span>📝 You have an unfinished session from earlier.</span>
<Link to="/practice" className="btn btn-primary btn-sm">Resume →</Link>
</div>
)}

{/* Stats row */}
<div className="grid grid-4" style={{marginBottom:'1.5rem'}}>
{[
['Total Sessions', sessions.length, '📊'],
['Best WPM', bestWPM || '—', '⚡'],
['Best KPH', bestKPH ? bestKPH.toLocaleString() : '—', '🔢'],
['Day Streak', streak || '—', '🔥'],
].map(([label, val, icon]) => (
<div className="stat-card" key={label}>
<div style={{fontSize:'1.5rem'}}>{icon}</div>
<div className="stat-value">{val}</div>
<div className="stat-label">{label}</div>
</div>
))}
</div>

<div className="grid grid-2" style={{marginBottom:'1.5rem',gap:'1.25rem'}}>
{/* XP & Level */}
<div className="card">
<div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'0.5rem'}}>
<span className="section-title" style={{marginBottom:0}}>Level {levelInfo.current.level} — {levelInfo.current.name}</span>
<span className="text-sm text-muted">{xp} XP total</span>
</div>
<div className="xp-bar-wrap">
<div className="xp-bar-fill" style={{width:`${levelInfo.pct}%`}} />
<div className="xp-bar-label">{levelInfo.xpIntoLevel} / {levelInfo.xpNeeded} XP</div>
</div>
{levelInfo.next && (
<p className="text-xs text-muted mt-1">{levelInfo.xpNeeded - levelInfo.xpIntoLevel} XP to {levelInfo.next.name}</p>
)}
</div>

{/* Daily Challenge */}
<div className="card" style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
<div>
<div className="section-title">Daily Challenge</div>
<p className="text-sm text-muted">A new mixed-data challenge every day. Build your streak!</p>
</div>
{dailyDone
? <div className="alert alert-success" style={{marginBottom:0}}>✅ Completed today! Come back tomorrow.</div>
: <Link to="/daily-challenge" className="btn btn-navy">Take Today's Challenge →</Link>
}
</div>
</div>

{/* Badges */}
{recentBadges.length > 0 && (
<div className="card" style={{marginBottom:'1.5rem'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
<span className="section-title" style={{marginBottom:0}}>Recent Badges</span>
<Link to="/rewards" className="btn btn-sm btn-outline">View All</Link>
</div>
<div className="grid grid-5" style={{gap:'0.75rem'}}>
{recentBadges.map(b => (
<div key={b.id} className="badge-item earned" title={b.desc}>
<div className="badge-item-icon">{b.icon}</div>
<div className="badge-item-name">{b.name}</div>
</div>
))}
</div>
</div>
)}

{/* Bug 3 fix: Recent Sessions section */}
<div className="card" style={{marginBottom:'1.5rem'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
<span className="section-title" style={{marginBottom:0}}>Recent Sessions</span>
<Link to="/progress" className="btn btn-sm btn-outline">View All</Link>
</div>
{recentSessions.length === 0 ? (
<p className="text-sm text-muted" style={{margin:0}}>No sessions yet — start practicing!</p>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
{recentSessions.map((s, i) => (
<div key={s.id || i} style={{
display:'flex', alignItems:'center', justifyContent:'space-between',
padding:'0.6rem 0.75rem', borderRadius:'8px',
background:'var(--grey-50,#f8fafc)', border:'1px solid var(--grey-200,#e2e8f0)',
flexWrap:'wrap', gap:'0.5rem'
}}>
<span className="text-sm text-muted">{formatDate(s.date)}</span>
<span className="text-sm" style={{fontWeight:600}}>{s.wpm} WPM</span>
<span className="text-sm">{s.accuracy}% acc</span>
<span className="text-sm">{s.score} pts</span>
{s.kph > 0 && <span className="text-sm">{s.kph.toLocaleString()} KPH</span>}
<span className="text-xs text-muted" style={{textTransform:'capitalize'}}>
{s.mode === 'job' ? 'Job Training' : s.mode === 'timed' ? 'Timed' : 'Practice'}
</span>
</div>
))}
</div>
)}
</div>

{/* ── Lesson Progress (Feature 2) ──────────────────────────────────────── */}
{sortedTracks.length > 0 && (
<div className="card" style={{marginBottom:'1.5rem'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.25rem'}}>
<span className="section-title" style={{marginBottom:0}}>📚 Lesson Progress</span>
<span className="text-sm text-muted">{Object.keys(lessonProgress).length} lessons completed</span>
</div>
<div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
{sortedTracks.map(([trackKey, lessons]) => {
const target  = getTrackTarget(trackKey)
const count   = lessons.length
const pct     = Math.min(100, Math.round((count / target) * 100))
const isGoalMet = count >= target
const barColor = isGoalMet ? '#48c78e' : pct >= 50 ? '#3b82f6' : '#6366f1'
// Last 3 completed lessons, newest first
const recent = [...lessons]
.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
.slice(0, 3)
return (
<div key={trackKey}>
{/* Track header */}
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.4rem'}}>
<span style={{fontWeight:600,fontSize:'0.95rem',color:'var(--grey-900,#111827)'}}>{getTrackName(trackKey)}</span>
<span style={{fontSize:'0.8rem',color:isGoalMet?'#48c78e':'var(--grey-500,#6b7280)',fontWeight:isGoalMet?600:400}}>
{isGoalMet ? `✓ Goal reached! (${count} lessons)` : `${count} of ${target} lessons`}
</span>
</div>
{/* Progress bar */}
<div style={{height:'6px',background:'var(--grey-200,#e2e8f0)',borderRadius:'3px',overflow:'hidden',marginBottom:'0.6rem'}}>
<div style={{
height:'100%', borderRadius:'3px', width:`${pct}%`,
background: barColor, transition:'width 0.4s ease'
}} />
</div>
{/* Last 3 lessons */}
<div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
{recent.map((lesson) => (
<div key={lesson.lessonKey} style={{
display:'flex',alignItems:'center',justifyContent:'space-between',
fontSize:'0.8rem',
padding:'0.3rem 0.65rem',
background:'var(--grey-50,#f8fafc)',
border:'1px solid var(--grey-200,#e2e8f0)',
borderRadius:'6px',
flexWrap:'wrap',gap:'0.4rem'
}}>
<span style={{color:'var(--grey-600,#4b5563)'}}>
Lesson {lesson.lessonIndex + 1}
</span>
<span style={{fontWeight:600,color:'var(--grey-800,#1f2937)'}}>{lesson.wpm} WPM</span>
<span style={{color:'var(--grey-600,#4b5563)'}}>{lesson.accuracy}% acc</span>
<span style={{color:'var(--grey-400,#9ca3af)'}}>{formatLessonDate(lesson.completedAt)}</span>
</div>
))}
</div>
</div>
)
})}
</div>
</div>
)}

{/* Quick links */}
<div className="grid grid-4" style={{marginBottom:'1.5rem'}}>
{[
['/train/job', '💼', 'Train by Job', 'Practice for a specific job role'],
['/train/skill', '🎯', 'Train by Skill', 'Drill a specific data type'],
['/progress', '📈', 'View Progress', 'See your charts and stats'],
['/rewards', '🏆', 'Rewards', 'Badges, levels, and reports'],
].map(([to, icon, title, desc]) => (
<Link key={to} to={to} className="job-card" style={{textDecoration:'none'}}>
<div style={{fontSize:'2rem'}}>{icon}</div>
<div className="job-card-title">{title}</div>
<div className="job-card-skills">{desc}</div>
</Link>
))}
</div>

<div className="ad-placeholder">Advertisement</div>
</div>
)
}
