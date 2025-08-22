---
name: zustand-store
epic: zustand-react-vite
status: backlog
created: 2025-08-22T16:36:00Z
priority: critical
estimated_hours: 20
dependencies: [foundation-setup]
---

# Task: Zustand Store Implementation

## Description

Create the main Zustand store that replaces the current Svelte stores architecture, maintaining exact compatibility with URL serialization and localStorage persistence.

## Acceptance Criteria

- [ ] Main store interface matches current state structure exactly
- [ ] URL serialization/deserialization works with existing links
- [ ] LocalStorage persistence maintains current behavior
- [ ] State validation and error handling equivalent to current implementation
- [ ] Computed values (selectors) replace Svelte derived stores
- [ ] State mutations follow Zustand patterns while preserving logic
- [ ] Performance characteristics match or exceed current stores

## Implementation Notes

### Store Structure

```typescript
interface MermaidStore {
  // Core state (mirror current inputStateStore)
  code: string;
  mermaid: string; // JSON config
  theme: 'light' | 'dark';
  panZoom: boolean;
  grid: boolean;
  rough: boolean;
  editorMode: 'code' | 'config';

  // Computed state (selectors)
  serializedState: string;
  validatedState: ValidatedState;
  errorMarkers: MarkerData[];
  diagramType?: string;

  // Actions
  updateCode: (code: string, options?: UpdateOptions) => void;
  updateConfig: (config: string) => void;
  loadFromUrl: (hash: string) => void;
  toggleTheme: () => void;
  setEditorMode: (mode: 'code' | 'config') => void;
}
```

### URL Compatibility

- Reuse existing `serde.ts` utilities exactly
- Maintain `serializeState()` and `deserializeState()` functions
- Test with current shared URLs to ensure compatibility
- Handle migration of any state format differences

### Persistence Layer

- Integrate with current `persist.ts` utilities
- Maintain localStorage key structure
- Implement state migration if needed
- Preserve history management functionality

## Definition of Done

- [ ] Store created with all required state properties
- [ ] Existing shared URLs continue to work unchanged
- [ ] LocalStorage data persists correctly across sessions
- [ ] State validation produces same error markers
- [ ] All current state mutations have equivalent actions
- [ ] TypeScript types are comprehensive and strict
