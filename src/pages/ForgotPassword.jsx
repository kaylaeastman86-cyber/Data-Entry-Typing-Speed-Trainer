import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { getUsers, saveUsers } from '../utils/storage.js'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username:'', code:'', password:'', confirm:'' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const users = getUsers()
    const idx = users.findIndex(u => u.username === form.username.toLowerCase())
    if (idx < 0) { setError('Username not found.'); return }
    if (!bcrypt.compareSync(form.code.trim(), users[idx].recoveryCodeHash)) {
      setError('Recovery code is incorrect.'); return
    }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    users[idx].passwordHash = bcrypt.hashSync(form.password, 10)
    saveUsers(users)
    setSuccess(true)
    setTimeout(() => navigate('/login'), 2500)
  }

  if (success) return (
    <div className="page-narrow">
      <div className="card card-lg text-center">
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✅</div>
        <h2 style={{color:'var(--green)'}}>Password Reset!</h2>
        <p className="text-muted mt-1">Redirecting you to login…</p>
      </div>
    </div>
  )

  return (
    <div className="page-narrow">
      <div className="card card-lg">
        <h1 style={{fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:'0.25rem'}}>Reset Password</h1>
        <p className="text-muted text-sm mb-2">Enter your recovery code to set a new password.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Recovery Code</label>
            <input className="form-input" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} placeholder="DATA-XXXX-XXXX" style={{fontFamily:'monospace'}} />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-input" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Reset Password</button>
        </form>
        <p className="text-center text-sm mt-2"><Link to="/login" className="link">← Back to login</Link></p>
      </div>
    </div>
  )
}
