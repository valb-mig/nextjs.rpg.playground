"use client";

import { randomBytes, pbkdf2Sync } from 'crypto';

export function hashPassword(password: string): { salt: string, hash: string } {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return { salt, hash };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {

    const hashVerify = pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    return hash === hashVerify;
}