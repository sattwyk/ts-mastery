/**
 * Kata: Crypto Sealed Box
 * Level: Intermediate
 * Topics: node:crypto, Ed25519 signing, XChaCha20-Poly1305 (via libsodium style), subtle crypto
 *
 * Scenario:
 *   Implement helpers to sign payloads, verify signatures, and encrypt data with
 *   AES-256-GCM using the built-in `crypto` module. Practice handling Buffers vs
 *   Uint8Array and encoding/decoding base64url tokens.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/crypto.html
 *
 * Tasks:
 *   1. Implement generateIdentity to create an Ed25519 key pair.
 *   2. Implement signPayload / verifyPayload to wrap crypto.sign/verify.
 *   3. Implement sealData / openData using random iv + auth tag.
 *   4. Compose everything into a sealed box token: header.payload.signature (base64url).
 */

import {
  randomBytes,
  createSign,
  createVerify,
  createCipheriv,
  createDecipheriv,
  KeyObject,
  generateKeyPairSync,
} from 'node:crypto';

export interface Identity {
  publicKey: KeyObject;
  privateKey: KeyObject;
}

export function generateIdentity(): Identity {
  // TODO: use generateKeyPairSync('ed25519')
  throw new Error('Not implemented');
}

export function signPayload(privateKey: KeyObject, payload: Buffer): Buffer {
  // TODO: createSign('SHA512') is unnecessary for ed25519; use sign(null,...)
  throw new Error('Not implemented');
}

export function verifyPayload(publicKey: KeyObject, payload: Buffer, signature: Buffer): boolean {
  // TODO: verify using createVerify or crypto.verify
  throw new Error('Not implemented');
}

export interface SealResult {
  ciphertext: Buffer;
  authTag: Buffer;
  iv: Buffer;
}

export function sealData(secret: Buffer, plaintext: Buffer): SealResult {
  // TODO: AES-256-GCM: random 12 byte IV, append authTag
  throw new Error('Not implemented');
}

export function openData(secret: Buffer, sealed: SealResult): Buffer {
  // TODO: decrypt and verify tag
  throw new Error('Not implemented');
}

export interface SealedToken {
  header: string;
  payload: string;
  signature: string;
}

export function encodeToken(parts: SealedToken): string {
  // TODO: base64url encode join with '.'
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const id = generateIdentity();
  const message = Buffer.from('hello crypto');
  const sig = signPayload(id.privateKey, message);
  console.log('signature valid?', verifyPayload(id.publicKey, message, sig));
}
