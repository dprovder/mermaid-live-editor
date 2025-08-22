---
created: 2025-08-22T16:08:49Z
last_updated: 2025-08-22T16:08:49Z
version: 1.0
author: Claude Code PM System
---

# Project Style Guide

## Code Style & Standards

### TypeScript Guidelines

- **Strict Mode** - All TypeScript files use strict mode
- **Type Annotations** - Explicit types for function parameters and return values
- **Interface Over Type** - Prefer interfaces for object shapes, types for unions/primitives
- **No Any** - Avoid `any` type; use `unknown` or specific types
- **Consistent Imports** - Use absolute imports with `$/` alias for lib imports

```typescript
// ✅ Good
interface StateShape {
  code: string;
  theme: 'light' | 'dark';
}

export const processState = (state: StateShape): ValidatedState => {
  // implementation
};

// ❌ Bad
export const processState = (state: any) => {
  // implementation
};
```

### Svelte Component Conventions

- **PascalCase** - Component file names in PascalCase (e.g., `DesktopEditor.svelte`)
- **Props Interface** - Define props interface at top of script block
- **Reactive Declarations** - Use `$:` for derived values, avoid in template
- **Event Handlers** - Inline for simple logic, external functions for complex logic
- **Component Composition** - Prefer composition over large monolithic components

```svelte
<!-- ✅ Good -->
<script lang="ts">
  interface Props {
    code: string;
    onCodeChange: (code: string) => void;
  }

  let { code, onCodeChange }: Props = $props();

  $: processedCode = processCode(code);
</script>

<!-- ❌ Bad -->
<script lang="ts">
  export let code;
  export let onCodeChange;
</script>
```

### JavaScript/TypeScript Code Style

- **const/let** - Prefer `const`, use `let` only when reassignment needed
- **Arrow Functions** - Use arrow functions for callbacks and short functions
- **Destructuring** - Use destructuring for object/array access
- **Template Literals** - Use template literals for string interpolation
- **Optional Chaining** - Use `?.` for potentially undefined object access

```typescript
// ✅ Good
const { code, mermaid } = state;
const processedResult = items?.map((item) => ({
  ...item,
  processed: true
}));

// ❌ Bad
var code = state.code;
var mermaid = state.mermaid;
const processedResult =
  items &&
  items.map(function (item) {
    return Object.assign({}, item, { processed: true });
  });
```

## File Organization & Naming

### Directory Structure Standards

- **Components** - PascalCase for component directories (`History/`, `Card/`)
- **Utilities** - camelCase for utility directories (`fileLoaders/`, `promos/`)
- **Routes** - SvelteKit convention (`+page.svelte`, `+layout.svelte`)
- **Tests** - Co-located with source files or in dedicated `tests/` directories

### File Naming Conventions

- **Components** - `PascalCase.svelte` (e.g., `DesktopEditor.svelte`)
- **Utilities** - `camelCase.ts` (e.g., `errorHandling.ts`)
- **Types** - `camelCase.d.ts` (e.g., `types.d.ts`)
- **Tests** - `filename.test.ts` or `filename.spec.ts`
- **Configs** - `kebab-case.config.js` (e.g., `tailwind.config.js`)

### Import Organization

```typescript
// 1. Node modules
import { derived, writable } from 'svelte/store';
import { debounce } from 'lodash-es';

// 2. Internal modules with $ alias
import { C } from '$/constants';
import type { State } from '$/types';
import { parse } from '$/util/mermaid';

// 3. Relative imports
import { localUtility } from './localUtility';
```

## Component Architecture Patterns

### State Management Conventions

- **Stores** - Use Svelte stores for shared state
- **Props** - Pass data down via props, events up via callbacks
- **Derived State** - Use derived stores for computed values
- **Side Effects** - Handle in `$effect` blocks, not in reactive statements

```typescript
// ✅ Store pattern
export const inputStateStore = writable<State>(defaultState);
export const stateStore = derived([inputStateStore], ([state]) => processState(state));

// ✅ Component pattern
interface Props {
  initialState: State;
  onStateChange: (state: State) => void;
}
```

### Error Handling Standards

- **Graceful Degradation** - Always provide fallback for failed operations
- **User Feedback** - Clear error messages with actionable guidance
- **Error Boundaries** - Component-level error handling where appropriate
- **Logging** - Console logging for development, structured logging for production

```typescript
// ✅ Good error handling
try {
  const result = await parseCode(code);
  return result;
} catch (error) {
  console.error('Parse error:', error);
  return {
    error: 'Failed to parse code. Please check syntax.',
    fallback: defaultState
  };
}
```

## Styling Guidelines

### TailwindCSS Usage

- **Utility Classes** - Use Tailwind utilities over custom CSS
- **Component Classes** - Extract repeated patterns into component classes
- **Responsive Design** - Mobile-first responsive design patterns
- **Consistent Spacing** - Use Tailwind spacing scale consistently

