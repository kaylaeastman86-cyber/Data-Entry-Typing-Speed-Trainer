import Link from 'next/link';
const links = [
  {href:'/dashboard',label:'Dashboard'},
  {href:'/train/job',label:'Train Job'},
  {href:'/train/skill',label:'Train Skill'},
  {href:'/practice',label:'Practice'},
  {href:'/daily-challenge',label:'Daily Challenge'},
  {href:'/results',label:'Results'},
  {href:'/progress',label:'Progress'},
  {href:'/job-readiness',label:'Job Readiness'},
  {href:'/rewards',label:'Rewards'},
  {href:'/profile',label:'Profile'},
  {href:'/about',label:'About'},
];

export default function Nav({ back }: { back?: string }) {
  return (
    <nav style={{marginBottom:'16px',display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center'}}>
      <Link href={back||'/dashboard'} style={{fontWeight:'bold'}}>â Back</Link>
      {links.map(l=>(
        <Link key={l.href} href={l.href} style={{opacity:0.7,fontSize:'0.85em'}}>{l.label}</Link>
      ))}
    </nav>
  );
}
