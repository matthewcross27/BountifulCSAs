import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const COLUMNS = [
  "created_at",
  "updated_at",
  "email",
  "farm_name",
  "share_count",
  "region",
  "growing_practices",
] as const;

function csvCell(value: string | null): string {
  if (value === null) return "";
  return /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

async function main() {
  // Imported dynamically, after loadEnvConfig runs: static imports are hoisted
  // above this call, which would read process.env before .env.local is loaded.
  const { asc } = await import("drizzle-orm");
  const { db } = await import("../lib/db/client");
  const { waitlistSignups } = await import("../lib/db/schema");

  const rows = await db.select().from(waitlistSignups).orderBy(asc(waitlistSignups.createdAt));

  const lines = [COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.createdAt,
        row.updatedAt,
        row.email,
        row.farmName,
        row.shareCount,
        row.region,
        row.growingPractices,
      ]
        .map(csvCell)
        .join(","),
    );
  }
  process.stdout.write(lines.join("\n") + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
