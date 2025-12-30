# OpenAI Provider

This provider implements the `TextProvider` interface for OpenAI's `chat/completions` API.

## Configuration

To initialize the provider, use the factory method:

```typescript
import { OmniAIProvider } from '@omniaihq/core';

const openai = OmniAIProvider.openAI('sk-your-api-key');
```

## Supported Capabilities

- **Text Generation**: Yes (`generateText`)
- **Streaming**: Not yet
- **Images**: Not yet (Planned)
- **Audio**: No

## Model Support

You can pass any chat model name supported by OpenAI:
- `gpt-4` (default)
- `gpt-4-turbo`
- `gpt-3.5-turbo`

```typescript
const result = await openai.generateText('Hello', {
  model: 'gpt-3.5-turbo'
});
```

## Options Mapping

Standard options are mapped to OpenAI API parameters as follows:

| generic option | OpenAI Parameter |
| --- | --- |
| `temperature` | `temperature` |
| `maxTokens` | `max_tokens` |
| `topP` | `top_p` |
| `stopSequences` | `stop` |

Any extra parameters passed in the `options` object will strictly be ignored unless we add specific support for them in the `ProviderConfig`.
