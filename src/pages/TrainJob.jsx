import { useNavigate } from 'react-router-dom'
import { JOBS } from '../utils/jobs'
import { getSessions, getCurrentUser } from '../utils/storage'

const backBtnStyle = {
  position: 'absolute', top: '1rem', left: '1rem',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff', padding: '0.4rem 1rem', borderRadius: '999px',
  cursor: 'pointer', fontSize: '0.875rem', zIndex: 10
}

// Per-job requirements for graduation — keyed by job ID
const JOB_REQUIREMENTS = {
  data_entry_clerk:     { minMinutes: 5,  passingSessions: 3, wpm: 35, accuracy: 95 },
  admin_assistant:      { minMinutes: 5,  passingSessions: 3, wpm: 40, accuracy: 94 },
  customer_service:     { minMinutes: 5,  passingSessions: 3, wpm: 40, accuracy: 94 },
  receptionist:         { minMinutes: 5,  passingSessions: 3, wpm: 35, accuracy: 95 },
  medical_office:       { minMinutes: 5,  passingSessions: 5, wpm: 35, accuracy: 96 },
  billing_clerk:        { minMinutes: 3,  passingSessions: 5, wpm: 30, accuracy: 95 },
  accounting_assistant: { minMinutes: 3,  passingSessions: 5, wpm: 30, accuracy: 96 },
  warehouse_clerk:      { minMinutes: 3,  passingSessions: 3, wpm: 25, accuracy: 90 },
  ecommerce_processor:  { minMinutes: 5,  passingSessions: 3, wpm: 35, accuracy: 95 },
  virtual_assistant:    { minMinutes: 5,  passingSessions: 3, wpm: 40, accuracy: 94 },
}

// Readiness % based only on real job-specific sessions (never shows fake % for new users)
function calcJobReadiness(sessions, job) {
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  if (jobSessions.length === 0) return 0

  const req = JOB_REQUIREMENTS[job.id]
  if (!req) return 0

  const avgWpm = jobSessions.reduce((a, s) => a + (s.wpm || 0), 0) / jobSessions.length
  const avgAcc = jobSessions.reduce((a, s) => a + (s.accuracy || 0), 0) / jobSessions.length

  const wpmPct = req.wpm > 0 ? Math.min(avgWpm / req.wpm, 1) : 1
  const accPct = Math.min(avgAcc / req.accuracy, 1)

  return Math.round(((wpmPct + accPct) / 2) * 100)
}

// A session passes if: duration meets min minutes, WPM >= goal, accuracy >= goal
function sessionPasses(s, req) {
  const durationMinutes = (s.duration || 0) / 60
  return (
    durationMinutes >= req.minMinutes &&
    (s.wpm || 0) >= req.wpm &&
    (s.accuracy || 0) >= req.accuracy
  )
}

function isGraduated(sessions, job) {
  const req = JOB_REQUIREMENTS[job.id]
  if (!req) return false
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  const passing = jobSessions.filter(s => sessionPasses(s, req))
  return passing.length >= req.passingSessions
}

function getPassingSessions(sessions, job) {
  const req = JOB_REQUIREMENTS[job.id]
  if (!req) return { passing: 0, needed: 3 }
  const jobSessions = sessions.filter(s => s.mode === 'job' && s.jobId === job.id)
  const passing = jobSessions.filter(s => sessionPasses(s, req))
  return { passing: passing.length, needed: req.passingSessions }
}

export default function TrainJob() {
  const navigate = useNavigate()
  const sessions = getSessions(getCurrentUser())

  return (
    <div className="train-job-page" style={{ position: 'relative', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={backBtnStyle}>&#8592; Back</button>

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
                onClick={() => navigate(`/practice?mode=job&job=${job.id}`)}
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
                  {job.desc}
                </p>

                {/* Requirements */}
                {req.wpm && (
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                    Target: {req.wpm} WPM &bull; {req.accuracy}% accuracy &bull; {req.minMinutes} min session
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
                      : `${passing}/${needed} passing sessions needed`
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
