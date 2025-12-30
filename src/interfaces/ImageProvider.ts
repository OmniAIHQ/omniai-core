import type {
  ImageGenerationOptions,
  ImageGenerationResult,
  ImageVariationOptions,
} from '../types/image.js';

// ImageProvider is now a namespaced interface, not extending BaseProvider directly
export interface ImageProvider {
  /**
   * Generate an image from a text prompt.
   * @param options Configuration options for generation.
   */
  generateImage(
    options: ImageGenerationOptions
  ): Promise<ImageGenerationResult>;

  /**
   * Generate a variation of an existing image.
   * @param options Configuration options including the image file.
   */
  generateImageVariation(
    options: ImageVariationOptions
  ): Promise<ImageGenerationResult>;
}
