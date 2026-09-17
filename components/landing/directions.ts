/** TEMPORARY: visual-direction explorer. See directions.css for how to remove. */
export const DIRECTIONS = ["ledger", "packet", "table"] as const;

export type Direction = (typeof DIRECTIONS)[number];

export function parseDirection(value: string | string[] | undefined): Direction | null {
  const v = Array.isArray(value) ? value[0] : value;
  return DIRECTIONS.includes(v as Direction) ? (v as Direction) : null;
}
