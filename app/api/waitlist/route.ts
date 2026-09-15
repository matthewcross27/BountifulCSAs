import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { waitlistSignups } from "@/lib/db/schema";
import { FIELD_LIMITS, HONEYPOT_FIELD, SHARE_COUNT_OPTIONS } from "@/lib/waitlist";

// Deliberately permissive: the point is to catch typos, not to police the long tail
// of legal addresses. Anything that gets past this is confirmed by the email itself.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

function readString(value: unknown, limit: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, limit);
}

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("We couldn't read that submission. Please try again.");
  }
  if (typeof body !== "object" || body === null) {
    return fail("We couldn't read that submission. Please try again.");
  }
  const payload = body as Record<string, unknown>;

  // Spam guard: a hidden field no sighted or assistive-tech user ever reaches.
  // Answer like a success so a bot has nothing to tune against.
  if (readString(payload[HONEYPOT_FIELD], 200) !== null) {
    return NextResponse.json({ ok: true });
  }

  const rawEmail = readString(payload.email, FIELD_LIMITS.email);
  if (!rawEmail) return fail("Please enter your email address.");
  const email = rawEmail.toLowerCase();
  if (!EMAIL_RE.test(email)) return fail("That doesn't look like an email address - please check it.");

  const shareCountInput = readString(payload.shareCount, 60);
  if (shareCountInput !== null && !SHARE_COUNT_OPTIONS.includes(shareCountInput as never)) {
    return fail("Please pick one of the listed share ranges.");
  }

  const now = new Date().toISOString();
  const optional = {
    farmName: readString(payload.farmName, FIELD_LIMITS.farmName),
    shareCount: shareCountInput,
    growingPractices: readString(payload.growingPractices, FIELD_LIMITS.growingPractices),
    region: readString(payload.region, FIELD_LIMITS.region),
  };

  try {
    const existing = await db
      .select()
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, email))
      .get();

    if (existing) {
      // A repeat signup is a friendly success, never an error. Keep whatever the
      // grower told us this time and leave earlier answers alone where they left
      // a field blank.
      const merged = Object.fromEntries(
        Object.entries(optional).filter(([, value]) => value !== null),
      );
      if (Object.keys(merged).length > 0) {
        await db
          .update(waitlistSignups)
          .set({ ...merged, updatedAt: now })
          .where(eq(waitlistSignups.email, email));
      }
      return NextResponse.json({ ok: true });
    }

    await db.insert(waitlistSignups).values({
      id: randomUUID(),
      email,
      ...optional,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("waitlist signup failed", error);
    return fail("Something went wrong on our end. Please try again in a moment.", 500);
  }

  return NextResponse.json({ ok: true });
}
