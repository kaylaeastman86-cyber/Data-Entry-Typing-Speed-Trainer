import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, getUserProfile, saveUserProfile, getSessions, clearCurrentUser } from '../utils/storage.js'
import { getTotalXP, getLevelInfo } from '../utils/xp.js'

const GOALS = ['Get a data entry job','Improve existing skills','Pass a typing test','Work from home','General practice']
const FOCUS = ['Typing Speed','Accuracy','10-Key / Number Pad','Mixed Data Entry','Specific Job Path']

export default function Profile() {
  const navigate = useNavigate()
  const username = getCurrentUser()
  const profile = getUserProfile(username) || {}
  const sessions = getSessions(username)
  const xp = getTotalXP(username)
  const lvl = getLevelInfo(xp)

  const [form, setForm] = useState({ name: profile.name||'', goal: profile.goal||'', focus: profile.focus||'' })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    saveUserProfile(username, form)
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  const handleLogout = () => {
    clearCurrentUser()
    navigate('/')
  }

  const bestWPM = sessions.length ? Math.max(...sessions.map(s=>s.wpm||0)) : 0
  const avgAcc = sessions.length ? Math.round(sessions.reduce((a,s)=>a+(s.accuracy||0),0)/sessions.length) : 0

  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 className="page-title">Your Profile</h1>

      <div className="grid grid-3" style={{marginBottom:'1.5rem'}}>
        {[['Sessions',sessions.length],['Best WPM',bestWPM||'—'],['Avg Accuracy',avgAcc?avgAcc+'%':'—']].map(([l,v])=>(
          <div className="stat-card" key={l}><div className="stat-value">{v}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div className="section-title">Level Progress</div>
        <p className="text-sm text-muted mb-1">Level {lvl.current.level} — {lvl.current.name} · {xp} XP total</p>
        <div className="xp-bar-wrap">
          <div className="xp-bar-fill" style={{width:`${lvl.pct}%`}} />
          <div className="xp-bar-label">{lvl.xpIntoLevel} / {lvl.xpNeeded} XP</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div className="section-title">Edit Profile</div>
        {saved && <div className="alert alert-success">✅ Profile saved!</div>}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Skill Goal</label>
            <select className="form-input" value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})}>
              <option value="">Select a goal…</option>
              {GOALS.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Main Focus</label>
            <select className="form-input" value={form.focus} onChange={e=>setForm({...form,focus:e.target.value})}>
              <option value="">Select a focus…</option>
              {FOCUS.map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>

      <div className="card">
        <div className="section-title">Account</div>
        <p className="text-sm text-muted mb-2">Username: <strong>{username}</strong></p>
        <p className="text-sm text-muted mb-2">
          <Link to="/about" className="link">About</Link> · <Link to="/privacy" className="link">Privacy Policy</Link> · <Link to="/terms" className="link">Terms of Service</Link>
        </p>
        <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
      </div>
    </div>
  )
}
