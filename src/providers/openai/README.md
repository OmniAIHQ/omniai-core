# OpenAI Provider

This provider implements the unified AI interface for OpenAI, exposing capabilities through namespaced APIs for text and image generation.

## Configuration

To initialize the provider, use the factory method:

```typescript
import { OmniAIProvider } from '@omniaihq/core';

const openai = OmniAIProvider.openAI('sk-your-api-key');
```

## Usage

### Text Generation

Use the `text` namespace for text operations.

```typescript
const result = await openai.text.generateText({
  input: 'Hello, world!',
  model: 'gpt-4',
  temperature: 0.7
});

console.log(result.text);
```

### Image Generation

Use the `image` namespace for image operations.

```typescript
const result = await openai.image.generateImage({
  prompt: 'A futuristic city',
  model: 'dall-e-3',
  size: '1024x1024'
});

console.log(result.images[0].url);
```

### Image Variation

Generate variations of an existing image (requires `dall-e-2`).

```typescript
// Assuming you have a File object (e.g., from an input)
const file = new File(['...'], 'image.png', { type: 'image/png' });

const result = await openai.image.generateImageVariation({
  image: file,
  n: 2,
  size: '1024x1024'
});
```

## Supported Capabilities

| Capability | Status | Method |
| --- | --- | --- |
| **Text Generation** | ✅ | `openai.text.generateText` |
| **Image Generation** | ✅ | `openai.image.generateImage` |
| **Image Variation** | ✅ | `openai.image.generateImageVariation` |
| **Streaming** | ❌ | Not yet |
| **Audio** | ❌ | No |

## Model Support

You can pass any model supported by OpenAI. Common defaults:
- **Text**: `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`
- **Image**: `dall-e-2`, `dall-e-3`

## Options Mapping

Generic options are mapped to OpenAI's API parameters:

| Generic Option | OpenAI Parameter |
| --- | --- |
| `input` | `messages` (mapped to user role) |
| `temperature` | `temperature` |
| `maxTokens` | `max_tokens` |
| `topP` | `top_p` |
| `stopSequences` | `stop` |
