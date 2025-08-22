---
name: monaco-integration
epic: zustand-react-vite
status: backlog
created: 2025-08-22T16:36:00Z
priority: critical
estimated_hours: 24
dependencies: [zustand-store]
---

# Task: Monaco Editor Integration

## Description

Integrate Monaco Editor with React using `@monaco-editor/react`, maintaining all current editor functionality including Mermaid syntax highlighting, error markers, and responsive behavior.

## Acceptance Criteria

- [ ] Monaco Editor renders with identical appearance to current implementation
- [ ] Mermaid syntax highlighting works exactly as current version
- [ ] Real-time error markers display correctly with line numbers
- [ ] Mobile-responsive behavior matches current implementation
- [ ] Editor resizing and layout work properly
- [ ] All keyboard shortcuts and editor features preserved
- [ ] Performance characteristics match current editor experience

## Implementation Notes

### Monaco React Integration

```typescript
// Use @monaco-editor/react wrapper
import Editor from '@monaco-editor/react'

const MermaidEditor: React.FC = () => {
  const { code, updateCode, errorMarkers } = useMermaidStore()

  return (
    <Editor
      language="mermaid"
      value={code}
      onChange={handleCodeChange}
      options={{
        minimap: { enabled: false },
        lineNumbers: 'on',
        wordWrap: 'on',
        // ... current Monaco options
      }}
    />
  )
}
```

### Syntax Highlighting

- Reuse current Mermaid language definition
- Port syntax highlighting rules from current implementation
- Ensure color themes work with light/dark mode switching
- Maintain auto-completion functionality if present

### Error Integration

- Connect Zustand error markers to Monaco decorations
- Maintain current error parsing and line number mapping
- Ensure error tooltips and hover information work
- Preserve error recovery and user feedback patterns

### Responsive Design

- Implement mobile editor behavior matching current `MobileEditor.svelte`
- Handle touch interactions and virtual keyboard
- Maintain current editor sizing and responsive breakpoints
- Ensure proper editor focus and selection behavior

## Definition of Done

- [ ] Monaco editor renders and accepts text input
- [ ] Syntax highlighting matches current appearance
- [ ] Error markers display at correct line positions
- [ ] Mobile editor experience equivalent to current
- [ ] Editor integrates properly with Zustand state
- [ ] All editor options and configurations work
- [ ] Performance is smooth for large diagrams
