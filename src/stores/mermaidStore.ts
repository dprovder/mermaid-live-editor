import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { debounce } from 'lodash-es';
import type { MermaidConfig } from 'mermaid';
import type { MermaidStore, State, ValidatedState, ErrorHash, MarkerData } from '../types';

// Import utility functions - these will be migrated/updated later
// For now we'll create placeholder implementations

// Default state matching current SvelteKit implementation
const defaultState: State = {
  code: `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
  `,
  grid: true,
  mermaid: JSON.stringify({ theme: 'default' }, undefined, 2),
  panZoom: true,
  rough: false,
  updateDiagram: true
};

const urlParseFailedState = `flowchart TD
    A[Loading URL failed. We can try to figure out why.] -->|Decode JSON| B(Please check the console to see the JSON and error details.)
    B --> C{Is the JSON correct?}
    C -->|Yes| D(Please Click here to Raise an issue in github.<br/>Including the broken link in the issue <br/> will speed up the fix.)
    C -->|No| E{Did someone <br/>send you this link?}
    E -->|Yes| F[Ask them to send <br/>you the complete link]
    E -->|No| G{Did you copy <br/> the complete URL?}
    G --> |Yes| D
    G --> |"No :("| H(Try using the Timeline tab in History <br/>from same browser you used to create the diagram.)
    click D href "https://github.com/mermaid-js/mermaid-live-editor/issues/new?assignees=&labels=bug&template=bug_report.md&title=Broken%20link" "Raise issue"`;

// Placeholder functions for utilities that will be migrated
const formatJSON = (data: unknown): string => JSON.stringify(data, undefined, 2);

// Placeholder for mermaid parsing - will be replaced with actual implementation
const mockParse = async (code: string) => {
  // Simple mock implementation for now
  return { diagramType: 'flowchart' };
};

// Placeholder for serialization - will be replaced with actual implementation
const mockSerialize = (state: State): string => {
  return JSON.stringify(state);
};

// Placeholder for deserialization - will be replaced with actual implementation
const mockDeserialize = (data: string): State => {
  try {
    return JSON.parse(data) as State;
  } catch {
    return defaultState;
  }
};

// Placeholder for error handling utilities
const extractErrorLineText = (errorString: string): string => {
  // Simplified implementation for now
  return errorString;
};

const findMostRelevantLineNumber = (errorText: string, code: string): number => {
  // Simplified implementation for now
  return 1;
};

const replaceLineNumberInErrorMessage = (errorString: string, lineNumber: number): string => {
  // Simplified implementation for now
  return errorString;
};

let lastDiagramType = '';
let renderCount = 0;

