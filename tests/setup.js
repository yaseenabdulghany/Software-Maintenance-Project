import { randomUUID, webcrypto } from 'node:crypto'
import { TextDecoder, TextEncoder } from 'node:util'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = randomUUID
}

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder
}
