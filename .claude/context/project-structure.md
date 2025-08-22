---
created: 2025-08-22T16:08:49Z
last_updated: 2025-08-22T16:08:49Z
version: 1.0
author: Claude Code PM System
---

# Project Structure Context

## Directory Organization

```
mermaid-live-editor/
├── .claude/                     # Claude Code PM system (new)
├── bin/                         # Build utilities
├── docs/                        # Build output (GitHub Pages)
├── src/                         # Source code
│   ├── lib/                     # Shared libraries
│   │   ├── components/          # Svelte components
│   │   │   ├── ui/              # Reusable UI components (shadcn-svelte)
│   │   │   ├── History/         # Diagram history system
│   │   │   ├── Card/            # Card components
│   │   │   └── *.svelte         # Core components (Editor, View, Actions, etc.)
│   │   ├── util/                # Core utilities
│   │   │   ├── state.ts         # Central state management
│   │   │   ├── mermaid.ts       # Mermaid parsing/rendering
│   │   │   ├── serde.ts         # Serialization utilities
│   │   │   ├── persist.ts       # LocalStorage utilities
│   │   │   ├── errorHandling.ts # Error parsing/display
│   │   │   ├── fileLoaders/     # File loading utilities
│   │   │   └── promos/          # Promotional components
│   │   ├── constants.ts         # Application constants
│   │   ├── types.d.ts           # TypeScript definitions
│   │   └── utils.ts             # General utilities
│   ├── routes/                  # SvelteKit routes
│   │   ├── +layout.svelte       # Root layout
│   │   ├── +page.svelte         # Main editor page
│   │   ├── edit/+page.svelte    # Edit mode
│   │   └── view/+page.svelte    # View-only mode
│   ├── tests/                   # Unit test setup
│   ├── app.html                 # HTML template
│   ├── app.postcss             # Global styles
│   └── global.d.ts              # Global type definitions
├── static/                      # Static assets
│   ├── icons/                   # SVG icons
│   ├── favicon.*                # Favicon files
│   ├── manifest.json            # PWA manifest
│   └── service-worker.js        # Service worker
├── tests/                       # E2E tests (Playwright)
└── Configuration files          # Various config files
```

## Key File Patterns

### Component Organization

- **Main Components:** Editor.svelte, View.svelte, Actions.svelte
- **Platform-Specific:** DesktopEditor.svelte, MobileEditor.svelte
- **UI Components:** Organized in `src/lib/components/ui/` following shadcn-svelte patterns
- **Feature Components:** History/, Card/ subdirectories for complex features

### Utility Organization

- **Core State:** `state.ts` - Central store management
- **Mermaid Integration:** `mermaid.ts` - Parsing and rendering logic
- **Serialization:** `serde.ts` - URL state encoding/decoding
- **Persistence:** `persist.ts` - LocalStorage management
- **Error Handling:** `errorHandling.ts` - Parse error processing

### Test Organization

- **Unit Tests:** `src/tests/` with Vitest setup
- **E2E Tests:** `tests/` with Playwright configuration
- **Test Utilities:** `tests/utils.ts` for shared test helpers

## Module Dependencies

### State Flow Architecture

```
User Input → Monaco Editor → updateCode()
    ↓
inputStateStore → validation/parsing → stateStore
    ↓
UI Components (View, Actions, etc.)
    ↓
URL Hash Synchronization
```

### Component Relationships

- **Editor Components** consume state from stores
- **View Component** renders Mermaid diagrams based on validated state
- **Actions Component** provides toolbar functionality
- **History Component** manages diagram version history

## Build System Structure

### SvelteKit Configuration

- **Adapter:** `@sveltejs/adapter-static` for GitHub Pages
- **Build Output:** `docs/` directory
- **Path Alias:** `$/*` maps to `./src/lib/*`

### Vite Configuration

- **Dev Server:** Port 3000 with HMR full reload
- **Test Environment:** jsdom for unit tests
- **Icon System:** unplugin-icons with custom icon loader

### Package Management

- **Manager:** pnpm exclusively
- **Lock File:** pnpm-lock.yaml
- **Node Version:** >=20.19.0

## Asset Management

### Static Assets

- **Icons:** SVG files in `static/icons/`
- **Images:** Logos and branding assets
- **PWA Assets:** manifest.json, service-worker.js
- **Favicons:** Multiple formats for browser compatibility

### Generated Assets

- **Build Output:** Static files in `docs/` for GitHub Pages
- **Source Maps:** Generated for debugging
- **Compressed Assets:** Vite handles optimization

## Configuration Files Structure

### Core Configuration

- **svelte.config.js** - SvelteKit and adapter configuration
- **vite.config.js** - Vite, testing, and plugin configuration
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.js** - TailwindCSS customization

### Quality Assurance

- **playwright.config.ts** - E2E testing configuration
- **package.json** - Scripts and dependencies
- **.eslintrc** - Code linting rules
- **prettier config** - Code formatting rules

### Deployment

- **netlify.toml** - Netlify deployment settings
- **Dockerfile** - Container configuration
- **docker-compose.yml** - Local development with Docker

## Naming Conventions

### File Naming

- **Components:** PascalCase.svelte (e.g., DesktopEditor.svelte)
- **Utilities:** camelCase.ts (e.g., errorHandling.ts)
- **Types:** camelCase.d.ts (e.g., types.d.ts)
- **Routes:** SvelteKit convention (+page.svelte, +layout.svelte)

### Directory Naming

- **Components:** PascalCase for feature directories (History/, Card/)
- **Utilities:** camelCase for utility directories (fileLoaders/, promos/)
- **Standard:** lowercase for standard directories (src/, lib/, routes/)

### Import Patterns

- **Lib Imports:** Use `$/` alias for lib imports
- **Relative Imports:** For same-directory files
- **External Imports:** Standard node_modules imports
