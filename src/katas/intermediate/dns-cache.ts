/**
 * Kata: DNS Cache Resolver
 * Level: Intermediate
 * Topics: dns/promises, caching, TTL handling, AbortController for timeouts
 *
 * Build a tiny resolver that:
 *   - wraps `dns.promises.resolve4` and `resolve6`
 *   - caches results based on hostname+rrtype
 *   - respects TTL expiration
 *   - supports cancellation via AbortSignal
 *
 * Stretch ideas:
 *   - Track hit/miss counters for observability
 *   - Add negative caching for NXDOMAIN responses
 *   - Support custom resolvers via dnsPromises.setServers()
 */

import { promises as dns } from 'node:dns';

export type RecordType = 'A' | 'AAAA';

export interface CacheEntry {
  readonly expiresAt: number;
  readonly addresses: readonly string[];
}

export interface ResolveOptions {
  readonly signal?: AbortSignal;
  readonly ttlMs?: number;
}

export class DnsCache {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly now: () => number = () => Date.now()) {}

  private static cacheKey(hostname: string, rrtype: RecordType): string {
    return `${rrtype}:${hostname.toLowerCase()}`;
  }

  /**
   * Resolve a hostname and cache the result.
   * Hints:
   *   - prefer caller-provided ttlMs but fall back to 2 minutes
   *   - if AbortSignal is aborted, reject with AbortError
   *   - dedupe concurrent requests using a Map<string, Promise<CacheEntry>>
   *     (keyed the same way as the cache) so overlapping resolve() calls share work;
   *     always delete the entry once the promise settles to avoid memory leaks.
   */
  async resolve(
    hostname: string,
    rrtype: RecordType,
    options: ResolveOptions = {},
  ): Promise<readonly string[]> {
    // TODO: implement cache lookup/fill
    throw new Error('Not implemented');
  }

  /**
   * Remove expired entries and return how many were pruned.
   */
  sweep(): number {
    // TODO: iterate map, delete expired entries
    throw new Error('Not implemented');
  }
}
