import bcrypt from 'bcryptjs';
export const hashValue = async (plain: string) => bcrypt.hash(plain, 12);
export const compareHash = async (plain: string, hash: string) => bcrypt.compare(plain, hash);
export const normalizeUsername = (username: string) => username.trim().toLowerCase();
export const usernameRegex = /^[a-z0-9_]{3,20}$/;
export const generateRecoveryCode = () =>
  `DATA-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
