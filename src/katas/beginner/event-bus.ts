/**
 * Kata: Typed Event Bus
 * Level: Beginner → Intermediate bridge
 * Topics: Node.js EventEmitter, generics, type-safe listeners
 *
 * Requirements:
 *  - Build a strongly-typed wrapper around EventEmitter that constrains event names
 *    and listener signatures at compile time.
 *  - Support wildcard listeners that receive every event plus its payload.
 *  - Support `once` listeners with the same type guarantees.
 *
 * Focus areas:
 *  - Extending built-in Node types without losing type information.
 *  - Properly cleaning up listeners to avoid leaks.
 */

import { EventEmitter } from 'node:events';

export type EventMap = Record<string, unknown>;

type Listener<T> = (payload: T) => void | Promise<void>;

export interface WildcardEvent<TEvents extends EventMap> {
  event: keyof TEvents;
  payload: TEvents[keyof TEvents];
}

export class TypedEventBus<TEvents extends EventMap> {
  private readonly emitter = new EventEmitter({ captureRejections: true });

  /**
   * Register an event listener. You may use Symbol.for('wildcard') for wildcard support.
   */
  on<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>): this;
  on(event: typeof TypedEventBus.WILDCARD, listener: Listener<WildcardEvent<TEvents>>): this;
  on(event: keyof TEvents | typeof TypedEventBus.WILDCARD, listener: Listener<unknown>): this {
    // TODO: delegate to EventEmitter while ensuring listener identity is tracked for off()
    throw new Error('Not implemented');
  }

  once<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>): this;
  once(event: typeof TypedEventBus.WILDCARD, listener: Listener<WildcardEvent<TEvents>>): this;
  once(event: keyof TEvents | typeof TypedEventBus.WILDCARD, listener: Listener<unknown>): this {
    // TODO: mirror on(), but remove the listener after first invocation
    throw new Error('Not implemented');
  }

  off<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>): this;
  off(event: typeof TypedEventBus.WILDCARD, listener: Listener<WildcardEvent<TEvents>>): this;
  off(event: keyof TEvents | typeof TypedEventBus.WILDCARD, listener: Listener<unknown>): this {
    // TODO: remove listener
    throw new Error('Not implemented');
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): boolean {
    // TODO: emit event and also notify wildcard listeners
    throw new Error('Not implemented');
  }

  listenerCount<K extends keyof TEvents>(event?: K): number {
    // TODO: surface EventEmitter.listenerCount, but treat undefined as "all events"
    throw new Error('Not implemented');
  }

  static readonly WILDCARD = Symbol.for('typed-event-bus/wildcard');
}

/**
 * Suggested manual test
 */
export async function demo(): Promise<void> {
  interface WorkerEvents {
    jobStarted: { id: string };
    jobFinished: { id: string; durationMs: number };
  }

  const bus = new TypedEventBus<WorkerEvents>();

  bus.on('jobStarted', (payload) => console.log('started', payload.id));
  bus.once('jobFinished', (payload) => console.log('finished', payload.id));
  bus.on(TypedEventBus.WILDCARD, ({ event, payload }) => console.log('wildcard', event, payload));

  bus.emit('jobStarted', { id: '42' });
  bus.emit('jobFinished', { id: '42', durationMs: 1200 });
  bus.emit('jobFinished', { id: '42', durationMs: 2000 });
}
