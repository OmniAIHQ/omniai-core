import type {
  TextGenerationOptions,
  TextGenerationResult,
} from '../types/text.js';

// TextProvider is now a namespaced interface, not extending BaseProvider directly
export interface TextProvider {
  /**
   * Generate text from a prompt.
   * @param options Configuration options for generation.
   */
  generateText(
    options: TextGenerationOptions
  ): Promise<TextGenerationResult>;
}
