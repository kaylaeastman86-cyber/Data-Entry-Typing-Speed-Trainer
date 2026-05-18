import { NextResponse } from 'next/server';
import { verifyLogin } from '@/lib/db';
export async function POST(req:Request){
  const {username,password}=await req.json();
  const user=await verifyLogin(username,password);
  if(!user) return NextResponse.json({error:'Incorrect username or password.'},{status:401});
  return NextResponse.json({ok:true,username:user.username});
}
