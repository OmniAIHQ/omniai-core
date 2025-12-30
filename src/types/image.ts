import type { GenerationMetadata, JSONValue } from './common.js';

export type OpenAIImageModel =
  | 'dall-e-2'
  | 'dall-e-3'
  | 'gpt-image-1'
  | 'gpt-image-1-mini'
  | 'gpt-image-1.5'
  | string;

export interface ImageGenerationOptions {
  model?: OpenAIImageModel;
  prompt: string;
  /**
   * Additional provider-specific parameters.
   */
  [key: string]: JSONValue | undefined;
}

export interface GeneratedImage {
  url?: string;
  b64_json?: string;
}

export interface ImageVariationOptions {
  image: Blob | Buffer;
  /**
   * Additional provider-specific parameters.
   */
  [key: string]: JSONValue | Blob | Buffer | undefined;
}

export interface ImageGenerationResult {
  images: GeneratedImage[];
  metadata: GenerationMetadata;
}
