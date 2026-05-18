import Nav from '@/components/Nav';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className='page'>
      <Nav />
      <div className='grid grid-2'>
        <section className='card'>
          <h2>Welcome back</h2>
          <p>Current streak: 0</p>
          <p>Best WPM: 0 | Best KPH: 0 | Best Accuracy: 0%</p>
          <p>Total sessions: 0 | Total practice: 0 min</p>
          <p>Level 1 Beginner | XP 0/100</p>
          <Link href='/daily-challenge'>
            <button>Daily Challenge</button>
          </Link>
        </section>

        <section className='card'>
          <h3>Resume your last session?</h3>
          <p style={{color: '#888', fontSize: '14px', marginBottom: '12px'}}>
            Session persistence coming soon — practice sessions will be saved here.
          </p>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            <Link href='/practice'>
              <button>Resume</button>
            </Link>
            <Link href='/practice'>
              <button>Restart</button>
            </Link>
            <Link href='/train/skill'>
              <button>Discard</button>
            </Link>
          </div>
          <p style={{marginTop: '12px'}}>Weakest skill recommendation: <strong>Weak Skill Practice</strong></p>
        </section>

        <section className='card'>
          <h3>Recent scores</h3>
          <p className='muted'>No scores yet. Complete a drill to see your results here.</p>
          <Link href='/train/skill' style={{display: 'inline-block', marginTop: '8px'}}>
            <button>Start Practicing</button>
          </Link>
        </section>

        <section className='card'>
          <h3>Quick Links</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Link href='/train/job'><button style={{width: '100%'}}>Train by Job</button></Link>
            <Link href='/train/skill'><button style={{width: '100%'}}>Train by Skill</button></Link>
            <Link href='/progress'><button style={{width: '100%'}}>View Progress</button></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
