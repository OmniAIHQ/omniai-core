import type { ProviderInfo, ProviderName } from '../types/provider.js';
import type { ProviderCapabilities } from '../types/capabilities.js';

export interface BaseProvider {
  /**
   * Unique name of the provider.
   */
  readonly name: ProviderName;

  /**
   * Capabilities supported by this provider instance.
   */
  readonly capabilities: ProviderCapabilities;

  /**
   * Get immutable provider information.
   */
  getProviderInfo(): ProviderInfo;
}
