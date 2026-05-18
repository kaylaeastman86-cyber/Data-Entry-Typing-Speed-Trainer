import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, getUserProfile, getSessions, getActiveSession } from '../utils/storage.js'
import { getTotalXP, getLevelInfo } from '../utils/xp.js'
import { getEarnedBadges, ALL_BADGES, getCalcStreak } from '../utils/badges.js'

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

  const today = new Date().toISOString().split('T')[0]
  const dailyDone = JSON.parse(localStorage.getItem('daily_challenges')||'{}')[username]?.[today]

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

      {/* Quick links */}
      <div className="grid grid-4" style={{marginBottom:'1.5rem'}}>
        {[
          ['/train/job',      '💼', 'Train by Job',    'Practice for a specific job role'],
          ['/train/skill',    '🎯', 'Train by Skill',  'Drill a specific data type'],
          ['/progress',       '📈', 'View Progress',   'See your charts and stats'],
          ['/rewards',        '🏆', 'Rewards',         'Badges, levels, and reports'],
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
