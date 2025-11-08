/**
 * Kata: Async Log Streamer
 * Level: Intermediate
 * Topics: async iterators, async generators, Node streams, backpressure
 *
 * Scenario:
 *   You maintain a telemetry pipeline that writes JSON Lines (one JSON object per line)
 *   to disk. You need to expose a friendly API that allows callers to iterate over the
 *   stream, filter events, and compute rolling statistics without loading everything
 *   into memory.
 *
 * Tasks:
 *   1. Implement `streamJsonLines` as an `async function*` that yields parsed objects.
 *   2. Implement `filterEvents` that accepts an AsyncIterable and a predicate, returning a new AsyncIterable.
 *   3. Implement `aggregateLatency` that consumes an AsyncIterable and produces stats.
 *   4. Make sure file handles/streams are closed even if consumers break early.
 */

import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

export interface LogEvent {
  readonly id: string;
  readonly service: string;
  readonly latencyMs: number;
  readonly receivedAt: string;
}

export interface LatencyStats {
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly avg: number;
}

/**
 * Read a JSONL file lazily. Hints:
 *  - use fs.createReadStream + readline/promises
 *  - emit records as soon as each line parses
 *  - ensure the readline interface is closed when iteration ends
 */
export async function* streamJsonLines(path: string): AsyncGenerator<LogEvent> {
  // TODO: create stream, pipe to readline, yield parsed JSON objects
  throw new Error('Not implemented');
}

/**
 * Higher-order async iterable filter.
 */
export async function* filterEvents<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T, index: number) => Promise<boolean> | boolean,
): AsyncGenerator<T> {
  // TODO: iterate source, await predicate, yield values that pass
  throw new Error('Not implemented');
}

/**
 * Consume an async iterable of LogEvent and compute latency stats.
 * Return { count: 0 } etc if no events are consumed.
 */
export async function aggregateLatency(iterable: AsyncIterable<LogEvent>): Promise<LatencyStats> {
  // TODO: track running totals without storing all events
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const source = streamJsonLines('./telemetry.log');
  const filtered = filterEvents(source, (event) => event.service === 'payments');
  const stats = await aggregateLatency(filtered);
  console.log(stats);
}
