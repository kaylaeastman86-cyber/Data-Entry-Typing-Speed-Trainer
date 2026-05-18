import { JOBS } from '@/lib/jobs';
export default function JR(){
  return(
    <main className='page'>
      <h2>Job Readiness</h2>
      <div className='grid grid-2'>
        {JOBS.map(j=>(
          <div key={j.title} className='card'>
            <h3>{j.title}</h3>
            <p>Readiness: 0%</p>
            <p>Required: {j.goal}</p>
            <p>Missing improvements: speed, accuracy consistency.</p>
            <button>Start or Continue Path</button>
          </div>
        ))}
      </div>
    </main>
  );
}
