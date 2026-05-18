'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function Forgot(){
  const [msg,setMsg]=useState('');
  const [err,setErr]=useState('');
  async function submit(e:any){
    e.preventDefault(); setErr('');
    const body=Object.fromEntries(new FormData(e.currentTarget));
    const r=await fetch('/api/auth/reset-password',{method:'POST',body:JSON.stringify(body)});
    const j=await r.json();
    if(!r.ok) return setErr(j.error);
    setMsg('Password reset successful. Go to login.');
  }
  return(
    <main className='page card'>
      <Link href='/login' style={{fontWeight:'bold',display:'inline-block',marginBottom:'16px'}}>â Back to Login</Link>
      <h2>Reset Password</h2>
      <form onSubmit={submit} className='grid'>
        <input name='username' required/>
        <input name='recoveryCode' required/>
        <input type='password' name='newPassword' required/>
        <input type='password' name='confirmPassword' required/>
        <button>Reset Password</button>
        {msg&&<p>{msg}</p>}
        {err&&<p>{err}</p>}
      </form>
    </main>
  );
}
