# Contributing to OmniAI Core

Thank you for your interest in contributing to `@omniaihq/core`! functionality.

## Development Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/OmniAIHQ/omniai-core.git
    cd omniai-core
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # Initialize husky hooks
    npm run prepare
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```

## Development Workflow

1.  **Create a branch**:
    ```bash
    git checkout -b feat/my-new-feature
    ```

2.  **Make changes**:
    -   Ensure you follow the existing code style.
    -   Run linting: `npm run lint`.
    -   Check types: `npm run build`.

3.  **Commit changes**:
    We use **Conventional Commits**. Please use the commit helper:
    ```bash
    npm run commit
    ```
    Or ensure your manual commits follow the format: `type(scope): description`.
    -   `feat`: A new feature
    -   `fix`: A bug fix
    -   `docs`: Documentation only changes
    -   `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
    -   `refactor`: A code change that neither fixes a bug nor adds a feature
    -   `chore`: Changes to the build process or auxiliary tools

4.  **Push and PR**:
    Push your branch and open a Pull Request against `dev`.

## Project Structure

-   `src/interfaces/`: Core interfaces (`TextProvider`, `ImageProvider`).
-   `src/providers/`: Implementations of providers (e.g., `openai`).
-   `src/infrastructure/`: Shared utilities like `HttpClient`.
-   `src/factory/`: The main entry point factory.

## Testing

Currently, we rely on manual verification scripts (see `TESTING.md`) and static analysis (TypeScript/ESLint). Automated tests are coming soon.
