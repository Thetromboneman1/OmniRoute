import { BaseExecutor } from "./base.ts";
import type { ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * PollinationsExecutor — OpenAI-compatible Pollinations text endpoint.
 *
 * Pollinations currently exposes a public endpoint and an optional key-backed tier.
 * OmniRoute sends the bearer token when configured, but no auth header is required
 * for the anonymous endpoint.
 *
 * Endpoint: https://text.pollinations.ai/openai/chat/completions
 * Docs: https://pollinations.ai/docs
 */
export class PollinationsExecutor extends BaseExecutor {
  constructor() {
    super("pollinations", PROVIDERS["pollinations"] || { format: "openai" });
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ): string {
    const baseUrls = this.getBaseUrls();
    return (
      baseUrls[urlIndex] || baseUrls[0] || "https://text.pollinations.ai/openai/chat/completions"
    );
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (key) {
      headers.Authorization = `Bearer ${key}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    _model: string,
    body: unknown,
    _stream: boolean,
    _credentials: ProviderCredentials | null
  ): unknown {
    // Pollinations uses provider aliases directly: "openai", "claude", "gemini", etc.
    return body;
  }
}

export default PollinationsExecutor;
