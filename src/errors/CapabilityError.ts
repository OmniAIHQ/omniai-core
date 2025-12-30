import { OmniAIError } from './OmniAIError.js';

export class CapabilityError extends OmniAIError {
  constructor(providerName: string, capability: string) {
    super(
      `Provider '${providerName}' does not support capability '${capability}'.`,
      'CAPABILITY_NOT_SUPPORTED',
      { providerName, capability }
    );
    this.name = 'CapabilityError';
    Object.setPrototypeOf(this, CapabilityError.prototype);
  }
}
