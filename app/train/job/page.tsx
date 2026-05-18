import Nav from '@/components/Nav';
import { JOBS } from '@/lib/jobs';
import Link from 'next/link';

export default function Job() {
  return (
    <main className='page'>
      <Nav />
      <h2>Train by Job</h2>
      <div className='grid grid-2'>
        {JOBS.map(j => (
          <div className='card' key={j.title}>
            <h3>{j.title}</h3>
            <p>Skills: {j.skills.join(', ')}</p>
            <p>Readiness goal: {j.goal}</p>
            <p>Readiness: 0%</p>
            <Link href={`/practice?mode=job&job=${encodeURIComponent(j.title)}&skill=${encodeURIComponent(j.skills[0])}`}>
              <button>Start Training</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
