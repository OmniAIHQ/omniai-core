import { OmniAIError } from '../errors/OmniAIError.js';

export class HttpClient {
  /**
   * Performs a GET request to the specified URL.
   * @param url The endpoint URL.
   * @param params Optional query parameters.
   * @param headers Optional headers.
   * @returns The parsed JSON response.
   */
  async get<T>(
    url: string,
    params: Record<string, unknown> = {},
    headers: Record<string, string> = {}
  ): Promise<T> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });

    const queryString = query.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        await this.handleError(response);
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

  /**
   * Performs a DELETE request to the specified URL.
   * @param url The endpoint URL.
   * @param headers Optional headers.
   * @returns The parsed JSON response.
   */
  async delete<T>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        await this.handleError(response);
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
        await this.handleError(response);
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

  private async handleError(response: Response): Promise<never> {
    let errorDetails: unknown;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = await response.text();
    }

    let errorMessage = `HTTP Request Failed: ${response.status} ${response.statusText}`;

    if (typeof errorDetails === 'object' && errorDetails !== null) {
      const details = errorDetails as Record<string, unknown>;
      if ('error' in details) {
        const providerError = details.error;
        if (typeof providerError === 'object' && providerError !== null) {
          const pErr = providerError as Record<string, unknown>;
          if (typeof pErr.message === 'string') {
            errorMessage = pErr.message;
          }
        } else if (typeof providerError === 'string') {
          errorMessage = providerError;
        }
      } else if ('message' in details) {
        if (typeof details.message === 'string') {
          errorMessage = details.message;
        }
      }
    }

    throw new OmniAIError(errorMessage, 'HTTP_ERROR', {
      status: response.status,
      statusText: response.statusText,
      details: errorDetails,
    });
  }
}
