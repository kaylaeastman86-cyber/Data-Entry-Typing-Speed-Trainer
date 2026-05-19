import { useNavigate } from 'react-router-dom'
import { JOBS } from '../data/jobs'
import { getSessions } from '../utils/storage'

const backBtnStyle = {
  position: 'absolute', top: '1rem', left: '1rem',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff', padding: '0.4rem 1rem', borderRadius: '999px',
  cursor: 'pointer', fontSize: '0.875rem', zIndex: 10
}

// Per-job minimum requirements for graduation
const JOB_REQUIREMENTS = {
  data_entry_clerk:       { minMinutes: 10, passingSessions: 3, wpm: 35, accuracy: 95, kph: 8000 },
  admin_assistant:        { minMinutes: 10, passingSessions: 3, wpm: 35, accuracy: 95, kph: 7000 },
  customer_service:       { minMinutes: 10, passingSessions: 3, wpm: 30, accuracy: 92, kph: 6000 },
  receptionist:           { minMinutes: 10, passingSessions: 3, wpm: 30, accuracy: 92, kph: 6000 },
  medical_office:         { minMinutes: 15, passingSessions: 4, wpm: 40, accuracy: 97, kph: 9000 },
  billing_clerk:          { minMinutes: 15, passingSessions: 4, wpm: 38, accuracy: 96, kph: 8500 },
  accounting_assistant:   { minMinutes: 15, passingSessions: 4, wpm: 38, accuracy: 96, kph: 8500 },
  warehouse_clerk:        { minMinutes: 10, passingSessions: 3, wpm: 28, accuracy: 90, kph: 5500 },
  ecommerce_processor:    { minMinutes: 10, passingSessions: 3, wpm: 32, accuracy: 93, kph: 7000 },
  virtual_assistant:      { minMinutes: 10, passingSessions: 3, wpm: 35, accuracy: 94, kph: 7500 },
}

function calcJobReadiness(sessions, job) {
  // Fix 6: only count job-specific sessions (mode === 'job' && jobId === job.id)
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  if (jobSessions.length === 0) return 0

  const req = JOB_REQUIREMENTS[job.id] || { wpm: 35, accuracy: 95, kph: 7000 }

  const wpmGoal = req.wpm
  const accGoal = req.accuracy
  const kphGoal = req.kph

  const avgWpm = jobSessions.reduce((a, s) => a + (s.wpm || 0), 0) / jobSessions.length
  const avgAcc = jobSessions.reduce((a, s) => a + (s.accuracy || 0), 0) / jobSessions.length
  const avgKph = jobSessions.reduce((a, s) => a + (s.kph || 0), 0) / jobSessions.length

  const wpmPct = Math.min(avgWpm / wpmGoal, 1)
  const accPct = Math.min(avgAcc / accGoal, 1)
  const kphPct = Math.min(avgKph / kphGoal, 1)

  return Math.round(((wpmPct + accPct + kphPct) / 3) * 100)
}

function isGraduated(sessions, job) {
  const req = JOB_REQUIREMENTS[job.id]
  if (!req) return false
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  const passing = jobSessions.filter(
    s => (s.wpm || 0) >= req.wpm && (s.accuracy || 0) >= req.accuracy && (s.kph || 0) >= req.kph
  )
  return passing.length >= req.passingSessions
}

function getPassingSessions(sessions, job) {
  const req = JOB_REQUIREMENTS[job.id]
  if (!req) return { passing: 0, needed: 3 }
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  const passing = jobSessions.filter(
    s => (s.wpm || 0) >= req.wpm && (s.accuracy || 0) >= req.accuracy && (s.kph || 0) >= req.kph
  )
  return { passing: passing.length, needed: req.passingSessions }
}

export default function TrainJob() {
  const navigate = useNavigate()
  const sessions = getSessions()

  return (
    <div className="train-job-page" style={{ position: 'relative', minHeight: '100vh' }}>
      <button onClick={() => navigate('/')} style={backBtnStyle}>&#8592; Back</button>

      <div className="train-job-container">
        <h1 className="page-title">Job Training</h1>
        <p className="page-subtitle">Train for specific data entry roles. Complete passing sessions to earn certification.</p>

        <div className="jobs-grid">
          {JOBS.map(job => {
            const readiness = calcJobReadiness(sessions, job)
            const graduated = isGraduated(sessions, job)
            const { passing, needed } = getPassingSessions(sessions, job)
            const req = JOB_REQUIREMENTS[job.id] || {}

            return (
              <div key={job.id} className={`job-card ${graduated ? 'job-card--graduated' : ''}`}
                style={{
                  background: graduated ? 'rgba(72,199,142,0.12)' : 'rgba(255,255,255,0.06)',
                  border: graduated ? '1px solid rgba(72,199,142,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', padding: '1.25rem', cursor: 'pointer',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onClick={() => navigate(`/practice?mode=job&jobId=${job.id}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>
                    {job.icon} {job.title}
                  </h3>
                  {graduated && (
                    <span style={{ fontSize: '1.2rem' }} title="Certified!">&#127891;</span>
                  )}
                </div>

                <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.4' }}>
                  {job.description}
                </p>

                {/* Requirements */}
                {req.wpm && (
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                    Target: {req.wpm} WPM &bull; {req.accuracy}% acc &bull; {req.kph?.toLocaleString()} KPH
                  </p>
                )}

                {/* Progress bar */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>Readiness</span>
                    <span style={{ fontSize: '0.78rem', color: readiness >= 80 ? '#48c78e' : 'rgba(255,255,255,0.6)' }}>
                      {readiness}%
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '3px', transition: 'width 0.4s ease',
                      width: `${readiness}%`,
                      background: readiness >= 80 ? '#48c78e' : readiness >= 50 ? '#ffdd57' : '#f14668'
                    }} />
                  </div>
                </div>

                {/* Passing sessions progress */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                    {graduated
                      ? <span style={{ color: '#48c78e' }}>&#127891; Certified!</span>
                      : `${passing}/${needed} passing sessions`
                    }
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
                    {job.skillKeys?.join(', ')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
