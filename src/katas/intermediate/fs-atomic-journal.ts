/**
 * Kata: Atomic Journal Writer
 * Level: Intermediate
 * Topics: node:fs/promises, streams, atomic rename, file locking
 *
 * Scenario:
 *   Build a mini append-only journal that buffers entries to a temp file, flushes
 *   via atomic rename, and keeps an index file with offsets. The goal is to avoid
 *   partial writes even if the process crashes mid-way.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/fs.html
 *
 * Tasks:
 *   1. Implement appendEntry to write JSON entries with newline delimiters using
 *      fs.promises.open + FileHandle.
 *   2. Write to `<log>.tmp`, fsync, then rename to `<log>`.
 *   3. Maintain an index file storing byte offsets for fast reads.
 *   4. Implement readEntries to stream the log back using createReadStream.
 */

import { createReadStream, promises as fs } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createInterface } from 'node:readline/promises';

export interface AppendOptions {
  readonly tmpSuffix?: string;
}

export async function appendEntry(
  path: string,
  entry: unknown,
  options: AppendOptions = {},
): Promise<void> {
  // TODO: open <path>.tmp, append entry + newline, fsync, rename over original
  throw new Error('Not implemented');
}

export async function buildIndex(path: string, indexPath = `${path}.idx`): Promise<void> {
  // TODO: read file, track byte offsets, persist as JSON array
  throw new Error('Not implemented');
}

export async function* readEntries(path: string): AsyncGenerator<Record<string, unknown>> {
  // TODO: stream lines via readline interface and JSON.parse lazily
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  await appendEntry('./journal.log', { event: 'boot', at: Date.now() });
  await buildIndex('./journal.log');
  for await (const entry of readEntries('./journal.log')) {
    console.log(entry);
  }
}
