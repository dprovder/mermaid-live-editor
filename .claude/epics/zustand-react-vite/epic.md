---
name: zustand-react-vite
status: backlog
created: 2025-08-22T16:27:50Z
progress: 0%
prd: .claude/prds/zustand-react-vite.md
github: https://github.com/dprovder/mermaid-live-editor/issues/1234
---

# Epic: zustand-react-vite

## Overview

Complete migration from SvelteKit to React+Zustand+Vite while maintaining 100% feature parity. The implementation leverages React's mature ecosystem, Zustand's simplified state management, and Vite's superior development experience to create a more maintainable and contributor-friendly codebase.

**Key Strategy:** Rebuild the application using modern React patterns while preserving the exact user experience and URL compatibility from the current implementation.

## Architecture Decisions

### State Management with Zustand

- **Single Store Architecture**: One main store mirroring current `stateStore` pattern
- **Computed Values**: Use Zustand's selectors for derived state (replacing Svelte derived stores)
- **URL Serialization**: Maintain exact compatibility with current serde utilities
- **LocalStorage**: Direct migration of persistence layer with same structure

### Component Architecture

- **Monaco Integration**: Use `@monaco-editor/react` wrapper (proven React solution)
- **Responsive Design**: CSS-in-JS with styled-components or Tailwind (match current design)
- **Mobile Detection**: React hooks for responsive behavior (similar to current mobile/desktop split)
- **Error Boundaries**: React error boundaries replacing Svelte error handling

### Build & Development

- **Vite Configuration**: Mirror current performance characteristics
- **TypeScript**: Maintain strict mode and current type safety
- **Testing**: React Testing Library + Vitest (similar to current test setup)
- **Hot Reloading**: Vite HMR for faster development than current SvelteKit

## Technical Approach

### Frontend Components

**Core Editor Architecture:**

```typescript
// Main Zustand Store (replacing src/lib/util/state.ts)
interface MermaidStore {
  // Current state mirror
  code: string;
  mermaid: string; // JSON config
  theme: 'light' | 'dark';
  panZoom: boolean;
  grid: boolean;
  rough: boolean;

  // Derived state (computed)
  serializedState: string;
  validatedState: ValidatedState;
  errors: ParseError[];

  // Actions (replacing current updateCode, etc.)
  updateCode: (code: string) => void;
  updateConfig: (config: string) => void;
  loadFromUrl: (hash: string) => void;
  toggleTheme: () => void;
}
```

**Component Hierarchy:**

- `App.tsx` - Root component (replacing +layout.svelte)
- `Editor/` - Monaco editor integration (replacing current Editor components)
- `Preview/` - Mermaid rendering (replacing View.svelte)
- `Toolbar/` - Actions and controls (replacing Actions.svelte)
- `Mobile/` - Touch-optimized components

### Backend Services

**No backend changes required** - maintaining current static deployment model:

- Same external service integrations (mermaid.ink, Kroki)
- Same GitHub Pages deployment
- Same PWA service worker approach

### Infrastructure

- **Deployment**: Same static site generation to `docs/`
- **CI/CD**: Update GitHub Actions for Vite build process
- **Performance**: Bundle analysis to match current size constraints
- **Monitoring**: Same analytics and error tracking

## Implementation Strategy

### Phase 1: Foundation (Weeks 1-4)

**Goal**: Core editor working with basic functionality

1. Set up Vite + React + TypeScript project structure
2. Implement main Zustand store with URL serialization compatibility
3. Create Monaco editor integration with syntax highlighting
4. Basic responsive layout matching current design

### Phase 2: Feature Parity (Weeks 5-8)

**Goal**: All current features working identically

1. Complete UI component library (toolbar, mobile views, etc.)
2. Error handling and validation system
3. Export functionality (SVG/PNG via external services)
4. History management and local storage

### Phase 3: Polish & Testing (Weeks 9-12)

**Goal**: Production-ready with improved DX

1. Comprehensive testing suite (90%+ coverage)
2. Performance optimization and bundle analysis
3. Accessibility compliance (WCAG 2.1 AA)
4. Documentation and Storybook setup

### Risk Mitigation

