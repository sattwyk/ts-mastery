/**
 * Kata: Clustered Signal-Aware HTTP Server
 * Level: Advanced
 * Topics: cluster, worker lifecycle, IPC messaging, graceful reloads, os.cpus
 *
 * Scenario:
 *   Build a clustered HTTP server that forks one worker per CPU core, keeps
 *   health statistics for each worker, handles `SIGTERM` (graceful shutdown) and
 *   `SIGUSR2` (rolling restart), and exposes an IPC channel so workers can report
 *   metrics (requests served, avg latency, memory footprint).
 *
 * Tasks:
 *   1. Implement startCluster() that forks workers and restarts them if they
 *      crash unexpectedly (with exponential backoff). Share config via env.
 *   2. Within runWorker(), create an HTTP server that listens on the provided
 *      port, handles simple JSON responses, and posts `process.send` metrics.
 *   3. Implement signal handlers in the primary process: `SIGTERM` should stop
 *      accepting new connections and wait for workers to exit; `SIGUSR2` should
 *      restart workers one-by-one (zero-downtime rolling restart).
 *   4. Store worker metrics in a Map keyed by worker id and expose a
 *      renderDashboard() helper that prints a summary table to stdout.
 */

import cluster, { type Worker } from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

export interface ClusterOptions {
  readonly port: number;
  readonly hostname?: string;
}

export interface WorkerMetrics {
  readonly workerId: number;
  readonly requests: number;
  readonly avgLatencyMs: number;
  readonly memoryRss: number;
  readonly updatedAt: number;
}

const metricsStore = new Map<number, WorkerMetrics>();

export function startCluster(options: ClusterOptions): void {
  // TODO: fork workers, handle messages, wire signal handlers, restart crashed workers
  throw new Error('Not implemented');
}

export function runWorker(options: ClusterOptions): void {
  // TODO: http.createServer, track latency, send metrics to primary
  throw new Error('Not implemented');
}

export function renderDashboard(): void {
  // TODO: pretty-print metricsStore as a table
  throw new Error('Not implemented');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  if (cluster.isPrimary) {
    startCluster({ port });
  } else {
    runWorker({ port });
  }
}
