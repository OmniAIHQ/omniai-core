import type { BaseProvider } from '../interfaces/BaseProvider.js';
import { ProviderNotSupportedError } from '../errors/ProviderNotSupportedError.js';
import { OpenAIProvider } from '../providers/openai/OpenAIProvider.js';

export class OmniAIProvider {
  private providers = new Map<string, BaseProvider>();

  /**
   * Register a new provider instance.
   * @param provider The provider instance to register.
   */
  registerProvider(provider: BaseProvider): void {
    this.providers.set(provider.name, provider);
  }

  /**
   * Retrieve a registered provider by name.
   * @param name The name of the provider to retrieve.
   * @returns The requested provider instance.
   * @throws ProviderNotSupportedError if the provider is not found.
   */
  getProvider(name: string): BaseProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new ProviderNotSupportedError(name);
    }
    return provider;
  }

  /**
   * Get a list of all registered provider names.
   */
  getRegisteredProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Remove a provider from the registry.
   */
  unregisterProvider(name: string): boolean {
    return this.providers.delete(name);
  }

  /**
   * Helper to create and return an OpenAI provider.
   * Note: This does not automatically register it in the factory instance,
   * but returns it for usage or manual registration.
   * @param apiKey The OpenAI API key.
   * @returns The created OpenAIProvider instance.
   */
  static openAI(apiKey: string): OpenAIProvider {
    return new OpenAIProvider(apiKey);
  }
}
