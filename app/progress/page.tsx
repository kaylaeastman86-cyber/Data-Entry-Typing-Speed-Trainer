'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Nav from '@/components/Nav';

type Session = { date: string; wpm: number; accuracy: number; skill: string; score: number };

export default function Progress() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('practice_sessions');
      if (raw) setSessions(JSON.parse(raw));
    } catch {}
  }, []);

  if (sessions.length === 0) return (
    <main className='page'>
      <Nav />
      <div className='card' style={{textAlign:'center',padding:'48px'}}>
        <h2>No Progress Data Yet</h2>
        <p className='muted'>Complete practice sessions to see your progress charts here.</p>
        <a href='/train/skill'><button>Start Practicing</button></a>
      </div>
    </main>
  );

  const chartData = sessions.slice(-14).map(s => ({
    d: new Date(s.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}),
    WPM: s.wpm, Accuracy: s.accuracy, Score: s.score
  }));

  return (
    <main className='page'>
      <Nav />
      <h2>Your Progress</h2>
      <p className='muted'>{sessions.length} sessions recorded</p>
      <div className='card' style={{marginBottom:'16px'}}>
        <h3>WPM &amp; Accuracy</h3>
        <div style={{height:260}}>
          <ResponsiveContainer><LineChart data={chartData}>
            <XAxis dataKey='d'/><YAxis/><Tooltip/><Legend/>
            <Line dataKey='WPM' stroke='#3b82f6'/>
            <Line dataKey='Accuracy' stroke='#10b981'/>
          </LineChart></ResponsiveContainer>
        </div>
      </div>
      <div className='card'>
        <h3>Score History</h3>
        <div style={{height:220}}>
          <ResponsiveContainer><BarChart data={chartData}>
            <XAxis dataKey='d'/><YAxis/><Tooltip/>
            <Bar dataKey='Score' fill='#8b5cf6'/>
          </BarChart></ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
