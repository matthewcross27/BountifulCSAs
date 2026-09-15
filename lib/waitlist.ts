// Shared between the landing form (components/landing/WaitlistForm.tsx) and the
// server validator (app/api/waitlist/route.ts) so both agree on the accepted values.
export const SHARE_COUNT_OPTIONS = [
  "Not running a CSA yet",
  "Under 20 shares",
  "20-50 shares",
  "50-100 shares",
  "100-200 shares",
  "Over 200 shares",
] as const;

export type ShareCount = (typeof SHARE_COUNT_OPTIONS)[number];

export const FIELD_LIMITS = {
  email: 254,
  farmName: 120,
  growingPractices: 2000,
  region: 120,
} as const;

/**
 * The field the spam guard watches: real people never see it, bots fill it in.
 * Deliberately meaningless - a semantic name like `website` gets filled by
 * password managers and autofill heuristics, which would silently drop a real
 * grower's signup.
 */
export const HONEYPOT_FIELD = "hp_field_1";
