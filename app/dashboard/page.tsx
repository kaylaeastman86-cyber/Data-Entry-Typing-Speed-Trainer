import Nav from '@/components/Nav';
export default function Dashboard(){
  return(
    <main className='page'>
      <Nav/>
      <div className='grid grid-2'>
        <section className='card'>
          <h2>Welcome back</h2>
          <p>Current streak: 0</p>
          <p>Best WPM: 0 | Best KPH: 0 | Best Accuracy: 0%</p>
          <p>Total sessions: 0 | Total practice: 0 min</p>
          <p>Level 1 Beginner | XP 0/100</p>
          <button>Daily Challenge</button>
        </section>
        <section className='card'>
          <h3>Resume your last session?</h3>
          <button>Resume</button> <button>Restart</button> <button>Discard</button>
          <p>Weakest skill recommendation: Weak Skill Practice</p>
        </section>
        <section className='card'>
          <h3>Recent scores</h3>
          <p className='muted'>No scores yet.</p>
        </section>
        <section className='card'>
          <h3>Ad Placeholder</h3>
          <p>Dashboard bottom banner ad zone.</p>
        </section>
      </div>
    </main>
  );
}
