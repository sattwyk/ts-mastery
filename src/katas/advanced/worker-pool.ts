/**
 * Kata: Worker Thread Pool
 * Level: Advanced
 * Topics: worker_threads, SharedArrayBuffer, task routing, graceful shutdown
 *
 * Scenario:
 *   Implement a worker pool that can execute CPU-bound tasks off the main thread.
 *   You must initialize workers with transferable config, dispatch jobs round-robin,
 *   and support draining + graceful termination.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/worker_threads.html
 *
 * Tasks:
 *   1. Implement WorkerPool constructor to spawn N workers with a given module.
 *   2. Implement exec to post tasks and await responses via MessagePort.
 *   3. Implement close to terminate all workers, rejecting inflight tasks.
 */

import { Worker } from 'node:worker_threads';
import type { WorkerOptions } from 'node:worker_threads';

export interface WorkerPoolOptions {
  readonly filename: string;
  readonly size?: number;
  readonly resourceLimits?: WorkerOptions['resourceLimits'];
}

export interface WorkerTask<TInput = unknown> {
  readonly id: number;
  readonly payload: TInput;
}

type Resolve = (value: unknown) => void;
type Reject = (reason?: unknown) => void;

interface Pending {
  resolve: Resolve;
  reject: Reject;
}

export class WorkerPool {
  private readonly workers: Worker[] = [];
  private readonly pending = new Map<number, Pending>();
  private nextWorkerIndex = 0;
  private taskId = 0;

  constructor(private readonly options: WorkerPoolOptions) {
    // TODO: spawn workers, set up message handlers, handle errors/exit
    throw new Error('Not implemented');
  }

  exec<TInput, TResult>(payload: TInput): Promise<TResult> {
    // TODO: pick worker, postMessage with task id, return promise
    // NOTE: payload/results must be structured-cloneable (no functions, symbols, DOM nodes, etc.).
    throw new Error('Not implemented');
  }

  async close(): Promise<void> {
    // TODO: terminate workers, reject pending tasks, await exit
    throw new Error('Not implemented');
  }
}

export async function demo(): Promise<void> {
  const pool = new WorkerPool({
    filename: new URL('./worker-pool-demo-worker.js', import.meta.url).pathname,
    size: 2,
  });
  await Promise.all([pool.exec({ value: 2 }), pool.exec({ value: 5 })]);
  await pool.close();
}
