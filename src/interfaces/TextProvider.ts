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

  /**
   * Retrieve a response by its ID.
   * @param responseId The ID of the response to retrieve (e.g., resp_123).
   * @param queryParams Optional query parameters.
   */
  retrieveSingleResponse(
    responseId: string,
    queryParams?: Record<string, any>
  ): Promise<any>;

  /**
   * Delete a response by its ID.
   * @param responseId The ID of the response to delete.
   */
  deleteSingleResponse?(
    responseId: string
  ): Promise<any>;

  /**
   * Cancel a running response generation.
   * @param responseId The ID of the response to cancel.
   */
  cancelSingleResponse?(
    responseId: string
  ): Promise<any>;
}
