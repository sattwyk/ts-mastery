/**
 * Kata: Buffer Pool + Finalization
 * Level: Advanced
 * Topics: memory pooling, FinalizationRegistry, manual resource management
 *
 * Build a BufferPool that:
 *   - preallocates a slab
 *   - hands out slices while tracking usage
 *   - reuses released slices
 *   - optionally auto-releases via FinalizationRegistry
 *   - tracks slots via an array sorted by offset (no linked list required)
 *
 * ⚠️ Finalizers are best-effort: FinalizationRegistry callbacks are NOT guaranteed to
 * run before process exit. Treat them as leak detectors only—call release() manually.
 */

import { Buffer } from 'node:buffer';

export interface AcquireOptions {
  readonly size: number;
  readonly registerFinalizer?: boolean;
}

export interface Lease {
  readonly buffer: Buffer;
  release(): void;
}

interface Slot {
  offset: number;
  size: number;
  free: boolean;
}

export class BufferPool {
  private readonly slab: Buffer;
  private readonly slots: Slot[] = [];
  private readonly registry?: FinalizationRegistry<Slot>;

  constructor(
    private readonly capacity: number,
    enableFinalizer = false,
  ) {
    // TODO: allocate Buffer.alloc(capacity) and initialize slots
    // Reminder: even if enableFinalizer=true, release() must be called manually; the
    // runtime may skip finalizers during shutdown or under memory pressure.
    throw new Error('Not implemented');
  }

  /**
   * Acquire a slice. Hints:
   *   - find the first free slot with size >= requested
   *   - split slots when necessary
   *   - throw if not enough space
   */
  acquire(options: AcquireOptions): Lease {
    // TODO
    throw new Error('Not implemented');
  }

/**
 * Merge adjacent free slots to reduce fragmentation.
 * Approach: iterate the slots array (already sorted by offset) and merge neighbors with free=true.
 */
  compact(): void {
    // TODO
    throw new Error('Not implemented');
  }

  get freeBytes(): number {
    // TODO: sum free slots
    throw new Error('Not implemented');
  }

  get usedBytes(): number {
    return this.capacity - this.freeBytes;
  }
}
