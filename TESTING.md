# Local Testing Guide

This guide describes how to link `@omniaihq/core` to another repository locally for testing and development.

## Prerequisites

1.  Ensure you have built the project:
    ```bash
    npm run build
    ```
    *Note: You must rebuild this package every time you change its source code, or the consumer app won't see the changes.*

## Method 1: npm link (Recommended for active dev)

This creates a symbolic link from your global npm cache to this project.

1.  **In `omniai-core` directory:**
    ```bash
    # Create the global link
    npm link
    ```

2.  **In your consumer application directory:**
    ```bash
    # Link to the global package
    npm link @omniaihq/core --legacy-peer-deps
    ```

3.  **To Unlink (when done):**
    ```bash
    # In consumer app
    npm unlink @omniaihq/core
    # Reinstall standard version
    npm install
    
    # In omniai-core
    npm unlink
    ```

## Method 2: Relative Install (Simple)

This installs the package directly from the file system.

1.  **In your consumer application directory:**
    ```bash
    npm install /path/to/OmniAI/omniai-core
    ```
    
    *Example:*
    ```bash
    npm install ../omniai-core
    ```

## Troubleshooting

### "Module not found" or old code?
If you don't see your changes:
1.  Did you run `npm run build` in `omniai-core`?
2.  Did you restart your consumer app's dev server? (Vite/Next.js often cache dependencies).
3.  Try deleting `node_modules/.vite` in the consumer app.

### TypeScript Errors in Consumer?
If your consumer app has `skipLibCheck: false`, it might strictly check generated declaration files.
Ensure `omniai-core` is built successfully with valid `.d.ts` files in `./dist`.
