'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';

function ResultsInner() {
  const params = useSearchParams();
  const wpm = params.get('wpm') || '0';
  const accuracy = params.get('accuracy') || '0';
  const errors = params.get('errors') || '0';
  const skill = params.get('skill') || 'General Practice';

  const wpmNum = parseInt(wpm);
  let feedback = '';
  if (wpmNum >= 50) feedback = 'Excellent speed! You are well above average.';
  else if (wpmNum >= 35) feedback = 'Good job! You meet most job readiness benchmarks.';
  else if (wpmNum >= 20) feedback = 'Keep practicing — you are making solid progress.';
  else feedback = 'Just starting out — consistency is key. Keep going!';

  return (
    <main className='page'>
      <Nav />
      <div className='card' style={{maxWidth: '560px', margin: '0 auto'}}>
        <h2>Session Results</h2>
        <p style={{color: '#888', marginBottom: '20px'}}>Skill practiced: <strong>{skill}</strong></p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
          <div style={{background: '#f0f4ff', borderRadius: '10px', padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: 'bold', color: '#4f8ef7'}}>{wpm}</div>
            <div style={{color: '#666', fontSize: '14px', marginTop: '4px'}}>Words Per Minute</div>
          </div>
          <div style={{background: '#f0fff4', borderRadius: '10px', padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: 'bold', color: '#22863a'}}>{accuracy}%</div>
            <div style={{color: '#666', fontSize: '14px', marginTop: '4px'}}>Accuracy</div>
          </div>
          <div style={{background: '#fff5f5', borderRadius: '10px', padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: 'bold', color: '#e53e3e'}}>{errors}</div>
            <div style={{color: '#666', fontSize: '14px', marginTop: '4px'}}>Errors</div>
          </div>
          <div style={{background: '#fffbf0', borderRadius: '10px', padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#d69e2e'}}>
              {Math.max(0, Math.round((parseInt(wpm) * parseInt(accuracy)) / 100))}
            </div>
            <div style={{color: '#666', fontSize: '14px', marginTop: '4px'}}>Score</div>
          </div>
        </div>

        <p style={{background: '#f7f9fc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #4f8ef7', marginBottom: '24px'}}>
          {feedback}
        </p>

        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <a href={`/practice?mode=skill&skill=${encodeURIComponent(skill)}`}>
            <button>Practice Again</button>
          </a>
          <a href='/train/skill'>
            <button>Choose Another Skill</button>
          </a>
          <a href='/dashboard'>
            <button>Go to Dashboard</button>
          </a>
        </div>
      </div>
    </main>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<main className='page card'><p>Loading results...</p></main>}>
      <ResultsInner />
    </Suspense>
  );
}
