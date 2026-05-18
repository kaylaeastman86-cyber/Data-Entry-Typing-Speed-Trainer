'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ displayName: '', goal: 'Speed & Accuracy', focus: 'Data Entry', level: 'Beginner' });

  function finish(level: string) {
    const final = { ...form, level };
    localStorage.setItem('user_profile', JSON.stringify(final));
    localStorage.setItem('onboarding_complete', 'true');
    router.push('/dashboard');
  }

  return (
    <main className='page card'>
      <h2>Welcome! Let&apos;s get you set up ({step}/3)</h2>
      <div style={{background:'#e8f0ff',borderRadius:'8px',height:'8px',margin:'12px 0'}}>
        <div style={{background:'#3b82f6',height:'8px',borderRadius:'8px',width:`${(step/3)*100}%`,transition:'width 0.3s'}}/>
      </div>

      {step === 1 && (
        <div className='grid'>
          <h3>What should we call you?</h3>
          <input placeholder='Your name or username' value={form.displayName}
            onChange={e => setForm(f => ({...f, displayName: e.target.value}))} />
          <button onClick={() => setStep(2)} disabled={!form.displayName}>Next â</button>
        </div>
      )}

      {step === 2 && (
        <div className='grid'>
          <h3>What&apos;s your main goal?</h3>
          {['Speed & Accuracy','Job Readiness','10-Key Mastery','General Practice'].map(g => (
            <button key={g} onClick={() => { setForm(f => ({...f, goal: g})); setStep(3); }}
              style={{background: form.goal === g ? '#1d4ed8' : undefined}}>{g}</button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className='grid'>
          <h3>What&apos;s your current level?</h3>
          {['Beginner (under 25 WPM)','Intermediate (25-45 WPM)','Advanced (45+ WPM)'].map(l => (
            <button key={l} onClick={() => finish(l)}
              style={{background: form.level === l ? '#1d4ed8' : undefined}}>{l}</button>
          ))}
        </div>
      )}
    </main>
  );
}
