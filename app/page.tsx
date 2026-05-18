import Link from 'next/link';
export default function Page(){
  return (
    <main className='page'>
      <div className='card'>
        <h1>Data Entry Speed Trainer</h1>
        <p className='muted'>Free job-skill training for typing, data-entry, 10-key, and readiness tracking.</p>
        <Link href='/create-account'><button>Create Account</button></Link>
        {' '}<Link href='/login'>Login</Link>
      </div>
    </main>
  );
}
