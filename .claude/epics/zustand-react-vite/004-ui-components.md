---
name: ui-components
epic: zustand-react-vite
status: backlog
created: 2025-08-22T16:36:00Z
priority: high
estimated_hours: 32
dependencies: [foundation-setup]
---

# Task: Core UI Components

## Description

Create React component library matching the current design system, including responsive layout, toolbar components, theme system, and mobile-optimized interfaces.

## Acceptance Criteria

- [ ] Component library matches current visual design exactly
- [ ] Responsive layout adapts between desktop and mobile viewports
- [ ] Theme switching (light/dark) works with proper persistence
- [ ] All toolbar components and actions function identically
- [ ] Touch gestures and mobile interactions preserved
- [ ] Keyboard navigation and shortcuts maintained
- [ ] Accessibility features equivalent to current implementation

## Implementation Notes

### Component Architecture

```typescript
// Core layout components
<App>
  <Layout>
    <Header />
    <EditorPanel>
      <EditorTabs />
      <MonacoEditor />
    </EditorPanel>
    <PreviewPanel>
      <DiagramView />
      <PanZoomControls />
    </PreviewPanel>
    <Toolbar>
      <Actions />
      <ShareControls />
      <ThemeToggle />
    </Toolbar>
  </Layout>
</App>
```

### Styling Strategy

- Use CSS modules or styled-components for component styling
- Reuse current Tailwind classes and custom CSS where applicable
- Maintain current color scheme and design tokens
- Ensure proper CSS custom properties for theme switching

### Responsive Design

- Implement breakpoint-based layout switching
- Create mobile-optimized component variants
- Handle touch interactions for pan/zoom/gestures
- Maintain current mobile UX patterns

### Theme System

```typescript
const ThemeProvider: React.FC = ({ children }) => {
  const theme = useMermaidStore(state => state.theme)

  return (
    <div className={`app ${theme}`}>
      {children}
    </div>
  )
}
```

### Component Categories

1. **Layout**: App, Layout, Panel components
2. **Editor**: EditorTabs, ConfigEditor, toolbar components
3. **Toolbar**: Actions, Share, Export, Settings buttons
4. **Controls**: PanZoom, Grid, Rough mode toggles
5. **Mobile**: Touch-optimized variants of key components

## Definition of Done

- [ ] All major UI components implemented and working
- [ ] Responsive design works on mobile and desktop
- [ ] Theme switching preserves user preferences
- [ ] Component styling matches current design exactly
- [ ] Touch interactions work properly on mobile devices
- [ ] Keyboard navigation functions correctly
- [ ] Components integrate properly with Zustand store
