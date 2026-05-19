import { useLocation, useNavigate } from 'react-router-dom'

const backBtnStyle = {
  position: 'absolute', top: '1rem', left: '1rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
  padding: '0.4rem 1.2rem',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  backdropFilter: 'blur(4px)',
  zIndex: 10
}

const getGrade = (score) => {
  if (score >= 500) return { letter: 'A+', cls: 'grade-A-plus', msg: 'Outstanding! You\'re typing at a professional level.', points: 500 }
  if (score >= 380) return { letter: 'A',  cls: 'grade-A',      msg: 'Excellent work! Job-ready speed and accuracy.', points: 380 }
  if (score >= 280) return { letter: 'B',  cls: 'grade-B',      msg: 'Good job! Keep pushing to reach job-ready level.', points: 280 }
  if (score >= 180) return { letter: 'C',  cls: 'grade-C',      msg: 'Decent effort. Consistent practice will get you there.', points: 180 }
  if (score >= 100) return { letter: 'D',  cls: 'grade-D',      msg: 'Keep at it! You\'re building the foundation.', points: 100 }
  return { letter: 'F', cls: 'grade-D', msg: 'Don\'t give up -- every expert was once a beginner.', points: 0 }
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

  const getImprovementTip = () => {
    if (wpm < 30 && accuracy >= 90) {
      return { icon: '&#9889;', title: 'Focus on Speed', msg: 'Your accuracy is solid — now push yourself to type a bit faster. Aim for 30+ WPM.' }
    }
    if (accuracy < 90) {
      return { icon: '&#127919;', title: 'Focus on Accuracy', msg: `Slow down and hit every key correctly. Aim for 90%+ accuracy before pushing speed.` }
    }
    if (wpm >= 35 && accuracy >= 94) {
      return { icon: '&#127878;', title: 'Job Ready!', msg: 'Great speed and accuracy — keep maintaining this level!' }
    }
    return { icon: '&#128200;', title: 'Good Progress!', msg: `You're at ${wpm} WPM with ${accuracy}% accuracy. Keep practicing to build consistency.` }
  }

  const tip = getImprovementTip()

  const wpmForNext = nextGrade
    ? Math.ceil((nextGrade.points / (accuracy / 100)) / 10)
    : null

  const modeLabel = mode === 'job' ? 'Job Training' : mode === 'timed' ? 'Timed Practice' : 'Free Practice'
  const skillLabel = skill ? skill.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'General'

  return (
    <div className="results-page" style={{ position: 'relative', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={backBtnStyle}>&#8592; Back</button>

      <div className="results-container">
        <h1 className="results-title">Session Complete!</h1>

        <div className={`grade-badge ${grade.cls}`}>
          <span className="grade-letter">{grade.letter}</span>
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

        <div className="breakdown-card" style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px', padding: '1.25rem 1.5rem', marginTop: '1.5rem', textAlign: 'left'
        }}>
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

        <div className="improvement-card" style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px', padding: '1.25rem 1.5rem', marginTop: '1rem', textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            dangerouslySetInnerHTML={{ __html: `${tip.icon} ${tip.title}` }} />
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
            {tip.msg}
          </p>
        </div>

        <div className="session-meta" style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
          {modeLabel} &bull; {skillLabel} &bull; {duration}s session
        </div>

        <div className="results-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate(-1)}>
            Practice Again
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Home
          </button>
          {mode === 'job' && (
            <button className="btn-secondary" onClick={() => navigate('/train-job')}>
              Job Training
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
