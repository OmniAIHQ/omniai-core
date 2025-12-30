import { OmniAIError } from './OmniAIError.js';

export class ProviderNotSupportedError extends OmniAIError {
  constructor(providerName: string) {
    super(
      `Provider '${providerName}' is not supported or not registered.`,
      'PROVIDER_NOT_SUPPORTED',
      { providerName }
    );
    this.name = 'ProviderNotSupportedError';
    Object.setPrototypeOf(this, ProviderNotSupportedError.prototype);
  }
}
