import { randomUUID } from 'crypto';
import { compareHash, hashValue, normalizeUsername } from './security';

type User={
  id:string; username:string; password_hash:string;
  recovery_code_hash:string; created_at:string; updated_at:string; last_login_at?:string;
};
const users = new Map<string,User>();

export async function createUser(username:string,password:string,recoveryCode:string){
  const key=normalizeUsername(username);
  if(users.has(key)) throw new Error('USERNAME_EXISTS');
  const now=new Date().toISOString();
  users.set(key,{
    id:randomUUID(), username:key,
    password_hash:await hashValue(password),
    recovery_code_hash:await hashValue(recoveryCode),
    created_at:now, updated_at:now
  });
}

export async function verifyLogin(username:string,password:string){
  const u=users.get(normalizeUsername(username));
  if(!u) return null;
  const ok=await compareHash(password,u.password_hash);
  if(!ok) return null;
  u.last_login_at=new Date().toISOString();
  return u;
}

export async function resetPassword(username:string,recoveryCode:string,newPassword:string){
  const u=users.get(normalizeUsername(username));
  if(!u) return false;
  const ok=await compareHash(recoveryCode,u.recovery_code_hash);
  if(!ok) return false;
  u.password_hash=await hashValue(newPassword);
  u.updated_at=new Date().toISOString();
  return true;
}
