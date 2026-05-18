import Link from 'next/link';
const links=['dashboard','train/job','train/skill','practice','daily-challenge','results','progress','job-readiness','rewards','profile','about','privacy','terms'];
export default function Nav(){
  return(
    <div className='nav'>
      {links.map(x=>(
        <Link key={x} href={`/${x}`}>{x}</Link>
      ))}
    </div>
  );
}
