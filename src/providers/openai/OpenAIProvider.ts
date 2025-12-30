import type { TextProvider } from '../../interfaces/TextProvider.js';
import type { ImageProvider } from '../../interfaces/ImageProvider.js';
import type { ProviderInfo } from '../../types/provider.js';
import type { ProviderCapabilities } from '../../types/capabilities.js';
import type { BaseProvider } from '../../interfaces/BaseProvider.js';
import type {
  TextGenerationOptions,
  TextGenerationResult,
} from '../../types/text.js';
import type {
  ImageGenerationOptions,
  ImageVariationOptions,
  ImageGenerationResult,
} from '../../types/image.js';
import { HttpClient } from '../../infrastructure/HttpClient.js';

interface OpenAICompletionResponse {
  id: string;
  output: Array<{
    content: {
      type: string;
      text: string;
      annotations: any;
    }[]
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}

interface OpenAIImageResponse {
  created: number;
  data: Array<{
    url?: string;
    b64_json?: string;
    revised_prompt?: string;
  }>;
}

export class OpenAIProvider implements BaseProvider {
  public readonly name = 'openai';
  public readonly capabilities: ProviderCapabilities = {
    text: true,
    image: true,
    streaming: false,
    async: false,
  };

  public readonly text: TextProvider;
  public readonly image: ImageProvider;

  private httpClient: HttpClient;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.openai.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.httpClient = new HttpClient();

    this.text = {
      generateText: (options) => this.generateTextInternal(options),
      retrieveSingleResponse: (responseId, queryParams) => this.retrieveResponse(responseId, queryParams),
      deleteSingleResponse: (responseId) => this.deleteResponse(responseId),
      cancelSingleResponse: (responseId) => this.cancelResponse(responseId),
    };

    this.image = {
      generateImage: (options) => this.generateImageInternal(options),
      generateImageVariation: (options) => this.generateImageVariationInternal(options),
    };
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: this.name,
      capabilities: this.capabilities,
    };
  }

  private async generateTextInternal(
    options: TextGenerationOptions
  ): Promise<TextGenerationResult> {
    const model = options?.model || 'gpt-4';
    const endpoint = `${this.baseUrl}/responses`;

    const body = {
      ...options,
      model
    };

    const startTime = Date.now();
    const response = await this.httpClient.post<OpenAICompletionResponse>(
      endpoint,
      body,
      {
        Authorization: `Bearer ${this.apiKey}`,
      }
    );
    const endTime = Date.now();

    const choice = response.output[0];
    const text = choice?.content?.[0]?.text || '';

    return {
      text,
      metadata: {
        model: response.model,
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
        latencyMs: endTime - startTime,
        providerResponse: response,
      },
    };
  }

  private async generateImageInternal(
    options: ImageGenerationOptions
  ): Promise<ImageGenerationResult> {
    const model = options?.model || 'dall-e-2';
    const endpoint = `${this.baseUrl}/images/generations`;

    // Map strict options to request body
    const body = {
      ...options,
      model,
    };

    const startTime = Date.now();
    const response = await this.httpClient.post<OpenAIImageResponse>(
      endpoint,
      body,
      {
        Authorization: `Bearer ${this.apiKey}`,
      }
    );
    const endTime = Date.now();

    return {
      images: response.data.map((item) => ({
        url: item.url,
        b64_json: item.b64_json,
      })),
      metadata: {
        model,
        latencyMs: endTime - startTime,
        providerResponse: response,
      },
    };
  }

  private async generateImageVariationInternal(
    options: ImageVariationOptions
  ): Promise<ImageGenerationResult> {
    const endpoint = `${this.baseUrl}/images/variations`;

    const body = new FormData();
    // Append extra keys if needed (excluding typed ones handled above)
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof Blob || value instanceof File) {
          body.append(key, value);
        } else {
          body.append(key, String(value));
        }
      }
    });

    const startTime = Date.now();
    const response = await this.httpClient.post<OpenAIImageResponse>(
      endpoint,
      body,
      {
        Authorization: `Bearer ${this.apiKey}`,
      }
    );
    const endTime = Date.now();

    return {
      images: response.data.map((item) => ({
        url: item.url,
        b64_json: item.b64_json,
      })),
      metadata: {
        model: options?.model as string || 'dall-e-2',
        latencyMs: endTime - startTime,
        providerResponse: response,
      },
    };
  }
  /**
   * Retrieve a previous response by ID.
   * @param responseId The ID of the response to retrieve (e.g., resp_123).
   * @param queryParams Optional query parameters.
   */
  private async retrieveResponse(
    responseId: string,
    queryParams?: Record<string, any>
  ): Promise<any> {
    const endpoint = `${this.baseUrl}/responses/${responseId}`;

    const startTime = Date.now();
    const response = await this.httpClient.get<OpenAICompletionResponse>(
      endpoint,
      queryParams,
      {
        Authorization: `Bearer ${this.apiKey}`,
      }
    );
    const endTime = Date.now();

    return {
      ...response,
      metadata: {
        latencyMs: endTime - startTime,
        providerResponse: response,
      },
    };
  }

  private async deleteResponse(
    responseId: string
  ): Promise<any> {
    const endpoint = `${this.baseUrl}/responses/${responseId}`;
    return this.httpClient.delete(endpoint, {
      Authorization: `Bearer ${this.apiKey}`,
    });
  }

  private async cancelResponse(
    responseId: string
  ): Promise<any> {
    const endpoint = `${this.baseUrl}/responses/${responseId}/cancel`;
    // Empty body for cancel
    return this.httpClient.post(endpoint, {}, {
      Authorization: `Bearer ${this.apiKey}`,
    });
  }
}
