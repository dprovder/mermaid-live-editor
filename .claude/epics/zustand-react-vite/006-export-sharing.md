---
name: export-sharing
epic: zustand-react-vite
status: backlog
created: 2025-08-22T16:36:00Z
priority: high
estimated_hours: 20
dependencies: [diagram-rendering, zustand-store]
---

# Task: Export & Sharing Features

## Description

Implement all export functionality (SVG/PNG), clipboard operations, URL sharing, and history management with exact feature parity to current implementation.

## Acceptance Criteria

- [ ] SVG/PNG export via external services works identically
- [ ] Copy to clipboard functions for code, URLs, and images
- [ ] URL sharing with state compression maintains backward compatibility
- [ ] History management preserves diagram versions locally
- [ ] Markdown export with embedded images functions correctly
- [ ] All sharing features work without external service dependencies when offline
- [ ] Export quality and options match current implementation

## Implementation Notes

### Export Integration

```typescript
const useExport = () => {
  const state = useMermaidStore();

  const exportSVG = async () => {
    const url = `https://mermaid.ink/svg/${state.serializedState}`;
    // Handle export logic
  };

  const exportPNG = async () => {
    const url = `https://mermaid.ink/img/${state.serializedState}`;
    // Handle export logic
  };

  return { exportSVG, exportPNG };
};
```

### Sharing Features

- Reuse current URL serialization exactly
- Maintain compression with pako library
- Preserve share link format and compatibility
- Handle social sharing metadata

### History Management

- Port current history system from `components/History/`
- Maintain local storage structure and versioning
- Preserve history UI and navigation
- Keep diagram comparison features

### Clipboard Operations

- Copy diagram code to clipboard
- Copy share URLs to clipboard
- Copy rendered SVG/images when possible
- Handle clipboard permissions and fallbacks

## Definition of Done

- [ ] All export formats work with external services
- [ ] Clipboard operations function correctly across browsers
- [ ] URL sharing maintains backward compatibility
- [ ] History system preserves and displays diagram versions
- [ ] Markdown export produces correct formatted output
- [ ] Error handling for export failures works properly
