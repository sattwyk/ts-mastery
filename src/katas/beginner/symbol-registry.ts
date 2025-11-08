/**
 * Kata: Symbol Metadata Registry
 * Level: Beginner
 * Topics: Symbols, Symbol.for, hidden properties, reflection
 *
 * Scenario:
 *   Build a feature toggle system where metadata is tagged onto plain objects
 *   without risking collisions with user-defined keys. You must rely on Symbols
 *   (including the global registry) to create stable yet hidden keys.
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/globals.html#symbolfor-key
 *
 * Tasks:
 *   1. Implement createFeatureKey so that the same namespace+feature pair always
 *      returns the same symbol (even across modules) via Symbol.for.
 *   2. Implement attachMetadata to store arbitrary metadata on any target without
 *      making the property enumerable.
 *   3. Implement readMetadata to retrieve stored metadata without exposing internal
 *      bookkeeping objects.
 *   4. Implement listFeatureKeys to return all symbol keys from the given namespace.
 */

const DEFAULT_NAMESPACE = 'ts-mastery.symbols';

export interface FeatureMetadata {
  readonly description: string;
  readonly enabled: boolean;
}

/**
 * Deterministically create a symbol key scoped to the namespace + feature name.
 */
export function createFeatureKey(feature: string, namespace = DEFAULT_NAMESPACE): symbol {
  // TODO: combine namespace + feature into a cache-friendly string and call Symbol.for
  throw new Error('Not implemented');
}

/**
 * Attach metadata to the target using the provided symbol key.
 * Requirements:
 *   - define non-enumerable, writable, configurable property
 *   - avoid reusing the same metadata object reference if caller mutates it later
 */
export function attachMetadata<T extends object, TValue>(
  target: T,
  key: symbol,
  metadata: TValue,
): void {
  // TODO: use Object.defineProperty with proper descriptors
  throw new Error('Not implemented');
}

/**
 * Read metadata safely.
 * Requirements:
 *   - return undefined if missing
 *   - optionally allow a default factory to lazily create metadata
 */
export function readMetadata<TValue>(
  target: object,
  key: symbol,
  defaultFactory?: () => TValue,
): TValue | undefined {
  // TODO: peek at symbol property, call defaultFactory when provided
  throw new Error('Not implemented');
}

/**
 * List all feature keys stored on the target that belong to the namespace.
 */
export function listFeatureKeys(target: object, namespace = DEFAULT_NAMESPACE): symbol[] {
  // TODO: filter Object.getOwnPropertySymbols(target) by namespace prefix
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const key = createFeatureKey('beta-dashboard');
  const component = {};
  attachMetadata(component, key, { description: 'New dashboard', enabled: false });
  console.log(readMetadata(component, key));
  console.log(listFeatureKeys(component));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch((error) => {
    console.error('Demo failed', error);
    process.exitCode = 1;
  });
}
