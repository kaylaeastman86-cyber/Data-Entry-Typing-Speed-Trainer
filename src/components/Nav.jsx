import { NavLink, Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, clearCurrentUser } from '../utils/storage.js'

export default function Nav() {
  const user = getCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearCurrentUser()
    navigate('/')
  }

  if (!user) return null

  return (
    <nav className="nav">
      <Link to="/dashboard" className="nav-brand">📊 Data Entry Trainer</Link>
      <div className="nav-links">
        <NavLink to="/dashboard"       className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Dashboard</NavLink>
        <NavLink to="/train/job"       className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Train by Job</NavLink>
        <NavLink to="/train/skill"     className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Train by Skill</NavLink>
        <NavLink to="/daily-challenge" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Daily Challenge</NavLink>
        <NavLink to="/progress"        className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Progress</NavLink>
        <NavLink to="/job-readiness"   className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Job Readiness</NavLink>
        <NavLink to="/rewards"         className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Rewards</NavLink>
        <NavLink to="/profile"         className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Profile</NavLink>
      </div>
      <button onClick={handleLogout} className="btn btn-sm" style={{marginLeft:'auto',background:'rgba(255,255,255,0.15)',color:'#fff',border:'1px solid rgba(255,255,255,0.3)'}}>
        Logout
      </button>
    </nav>
  )
}
