import type { ProviderCapabilities } from './capabilities.js';

/**
 * Unique identifier for a provider.
 * Open-ended string to allow for custom providers.
 */
export type ProviderName = string;

/**
 * Basic information about a provider.
 */
export interface ProviderInfo {
  name: ProviderName;
  version?: string;
  capabilities: ProviderCapabilities;
}
