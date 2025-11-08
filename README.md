## TypeScript Node.js Katas

Hands-on exercises that move from Node fundamentals (buffers, events) to advanced runtime topics (async iterators, HTTPS, DNS caching, event loop tracing, memory management). Every kata lives in `src/katas` and is a self-contained TypeScript file with TODOs, guidance, and a tiny `demo()` you can run with `tsx`.

### Getting Started

1. Install deps (already done in this workspace): `pnpm install`.
2. Pick a kata from the catalog below.
3. Open the file, read the scenario + tasks, and start replacing the `throw new Error('Not implemented')` placeholders.
4. Use `pnpm tsx <path-to-kata>` to manually exercise the demo or create your own unit tests with `node:test`.
5. Keep the official Node.js v24 docs handy: https://nodejs.org/docs/latest-v24.x/api/index.html.

Example:

```bash
pnpm tsx src/katas/beginner/buffer-packet-builder.ts
```

Browse everything interactively with Ink:

```bash
pnpm cli
```

### Catalog

| ID                       | Title                    | Difficulty   | Key Topics                              | File                                                 |
| ------------------------ | ------------------------ | ------------ | --------------------------------------- | ---------------------------------------------------- |
| symbol-registry          | Symbol Metadata Registry | Beginner     | Symbols, hidden metadata                | `src/katas/beginner/symbol-registry.ts`              |
| typedarray-pixel-buffer  | TypedArray Pixel Buffer  | Beginner     | TypedArrays, ArrayBuffer                | `src/katas/beginner/typedarray-pixel-buffer.ts`      |
| buffer-packet-builder    | Binary Packet Builder    | Beginner     | Buffers, binary protocols               | `src/katas/beginner/buffer-packet-builder.ts`        |
| typed-event-bus          | Typed Event Bus          | Beginner     | EventEmitter, generics                  | `src/katas/beginner/event-bus.ts`                    |
| async-log-stream         | Async Log Streamer       | Intermediate | Async iterators, streams                | `src/katas/intermediate/async-log-stream.ts`         |
| dns-cache                | DNS Cache Resolver       | Intermediate | DNS, caching, AbortController           | `src/katas/intermediate/dns-cache.ts`                |
| net-tcp-chat             | TCP Chat Harness         | Intermediate | `net` module, sockets                   | `src/katas/intermediate/net-tcp-chat.ts`             |
| fs-atomic-journal        | Atomic Journal Writer    | Intermediate | `fs`, atomic writes                     | `src/katas/intermediate/fs-atomic-journal.ts`        |
| crypto-sealed-box        | Crypto Sealed Box        | Intermediate | `crypto`, signing, AES-GCM              | `src/katas/intermediate/crypto-sealed-box.ts`        |
| stream-metrics-transform | Stream Metrics Transform | Intermediate | Node Streams, backpressure              | `src/katas/intermediate/stream-metrics-transform.ts` |
| url-sanitizer            | URL Sanitizer            | Intermediate | WHATWG URL, URLPattern                  | `src/katas/intermediate/url-sanitizer.ts`            |
| async-context-tracer     | Async Context Tracer     | Intermediate | AsyncLocalStorage, diagnostics_channel  | `src/katas/intermediate/async-context-tracer.ts`     |
| child-process-runner     | Child Process Sandbox Runner | Intermediate | child_process, signals                  | `src/katas/intermediate/child-process-runner.ts`     |
| https-health-check       | HTTPS Health Check       | Advanced     | HTTPS, streaming, concurrency           | `src/katas/advanced/https-health-check.ts`           |
| event-loop-lab           | Event Loop Lab           | Advanced     | Event loop, microtasks                  | `src/katas/advanced/event-loop-lab.ts`               |
| memory-pool              | Buffer Pool + Finalizer  | Advanced     | Memory management, FinalizationRegistry | `src/katas/advanced/memory-pool.ts`                  |
| udp-heartbeat-monitor    | UDP Heartbeat Monitor    | Advanced     | UDP, dgram                              | `src/katas/advanced/udp-heartbeat-monitor.ts`        |
| timer-wheel              | Timer Wheel Scheduler    | Advanced     | Timers, scheduling                      | `src/katas/advanced/timer-wheel.ts`                  |
| http2-push-cache         | HTTP/2 Push Cache        | Advanced     | HTTP/2, TLS, caching                    | `src/katas/advanced/http2-push-cache.ts`             |
| clustered-signal-server  | Clustered Signal-Aware HTTP Server  | Advanced     | cluster, signals                        | `src/katas/advanced/clustered-signal-server.ts`      |
| worker-pool              | Worker Thread Pool       | Advanced     | Worker threads, pooling                 | `src/katas/advanced/worker-pool.ts`                  |
| web-streams-adapter      | Web Streams Adapter      | Advanced     | Web Streams, fetch                      | `src/katas/advanced/web-streams-adapter.ts`          |

Each kata documents its objectives and contains guidance comments so you can focus on the implementation details that matter for that topic.
