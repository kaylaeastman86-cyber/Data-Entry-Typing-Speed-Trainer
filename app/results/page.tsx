'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Nav from '@/components/Nav';

function ResultsInner() {
  const params = useSearchParams();
  const [lastSession, setLastSession] = useState<any>(null);

  useEffect(() => {
    try {
      const sessions = JSON.parse(localStorage.getItem('practice_sessions') || '[]');
      if (sessions.length > 0) setLastSession(sessions[sessions.length - 1]);
    } catch {}
  }, []);

  const wpm = params.get('wpm') || lastSession?.wpm || 0;
  const accuracy = params.get('accuracy') || lastSession?.accuracy || 0;
  const errors = params.get('errors') || lastSession?.errors || 0;
  const score = params.get('score') || lastSession?.score || 0;
  const skill = params.get('skill') || lastSession?.skill || 'Practice';

  const getGrade = (acc: number) => acc >= 98 ? 'A+' : acc >= 95 ? 'A' : acc >= 90 ? 'B' : acc >= 85 ? 'C' : 'D';
  const getFeedback = (w: number, acc: number) => {
    if (acc >= 95 && w >= 45) return "ð Excellent! You're at professional level.";
    if (acc >= 95) return 'ð¯ Great accuracy! Work on building more speed.';
    if (w >= 45) return 'â¡ Fast typist! Focus on reducing errors.';
    if (acc < 85) return 'ð¯ Slow down and focus on accuracy first.';
    return 'ðª Good effort! Keep practicing daily for improvement.';
  };

  if (!wpm && !lastSession) return (
    <main className='page'>
      <Nav />
      <div className='card' style={{textAlign:'center',padding:'48px'}}>
        <h2>No Results Yet</h2>
        <p className='muted'>Complete a practice session to see your results here.</p>
        <a href='/practice'><button>Start Practice</button></a>
      </div>
    </main>
  );

  return (
    <main className='page'>
      <Nav />
      <div className='card'>
        <h2>Session Results â {skill}</h2>
        <div className='grid grid-2' style={{marginTop:'16px'}}>
          <div className='card' style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',fontWeight:'bold',color:'#3b82f6'}}>{wpm}</div>
            <div className='muted'>Words Per Minute</div>
          </div>
          <div className='card' style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',fontWeight:'bold',color:'#10b981'}}>{accuracy}%</div>
            <div className='muted'>Accuracy</div>
          </div>
          <div className='card' style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',fontWeight:'bold',color:'#f59e0b'}}>{errors}</div>
            <div className='muted'>Errors Made</div>
          </div>
          <div className='card' style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',fontWeight:'bold',color:'#8b5cf6'}}>{score}</div>
            <div className='muted'>Score</div>
          </div>
        </div>
        <div className='card' style={{marginTop:'16px',textAlign:'center'}}>
          <div style={{fontSize:'36px',fontWeight:'bold'}}>Grade: {getGrade(Number(accuracy))}</div>
          <p>{getFeedback(Number(wpm), Number(accuracy))}</p>
        </div>
        <div style={{display:'flex',gap:'12px',marginTop:'16px',flexWrap:'wrap'}}>
          <a href={`/practice?skill=${encodeURIComponent(String(skill))}`}><button>Practice Again</button></a>
          <a href='/train/skill'><button style={{background:'#6b7280'}}>Choose Different Skill</button></a>
          <a href='/progress'><button style={{background:'#10b981'}}>View Progress</button></a>
          <a href='/dashboard'><button style={{background:'#1f2937'}}>Dashboard</button></a>
        </div>
      </div>
    </main>
  );
}

export default function Results() {
  return <Suspense fallback={<main className='page card'><p>Loading results...</p></main>}><ResultsInner /></Suspense>;
}
