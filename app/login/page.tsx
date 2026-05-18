'use client';
import { useState } from 'react';
export default function Login(){
  const [err,setErr]=useState('');
  async function submit(e:any){
    e.preventDefault();
    const body=Object.fromEntries(new FormData(e.currentTarget));
    const r=await fetch('/api/auth/login',{method:'POST',body:JSON.stringify(body)});
    const j=await r.json();
    if(!r.ok) return setErr(j.error);
    location.href='/dashboard';
  }
  return (
    <main className='page card'>
      <h2>Login</h2>
      <form onSubmit={submit} className='grid'>
        <input name='username' required/>
        <input name='password' type='password' required/>
        <button>Login</button>
        <a href='/forgot-password'>Forgot password?</a>
        {err&&<p>{err}</p>}
      </form>
    </main>
  );
}
