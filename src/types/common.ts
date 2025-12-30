export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

/**
 * Generic configuration object for providers.
 */
export type ProviderConfig = JSONObject;

/**
 * Common metadata associated with generated content.
 */
export interface GenerationMetadata {
  /**
   * The model used for generation.
   */
  model: string;
  /**
   * Token usage statistics, if available.
   */
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  /**
   * Latency in milliseconds.
   */
  latencyMs?: number;
  /**
   * Provider-specific raw response data.
   */
  providerResponse?: unknown;
}
