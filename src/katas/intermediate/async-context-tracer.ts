/**
 * Kata: Async Context Tracer
 * Level: Intermediate
 * Topics: async_hooks.AsyncLocalStorage, diagnostics_channel, request tracing
 *
 * Scenario:
 *   Build a tracing helper that stamps every inbound request with a correlation
 *   id and keeps that metadata reachable across timers, promises, worker hops,
 *   and child processes. The goal is to understand how AsyncLocalStorage keeps
 *   state per execution context and how diagnostics_channel can broadcast it.
 *   Be mindful that AsyncLocalStorage adds some overhead; instrument only the
 *   hot paths you actually need.
 *
 * Tasks:
 *   1. Implement RequestContextManager with runWithContext + getContext helpers.
 *   2. Use AsyncLocalStorage under the hood; ensure nested calls reuse parents.
 *   3. Emit request lifecycle messages on a diagnostics channel ('app.request').
 *   4. Expose withDiagnosticsLogger() that decorates console methods with the
 *      current context id (use Proxy or custom logger) without breaking colors.
 */

import { AsyncLocalStorage } from 'node:async_hooks';
import { diagnosticsChannel } from 'node:diagnostics_channel';
import { randomUUID } from 'node:crypto';

export interface RequestContext {
  readonly requestId: string;
  readonly path: string;
  readonly startedAt: number;
  readonly metadata?: Record<string, unknown>;
}

const channel = diagnosticsChannel('app.request');

export class RequestContextManager {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  runWithContext<T>(path: string, fn: () => Promise<T> | T, metadata?: Record<string, unknown>): Promise<T> | T {
    // TODO: create context once, call storage.run, emit diagnosticsChannel messages
    throw new Error('Not implemented');
  }

  getContext(): RequestContext | undefined {
    // TODO: return current store
    throw new Error('Not implemented');
  }

  withDiagnosticsLogger<T extends object>(logger: T): T {
    // TODO: wrap logger methods (info/debug/error) so they prepend context id
    throw new Error('Not implemented');
  }
}

export async function simulatedWorker(manager: RequestContextManager): Promise<void> {
  await manager.runWithContext('/jobs/cleanup', async () => {
    const ctx = manager.getContext();
    channel.subscribe(({ message }) => {
      console.error('diagnostic event', message);
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.log('worker done', ctx?.requestId);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new RequestContextManager();
  simulatedWorker(manager).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
