/**
 * Kata: TCP Chat Harness
 * Level: Intermediate
 * Topics: node:net, sockets, broadcasting, backpressure, graceful shutdown
 *
 * Scenario:
 *   Implement a minimal TCP chat server using the `net` module. Clients can JOIN,
 *   SAY <message>, and QUIT. Messages must be relayed to connected peers except
 *   the originator. Add timeouts for idle clients.
 *
 * Protocol:
 *   - `JOIN <nickname>\n` registers/updates a user's nickname (must precede SAY).
 *   - `SAY <message>\n` broadcasts the message verbatim to all other sockets.
 *   - `QUIT\n` ends the session gracefully.
 *   - Unrecognized commands should elicit an error line and keep the socket alive.
 *   - Normalize CRLF line endings (`\r\n`) so Windows telnet/netcat clients work, e.g.
 *       `buffer += chunk.toString('utf8').replace(/\r\n?/g, '\n');`
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/net.html
 *
 * Tasks:
 *   1. Implement startChatServer to listen on a port and manage client sockets.
 *   2. Parse simple line-based commands and broadcast messages.
 *   3. Handle socket errors/end events to avoid leaking listeners.
 */

import { createServer, Socket } from 'node:net';
import { once } from 'node:events';

export interface ChatServer {
  readonly port: number;
  close(): Promise<void>;
}

interface Client {
  readonly id: string;
  readonly socket: Socket;
  nickname: string;
}

export interface StartOptions {
  readonly host?: string;
  readonly port?: number;
  readonly idleTimeoutMs?: number;
}

export function startChatServer(options: StartOptions = {}): ChatServer {
  // TODO: createServer, track clients, assign IDs, support JOIN/SAY/QUIT commands
  throw new Error('Not implemented');
}

export function broadcast(sender: Client, clients: Map<string, Client>, message: string): void {
  // TODO: write to all sockets except sender, respecting write() backpressure
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const server = startChatServer({ port: 0 });
  await once(server as unknown as NodeJS.EventEmitter, 'ready').catch(() => undefined);
  console.log(`Chat server listening on ${server.port}`);
  setTimeout(() => server.close(), 2000);
}
