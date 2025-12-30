import { OmniAIError } from '../errors/OmniAIError.js';

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new OmniAIError(message, 'ASSERTION_FAILED');
  }
}
