# AGENTS.md - copy-as-markdown

This file provides guidelines for AI agents working on this codebase.

## Build, Lint, and Test Commands

### Core Commands
- `npm run typecheck` - TypeScript type checking (tsc --noEmit)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run clean` - Clean build artifacts (dist/, build/, browser/dist/)

### TypeScript Compilation
- `npm run build:ts` - Compile TypeScript to dist/
- `npm run compile` - Compile for all browsers (Chrome, Firefox MV2, Firefox MV3)
- `npm run compile-chrome` - Chrome only
- `npm run compile-firefox-mv2` - Firefox MV2 only
- `npm run compile-firefox-mv3` - Firefox MV3 only

### Testing
- `npm test` - Run all unit tests (vitest run)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:unit` - Run unit tests only (--project unit)
- `npm run test:browser` - Run browser tests only (--project browser)
- `npm run test:e2e` - Run E2E tests (compiles + builds test extension + Playwright)
- `npm run test:e2e:headed` - Run E2E tests in headed mode
- `npm run test:e2e:debug` - Run E2E tests in debug mode
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI
- `npm run test:e2e:docker` - Run E2E tests in Docker (CI parity)
- `npm run test:all` - Run all tests (unit + E2E)

### Debugging
- `npm run debug-chrome` - Debug Chrome extension with auto-reload
- `npm run debug-edge` - Debug Edge extension with auto-reload
- `npm run debug-firefox-mv2` - Debug Firefox MV2 with auto-reload
- `npm run debug-firefox-mv3` - Debug Firefox MV3 with auto-reload
- `npm run debug-firefox-deved` - Debug Firefox Developer Edition with auto-reload

## Code Style Guidelines

### General Principles
- Write self-documenting code with clear intent
- Follow existing patterns in the codebase strictly
- Browser extensions have unique constraints - be mindful of browser API differences

### TypeScript Configuration
- Strict mode is enabled (see tsconfig.json)
- `noUnusedLocals: true` - Remove unused local variables
- `noUnusedParameters: true` - Remove unused function parameters
- `noUncheckedIndexedAccess: true` - Strict array/object access
- `noFallthroughCasesInSwitch: true` - No fallthrough in switch cases
- Use `.js` extension in imports (NodeNext module resolution)

### Naming Conventions
- **Interfaces**: PascalCase with prefix (e.g., `LinkExportOptions`, `ContextMenuHandler`)
- **Types**: PascalCase (e.g., `LinkExportFormat`, `TabListMenuId`)
- **Classes**: PascalCase (e.g., `LinkExportService`, `TabExportService`)
- **Functions/variables**: camelCase (e.g., `exportLink`, `renderCustomFormatLink`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TAB_LIST_MENU_ITEMS`)
- **Files**: kebab-case for source files (e.g., `link-export-service.ts`)

### Imports and Ordering
- Type imports use `import type { ... }`
- Value imports use `import { ... }`
- Import order: types first, then values
- Use `.js` extension for all relative imports

### Formatting
- Indent: 2 spaces
- Quotes: single quotes (`'`)
- Semicolons: yes
- Brace style: 1TBS with `allowSingleLine: true`
- Trailing commas: allowed

### Error Handling
- Use descriptive error messages that help debugging
- Throw `TypeError` for invalid argument combinations
- Throw `Error` for runtime validation failures
- Always validate function parameters explicitly
- Never suppress TypeScript errors with `as any`, `@ts-ignore`, or `@ts-expect-error`

### Documentation
- Document public APIs with JSDoc comments
- Include `@param` and `@returns` tags
- Document thrown errors with `@throws`
- Keep comments concise and meaningful
- Use TODO comments with issue references (e.g., `// TODO: #133`)

### Code Structure
- **Services**: Pure business logic + thin browser adapters (createBrowser* helpers)
- **Handlers**: Orchestrate user entry points (context menu, commands, messages)
- **UI Scripts**: Live under `src/ui` for popup/options pages
- **Static Assets**: Under `src/static`
- **Contracts**: Message/command type definitions in `src/contracts/`

### Browser Compatibility
- Support Chrome, Firefox MV2, Firefox MV3, Edge
- Use browser polyfill (`webextension-polyfill`) for cross-browser APIs
- Handle browser inconsistencies in platform-specific folders
- Chrome dist: `chrome/dist/`
- Firefox MV2 dist: `firefox-mv2/dist/`
- Firefox MV3 dist: `firefox-mv3/dist/`

### Testing Guidelines
- Unit tests: `test/**/*.test.ts`
- E2E tests: `test/e2e/` with Playwright
- Write tests for new features
- Run `npm run test:e2e` after changes to extension UI/clipboard flows
