/**
 * Kata: URL Sanitizer
 * Level: Intermediate
 * Topics: WHATWG URL, URLPattern, validation, query param policies
 *
 * Scenario:
 *   Build a utility that normalizes incoming URLs, strips disallowed query params,
 *   enforces HTTPS, and groups requests by origin. Practice using the WHATWG URL
 *   API and URLPattern for routing style matching.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/url.html
 *
 * Tasks:
 *   1. Implement normalizeUrl with the following rules:
 *        - force https protocol
 *        - lowercase host, preserve path casing
 *        - strip default ports (80, 443)
 *   2. Implement filterQuery that keeps only whitelisted params.
 *   3. Implement matchRoute using URLPattern for route detection.
 */

export interface NormalizeOptions {
  readonly allowProtocols?: string[];
  readonly defaultPorts?: Record<string, number>;
}

export function normalizeUrl(input: string | URL, options: NormalizeOptions = {}): URL {
  // TODO: construct URL, enforce https, drop default ports, handle allowlist
  throw new Error('Not implemented');
}

export function filterQuery(url: URL, allowList: string[]): URL {
  // TODO: rebuild searchParams keeping only allowList, maintain ordering
  throw new Error('Not implemented');
}

export function matchRoute(url: URL, pattern: URLPattern): URLPatternResult | null {
  // TODO: call pattern.exec and return match groups
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const url = normalizeUrl('http://Example.com:80/api/v1/users?token=secret&lang=en');
  const filtered = filterQuery(url, ['lang']);
  const pattern = new URLPattern({ pathname: '/api/v1/:resource' });
  console.log(matchRoute(filtered, pattern));
}
