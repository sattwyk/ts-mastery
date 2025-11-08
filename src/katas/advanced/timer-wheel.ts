/**
 * Kata: Timer Wheel Scheduler
 * Level: Advanced
 * Topics: Timers, setTimeout vs setImmediate, priority queues, cancellation
 *
 * Scenario:
 *   Implement a lightweight timer wheel that schedules callbacks at millisecond
 *   precision, coalesces buckets, and allows pause/resume semantics.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/timers.html
 *
 * Tasks:
 *   1. Implement schedule to insert tasks into wheel buckets.
 *   2. Implement advance to move the wheel forward and execute due callbacks.
 *   3. Support cancellation tokens and pause/resume.
 */

export interface ScheduledTask {
  readonly id: number;
  readonly dueAt: number;
  readonly payload: unknown;
}

type TaskHandler = (task: ScheduledTask) => void | Promise<void>;

export class TimerWheel {
  private nowFn: () => number = () => Date.now();
  private handler: TaskHandler;

  constructor(
    handler: TaskHandler,
    private readonly resolutionMs = 10,
    nowFn?: () => number,
  ) {
    // TODO: initialize buckets, store handler, override nowFn if provided
    throw new Error('Not implemented');
  }

  schedule(delayMs: number, payload?: unknown): ScheduledTask {
    // TODO: compute due time, place into bucket, return descriptor
    throw new Error('Not implemented');
  }

  cancel(taskId: number): boolean {
    // TODO: remove task from bucket if present
    throw new Error('Not implemented');
  }

  async advance(): Promise<void> {
    // TODO: move wheel, execute tasks <= now, await handler if Promise
    throw new Error('Not implemented');
  }
}

export async function demo(): Promise<void> {
  const wheel = new TimerWheel(async (task) => console.log('executed', task.id));
  wheel.schedule(50);
  wheel.schedule(20);
  await wheel.advance();
}
