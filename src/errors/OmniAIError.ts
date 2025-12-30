export class OmniAIError extends Error {
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, code = 'OMNIAI_ERROR', details?: unknown) {
    super(message);
    this.name = 'OmniAIError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, OmniAIError.prototype);
  }
}
