/**
 * Kata: HTTPS Health Check Orchestrator
 * Level: Advanced
 * Topics: https module, streaming response bodies, AbortController, concurrency limiting
 *
 * Build a utility that probes multiple HTTPS targets and reports their status.
 *
 * Functions to implement:
 *   - `fetchStatus` -> perform a single HTTPS GET with timeout + optional request body streaming.
 *   - `probeAll` -> run probes with limited concurrency, aggregate fastest success latency, etc.
 */

import { request } from 'node:https';
import { URL } from 'node:url';
import { once } from 'node:events';

export interface ProbeResult {
  readonly url: string;
  readonly ok: boolean;
  readonly statusCode?: number;
  readonly durationMs: number;
  readonly bodySnippet?: string;
  readonly error?: Error;
}

export interface FetchOptions {
  readonly method?: 'GET' | 'HEAD';
  readonly timeoutMs?: number;
  readonly signal?: AbortSignal;
}

/**
 * Execute one HTTPS request. Requirements:
 *   - reject on non-2xx responses unless `method === 'HEAD'` (then treat 3xx as success)
 *   - abort on timeout using AbortController + request.destroy
 *   - capture first 200 bytes of body for debugging
 */
export async function fetchStatus(
  target: string | URL,
  options: FetchOptions = {},
): Promise<ProbeResult> {
  // TODO: implement raw https.request orchestration
  throw new Error('Not implemented');
}

export interface ProbeAllOptions extends FetchOptions {
  readonly concurrency?: number;
  readonly onProgress?: (result: ProbeResult) => void;
}

/**
 * Run probes with bounded concurrency.
 *   - maintain a queue of pending URLs
 *   - call onProgress after each probe settles
 *   - return array sorted by duration
 */
export async function probeAll(
  urls: readonly (string | URL)[],
  options: ProbeAllOptions = {},
): Promise<ProbeResult[]> {
  // TODO: schedule fetchStatus with concurrency limit (use simple worker pool)
  throw new Error('Not implemented');
}
