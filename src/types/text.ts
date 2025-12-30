import type { GenerationMetadata, JSONValue } from './common.js';

type ChatGPTModel = 'gpt-4.1' | 'gpt-4.1-mini' | 'gpt-4o' | 'gpt-4o-mini' | 'o4-mini'

export interface TextGenerationOptions {
  model?: ChatGPTModel;
  input: any;
  /**
   * Additional provider-specific parameters.
   */
  [key: string]: JSONValue | undefined;
}

export interface TextGenerationResult {
  text: string;
  metadata: GenerationMetadata;
}