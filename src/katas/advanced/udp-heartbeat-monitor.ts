/**
 * Kata: UDP Heartbeat Monitor
 * Level: Advanced
 * Topics: node:dgram, UDP sockets, message framing, retries, AbortController
 *
 * Scenario:
 *   Implement a monitor that sends heartbeat pings to multiple services via UDP,
 *   waits for pong responses, and marks nodes as unhealthy after configurable
 *   timeouts. Practice working with Buffer offsets and socket lifecycle.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/dgram.html
 *
 * Tasks:
 *   1. Implement createHeartbeatPacket to encode nodeId + timestamp.
 *   2. Implement sendHeartbeatRound that sends packets to every peer and awaits replies.
 *   3. Implement monitorLoop that repeatedly calls sendHeartbeatRound with AbortSignal.
 */

import { createSocket, RemoteInfo } from 'node:dgram';

export interface Peer {
  readonly host: string;
  readonly port: number;
  readonly id: string;
}

export interface HeartbeatResult {
  readonly peer: Peer;
  readonly rttMs: number | null;
  readonly error?: Error;
}

export function createHeartbeatPacket(peerId: string, now = Date.now()): Buffer {
  // TODO: allocate Buffer, write timestamp (BigInt64) + peerId length
  throw new Error('Not implemented');
}

export async function sendHeartbeatRound(
  peers: readonly Peer[],
  timeoutMs = 500,
): Promise<HeartbeatResult[]> {
  // TODO: create UDP socket, send packets, listen for responses, enforce timeout per peer
  throw new Error('Not implemented');
}

export async function monitorLoop(
  peers: readonly Peer[],
  intervalMs: number,
  onResult: (result: HeartbeatResult) => void,
  signal?: AbortSignal,
): Promise<void> {
  // TODO: run sendHeartbeatRound in a loop until aborted
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const peers: Peer[] = [{ host: '127.0.0.1', port: 9000, id: 'local' }];
  setTimeout(() => process.exit(0), 2000);
  await monitorLoop(peers, 1000, (result) => console.log(result));
}
