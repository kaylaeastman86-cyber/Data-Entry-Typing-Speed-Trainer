import Nav from '@/components/Nav';
import { JOBS } from '@/lib/jobs';
export default function Job(){
  return(
    <main className='page'>
      <Nav/>
      <h2>Train by Job</h2>
      <div className='grid grid-2'>
        {JOBS.map(j=>(
          <div className='card' key={j.title}>
            <h3>{j.title}</h3>
            <p>Skills: {j.skills.join(', ')}</p>
            <p>Readiness goal: {j.goal}</p>
            <p>Readiness: 0%</p>
            <button>Start Training</button>
          </div>
        ))}
      </div>
      <div className='card'>Practice selection ad placeholder</div>
    </main>
  );
}
