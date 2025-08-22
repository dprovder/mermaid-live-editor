import { vi } from 'vitest';

// Mock CodeMirror view
const mockView = {
  state: {
    doc: {
      toString: vi.fn().mockReturnValue(''),
      length: 0
    },
    selection: {
      main: {
        from: 0,
        to: 0
      }
    }
  },
  dispatch: vi.fn(),
  dom: document.createElement('div'),
  contentDOM: document.createElement('div'),
  scrollDOM: document.createElement('div'),
  destroy: vi.fn(),
  focus: vi.fn(),
  hasFocus: false,
  update: vi.fn(),
  requestMeasure: vi.fn()
};

// Mock EditorView constructor
export const EditorView = vi.fn().mockImplementation(() => mockView);

// Mock EditorState
export const EditorState = {
  create: vi.fn().mockReturnValue({
    doc: {
      toString: vi.fn().mockReturnValue(''),
      length: 0
    },
    selection: {
      main: {
        from: 0,
        to: 0
      }
    }
  })
};

// Mock basic extensions
export const basicSetup = vi.fn();
export const minimalSetup = vi.fn();

// Mock language extensions
export const json = vi.fn();
export const markdown = vi.fn();
export const yaml = vi.fn();

// Mock theme extensions
export const oneDark = vi.fn();
export const vscodeDark = vi.fn();
export const vscodeLight = vi.fn();

// Default export
export default {
  EditorView,
  EditorState,
  basicSetup,
  minimalSetup
};
