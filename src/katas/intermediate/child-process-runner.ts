/**
 * Kata: Child Process Sandbox Runner
 * Level: Intermediate
 * Topics: child_process.spawn, signal handling, timeouts, stream piping
 *
 * Scenario:
 *   Build a helper that executes shell commands in a sandboxed fashion. Each job
 *   should capture stdout/stderr, enforce CPU/IO timeouts, and propagate signals
 *   from the parent process. The runner will be used by a build farm that needs
 *   deterministic logs and resource control.
 *
 * Tasks:
 *   1. Implement spawnJob() that runs a command with args/env/cwd, returning an
 *      object with promises for completion and live stdout/stderr streams.
 *   2. Enforce a timeout (AbortSignal or custom timer) that kills the child with
 *      SIGKILL if SIGTERM does not exit the process in N ms.
 *   3. Stream stdout/stderr to a logger callback while also buffering them for
 *      the final result (avoid buffering unbounded output; use maxBuffer option).
 *   4. Implement runPipeline() that executes jobs sequentially, short-circuits
 *      on failures, and returns aggregate results.
 */

import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';

export interface SpawnOptions {
  readonly cwd?: string;
  readonly env?: NodeJS.ProcessEnv;
  readonly timeoutMs?: number;
  readonly signal?: AbortSignal;
  readonly maxBuffer?: number;
  readonly onStdout?: (chunk: Buffer) => void;
  readonly onStderr?: (chunk: Buffer) => void;
}

export interface JobResult {
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly stdout: Buffer;
  readonly stderr: Buffer;
}

export interface RunningJob {
  readonly child: ChildProcess;
  readonly result: Promise<JobResult>;
  cancel(reason?: string): void;
}

export function spawnJob(command: string, args: readonly string[], options: SpawnOptions = {}): RunningJob {
  // TODO: spawn child, hook stdout/stderr, enforce timeout + signal handling
  throw new Error('Not implemented');
}

export async function runPipeline(jobs: Array<{ command: string; args: string[]; options?: SpawnOptions }>): Promise<JobResult[]> {
  // TODO: sequentially run jobs with spawnJob, stop on first failure
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const results = await runPipeline([
    { command: 'node', args: ['-v'] },
    { command: 'node', args: ['-p', 'process.platform'] },
  ]);
  console.log(results);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch((error) => {
    console.error('Run failed', error);
    process.exitCode = 1;
  });
}
