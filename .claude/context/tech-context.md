---
created: 2025-08-22T16:08:49Z
last_updated: 2025-08-22T16:08:49Z
version: 1.0
author: Claude Code PM System
---

# Technology Context

## Project Type Classification

**Primary:** Frontend Web Application
**Framework:** SvelteKit (SSG - Static Site Generation)
**Language:** TypeScript with JavaScript
**Build System:** Vite
**Package Manager:** pnpm

## Core Technology Stack

### Frontend Framework

- **SvelteKit 2.20.8** - Full-stack web framework
- **Svelte 5.28.2** - Reactive component framework
- **@sveltejs/adapter-static 3.0.8** - Static site generation adapter

### Development & Build Tools

- **Vite 5.4.19** - Build tool and dev server
- **TypeScript 5.8.3** - Type system
- **unplugin-icons 22.1.0** - Icon system with custom loaders
- **Husky 8.0.3** - Git hooks for pre-commit checks

### UI & Styling

- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.3** - CSS processing
- **bits-ui 1.4.6** - Headless UI components
- **shadcn-svelte** - UI component patterns
- **tailwind-variants 0.3.1** - Component variant system

### Code Editors & Text Processing

- **Monaco Editor 0.52.2** - VS Code-style editor
- **CodeMirror 6.0.1** - Alternative lightweight editor
- **@codemirror/lang-json** - JSON language support
- **@codemirror/lang-yaml** - YAML language support
- **@codemirror/lang-markdown** - Markdown language support

### Mermaid Ecosystem

- **mermaid 11.10.0** - Core diagram library (latest version)
- **@mermaid-js/layout-elk 0.1.9** - Advanced layout engine
- **@mermaid-js/mermaid-zenuml 0.2.2** - ZenUML diagram support
- **@mermaid-js/examples 1.0.0** - Example diagrams

### State Management & Data

- **Svelte Stores** - Built-in reactive state management
- **LocalStorage** - Client-side persistence
- **pako 2.1.0** - Compression for URL serialization
- **js-base64 3.7.7** - Base64 encoding/decoding
- **lodash-es 4.17.21** - Utility functions

### UI Enhancement

- **svg-pan-zoom 3.6.2** - Interactive diagram panning/zooming
- **svg2roughjs 3.2.1** - Hand-drawn diagram styling
- **hammerjs 2.0.8** - Touch gesture support
- **mode-watcher 0.5.1** - Dark/light theme management
- **lucide-svelte 0.507.0** - Icon library

### Testing Framework

- **Vitest 2.1.9** - Unit testing framework
- **@vitest/ui 2.1.9** - Testing UI
- **@vitest/coverage-v8 2.1.9** - Coverage reporting
- **Playwright 1.52.0** - E2E testing
- **jsdom 25.0.1** - DOM simulation for testing
- **chai 4.5.0** - Assertion library

### Code Quality & Formatting

- **ESLint 8.57.1** - Code linting
- **Prettier 3.5.3** - Code formatting
- **@typescript-eslint/eslint-plugin 6.21.0** - TypeScript linting
- **eslint-plugin-svelte 2.46.1** - Svelte-specific linting
- **lint-staged 15.5.1** - Pre-commit linting

## Environment & Runtime Requirements

### Node.js Environment

- **Required Version:** >=20.19.0
- **Package Manager:** pnpm@10.10.0+sha512 (exact version enforced)
- **Runtime:** Browser-based (no server-side runtime)

### Browser Support

- **Modern Browsers** - ES2020+ support required
- **Progressive Web App** - Service Worker support
- **Local Storage** - Required for state persistence
- **WebGL** - Optional for advanced diagram rendering

## Build & Deployment Architecture

### Static Site Generation

- **Output Directory:** `docs/` for GitHub Pages
- **Build Process:** SvelteKit → Vite → Static HTML/CSS/JS
- **Environment Variables:** Prefixed with `MERMAID_`
- **Service Worker:** Offline-first PWA capabilities

### Development Environment

- **Dev Server:** Vite dev server on port 3000
- **Hot Module Replacement:** Full page reload (due to state complexity)
- **Preview Server:** Production build preview on port 3000

### CI/CD Pipeline

- **Platform:** GitHub Actions
- **Docker Support:** Multi-stage builds with nginx
- **Deployment:** Automatic deployment to GitHub Pages and Netlify
- **Testing:** Automated E2E and unit testing on commits

## Integration & APIs

### External Services Integration

- **Plausible Analytics:** Privacy-focused analytics (optional)
- **Mermaid Renderer:** External SVG/PNG generation service
- **Kroki:** Alternative diagram rendering service
- **GitHub API:** Repository integration (via gh CLI)

### File Format Support

- **Input:** Mermaid DSL syntax
- **Output:** SVG, PNG (via external services)
- **State Serialization:** Compressed JSON in URL hash
- **Configuration:** JSON for Mermaid config

## Security & Performance

### Security Measures

- **Content Security Policy** - XSS prevention
- **securityLevel: 'strict'** - Mermaid security enforcement
- **Input Sanitization** - User code parsing safety
- **No Eval** - No dynamic code execution

### Performance Optimization

- **Code Splitting** - SvelteKit automatic splitting
- **Asset Optimization** - Vite build optimization
- **Compression** - Pako compression for URL state
- **Service Worker** - Offline caching strategy
- **Lazy Loading** - Component-based loading

## Development Tooling

### IDE Integration

- **VS Code Support** - TypeScript and Svelte extensions
- **ESLint Integration** - Real-time linting
- **Prettier Integration** - Auto-formatting
- **Path Mapping** - `$/` alias for lib imports

### Debug & Development

- **Source Maps** - Full debugging support
- **Error Boundaries** - Graceful error handling
- **Console Logging** - Development debug utilities
- **HMR** - Hot module replacement (with full reload)

### Quality Assurance

- **Type Checking** - Full TypeScript coverage
- **Unit Tests** - Comprehensive test suite
- **E2E Tests** - Browser automation testing
- **Coverage Reports** - Code coverage tracking
- **Pre-commit Hooks** - Automated quality checks

## Dependency Management

### Production Dependencies (Key)

- **Core:** 25 dependencies focused on UI and Mermaid
- **No Backend Dependencies** - Client-side only
- **CDN Fallbacks** - None (all bundled)
- **Version Pinning** - Some exact versions for stability

### Development Dependencies (Key)

- **Total:** 50+ dev dependencies
- **Testing Tools** - Comprehensive testing stack
- **Build Tools** - Modern development experience
- **Quality Tools** - Linting, formatting, type checking
