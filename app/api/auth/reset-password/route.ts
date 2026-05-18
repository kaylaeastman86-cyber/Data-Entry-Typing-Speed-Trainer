import { NextResponse } from 'next/server';
import { resetPassword } from '@/lib/db';
export async function POST(req:Request){
  const {username,recoveryCode,newPassword,confirmPassword}=await req.json();
  if(newPassword!==confirmPassword||newPassword.length<8) return NextResponse.json({error:'Password validation failed.'},{status:400});
  const ok=await resetPassword(username,recoveryCode,newPassword);
  if(!ok) return NextResponse.json({error:'Invalid username or recovery code.'},{status:400});
  return NextResponse.json({ok:true});
}
