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
