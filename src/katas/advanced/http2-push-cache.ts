/**
 * Kata: HTTP/2 Push Cache
 * Level: Advanced
 * Topics: http2, TLS, ALPN negotiation, server push, caching
 *
 * Scenario:
 *   You are building an edge service that serves critical assets via HTTP/2 and
 *   pushes CSS/JS alongside the HTML document. Implement a tiny framework that
 *   configures a secure server, inspects client settings, conditionally pushes
 *   assets, and falls back to HTTP/1.1 when needed.
 *
 * NOTE: Major browsers (Chrome/Edge) deprecated HTTP/2 server push. This kata is for
 * understanding the API—prefer 103 Early Hints or preload headers in production.
 *
 * Tasks:
 *   1. Implement loadTlsConfig() that reads key/cert/ca files from disk (paths
 *      provided via options) and returns the tls.createSecureContext arguments.
 *   2. Implement createPushServer() using http2.createSecureServer with ALPN
 *      support for ['h2', 'http/1.1']; emit custom events for push/fallback.
 *   3. Inside the request handler, decide whether to push assets (use
 *      stream.pushStream) based on `request.headers[':path']` and cache metadata.
 *   4. Expose a warmCache() helper that reads file contents into memory (Buffer)
 *      and invalidates entries when the underlying file changes (fs.watch).
 */

import { createSecureServer, type Http2SecureServer, type ServerHttp2Stream } from 'node:http2';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { createSecureContext, type SecureContextOptions } from 'node:tls';
import { resolve } from 'node:path';

export interface TlsConfig {
  keyPath: string;
  certPath: string;
  caPath?: string;
}

export interface PushAsset {
  readonly path: string;
  readonly contentType: string;
  readonly filePath: string;
}

export interface PushServerOptions {
  readonly tls: TlsConfig;
  readonly assets: PushAsset[];
}

export interface WarmCache {
  get(assetPath: string): Buffer | undefined;
  invalidate(assetPath?: string): void;
}

export async function loadTlsConfig(config: TlsConfig): Promise<SecureContextOptions> {
  // TODO: read key/cert (+ optional CA) and return { key, cert, ca }
  throw new Error('Not implemented');
}

export function warmCache(assets: readonly PushAsset[]): WarmCache {
  // TODO: read files upfront, watch for changes, store Buffers keyed by asset path
  throw new Error('Not implemented');
}

export function createPushServer(options: PushServerOptions): Http2SecureServer {
  // TODO: create http2 server with ALPN fallback, push assets when clients accept h2
  throw new Error('Not implemented');
}

export function pushAssets(stream: ServerHttp2Stream, assets: readonly PushAsset[], cache: WarmCache): void {
  // TODO: iterate assets, call stream.pushStream when open, handle errors gracefully
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  console.log('Requires valid TLS certs; configure loadTlsConfig before running.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