// Create the Zustand store
export const useMermaidStore = create<MermaidStore>()(
  subscribeWithSelector((set, get): MermaidStore => {
    // Initialize with default state
    const initialState: ValidatedState = {
      ...defaultState,
      editorMode: 'code' as const,
      error: undefined,
      errorMarkers: [],
      serialized: mockSerialize(defaultState)
    };

    // Process state function (migrated from current implementation)
    const processState = async (state: State): Promise<ValidatedState> => {
      const processed: ValidatedState = {
        ...state,
        editorMode: state.editorMode ?? 'code',
        error: undefined,
        errorMarkers: [],
        serialized: ''
      };

      try {
        processed.serialized = mockSerialize(state);
        const { diagramType } = await mockParse(state.code);
        processed.diagramType = diagramType;

        if (lastDiagramType === 'zenuml' && diagramType !== lastDiagramType) {
          // Temp Hack to refresh page after displaying ZenUML.
          setTimeout(() => window.location.reload(), 500);
        }
        lastDiagramType = diagramType;
        JSON.parse(state.mermaid);
      } catch (error) {
        processed.error = error as Error;
        console.error(error);

        if ('hash' in error) {
          try {
            let errorString = processed.error.toString();
            const errorLineText = extractErrorLineText(errorString);
            const realLineNumber = findMostRelevantLineNumber(errorLineText, state.code);

            let first_line: number, last_line: number, first_column: number, last_column: number;
            try {
              ({ first_line, last_line, first_column, last_column } = (
                error.hash as ErrorHash
              ).loc);
            } catch {
              const lineNo = findMostRelevantLineNumber(errorString, state.code);
              first_line = lineNo;
              last_line = lineNo + 1;
              first_column = 0;
              last_column = 0;
            }

            if (realLineNumber !== -1) {
              errorString = replaceLineNumberInErrorMessage(errorString, realLineNumber);
            }

            processed.error = new Error(errorString);
            const marker: MarkerData = {
              endColumn: last_column + (first_column === last_column ? 0 : 5),
              endLineNumber: last_line + (realLineNumber - first_line),
              message: errorString || 'Syntax error',
              severity: 8, // Error
              startColumn: first_column,
              startLineNumber: realLineNumber
            };
            processed.errorMarkers = [marker];
          } catch (error) {
            console.error('Error without line helper', error);
          }
        }
      }
      return processed;
    };

    // Return the store object
    return {
      // Initial state
      ...initialState,

      // Actions
      updateCode: (code: string, { updateDiagram = false, resetPanZoom = false } = {}) => {
        set((state) => {
          const newState = { ...state, code, updateDiagram };
          if (resetPanZoom) {
            newState.pan = undefined;
            newState.zoom = undefined;
          }

          // Process the new state asynchronously
          processState(newState).then((processed) => {
            set(processed);
          });

          return newState;
        });
      },

      updateConfig: (config: string) => {
        get().updateCodeStore({ mermaid: config });
      },

      updateCodeStore: (newState: Partial<State>) => {
        set((state) => {
          renderCount++;
          const updatedState = { ...state, ...newState, renderCount };

          // Process the updated state asynchronously
          processState(updatedState).then((processed) => {
            set(processed);
          });

          return updatedState;
        });
      },

      loadState: (data: string) => {
        let state: State;
        console.log(`Loading '${data}'`);

        try {
          state = mockDeserialize(data);
          if (!state.mermaid) {
            state.mermaid = defaultState.mermaid;
          }

          const mermaidConfig: MermaidConfig =
            typeof state.mermaid === 'string'
              ? (JSON.parse(state.mermaid) as MermaidConfig)
              : state.mermaid;

          if (
            mermaidConfig.securityLevel &&
            mermaidConfig.securityLevel !== 'strict' &&
            confirm(
              `Removing "securityLevel":"${mermaidConfig.securityLevel}" from the config for safety.\nClick Cancel if you trust the source of this Diagram.`
            )
          ) {
            delete mermaidConfig.securityLevel; // Prevent setting overriding securityLevel when loading state to mitigate possible XSS attack
          }
          state.mermaid = formatJSON(mermaidConfig);
        } catch (error) {
          state = get();
          if (data) {
            console.error('Init error', error);
            state.code = urlParseFailedState;
            state.mermaid = defaultState.mermaid;
          }
        }

        get().updateCodeStore(state);
      },

      toggleDarkTheme: (dark: boolean) => {
        set((state) => {
          const config = JSON.parse(state.mermaid) as MermaidConfig;
          if (!config.theme || ['dark', 'default'].includes(config.theme)) {
            config.theme = dark ? 'dark' : 'default';
          }

          const newState = { ...state, mermaid: formatJSON(config) };

          // Process the new state asynchronously
          processState(newState).then((processed) => {
            set(processed);
          });

          return newState;
        });
      },

      verifyState: () => {
        set((state) => {
          if (!state.panZoom) {
            return { ...state, panZoom: true };
          }
          return state;
        });
      },

      getStateString: () => {
        return JSON.stringify(get());
      },

      initURLSubscription: () => {
        const updateHash = debounce((hash: string) => {
          history.replaceState(undefined, '', `#${hash}`);
        }, 250);

        // Subscribe to serialized state changes
        const unsubscribe = useMermaidStore.subscribe(
          (state) => state.serialized,
          (serialized) => {
            updateHash(serialized);
          }
        );

        // Return cleanup function
        return unsubscribe;
      }
    };
  })
);

// Export the store for external access
export default useMermaidStore;
