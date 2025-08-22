import { useCallback, useEffect } from 'react';
import { useMermaidStore } from '../stores/mermaidStore';
import type { ValidatedState } from '../types';

/**
 * Main hook for accessing Mermaid state and actions
 * Provides the complete store interface with optimized selectors
 */
export const useMermaidState = () => {
  return useMermaidStore();
};

/**
 * Hook for accessing only the current validated state
 * Optimized for components that only need to read state
 */
export const useCurrentState = (): ValidatedState => {
  return useMermaidStore((state) => state as ValidatedState);
};

/**
 * Hook for accessing only the code value
 * Optimized for components that only need the diagram code
 */
export const useCode = (): string => {
  return useMermaidStore((state) => state.code);
};

/**
 * Hook for accessing only the Mermaid configuration
 * Optimized for config editor components
 */
export const useMermaidConfig = (): string => {
  return useMermaidStore((state) => state.mermaid);
};

/**
 * Hook for accessing editor mode state
 * Optimized for editor toggle components
 */
export const useEditorMode = () => {
  return useMermaidStore((state) => state.editorMode);
};

/**
 * Hook for accessing error state and markers
 * Optimized for error display components
 */
export const useErrorState = () => {
  return useMermaidStore((state) => ({
    error: state.error,
    errorMarkers: state.errorMarkers
  }));
};

/**
 * Hook for accessing pan/zoom state
 * Optimized for view control components
 */
export const usePanZoom = () => {
  return useMermaidStore((state) => ({
    panZoom: state.panZoom,
    pan: state.pan,
    zoom: state.zoom
  }));
};

/**
 * Hook for accessing visual options
 * Optimized for toolbar components
 */
export const useVisualOptions = () => {
  return useMermaidStore((state) => ({
    grid: state.grid,
    rough: state.rough
  }));
};

/**
 * Hook for actions only - doesn't cause re-renders on state changes
 * Optimized for components that only need to dispatch actions
 */
export const useMermaidActions = () => {
  const updateCode = useMermaidStore((state) => state.updateCode);
  const updateConfig = useMermaidStore((state) => state.updateConfig);
  const updateCodeStore = useMermaidStore((state) => state.updateCodeStore);
  const loadState = useMermaidStore((state) => state.loadState);
  const toggleDarkTheme = useMermaidStore((state) => state.toggleDarkTheme);
  const verifyState = useMermaidStore((state) => state.verifyState);
  const getStateString = useMermaidStore((state) => state.getStateString);
  const initURLSubscription = useMermaidStore((state) => state.initURLSubscription);

  return {
    updateCode,
    updateConfig,
    updateCodeStore,
    loadState,
    toggleDarkTheme,
    verifyState,
    getStateString,
    initURLSubscription
  };
};

/**
 * Hook for URL-related state and actions
 * Optimized for sharing and export components
 */
export const useUrlState = () => {
  const serialized = useMermaidStore((state) => state.serialized);
  const initURLSubscription = useMermaidStore((state) => state.initURLSubscription);
  const loadState = useMermaidStore((state) => state.loadState);

  // Initialize URL subscription on mount
  useEffect(() => {
    const unsubscribe = initURLSubscription();
    return unsubscribe;
  }, [initURLSubscription]);

  return {
    serialized,
    loadState
  };
};

/**
 * Hook for theme-related functionality
 * Optimized for theme toggle components
 */
export const useTheme = () => {
  const mermaid = useMermaidStore((state) => state.mermaid);
  const toggleDarkTheme = useMermaidStore((state) => state.toggleDarkTheme);

  const getCurrentTheme = useCallback(() => {
    try {
      const config = JSON.parse(mermaid);
      return config.theme || 'default';
    } catch {
      return 'default';
    }
  }, [mermaid]);

  const isDarkTheme = useCallback(() => {
    const theme = getCurrentTheme();
    return theme === 'dark';
  }, [getCurrentTheme]);

  return {
    currentTheme: getCurrentTheme(),
    isDarkTheme: isDarkTheme(),
    toggleDarkTheme
  };
};

/**
 * Hook for diagram rendering state
 * Optimized for view components that render diagrams
 */
export const useDiagramState = () => {
  return useMermaidStore((state) => ({
    code: state.code,
    mermaid: state.mermaid,
    updateDiagram: state.updateDiagram,
    diagramType: state.diagramType,
    error: state.error,
    renderCount: state.renderCount
  }));
};

/**
 * Hook for editor-specific state
 * Optimized for editor components
 */
export const useEditorState = () => {
  return useMermaidStore((state) => ({
    code: state.code,
    mermaid: state.mermaid,
    editorMode: state.editorMode,
    error: state.error,
    errorMarkers: state.errorMarkers
  }));
};
