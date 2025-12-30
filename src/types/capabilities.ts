/**
 * detailed capabilities of a provider.
 */
export interface ProviderCapabilities {
  /**
   * Can generate text from text prompts.
   */
  text: boolean;
  /**
   * Can generate images from text prompts.
   */
  image: boolean;
  /**
   * Can accept image inputs (multimodal).
   */
  vision?: boolean;
  /**
   * Can generate or process audio.
   */
  audio?: boolean;
  /**
   * Supports streaming responses.
   */
  streaming?: boolean;
  /**
   * Supports asynchronous job-based generation.
   */
  async?: boolean;
}
