import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "takcheong_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 天（秒）

function secret(): string {
  return process.env.AUTH_SECRET || "dev-secret-change-me";
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string {
  const expires = Date.now() + MAX_AGE * 1000;
  const body = `${payload}.${expires}`;
  return `${body}.${hmac(body)}`;
}

function verify(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [payload, expiresStr, sig] = parts;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  return safeEqual(sig, hmac(`${payload}.${expiresStr}`));
}

/** 檢查目前是否為已登入的 Admin（Server 端） */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return !!token && verify(token);
}

/** 登入成功後建立 Session Cookie */
export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sign("admin"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** 登出並清除 Session Cookie */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
