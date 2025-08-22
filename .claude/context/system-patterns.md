---
created: 2025-08-22T16:08:49Z
last_updated: 2025-08-22T16:08:49Z
version: 1.0
author: Claude Code PM System
---

# System Patterns Context

## Architectural Patterns

### Overall Architecture Style

- **Static Single-Page Application (SPA)** with server-side generation
- **Component-Based Architecture** using Svelte components
- **Reactive State Management** with centralized stores
- **Event-Driven UI** with real-time diagram updates

### State Management Pattern

**Centralized Store with Derived State**

```typescript
inputStateStore (writable) → validation/parsing → stateStore (derived, readonly)
```

**Key Characteristics:**

- **Single Source of Truth:** `inputStateStore` holds all user input
- **Validation Layer:** `processState()` validates and enriches data
- **Immutable Derived State:** UI consumes read-only validated state
- **Persistence:** Automatic localStorage sync via `persist()` utility

## Data Flow Patterns

### State Flow Architecture

```
User Input (Monaco Editor)
    ↓ updateCode()
inputStateStore (writable)
    ↓ processState() validation
stateStore (derived, readonly)
    ↓ reactive subscriptions
UI Components (View, Actions, etc.)
    ↓ URL serialization
Browser URL Hash (shareable state)
```

### Error Handling Flow

```
Mermaid Parse Error
    ↓ extractErrorLineText()
Error Line Analysis
    ↓ findMostRelevantLineNumber()
Monaco Editor Markers
    ↓ real-time display
User Visual Feedback
```

## Component Design Patterns

### Composition Over Inheritance

- **Container Components:** Handle state and logic (Editor.svelte)
- **Presentation Components:** Pure UI rendering (View.svelte)
- **Utility Components:** Reusable functionality (CopyButton.svelte)
- **Layout Components:** Responsive design (DesktopEditor, MobileEditor)

### Responsive Design Pattern

```typescript
// Platform-specific component loading
{#if mobile}
  <MobileEditor />
{:else}
  <DesktopEditor />
{/if}
```

### Event Bus Pattern

- **URL Hash Changes:** Global event listener for state loading
- **Theme Changes:** Mode watcher integration with theme switching
- **Service Worker:** Global registration and caching strategy

## Persistence Patterns

### LocalStorage Strategy

- **Automatic Persistence:** `persist()` utility wraps stores
- **Migration Support:** Version-aware state migrations
- **Graceful Fallbacks:** Handles storage failures and corruption
- **Selective Persistence:** Not all state is persisted (e.g., temporary UI state)

### URL State Serialization

```typescript
State Object → JSON → Pako Compression → Base64 → URL Hash
```

- **Shareable URLs:** Complete application state in URL
- **Compression:** Pako reduces URL length significantly
- **Security:** State validation prevents XSS via URL manipulation

## Error Handling Patterns

### Graceful Degradation

- **Parse Errors:** Show error details without breaking UI
- **Network Failures:** Continue working with cached state
- **Storage Failures:** Fallback to session-only state
- **Service Unavailability:** Disable related features without crash

### Error Boundary Strategy

- **Parse Level:** Mermaid syntax error handling
- **Component Level:** Component error boundaries
- **Application Level:** Global error handlers
- **User Feedback:** Clear error messages with recovery suggestions

## Integration Patterns

### External Service Integration

**Lazy Loading Pattern:**

```typescript
// Services loaded only when needed
const exportToPNG = () => (rendererUrl ? generatePNG() : showUnavailable());
```

**Fallback Strategy:**

- Primary service unavailable → Secondary service
- All services unavailable → Feature disabled with message
- Network error → Retry with exponential backoff

### Monaco Editor Integration

- **Custom Language Definition:** Mermaid syntax highlighting
- **Real-time Validation:** Error markers from parse results
- **Responsive Sizing:** Dynamic editor resizing
- **Performance Optimization:** Debounced updates

## Performance Patterns

### Optimization Strategies

- **Debounced Updates:** Prevent excessive re-rendering
- **Derived State Caching:** Expensive computations cached
- **Component Lazy Loading:** Load features on demand
- **Asset Optimization:** Vite handles bundling and splitting

### Memory Management

- **Store Cleanup:** Proper subscription management
- **Event Listener Cleanup:** Prevent memory leaks
- **Component Lifecycle:** Proper mount/unmount handling
- **Service Worker Caching:** Efficient asset caching

## Security Patterns

### Input Sanitization

- **Mermaid Security Level:** Enforced 'strict' mode
- **XSS Prevention:** No dynamic code execution
- **URL Validation:** State deserialization safety
- **Content Security Policy:** Browser-level protection

### Safe State Loading

```typescript
// State loading with validation
try {
  state = deserializeState(urlData);
  validateStateStructure(state);
  sanitizeUserInput(state.code);
} catch {
  fallbackToDefaultState();
}
```

## Testing Patterns

### Test Organization Strategy

- **Unit Tests:** Individual utility functions and components
- **Integration Tests:** Component interaction testing
- **E2E Tests:** Full user workflow testing
- **Visual Regression:** Screenshot-based testing for diagrams

### Test Utilities Pattern

- **Shared Fixtures:** Common test data and setup
- **Mock Strategies:** Service mocking for isolated testing
- **Test Environment:** jsdom for unit tests, real browsers for E2E

## Deployment Patterns

### Static Site Generation

- **Build-time Rendering:** All routes pre-generated
- **Asset Optimization:** Automatic minification and compression
- **Progressive Enhancement:** Works with JavaScript disabled (basic functionality)
- **Service Worker:** Offline-first PWA capabilities

### Multi-environment Support

- **Environment Variables:** MERMAID\_ prefix for configuration
- **Feature Flags:** Optional service integrations
- **Build Variants:** Development vs. production optimizations
- **Docker Support:** Consistent deployment environments

## Extension Patterns

### Plugin Architecture Preparation

- **Modular Components:** Easy to extend with new diagram types
- **Service Abstraction:** External services as pluggable modules
- **Configuration System:** JSON-based Mermaid configuration
- **Theme System:** Extensible theme management

### Future-Proofing

- **Version Migration:** Built-in state migration system
- **Backward Compatibility:** Graceful handling of old state formats
- **API Abstraction:** Services behind abstract interfaces
- **Configuration Externalization:** Easy feature toggling
