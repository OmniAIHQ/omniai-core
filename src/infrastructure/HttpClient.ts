import { OmniAIError } from '../errors/OmniAIError.js';

export class HttpClient {
  /**
   * Performs a POST request to the specified URL.
   * @param url The endpoint URL.
   * @param body The JSON body payload.
   * @param headers Optional headers.
   * @returns The parsed JSON response.
   */
  async post<T>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {}
  ): Promise<T> {
    try {
      const isFormData = body instanceof FormData;
      const defaultHeaders: Record<string, string> = isFormData
        ? {}
        : { 'Content-Type': 'application/json' };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        body: isFormData ? (body as BodyInit) : JSON.stringify(body),
      });

      if (!response.ok) {
        let errorDetails: unknown;
        try {
          errorDetails = await response.json();
        } catch {
          errorDetails = await response.text();
        }

        let errorMessage = `HTTP Request Failed: ${response.status} ${response.statusText}`;

        if (
          typeof errorDetails === 'object' &&
          errorDetails !== null &&
          'error' in errorDetails
        ) {
          const providerError = (errorDetails as any).error;
          if (typeof providerError === 'object' && providerError?.message) {
            errorMessage = providerError.message;
          } else if (typeof providerError === 'string') {
            errorMessage = providerError;
          }
        } else if (
          typeof errorDetails === 'object' &&
          errorDetails !== null &&
          'message' in (errorDetails as any)
        ) {
          errorMessage = (errorDetails as any).message;
        }

        throw new OmniAIError(errorMessage, 'HTTP_ERROR', {
          status: response.status,
          statusText: response.statusText,
          details: errorDetails,
        });
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof OmniAIError) {
        throw error;
      }
      throw new OmniAIError(
        `Network Error: ${(error as Error).message}`,
        'NETWORK_ERROR',
        error
      );
    }
  }
}
