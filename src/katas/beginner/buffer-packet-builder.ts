/**
 * Kata: Binary Packet Builder
 * Level: Beginner
 * Topics: Node.js Buffers, byte fiddling, checksums
 *
 * Scenario:
 *   You have to build a simple binary protocol that wraps UTF-8 payloads
 *   with a 4-byte header and a 1-byte checksum. The header layout is:
 *     - bytes 0-1: payload byte length (uint16 big-endian)
 *     - byte 2: protocol version (0-255)
 *     - byte 3: flags bitmask (up to 8 flags)
 *
 * Goals:
 *   1. Practice Buffer allocation without using slow string joins.
 *   2. Learn how to read/write integers with specific endianness.
 *   3. Safely slice and copy Buffers without leaking references.
 *
 * Tasks:
 *   - fill in the TODOs for the functions below
 *   - keep the public function signatures intact; tests rely on them
 *   - avoid Buffer.concat inside tight loops; pre-allocate when possible
 *   - validate flags against FLAG_MAP; unknown flags should cause the packet to reject
 */

import { Buffer } from 'node:buffer';

export interface Packet {
  header: Buffer;
  payload: Buffer;
  checksum: number;
}

export interface PacketInfo {
  version: number;
  flags: number;
  message: string;
}

const FLAG_MAP = {
  ACK: 0b0000_0001,
  URGENT: 0b0000_0010,
  SIGNED: 0b0000_0100,
} as const;

/**
 * Build a 4 byte header with the following rules:
 *   - throw if payloadLength is not in [0, 0xffff]
 *   - version must be clamped between 0-255
 *   - flags is an array of keys from FLAG_MAP (throw Error if any flag is not a valid key)
 */
export function buildHeader(
  payloadLength: number,
  version: number,
  flags: Array<keyof typeof FLAG_MAP>,
): Buffer {
  // TODO: allocate a Buffer of length 4 and fill the bytes
  // HINT: validate all flags exist in FLAG_MAP before processing, throw if unknown
  // NOTE: network protocols typically encode integers in big-endian ("network byte order").
  throw new Error('Not implemented');
}

/**
 * Calculate an unsigned 8-bit checksum by XOR-ing every byte of header+payload.
 */
export function checksumPacket(packet: Pick<Packet, 'header' | 'payload'>): number {
  // TODO: iterate over both buffers without concatenating
  throw new Error('Not implemented');
}

/**
 * Create a packet from a UTF-8 message. Reuse buildHeader/checksumPacket.
 */
export function packMessage(info: PacketInfo): Packet {
  // TODO: allocate payload Buffer from info.message
  throw new Error('Not implemented');
}

/**
 * Reverse the pack operation. Validate length + checksum before returning.
 */
export function unpackMessage(buffer: Buffer): PacketInfo {
  // TODO: slice header/payload, verify checksum, reconstruct PacketInfo
  throw new Error('Not implemented');
}

/**
 * Example spec the tests will cover once you implement the functions.
 * Feel free to use it as a quick self-check by running `tsx ./src/katas/beginner/buffer-packet-builder.ts`.
 */
export async function demo(): Promise<void> {
  const sample = packMessage({
    version: 1,
    flags: ['ACK', 'SIGNED'],
    message: 'payload',
  });

  const result = unpackMessage(
    Buffer.concat([sample.header, sample.payload, Buffer.of(sample.checksum)]),
  );
  console.log(result);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch((error) => {
    console.error('Demo failed', error);
    process.exitCode = 1;
  });
}