- **URL Compatibility**: Early prototype of serde migration in Week 1
- **Performance**: Bundle size tracking from Day 1
- **Monaco Integration**: Proof of concept in first sprint
- **Mobile Experience**: Test on devices throughout development

## Task Breakdown (Completed)

Tasks created and ready for GitHub sync:

- [x] **001-foundation-setup**: Vite project, TypeScript config, basic React structure (16h)
- [x] **002-zustand-store**: State management with URL/localStorage compatibility (20h)
- [x] **003-monaco-integration**: React Monaco wrapper with Mermaid syntax highlighting (24h)
- [x] **004-ui-components**: Layout, responsive design, theme system (32h)
- [x] **005-diagram-rendering**: Preview component with pan/zoom/error handling (28h)
- [x] **006-export-sharing**: SVG/PNG export, clipboard, history management (20h)
- [x] **007-mobile-accessibility**: Touch gestures, keyboard navigation, screen readers (16h)
- [x] **008-testing-quality**: Unit tests, E2E tests, performance benchmarks (24h)
- [x] **009-migration-deployment**: URL compatibility, build pipeline, production deployment (20h)
- [x] **010-documentation-polish**: Storybook, contributing guides, performance optimization (16h)

**Total Estimated Effort**: 216 hours (27 working days / 12-14 weeks)

## Dependencies

### External Dependencies

- **React 18.2+** - Core framework with concurrent features
- **Zustand 4.4+** - State management (simpler than Redux)
- **@monaco-editor/react** - Proven React Monaco wrapper
- **Vite 5.0+** - Build tool and dev server
- **Current Libraries**: Maintain Mermaid, pako, js-base64 versions

### Internal Dependencies

- **Current serde.ts**: Must maintain exact URL compatibility
- **Current persist.ts**: LocalStorage migration utilities
- **Design System**: CSS/styling matching current appearance
- **Testing Strategy**: Maintain current test coverage standards

### Critical Path Items

1. **URL Compatibility**: Must work with existing shared links (Week 1 priority)
2. **Monaco Integration**: React wrapper must support current features (Week 2)
3. **Performance Parity**: Bundle size cannot exceed current implementation
4. **Mobile Experience**: Touch interactions must match current quality

## Success Criteria (Technical)

### Performance Benchmarks

- **Initial Load**: ≤ 2 seconds (current target)
- **Bundle Size**: ≤ current SvelteKit bundle size
- **Interaction Response**: < 16ms input lag (60fps)
- **Memory Usage**: Optimized for long editing sessions
- **Mobile Performance**: Parity with desktop experience

### Quality Gates

- **Test Coverage**: ≥ 90% for components and stores
- **TypeScript**: 100% type coverage, strict mode
- **Accessibility**: Lighthouse score ≥ 95
- **Browser Support**: Same matrix as current (modern browsers)
- **URL Compatibility**: 100% backward compatibility with existing links

### Acceptance Criteria

- [ ] All current features working identically
- [ ] Zero critical bugs in production
- [ ] Performance metrics meet or exceed current
- [ ] Community contributors can onboard easily
- [ ] External integrations continue working unchanged

## Estimated Effort

### Timeline: 12 weeks (3 months)

- **Weeks 1-4**: Foundation and core functionality (33%)
- **Weeks 5-8**: Feature completion and integration (66%)
- **Weeks 9-12**: Polish, testing, and deployment (100%)

### Resource Requirements

- **Primary Developer**: 1 full-time experienced React developer
- **Supporting Developer**: 1 part-time for testing/review (optional)
- **Design Review**: Minimal (maintaining current design)
- **QA Support**: Existing testing infrastructure

### Critical Path Items

1. **Week 1**: URL compatibility prototype (CRITICAL)
2. **Week 2**: Monaco React integration working (HIGH)
3. **Week 4**: Basic editor functionality complete (HIGH)
4. **Week 8**: Feature parity achieved (HIGH)
5. **Week 12**: Production deployment ready (CRITICAL)

### Risk Contingency

- **Performance Issues**: +2 weeks for optimization
- **Mobile UX Problems**: +1 week for touch interaction fixes
- **Third-party Integration**: +1 week for Monaco/external service issues
- **Testing Coverage**: +1 week for comprehensive test suite

**Total Estimated Effort**: 12-16 weeks depending on complexity discovered during implementation
