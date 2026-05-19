import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser, getSessions } from '../utils/storage.js'

const getGrade = (score) => {
  if (score >= 500) return { letter: 'A+', cls: 'grade-Aplus', msg: "Outstanding! You're typing at a professional level.", points: 500 }
  if (score >= 380) return { letter: 'A',  cls: 'grade-A',     msg: 'Excellent work! Job-ready speed and accuracy.', points: 380 }
  if (score >= 280) return { letter: 'B',  cls: 'grade-B',     msg: 'Good job! Keep pushing to reach job-ready level.', points: 280 }
  if (score >= 180) return { letter: 'C',  cls: 'grade-C',     msg: 'Decent effort. Consistent practice will get you there.', points: 180 }
  if (score >= 100) return { letter: 'D',  cls: 'grade-D',     msg: "Keep at it! You're building the foundation.", points: 100 }
  return { letter: 'F', cls: 'grade-F', msg: "Don't give up -- every expert was once a beginner.", points: 0 }
}

const GRADE_LADDER = [
  { letter: 'F',  points: 0 },
  { letter: 'D',  points: 100 },
  { letter: 'C',  points: 180 },
  { letter: 'B',  points: 280 },
  { letter: 'A',  points: 380 },
  { letter: 'A+', points: 500 },
]

const getNextGrade = (score) => {
  const next = GRADE_LADDER.find(g => g.points > score)
  return next || null
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const s = location.state || {}
  const { wpm = 0, accuracy = 100, errors = 0, score = 0, kph = 0, skill = '', mode = '', duration = 60, promptsCompleted = 1 } = s

  const grade = getGrade(score)
  const nextGrade = getNextGrade(score)

  // Bug 5: Badge check — show first session badge right after session
  const sessions = getSessions(getCurrentUser())
  const isFirstSession = sessions.length === 1

  const getImprovementTip = () => {
    if (wpm < 30 && accuracy >= 90) {
      return { icon: '⚡', title: 'Focus on Speed', msg: 'Your accuracy is solid — now push yourself to type a bit faster. Aim for 30+ WPM.' }
    }
    if (accuracy < 90) {
      return { icon: '🎯', title: 'Focus on Accuracy', msg: 'Slow down and hit every key correctly. Aim for 90%+ accuracy before pushing speed.' }
    }
    if (wpm >= 35 && accuracy >= 94) {
      return { icon: '🎉', title: 'Job Ready!', msg: 'Great speed and accuracy — keep maintaining this level!' }
    }
    return { icon: '📈', title: 'Good Progress!', msg: `You're at ${wpm} WPM with ${accuracy}% accuracy. Keep practicing to build consistency.` }
  }

  const tip = getImprovementTip()

  const wpmForNext = nextGrade
    ? Math.ceil((nextGrade.points / (accuracy / 100)) / 10)
    : null

  const modeLabel = mode === 'job' ? 'Job Training' : mode === 'timed' ? 'Timed Practice' : 'Free Practice'
  const skillLabel = skill ? skill.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'General'

  // Bug 4 fix: relative positioning — no more absolute overlap
  const backBtnStyle = {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    padding: '0.4rem 1.2rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    backdropFilter: 'blur(4px)',
    position: 'relative',
    top: 'auto',
    left: 'auto'
  }

  // Bug 2 fix: dark card so white text is readable
  const cardStyle = {
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    marginTop: '1rem',
    textAlign: 'left',
    color: '#fff'
  }

  return (
    // Bug 2 fix: dark page background
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      color: '#fff',
      padding: '2rem'
    }}>
      {/* Bug 4 fix: flex header — back button no longer overlaps title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>&larr; Back</button>
        <h1 style={{ margin: 0 }}>Session Complete!</h1>
      </div>

      <div className="results-container">

        {/* Bug 5: First session badge */}
        {isFirstSession && (
          <div style={{
            background: 'rgba(99,102,241,0.2)',
            border: '1px solid rgba(99,102,241,0.4)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            &#127881; <strong>First Session Badge!</strong> &mdash; You completed your very first training session!
          </div>
        )}

        {/* Bug 3 fix: className derived from grade letter; <br/> separates letter from message */}
        <div className={`grade-badge grade-${grade.letter.replace('+', 'plus')}`}>
          <span className="grade-letter">{grade.letter}</span>
          <br />
          <span className="grade-msg">{grade.msg}</span>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{wpm}</span>
            <span className="stat-label">WPM</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{accuracy}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{errors}</span>
            <span className="stat-label">Errors</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{kph}</span>
            <span className="stat-label">KPH</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{promptsCompleted}</span>
            <span className="stat-label">Prompts Done</span>
          </div>
        </div>

        {/* Bug 2 fix: dark card */}
        <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            &#128202; Score Breakdown
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontFamily: 'monospace' }}>
            {wpm} WPM &times; {accuracy}% accuracy &times; 10 = <strong>{score} points &rarr; {grade.letter}</strong>
          </p>
          {nextGrade && (
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)' }}>
              To reach <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{nextGrade.letter}</strong>, you need{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{nextGrade.points} points</strong>
              {wpmForNext && accuracy > 0 ? ` (~${wpmForNext} WPM at your current accuracy)` : ''}.
            </p>
          )}
        </div>

        {/* First session badge */}
        {(() => {
          const user = getCurrentUser()
          const sessions = getSessions(user)
          if (sessions.length === 1) {
            return (
              <div style={{
                background: 'rgba(251,191,36,0.15)',
                border: '2px solid rgba(251,191,36,0.5)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏅</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                  Badge Unlocked: First Session!
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  You completed your first training session. Keep it up!
                </div>
              </div>
            )
          }
          return null
        })()}
        <div style={{ ...cardStyle, marginTop: '1.5rem' }}>          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {tip.icon} {tip.title}
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
            {tip.msg}
          </p>
        </div>

        <div className="session-meta" style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
          {modeLabel} &bull; {skillLabel} &bull; {duration}s session
        </div>

        {/* Bug 1 fix: all button handlers corrected */}
        <div className="results-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate(-2)}>
            Practice Again
          </button>
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate('/progress')}>
            View Progress
          </button>
          {mode === 'job' && (
            <button className="btn-secondary" onClick={() => navigate('/train/skill')}>
              Choose Skill
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
