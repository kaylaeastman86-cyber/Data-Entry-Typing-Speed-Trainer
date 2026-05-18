import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';
import { generateRecoveryCode, normalizeUsername, usernameRegex } from '@/lib/security';
export async function POST(req:Request){
  const {username,password,confirmPassword}=await req.json();
  const u=normalizeUsername(username||'');
  if(!usernameRegex.test(u)) return NextResponse.json({error:'Username must be 3-20 chars with letters, numbers, underscores.'},{status:400});
  if(password!==confirmPassword||!password||password.length<8) return NextResponse.json({error:'Password validation failed.'},{status:400});
  const recoveryCode=generateRecoveryCode();
  try{ await createUser(u,password,recoveryCode); }
  catch{ return NextResponse.json({error:'Username already exists.'},{status:409}); }
  return NextResponse.json({recoveryCode});
}
