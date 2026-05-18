'use client';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function Profile() {
  const [form, setForm] = useState({ displayName: '', skillGoal: 'Speed & Accuracy', mainFocus: 'Data Entry' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem('user_profile');
    if (p) {
      try { const data = JSON.parse(p); setForm(f => ({ ...f, ...data })); } catch {}
    }
  }, []);

  function save(e: any) {
    e.preventDefault();
    localStorage.setItem('user_profile', JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className='page card'>
      <Nav />
      <h2>Profile Settings</h2>
      <form onSubmit={save} className='grid'>
        <label>Display Name
          <input value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} placeholder='Your name' />
        </label>
        <label>Skill Goal
          <select value={form.skillGoal} onChange={e => setForm(f => ({ ...f, skillGoal: e.target.value }))}>
            <option>Speed &amp; Accuracy</option>
            <option>Job Readiness</option>
            <option>Speed Only</option>
            <option>Accuracy Only</option>
          </select>
        </label>
        <label>Main Focus
          <select value={form.mainFocus} onChange={e => setForm(f => ({ ...f, mainFocus: e.target.value }))}>
            <option>Data Entry</option>
            <option>Medical Records</option>
            <option>Financial Data</option>
            <option>Customer Service</option>
            <option>Inventory Management</option>
            <option>General Office</option>
          </select>
        </label>
        <button type='submit'>Save Settings</button>
        {saved && <p style={{color:'green'}}>Settings saved!</p>}
      </form>
    </main>
  );
}
