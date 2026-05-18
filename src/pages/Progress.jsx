import { getCurrentUser, getSessions } from '../utils/storage.js'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Link } from 'react-router-dom'

export default function Progress() {
  const username = getCurrentUser()
  const sessions = getSessions(username)
  const recent = sessions.slice(-20)

  if (!sessions.length) return (
    <div className="page" style={{textAlign:'center',paddingTop:'4rem'}}>
      <div style={{fontSize:'4rem',marginBottom:'1rem'}}>📊</div>
      <h2 style={{color:'var(--navy)'}}>No sessions yet</h2>
      <p className="text-muted mt-1 mb-2">Complete a practice session to see your progress here.</p>
      <Link to="/train/skill" className="btn btn-primary">Start Practicing →</Link>
    </div>
  )

  const chartData = recent.map((s, i) => ({
    session: `#${sessions.length - recent.length + i + 1}`,
    WPM: s.wpm || 0,
    Accuracy: s.accuracy || 0,
    Score: s.score || 0,
  }))

  const totalMins = Math.round(sessions.reduce((a,s)=>a+(s.duration||60), 0) / 60)
  const avgWPM = Math.round(sessions.reduce((a,s)=>a+(s.wpm||0),0)/sessions.length)
  const bestWPM = Math.max(...sessions.map(s=>s.wpm||0))
  const avgAcc = Math.round(sessions.reduce((a,s)=>a+(s.accuracy||0),0)/sessions.length)

  return (
    <div className="page" style={{maxWidth:900}}>
      <h1 className="page-title">Your Progress</h1>
      <p className="page-subtitle">Tracking your last {recent.length} sessions out of {sessions.length} total.</p>

      {/* Summary stats */}
      <div className="grid grid-4" style={{marginBottom:'1.5rem'}}>
        {[
          ['Total Sessions', sessions.length],
          ['Avg WPM', avgWPM],
          ['Best WPM', bestWPM],
          ['Avg Accuracy', avgAcc+'%'],
          ['Practice Time', totalMins+' min'],
        ].slice(0,4).map(([l,v])=>(
          <div className="stat-card" key={l}>
            <div className="stat-value">{v}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
      <div style={{marginBottom:'1.5rem',textAlign:'center',color:'var(--grey-500)',fontSize:'0.875rem'}}>
        Total practice time: <strong>{totalMins} minutes</strong>
      </div>

      {/* WPM Chart */}
      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div className="section-title">WPM Over Time</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="session" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip />
            <Line type="monotone" dataKey="WPM" stroke="#2563eb" strokeWidth={2} dot={{r:3}} activeDot={{r:5}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Accuracy Chart */}
      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div className="section-title">Accuracy Over Time</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="session" tick={{fontSize:11}} />
            <YAxis domain={[0,100]} tick={{fontSize:11}} />
            <Tooltip />
            <Line type="monotone" dataKey="Accuracy" stroke="#0d9488" strokeWidth={2} dot={{r:3}} activeDot={{r:5}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Score Bar Chart */}
      <div className="card" style={{marginBottom:'1.25rem'}}>
        <div className="section-title">Score Per Session</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="session" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip />
            <Bar dataKey="Score" fill="#2563eb" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
