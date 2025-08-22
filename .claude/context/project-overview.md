---
created: 2025-08-22T16:08:49Z
last_updated: 2025-08-22T16:08:49Z
version: 1.0
author: Claude Code PM System
---

# Project Overview

## High-Level Summary

Mermaid Live Editor is the official web-based editor for creating, sharing, and exporting Mermaid diagrams. Built with SvelteKit and TypeScript, it provides a Monaco Editor-powered interface with real-time preview, comprehensive error handling, and instant URL-based sharing capabilities.

## Current Feature Set

### Core Editor Features

- **Monaco Editor Integration** - VS Code-style editor with syntax highlighting
- **Real-Time Preview** - Live diagram rendering as you type
- **Dual Editor Modes** - Code editing and JSON configuration tabs
- **Error Detection** - Real-time syntax error highlighting with line markers
- **Auto-completion** - Context-aware Mermaid syntax suggestions
- **Mobile Support** - Responsive editor interfaces for desktop and mobile

### Diagram Management

- **Multi-Format Support** - All Mermaid diagram types (flowchart, sequence, gantt, etc.)
- **Interactive Preview** - Pan, zoom, and grid overlay for diagram navigation
- **Theme System** - Light/dark modes with configurable Mermaid themes
- **Rough Mode** - Hand-drawn styling option for informal diagrams
- **State Persistence** - Automatic local storage of work in progress

### Sharing & Export Capabilities

- **URL State Encoding** - Complete application state in shareable URLs
- **Compression** - Pako compression keeps URLs manageable
- **Export Options** - SVG and PNG generation via external rendering services
- **Markdown Integration** - Copy diagrams as markdown with embedded images
- **History System** - Local version history for diagram iterations
- **Kroki Integration** - Alternative rendering pipeline support

### Developer Experience Features

- **PWA Support** - Progressive Web App with offline capabilities
- **Service Worker** - Asset caching and offline functionality
- **Performance Optimized** - Fast initial load and smooth interactions
- **Keyboard Shortcuts** - Power-user keyboard navigation
- **Error Recovery** - Graceful handling of parse errors and network issues

## Technical Architecture Overview

### Frontend Stack

- **SvelteKit 2.20.8** - Full-stack web framework with static site generation
- **TypeScript 5.8.3** - Type-safe development with strict mode
- **Vite 5.4.19** - Modern build tool with fast development server
- **TailwindCSS 3.4.17** - Utility-first styling with component variants
- **Monaco Editor 0.52.2** - Professional code editing experience

### State Management

- **Svelte Stores** - Reactive state management with derived stores
- **Central State Hub** - `src/lib/util/state.ts` manages all application state
- **Validation Pipeline** - Input validation and error handling layer
- **URL Synchronization** - Automatic URL hash updates with state changes
- **LocalStorage Persistence** - Automatic state persistence with migrations

### Rendering & Processing

- **Mermaid 11.10.0** - Latest Mermaid library with all diagram types
- **Real-Time Parsing** - Continuous diagram validation and rendering
- **Error Handling** - Comprehensive error parsing with line number mapping
- **External Services** - PNG/SVG generation via mermaid.ink and Kroki
- **Compression** - State compression for efficient URL sharing

## Integration Points

### External Service Integrations

- **Mermaid.ink Renderer** - Official PNG/SVG generation service
- **Kroki Service** - Alternative rendering pipeline
- **Plausible Analytics** - Privacy-focused usage analytics (optional)
- **GitHub Pages** - Static site hosting and deployment
- **Netlify** - Alternative hosting with continuous deployment

### Browser API Utilization

- **Service Worker API** - Offline functionality and asset caching
- **Local Storage API** - State persistence across sessions
- **Clipboard API** - Copy functionality for diagrams and URLs
- **URL API** - State serialization in URL fragments
- **Touch Events** - Mobile gesture support for pan/zoom

### Development Integrations

