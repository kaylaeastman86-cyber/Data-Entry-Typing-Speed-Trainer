import { getCurrentUser, getSessions } from '../utils/storage.js'
import { getTotalXP, getLevelInfo } from '../utils/xp.js'
import { ALL_BADGES, getEarnedBadges } from '../utils/badges.js'
import { Link } from 'react-router-dom'

const CATEGORIES = ['Starter','Streak','Accuracy','Speed','10-Key','Job Ready','Skill Mastery']

export default function Rewards() {
  const username = getCurrentUser()
  const sessions = getSessions(username)
  const xp = getTotalXP(username)
  const lvl = getLevelInfo(xp)
  const earned = getEarnedBadges(username)

  const earnedCount = Object.keys(earned).length
  const totalBadges = ALL_BADGES.length

  const bestWPM = sessions.length ? Math.max(...sessions.map(s=>s.wpm||0)) : 0
  const avgAcc = sessions.length ? Math.round(sessions.reduce((a,s)=>a+(s.accuracy||0),0)/sessions.length) : 0

  const handleDownloadReport = () => {
    const lines = [
      '=== DATA ENTRY SPEED TRAINER — PROGRESS REPORT ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      `User: ${username}`,
      '',
      '--- STATS ---',
      `Total Sessions: ${sessions.length}`,
      `Best WPM: ${bestWPM}`,
      `Average Accuracy: ${avgAcc}%`,
      `Total XP: ${xp}`,
      `Level: ${lvl.current.level} — ${lvl.current.name}`,
      '',
      '--- BADGES EARNED ---',
      ...Object.keys(earned).map(id => {
        const b = ALL_BADGES.find(x=>x.id===id)
        return b ? `${b.icon} ${b.name} — earned ${new Date(earned[id]).toLocaleDateString()}` : ''
      }),
      '',
      '--- DISCLAIMER ---',
      'This is a practice completion report and is not an official employment certification.',
      'Data Entry Speed Trainer is a self-guided practice tool.',
    ]
    const blob = new Blob([lines.join('\n')], { type:'text/plain' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'data-entry-progress-report.txt'; a.click()
  }

  return (
    <div className="page">
      <h1 className="page-title">Rewards & Achievements</h1>

      {/* XP / Level */}
      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'0.5rem'}}>
          <span style={{fontWeight:700,fontSize:'1.25rem',color:'var(--navy)'}}>Level {lvl.current.level} — {lvl.current.name}</span>
          <span className="text-sm text-muted">{xp} XP · {earnedCount}/{totalBadges} badges</span>
        </div>
        <div className="xp-bar-wrap" style={{height:20}}>
          <div className="xp-bar-fill" style={{width:`${lvl.pct}%`}} />
          <div className="xp-bar-label">{lvl.xpIntoLevel} / {lvl.xpNeeded} XP</div>
        </div>
        {lvl.next && <p className="text-xs text-muted mt-1">{lvl.xpNeeded - lvl.xpIntoLevel} XP until {lvl.next.name}</p>}
      </div>

      {/* Download buttons */}
      <div style={{display:'flex',gap:'0.75rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        <button className="btn btn-navy" onClick={handleDownloadReport}>
          📄 Download Training Report
        </button>
      </div>
      <p className="text-xs text-muted" style={{marginTop:'-1rem',marginBottom:'1.5rem'}}>
        ⚠️ This is a practice completion report and is not an official employment certification.
      </p>

      {/* Badge grid by category */}
      {CATEGORIES.map(cat => {
        const catBadges = ALL_BADGES.filter(b=>b.category===cat)
        return (
          <div key={cat} className="card" style={{marginBottom:'1.25rem'}}>
            <div className="section-title">{cat}</div>
            <div className="grid grid-5" style={{gap:'0.625rem'}}>
              {catBadges.map(b => {
                const isEarned = !!earned[b.id]
                return (
                  <div key={b.id} className={`badge-item${isEarned?' earned':' locked'}`} title={b.desc}>
                    <div className="badge-item-icon">{b.icon}</div>
                    <div className="badge-item-name">{b.name}</div>
                    <div className="badge-item-desc">
                      {isEarned
                        ? `Earned ${new Date(earned[b.id]).toLocaleDateString()}`
                        : b.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
