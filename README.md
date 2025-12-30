# @omniaihq/core

The foundational TypeScript library for the OmniAI platform. This repository provides the core contracts, interfaces, and types for building provider-agnostic AI applications.

## Purpose

`@omniaihq/core` acts as the stable backbone for the OmniAI ecosystem. It defines **what** an AI provider is and **how** it behaves, without containing any specific provider logic itself. This ensures that application code can be written against these standard interfaces and switched between providers (OpenAI, Anthropic, Gemini, etc.) with zero code changes.

## Installation

```bash
npm install @omniaihq/core
```

## Design Philosophy

- **Interface-First**: We define the contract before the implementation.
- **Provider-Agnostic**: No provider-specific types or logic leak into the core.
- **Capability-Driven**: Providers declare what they can do (text, image, streaming, etc.), allowing applications to dynamically adapt.
- **Zero-Runtime**: This library is lightweight and primarily composed of types and simple utility classes.

## Features

- **Standardized Interfaces**: `TextProvider`, `ImageProvider`, etc.
- **Capability System**: Granular control over provider features.
- **Factory Pattern**: `ProviderFactory` for managing multiple provider instances.
- **Typed Errors**: robust error handling with `OmniAIError`.

## Usage

### 1. Connecting a Provider

Use the `OmniAIProvider` to create instances of supported providers. You do not need to install separate packages or SDKs.

```typescript
import { OmniAIProvider } from '@omniaihq/core';

// Create an OpenAI provider instance
const openai = OmniAIProvider.openAI(process.env.OPENAI_API_KEY!);

// You can now use this instance as a standard TextProvider
```

### 2. Generating Text

```typescript
// Define your standard generation options
const result = await openai.text.generateText({
  input: 'Hello, world!',
  model: 'gpt-4',
  temperature: 0.7
});

console.log(result.text);
// Output: "Why did the unicorn..."

console.log('Metadata:', result.metadata);
// Output: { latencyMs: 450, usage: { ... } }
```

## Supported Providers

| Provider | Key | Features | Docs |
| --- | --- | --- | --- |
| **OpenAI** | `openai` | Text | [Read Docs](./src/providers/openai/README.md) |

## License

Apache License, Version 2.0
