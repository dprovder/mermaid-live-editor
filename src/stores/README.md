# Zustand Stores

This directory contains the Zustand stores for the Mermaid Live Editor React migration.

## Architecture

The store architecture follows these principles:

### 1. Main Store (`mermaidStore.ts`)

- Contains the primary application state
- Manages diagram code, configuration, and validation
- Handles URL serialization and persistence
- Provides all core actions for state management

### 2. Store Structure

```typescript
interface MermaidStore extends StoreState, StoreActions {
  // State properties
  code: string;
  mermaid: string;
  error?: Error;
  errorMarkers: MarkerData[];
  // ... other state

  // Actions
  updateCode: (code: string, options?) => void;
  updateConfig: (config: string) => void;
  loadState: (data: string) => void;
  // ... other actions
}
```

### 3. Custom Hooks (`../hooks/`)

- Provide optimized selectors for specific use cases
- Prevent unnecessary re-renders by selecting only needed state
- Abstract store implementation from components

## Usage Patterns

### Reading State

```typescript
// For components that need all state
const state = useMermaidState();

// For components that only need specific values
const code = useCode();
const errors = useErrorState();
```

### Updating State

```typescript
// Get actions without subscribing to state changes
const { updateCode, updateConfig } = useMermaidActions();

// Update code with options
updateCode(newCode, { updateDiagram: true, resetPanZoom: false });
```

### Optimized Selectors

```typescript
// Only re-render when code changes
const code = useMermaidStore((state) => state.code);

// Only re-render when error state changes
const { error, errorMarkers } = useMermaidStore((state) => ({
  error: state.error,
  errorMarkers: state.errorMarkers
}));
```

## Migration Notes

This store replaces the Svelte store implementation from `src/lib/util/state.ts`. Key differences:

1. **Synchronous by default**: Zustand updates are synchronous, async processing happens in actions
2. **Immutable updates**: State updates create new objects rather than mutating existing ones
3. **Optimized selectors**: Components can subscribe to specific slices of state
4. **Type safety**: Full TypeScript support with proper inference

## Future Stores

Additional stores planned for implementation:

- `historyStore.ts` - Diagram history management
- `notificationStore.ts` - Toast notifications and alerts
- `preferencesStore.ts` - User preferences and settings
