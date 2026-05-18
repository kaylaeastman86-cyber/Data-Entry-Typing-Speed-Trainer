import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { getUsers, setCurrentUser, getUserProfile } from '../utils/storage.js'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username:'', password:'' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const users = getUsers()
    const user = users.find(u => u.username === form.username.toLowerCase())
    if (!user || !bcrypt.compareSync(form.password, user.passwordHash)) {
      setError('Incorrect username or password.')
      return
    }
    setCurrentUser(user.username)
    const profile = getUserProfile(user.username)
    navigate(profile ? '/dashboard' : '/onboarding')
  }

  return (
    <div className="page-narrow">
      <div className="card card-lg">
        <h1 style={{fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:'0.25rem'}}>Welcome Back</h1>
        <p className="text-muted text-sm mb-2">Log in to continue training.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={form.username}
              onChange={e=>setForm({...form,username:e.target.value})} placeholder="Your username" autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})} placeholder="Your password" />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg">Log In</button>
        </form>
        <p className="text-center text-sm mt-2">
          <Link to="/forgot-password" className="link">Forgot password?</Link>
        </p>
        <p className="text-center text-sm mt-1">Don't have an account? <Link to="/create-account" className="link">Create one free</Link></p>
        <p className="text-center text-sm mt-1"><Link to="/" className="link">← Back to home</Link></p>
      </div>
    </div>
  )
}
