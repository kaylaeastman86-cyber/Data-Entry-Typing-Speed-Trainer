'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function Create(){
  const [recovery,setRecovery]=useState('');
  const [saved,setSaved]=useState(false);
  const [err,setErr]=useState('');
  async function submit(e:any){
    e.preventDefault();
    const body=Object.fromEntries(new FormData(e.currentTarget));
    const r=await fetch('/api/auth/signup',{method:'POST',body:JSON.stringify(body)});
    const j=await r.json();
    if(!r.ok) return setErr(j.error);
    setRecovery(j.recoveryCode);
  }
  if(recovery) return(
    <main className='page card'>
      <Link href='/' style={{fontWeight:'bold',display:'inline-block',marginBottom:'16px'}}>â Back</Link>
      <h2>Save your recovery code</h2>
      <p><code>{recovery}</code></p>
      <button onClick={()=>navigator.clipboard.writeText(recovery)}>Copy Code</button><br/>
      <label><input type='checkbox' onChange={e=>setSaved(e.target.checked)}/> I Saved My Code</label><br/>
      <a href={saved?'/onboarding':'#'}><button disabled={!saved}>Continue to Onboarding</button></a>
    </main>
  );
  return(
    <main className='page card'>
      <Link href='/' style={{fontWeight:'bold',display:'inline-block',marginBottom:'16px'}}>â Back</Link>
      <h2>Create Account</h2>
      <form onSubmit={submit} className='grid'>
        <input name='username' placeholder='username' required/>
        <input name='password' type='password' placeholder='password' required/>
        <input name='confirmPassword' type='password' placeholder='confirm password' required/>
        <button>Create</button>
        {err&&<p>{err}</p>}
      </form>
    </main>
  );
}
