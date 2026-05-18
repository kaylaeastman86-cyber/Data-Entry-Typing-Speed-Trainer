import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { getUsers, saveUsers, setCurrentUser } from '../utils/storage.js'

const genRecovery = () => {
  const seg = () => Math.random().toString(36).substring(2,6).toUpperCase()
  return `DATA-${seg()}-${seg()}`
}

export default function CreateAccount() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ username:'', password:'', confirm:'' })
  const [errors, setErrors] = useState({})
  const [recovery, setRecovery] = useState('')
  const [copied, setCopied] = useState(false)

  const validate = () => {
    const e = {}
    if (!/^[a-z0-9_]{3,20}$/.test(form.username)) e.username = 'Username must be 3–20 chars: letters, numbers, underscores only (lowercase)'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    const users = getUsers()
    if (users.find(u => u.username === form.username.toLowerCase())) e.username = 'Username already taken'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const passwordHash = bcrypt.hashSync(form.password, 10)
    const code = genRecovery()
    const recoveryCodeHash = bcrypt.hashSync(code, 10)
    const users = getUsers()
    users.push({ username: form.username.toLowerCase(), passwordHash, recoveryCodeHash, createdAt: new Date().toISOString() })
    saveUsers(users)
    setCurrentUser(form.username.toLowerCase())
    setRecovery(code)
    setStep(2)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(recovery).then(() => setCopied(true))
  }

  if (step === 2) return (
    <div className="page-narrow">
      <div className="card card-lg">
        <h1 style={{fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:'0.5rem'}}>Save Your Recovery Code</h1>
        <div className="alert alert-warning">⚠️ This code will only be shown once. Store it somewhere safe.</div>
        <div className="recovery-box">{recovery}</div>
        <p style={{fontSize:'0.875rem',color:'var(--grey-600)',marginBottom:'1rem'}}>
          This code lets you reset your password if you forget it. Save it in a password manager, notes app, or write it down.
        </p>
        <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem'}}>
          <button className="btn btn-secondary btn-full" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '📋 Copy Code'}
          </button>
        </div>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/onboarding')} disabled={!copied}>
          I Saved My Code →
        </button>
        {!copied && <p className="form-hint text-center mt-1">Please copy your code first</p>}
      </div>
    </div>
  )

  return (
    <div className="page-narrow">
      <div className="card card-lg">
        <h1 style={{fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:'0.25rem'}}>Create Your Account</h1>
        <p className="text-muted text-sm mb-2">Free forever. No email required.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className={`form-input${errors.username?' error':''}`} value={form.username}
              onChange={e=>setForm({...form,username:e.target.value.toLowerCase()})} placeholder="e.g. jane_doe123" autoFocus />
            {errors.username && <p className="form-error">{errors.username}</p>}
            <p className="form-hint">3–20 chars. Letters, numbers, underscores only.</p>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className={`form-input${errors.password?' error':''}`} value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})} placeholder="At least 8 characters" />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className={`form-input${errors.confirm?' error':''}`} value={form.confirm}
              onChange={e=>setForm({...form,confirm:e.target.value})} placeholder="Repeat your password" />
            {errors.confirm && <p className="form-error">{errors.confirm}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg">Create Account</button>
        </form>
        <p className="text-center text-sm mt-2">Already have an account? <Link to="/login" className="link">Log in</Link></p>
        <p className="text-center text-sm mt-1"><Link to="/" className="link">← Back to home</Link></p>
      </div>
    </div>
  )
}