- **GitHub Actions** - Automated testing and deployment
- **Playwright** - End-to-end testing across browsers
- **Vitest** - Fast unit testing with coverage reporting
- **ESLint/Prettier** - Code quality and formatting
- **Husky** - Git hooks for pre-commit quality checks

## Current State Assessment

### Strengths

- **Modern Architecture** - Built with current best practices and technologies
- **Comprehensive Feature Set** - Covers all major use cases for Mermaid editing
- **Mobile-First Design** - Responsive and touch-friendly interface
- **Performance Optimized** - Fast load times and smooth interactions
- **Developer-Friendly** - Professional tooling and development experience
- **Community-Driven** - Open source with active community contributions

### Recent Improvements

- **Mermaid 11.10.0** - Updated to latest Mermaid version with new features
- **Docker Enhancements** - Improved CI/CD pipeline and deployment
- **Browser Compatibility** - Updated browserlist for modern browser support
- **Test Coverage** - Comprehensive E2E and unit test suites
- **Build Optimizations** - Enhanced Vite configuration and asset handling

### Active Development Areas

- **Performance Tuning** - Ongoing optimization for large diagrams
- **Mobile Experience** - Continuous improvement of touch interactions
- **Error Messaging** - Enhanced user feedback and error recovery
- **Accessibility** - WCAG compliance and keyboard navigation
- **Integration APIs** - Expanding external service integrations

## Usage Patterns & Metrics

### Primary Use Cases

1. **Quick Prototyping** - Rapid diagram creation for design discussions
2. **Documentation** - Technical documentation and architecture diagrams
3. **Education** - Teaching tool for computer science and systems concepts
4. **Collaboration** - Shareable diagrams for team communication
5. **Integration Testing** - Validating new Mermaid features and syntax

### Target Performance Metrics

- **Load Time** - <2 seconds initial page load
- **Interaction Response** - <100ms for editor interactions
- **Mobile Performance** - Comparable experience across devices
- **Uptime** - >99% availability for core functionality
- **Error Rate** - <5% of sessions encounter rendering issues

### Success Indicators

- **Monthly Active Users** - Steady growth in usage
- **Session Duration** - Average >5 minutes indicates engagement
- **Mobile Adoption** - >25% mobile traffic shows cross-platform success
- **Community Growth** - GitHub stars, contributions, and issue engagement
- **Ecosystem Integration** - Adoption by documentation tools and platforms

## Future Roadmap Context

### Near-Term Enhancements (Next 6 months)

- **Performance Optimization** - Large diagram handling improvements
- **Enhanced Mobile UX** - Better touch editing experience
- **Extended Export Options** - Additional format support and integrations
- **Improved Error Handling** - Better user feedback and recovery options
- **Accessibility Improvements** - WCAG 2.1 AA compliance

### Medium-Term Evolution (6-12 months)

- **API Development** - Programmatic access endpoints
- **Advanced Collaboration** - Enhanced sharing and version control
- **Plugin Architecture** - Extensibility for custom features
- **Analytics Integration** - Usage insights and optimization
- **Enterprise Features** - Custom deployment and configuration options

### Long-Term Vision (1-2 years)

- **Real-Time Collaboration** - Simultaneous multi-user editing
- **Advanced Editor Features** - IntelliSense, refactoring, code navigation
- **Ecosystem Expansion** - IDE plugins, CLI tools, and API ecosystem
- **AI Integration** - Smart diagram generation and optimization
- **Community Platform** - Diagram sharing and template marketplace

## Development Context

### Contribution Model

- **Open Source** - MIT licensed with community contributions welcome
- **GitHub-Centric** - Issues, PRs, and discussions on GitHub
- **Quality Standards** - Comprehensive testing and code review requirements
- **Community Guidelines** - Clear contribution and code of conduct policies

### Maintenance Philosophy

- **Stability First** - Backward compatibility and gradual enhancement
- **Performance Conscious** - Continuous monitoring and optimization
- **Security Aware** - Regular dependency updates and security scanning
- **User-Focused** - Community feedback drives feature prioritization
