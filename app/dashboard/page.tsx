'use client';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({ xp: 0, level: 1, sessions: 0, bestWpm: 0, badges: [] as string[] });

  useEffect(() => {
    try {
      const sessions = JSON.parse(localStorage.getItem('practice_sessions') || '[]');
      const xp = sessions.length * 10 + sessions.reduce((a: number, s: any) => a + (s.score || 0), 0);
      const level = Math.floor(xp / 100) + 1;
      const bestWpm = Math.max(...sessions.map((s: any) => s.wpm || 0), 0);
      const badges: string[] = [];
      if (sessions.length >= 1) badges.push('ð¯ First Session');
      if (sessions.length >= 7) badges.push('ð¥ Week Streak');
      if (bestWpm >= 30) badges.push('â¡ Speed Starter');
      if (bestWpm >= 50) badges.push('ð Speed Pro');
      if (sessions.some((s: any) => s.accuracy >= 98)) badges.push('ðï¸ Accuracy Expert');
      setStats({ xp, level, sessions: sessions.length, bestWpm, badges });
    } catch {}
  }, []);

  const xpInLevel = stats.xp % 100;

  return (
    <main className='page'>
      <Nav />
      <div className='grid grid-2'>
        <section className='card'>
          <h2>Welcome back</h2>
          <p>Total sessions: {stats.sessions}</p>
          <p>Best WPM: {stats.bestWpm}</p>
          <p>Level {stats.level} | XP {stats.xp}</p>
          <div style={{background:'#e8f0ff',borderRadius:'8px',height:'10px',margin:'8px 0 12px'}}>
            <div style={{background:'#3b82f6',height:'10px',borderRadius:'8px',width:`${xpInLevel}%`,transition:'width 0.4s'}}/>
          </div>
          <p style={{fontSize:'12px',color:'#888'}}>Next level at {(stats.level) * 100} XP ({100 - xpInLevel} XP away)</p>
          <Link href='/daily-challenge'>
            <button>Daily Challenge</button>
          </Link>
        </section>

        <section className='card'>
          <h3>Badges Earned</h3>
          {stats.badges.length === 0 ? (
            <p className='muted'>Complete sessions to earn badges!</p>
          ) : (
            stats.badges.map(b => <p key={b} style={{margin:'tpx 0'}}>{b}</p>)
          )}
          <Link href='/rewards' style={{display:'inline-block',marginTop:'8px'}}>
            <button>View All Rewards</button>
          </Link>
        </section>

        <section className='card'>
          <h3>Recent Scores</h3>
          {stats.sessions === 0 ? (
            <p className='muted'>No scores yet. Complete a drill to see your results here.</p>
          ) : (
            <p className='muted'>{stats.sessions} session{stats.sessions !== 1 ? 's' : ''} completed. Best WPM: {stats.bestWpm}</p>
          )}
          <Link href='/train/skill' style={{display:'inline-block',marginTop:'8px'}}>
            <button>Start Practicing</button>
          </Link>
        </section>

        <section className='card'>
          <h3>Quick Links</h3>
          <div style={{display:'flex',flexDirection:'wcolumn',gap:'8px'}}>
            <Link href='/train/job'><button style={{width:'100%'}}>Train by Job</button></Link>
            <Link href='/train/skill'><button style={{width:'100%'}}>Train by Skill</button></Link>
            <Link href='/progress'><button style={{width:'100%'}}>View Progress</button></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
