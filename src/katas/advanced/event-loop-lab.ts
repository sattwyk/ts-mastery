/**
 * Kata: Event Loop Lab
 * Level: Advanced
 * Topics: microtasks vs macrotasks, process.nextTick, queueMicrotask, timers, Immediate
 *
 * Build a scheduler that allows you to register steps and then records the exact
 * execution order when run. The goal is to reason about the event loop and the
 * difference between task queues.
 */

type StepHandler = () => void | Promise<void>;

export type Phase = 'nextTick' | 'microtask' | 'immediate' | 'timer' | 'promiseReaction' | 'custom';

export interface Step {
  readonly label: string;
  readonly phase: Phase;
  readonly handler: StepHandler;
}

export interface TraceEntry {
  readonly label: string;
  readonly phase: Phase;
  readonly timestamp: number;
}

export class EventLoopLab {
  private readonly steps: Step[] = [];

  addStep(step: Step): this {
    // TODO: push steps while preserving insertion order
    throw new Error('Not implemented');
  }

  /**
   * Run all registered steps and return the execution trace.
   * Requirements:
   *   - Support phases:
   *       nextTick -> use process.nextTick
   *       microtask -> queueMicrotask
   *       immediate -> setImmediate
   *       timer -> setTimeout 0
   *       promiseReaction -> Promise.resolve().then
   *       custom -> run synchronously in add order
   *   - Each handler can be async; await it before recording completion timestamp.
   */
  async run(): Promise<TraceEntry[]> {
    // TODO: orchestrate scheduling + tracing
    throw new Error('Not implemented');
  }
}

export async function demo(): Promise<void> {
  const lab = new EventLoopLab();
  lab
    .addStep({ label: 'tick', phase: 'nextTick', handler: () => console.log('nextTick') })
    .addStep({ label: 'micro', phase: 'microtask', handler: () => console.log('microtask') })
    .addStep({ label: 'promise', phase: 'promiseReaction', handler: () => console.log('promise') })
    .addStep({ label: 'timer', phase: 'timer', handler: () => console.log('timer') });

  const trace = await lab.run();
  console.table(trace);
}
