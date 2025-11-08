/**
 * Kata: Web Streams Adapter
 * Level: Advanced
 * Topics: stream/web, ReadableStream, WritableStream, adapters to Node streams, fetch
 *
 * Scenario:
 *   Build helpers that let you convert between Node.js streams and Web Streams so
 *   you can plug into Fetch (undici) APIs while still supporting legacy code.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/webstreams.html
 *
 * Tasks:
 *   1. Implement toWebReadable that wraps a Node Readable into a Web ReadableStream.
 *   2. Implement toNodeWritable that adapts a Web WritableStream to a Node Writable.
 *   3. Implement teeResponse that fetches a URL (using global fetch) and tees the
 *      body stream to disk + in-memory consumer simultaneously.
 */

import type { Readable } from 'node:stream';
import type { Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

export function toWebReadable(source: Readable): ReadableStream<Uint8Array> {
  // TODO: use Readable.toWeb in Node 18+, but reimplement manually for practice
  throw new Error('Not implemented');
}

export function toNodeWritable(target: WritableStream<Uint8Array>, writable: Writable): Writable {
  // TODO: pipe chunks into target.getWriter()
  throw new Error('Not implemented');
}

export async function teeResponse(url: string, filePath: string): Promise<Uint8Array[]> {
  // TODO: use global fetch, body.tee(), write one branch to file, collect chunks from other
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  console.log('This kata requires an actual fetch target; run teeResponse manually.');
}
