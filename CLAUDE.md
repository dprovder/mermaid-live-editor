# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mermaid Live Editor is a SvelteKit application for editing, previewing, and sharing Mermaid diagrams. It provides real-time editing with Monaco Editor, live preview, URL sharing, and export capabilities.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (port 3000)
pnpm dev

# Development with force refresh and local Mermaid
pnpm dev:force

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run all tests (unit + e2e)
pnpm test

# Unit tests only
pnpm test:unit

# Unit tests with UI
pnpm test:unit:ui

# Unit tests with coverage
pnpm test:unit:coverage

# E2E tests
pnpm test:e2e

# E2E tests with UI
pnpm test:e2e:ui

# E2E tests with debugging
pnpm test:e2e:debug

# Linting and formatting
pnpm lint          # Check lint and format
pnpm lint:fix      # Fix lint and format issues
pnpm format        # Format code only
```

## Architecture

### Core State Management

- **State Store**: Centralized state management in `src/lib/util/state.ts` using Svelte stores
- **inputStateStore**: Writable store for user input state, persisted to localStorage
- **stateStore**: Derived readonly store with validation and error handling
- **State Flow**: inputStateStore → validation/parsing → stateStore → UI updates

### Key Components Structure

- **Editor Components**: `DesktopEditor.svelte`, `MobileEditor.svelte` - Monaco-based code editing
- **View Component**: `View.svelte` - Mermaid diagram rendering and display
- **Layout**: Responsive design that switches between desktop/mobile layouts
- **Toolbar Components**: Actions, sharing, pan/zoom, theme controls

### Data Flow

1. User edits code in Monaco Editor
2. State updates trigger `updateCode()` in state.ts
3. Code is parsed and validated via `parse()` in mermaid.ts
4. Validated state flows to View component for rendering
5. URL hash automatically syncs with state for sharing

### Persistence & Sharing

- **LocalStorage**: Auto-saves user state via persist utility
- **URL Serialization**: State encoded in URL hash using serde utilities (base64 + pako compression)
- **History**: Built-in diagram history system in `components/History/`

### Error Handling

- **Parse Errors**: Mermaid syntax errors caught and displayed with line markers
- **Error Markers**: Monaco editor integration shows syntax errors inline
- **Error Recovery**: Graceful fallbacks for URL parsing failures

## File Structure

```
src/
├── lib/
│   ├── components/           # Svelte components
│   │   ├── ui/              # Reusable UI components (shadcn-svelte)
│   │   ├── Editor.svelte    # Main editor wrapper
│   │   ├── View.svelte      # Diagram display
│   │   └── Actions.svelte   # Toolbar actions
│   ├── util/                # Core utilities
│   │   ├── state.ts         # Central state management
│   │   ├── mermaid.ts       # Mermaid parsing/rendering
│   │   ├── serde.ts         # Serialization for URLs
│   │   ├── persist.ts       # LocalStorage utilities
│   │   └── errorHandling.ts # Error parsing/display
│   ├── constants.ts         # App constants
│   └── types.d.ts          # TypeScript definitions
├── routes/                  # SvelteKit routes
│   ├── +page.svelte        # Main editor page
│   ├── edit/+page.svelte   # Edit mode
│   └── view/+page.svelte   # View-only mode
└── tests/                   # Unit test setup
```

## Key Technical Details

### State Schema

- `code`: Mermaid diagram source
- `mermaid`: JSON config string for Mermaid
- `panZoom`: Enable/disable pan and zoom
- `grid`: Show/hide background grid
- `rough`: Enable rough/hand-drawn styling
- `editorMode`: 'code' or 'config' editor tabs

### Monaco Editor Integration

- Custom syntax highlighting for Mermaid
- Real-time error markers from Mermaid parser
- Auto-completion and validation
- Mobile-friendly responsive editor

### Deployment

- Static site generation via `@sveltejs/adapter-static`
- Builds to `docs/` directory for GitHub Pages
- Service worker for offline functionality
- Environment variables prefixed with `MERMAID_`

## Testing

- **Unit Tests**: Vitest with jsdom environment
- **E2E Tests**: Playwright with Chromium
- **Coverage**: c8 coverage reporting
- **CI**: Tests run on GitHub Actions

## Package Manager

Uses pnpm exclusively. Node.js >=20.19.0 required.
