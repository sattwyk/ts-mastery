/**
 * Kata: TypedArray Pixel Buffer
 * Level: Beginner
 * Topics: TypedArrays, ArrayBuffer, DataView, clamped writes
 *
 * Scenario:
 *   Implement a tiny in-memory framebuffer for RGBA pixels using Uint8ClampedArray.
 *   You must understand how TypedArrays share an ArrayBuffer and how to derive
 *   views for different purposes (raw data vs per-channel).
 *
 * Relevant docs: https://nodejs.org/docs/latest-v24.x/api/buffer.html#typedarray-objects
 *
 * Tasks:
 *   1. Implement createPixelBuffer to allocate a single ArrayBuffer and expose
 *      typed views for bytes + DataView for metadata.
 *   2. Implement drawHorizontalLine to write pixel values efficiently.
 *   3. Implement extractChannel to return a Float32Array normalized between 0-1.
 */

export interface PixelBuffer {
  readonly width: number;
  readonly height: number;
  readonly buffer: ArrayBuffer;
  readonly pixels: Uint8ClampedArray;
  readonly view: DataView;
}

export interface RgbaColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

export function createPixelBuffer(width: number, height: number): PixelBuffer {
  // TODO: allocate ArrayBuffer width*height*4 and save typed views
  throw new Error('Not implemented');
}

export function drawHorizontalLine(target: PixelBuffer, y: number, color: RgbaColor): void {
  // TODO: use TypedArray methods to fill one row without loops per channel
  throw new Error('Not implemented');
}

export function extractChannel(target: PixelBuffer, channel: keyof RgbaColor): Float32Array {
  // TODO: iterate underlying pixels and normalize to Float32Array values [0,1]
  throw new Error('Not implemented');
}

export async function demo(): Promise<void> {
  const fb = createPixelBuffer(4, 2);
  drawHorizontalLine(fb, 1, { r: 255, g: 0, b: 0, a: 255 });
  console.log(extractChannel(fb, 'r'));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch((error) => {
    console.error('Demo failed', error);
    process.exitCode = 1;
  });
}
