---
name: foundation-setup
epic: zustand-react-vite
status: backlog
created: 2025-08-22T16:36:00Z
priority: critical
estimated_hours: 16
dependencies: []
---

# Task: Foundation Setup

## Description

Set up the React+Vite+TypeScript project foundation, replacing the current SvelteKit structure while maintaining the same build output and development experience.

## Acceptance Criteria

- [ ] Vite project initialized with React 18+ and TypeScript 5.8+
- [ ] Project structure matches current `src/` organization patterns
- [ ] Build outputs to `docs/` directory for GitHub Pages compatibility
- [ ] Development server runs on port 3000 with HMR working
- [ ] TypeScript strict mode enabled with same tsconfig standards
- [ ] ESLint and Prettier configured matching current code standards
- [ ] Package.json scripts match current development workflow
- [ ] All current environment variables (MERMAID\_\*) supported

## Implementation Notes

### Vite Configuration

- Configure static site generation to `docs/` directory
- Set up environment variable handling with `MERMAID_` prefix
- Configure build optimizations for bundle size parity
- Enable HMR with fast refresh for React components

### Project Structure

```
src/
├── components/     # React components (mirrors current structure)
├── hooks/         # Custom React hooks
├── stores/        # Zustand stores
├── utils/         # Utility functions (reuse current)
├── types/         # TypeScript definitions
└── App.tsx        # Root component
```

### Dependencies to Install

- React 18.2+, React-DOM 18.2+
- Vite 5.0+, @vitejs/plugin-react
- TypeScript 5.8+, @types/react, @types/react-dom
- Zustand 4.4+
- Current libraries: Mermaid, pako, js-base64, etc.

## Definition of Done

- [ ] `npm run dev` starts development server successfully
- [ ] `npm run build` generates static site in `docs/`
- [ ] TypeScript compilation passes with zero errors
- [ ] Linting passes with current standards
- [ ] Hot module replacement works correctly
- [ ] Bundle size is documented and reasonable
