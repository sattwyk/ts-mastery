/**
 * Kata: Stream Metrics Transform
 * Level: Intermediate
 * Topics: node:stream, Transform streams, objectMode, pipeline, backpressure
 *
 * Scenario:
 *   You receive NDJSON telemetry via stdin and must transform it into aggregated
 *   metrics (counts per type, rolling averages) before writing to stdout.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/stream.html
 *
 * Tasks:
 *   1. Implement createJsonLineTransform that turns Buffer chunks into objects.
 *   2. Implement createMetricsTransform that aggregates stats and pushes summaries.
 *   3. Wire everything in runPipeline using stream/promises.pipeline.
 */

import { Transform, TransformCallback } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export interface TelemetryEvent {
  readonly type: string;
  readonly latencyMs: number;
}

export function createJsonLineTransform(): Transform {
  // TODO: implement a Transform that buffers partial lines and emits objects (objectMode)
  throw new Error('Not implemented');
}

export function createMetricsTransform(): Transform {
  // TODO: maintain counts per type + average latency, emit summary objects
  throw new Error('Not implemented');
}

export async function runPipeline(input = process.stdin, output = process.stdout): Promise<void> {
  // TODO: pipeline(input, createJsonLineTransform(), createMetricsTransform(), stringify, output)
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  await runPipeline();
}