```svelte
<!-- ✅ Good Tailwind usage -->
<div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
    Title
  </h2>
</div>

<!-- ❌ Avoid inline styles -->
<div style="display: flex; padding: 24px; background: white;">
```

### CSS Custom Properties

- **Theme Variables** - Use CSS custom properties for theme values
- **Consistent Units** - Prefer rem/em for typography, px for borders
- **Z-index Scale** - Use consistent z-index scale (10, 20, 30, etc.)

## Testing Standards

### Unit Test Conventions

- **Descriptive Names** - Test names should describe behavior, not implementation
- **Arrange-Act-Assert** - Structure tests with clear setup, action, and verification
- **Mock External Dependencies** - Mock network calls, external services
- **Test Edge Cases** - Include error conditions and boundary cases

```typescript
// ✅ Good test structure
describe('parseCode', () => {
  it('should return parsed diagram when code is valid', () => {
    // Arrange
    const validCode = 'graph TD\n  A --> B';

    // Act
    const result = parseCode(validCode);

    // Assert
    expect(result.isValid).toBe(true);
    expect(result.diagramType).toBe('flowchart');
  });

  it('should return error when code has syntax error', () => {
    const invalidCode = 'graph TD\n  A -> B'; // Invalid syntax

    const result = parseCode(invalidCode);

    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### E2E Test Conventions

- **User Journey Focus** - Test complete user workflows
- **Data Attributes** - Use data-testid for test selectors
- **Page Object Model** - Organize tests around page/component objects
- **Stable Selectors** - Avoid CSS classes for test selectors

## Documentation Standards

### Code Comments

- **Why Over What** - Explain reasoning, not obvious functionality
- **Complex Logic** - Comment complex algorithms or business logic
- **Public APIs** - JSDoc comments for exported functions and types
- **TODO Comments** - Include GitHub issue references for planned work

```typescript
/**
 * Processes Mermaid code and returns validation results
 * @param code - Raw Mermaid diagram code
 * @returns Validation result with error details if invalid
 */
export const processCode = (code: string): ValidationResult => {
  // Remove leading/trailing whitespace as Mermaid is whitespace-sensitive
  const trimmedCode = code.trim();

  // TODO(#123): Add syntax highlighting for error positions
  if (!trimmedCode) {
    return { isValid: false, error: 'Code cannot be empty' };
  }

  // Complex parsing logic here...
};
```

### README and Documentation

- **Clear Examples** - Provide working code examples
- **Getting Started** - Step-by-step setup instructions
- **API Documentation** - Document all exported functions and interfaces
- **Contributing Guide** - Clear guidelines for contributors

## Git & Version Control

### Commit Message Format

```
type(scope): description

- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting changes
- refactor: code refactoring
- test: adding tests
- chore: maintenance tasks

Examples:
feat(editor): add auto-completion for mermaid syntax
fix(state): resolve serialization error with special characters
docs(readme): update installation instructions
```

### Branch Naming

- **Feature branches** - `feature/short-description`
- **Bug fixes** - `fix/short-description`
- **Chores** - `chore/short-description`
- **Documentation** - `docs/short-description`

### Pull Request Guidelines

- **Small, focused PRs** - Single responsibility per PR
- **Clear descriptions** - What, why, and how of changes
- **Tests included** - All new code should have tests
- **Documentation updated** - Update relevant docs with changes

## Performance Guidelines

### Loading & Bundle Optimization

- **Code Splitting** - Use dynamic imports for large dependencies
- **Tree Shaking** - Import only needed functions from libraries
- **Asset Optimization** - Compress images, minimize CSS/JS
- **Lazy Loading** - Load components/features on demand

### Runtime Performance

- **Avoid Premature Optimization** - Profile before optimizing
- **Debounce User Input** - Debounce frequent operations like typing
- **Memoize Expensive Operations** - Cache results of complex calculations
- **Cleanup Resources** - Remove event listeners, cancel timers

## Accessibility Standards

### WCAG Compliance

- **Keyboard Navigation** - All functionality accessible via keyboard
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Color Contrast** - Meet WCAG AA contrast requirements
- **Focus Management** - Clear focus indicators and logical tab order

### Implementation Guidelines

```svelte
<!-- ✅ Accessible button -->
<button
  type="button"
  aria-label="Copy diagram to clipboard"
  class="focus:ring-2 focus:ring-blue-500"
  onclick={copyToClipboard}>
  <CopyIcon aria-hidden="true" />
  Copy
</button>

<!-- ✅ Accessible form -->
<label for="code-input" class="sr-only"> Mermaid diagram code </label>
<textarea id="code-input" aria-describedby="code-help" bind:value={code} />
<div id="code-help" class="text-sm text-gray-600">Enter your Mermaid diagram syntax here</div>
```
