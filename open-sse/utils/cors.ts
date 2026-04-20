/**
 * CORS configuration for open-sse handlers.
 *
 * Reads `CORS_ORIGIN` env var (default: "*") so that all handlers
 * use the same configurable origin. Equivalent to src/shared/utils/cors.ts
 * for the open-sse package boundary.
 */

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

function normalizeCorsOrigin(rawOrigin: string): string {
  const trimmed = rawOrigin.trim();
  if (!trimmed) {
    return "*";
  }

  if (trimmed.includes(",")) {
    return "*";
  }

  return trimmed;
}

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": normalizeCorsOrigin(CORS_ORIGIN),
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key, anthropic-version",
};

/**
 * Returns just the origin header for merging into existing header objects.
 */
export function getCorsOrigin(): string {
  return normalizeCorsOrigin(CORS_ORIGIN);
}
