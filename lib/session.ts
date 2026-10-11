import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Identity (PLAN §3): httpOnly signed cookie gr_pid = person_id. No real auth.
export const COOKIE_NAME = "gr_pid";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret(): string {
  const s = process.env.COOKIE_SECRET;
  if (!s) throw new Error("Missing COOKIE_SECRET");
  return s;
}

function sign(personId: string): string {
  return createHmac("sha256", secret()).update(personId).digest("base64url");
}

export function encodeSession(personId: string): string {
  return `${personId}.${sign(personId)}`;
}

export function decodeSession(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null;
  const pid = raw.slice(0, dot);
  const given = Buffer.from(raw.slice(dot + 1));
  const expected = Buffer.from(sign(pid));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  return pid;
}

/** The signed-in person's id, or null. Works in route handlers, server components and server actions. */
export async function getPersonId(): Promise<string | null> {
  return decodeSession((await cookies()).get(COOKIE_NAME)?.value);
}

/** Set the identity cookie. Call from a route handler or server action. */
export async function setPersonId(personId: string): Promise<void> {
  (await cookies()).set(COOKIE_NAME, encodeSession(personId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Convenience for routes: 401 JSON if no valid cookie. */
export async function requirePersonId(): Promise<string | Response> {
  const pid = await getPersonId();
  return pid ?? Response.json({ error: "not checked in" }, { status: 401 });
}
