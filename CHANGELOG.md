# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-12-30

### Changed
- **BREAKING**: Refactored API to use namespaces (`openai.text`, `openai.image`) instead of flat methods.
- Updated `HttpClient` to support `GET`, `DELETE`, and `FormData` requests.
- Renamed response management methods to `retrieveSingleResponse`, `deleteSingleResponse`, `cancelSingleResponse` for clarity.

### Added
- Initial release of `@omniaihq/core`.
- Implemented `OpenAIProvider` with direct HTTP calls (removing external dependencies).
- Added text and image generation interfaces (`TextProvider`, `ImageProvider`) and implementation.
- Added Image Variation support.
- Added Response Management (Retrieve, Delete, Cancel).
- Defined base provider interfaces (`BaseProvider`) and capability flags.
- Implemented `ProviderFactory` (now `OmniAIProvider`) for dynamic provider registration.
- Added custom error types (`OmniAIError`, etc.).
- Added Husky pre-commit hooks.
- Added Commitizen and Commitlint.
