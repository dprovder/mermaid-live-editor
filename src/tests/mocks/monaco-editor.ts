import { vi } from 'vitest';

// Mock editor instance
const mockEditor = {
  dispose: vi.fn(),
  getValue: vi.fn().mockReturnValue(''),
  setValue: vi.fn(),
  getModel: vi.fn(),
  setModel: vi.fn(),
  focus: vi.fn(),
  layout: vi.fn(),
  updateOptions: vi.fn(),
  onDidChangeModelContent: vi.fn().mockReturnValue({ dispose: vi.fn() }),
  onDidFocusEditorWidget: vi.fn().mockReturnValue({ dispose: vi.fn() }),
  onDidBlurEditorWidget: vi.fn().mockReturnValue({ dispose: vi.fn() }),
  addCommand: vi.fn(),
  addAction: vi.fn(),
  trigger: vi.fn(),
  setPosition: vi.fn(),
  getPosition: vi.fn(),
  revealLine: vi.fn(),
  revealLineInCenter: vi.fn(),
  setScrollTop: vi.fn(),
  getScrollTop: vi.fn(),
  deltaDecorations: vi.fn().mockReturnValue([]),
  createContextKey: vi.fn().mockReturnValue({
    set: vi.fn(),
    get: vi.fn(),
    reset: vi.fn()
  })
};

// Mock model
const mockModel = {
  dispose: vi.fn(),
  getValue: vi.fn().mockReturnValue(''),
  setValue: vi.fn(),
  onDidChangeContent: vi.fn().mockReturnValue({ dispose: vi.fn() }),
  updateOptions: vi.fn(),
  getLineCount: vi.fn().mockReturnValue(1),
  getLineContent: vi.fn().mockReturnValue(''),
  getPositionAt: vi.fn(),
  getOffsetAt: vi.fn(),
  validatePosition: vi.fn(),
  validateRange: vi.fn()
};

// Mock editor API
export const editor = {
  create: vi.fn().mockReturnValue(mockEditor),
  createModel: vi.fn().mockReturnValue(mockModel),
  setTheme: vi.fn(),
  defineTheme: vi.fn(),
  getModels: vi.fn().mockReturnValue([]),
  setModelLanguage: vi.fn(),
  getModel: vi.fn(),
  createDiffEditor: vi.fn(),
  onDidCreateEditor: vi.fn(),
  onDidCreateModel: vi.fn(),
  onWillDisposeModel: vi.fn(),
  remeasureFonts: vi.fn(),
  registerCommand: vi.fn(),
  registerEditorOpener: vi.fn()
};

// Mock languages API
export const languages = {
  register: vi.fn(),
  setMonarchTokensProvider: vi.fn(),
  registerCompletionItemProvider: vi.fn(),
  registerHoverProvider: vi.fn(),
  registerSignatureHelpProvider: vi.fn(),
  registerDefinitionProvider: vi.fn(),
  registerReferenceProvider: vi.fn(),
  registerDocumentFormattingEditProvider: vi.fn(),
  registerCodeActionProvider: vi.fn(),
  registerDocumentSymbolProvider: vi.fn(),
  getLanguages: vi.fn().mockReturnValue([]),
  onLanguage: vi.fn()
};

// Mock key codes and modifiers
export const KeyMod = {
  CtrlCmd: 1,
  Shift: 2,
  Alt: 4,
  WinCtrl: 8
};

export const KeyCode = {
  KeyS: 83,
  KeyZ: 90,
  KeyY: 89,
  Enter: 13,
  Escape: 27,
  Tab: 9,
  Space: 32,
  F1: 112,
  F5: 116
};

// Mock selection range
export const Range = vi.fn().mockImplementation((startLine, startColumn, endLine, endColumn) => ({
  startLineNumber: startLine,
  startColumn,
  endLineNumber: endLine,
  endColumn,
  isEmpty: vi.fn(),
  containsPosition: vi.fn(),
  containsRange: vi.fn()
}));

// Mock position
export const Position = vi.fn().mockImplementation((line, column) => ({
  lineNumber: line,
  column,
  equals: vi.fn(),
  isBefore: vi.fn(),
  isBeforeOrEqual: vi.fn()
}));

// Mock completion item kinds
export const CompletionItemKind = {
  Method: 0,
  Function: 1,
  Constructor: 2,
  Field: 3,
  Variable: 4,
  Class: 5,
  Struct: 6,
  Interface: 7,
  Module: 8,
  Property: 9,
  Event: 10,
  Operator: 11,
  Unit: 12,
  Value: 13,
  Constant: 14,
  Enum: 15,
  EnumMember: 16,
  Keyword: 17,
  Text: 18,
  Color: 19,
  File: 20,
  Reference: 21,
  Customcolor: 22,
  Folder: 23,
  TypeParameter: 24,
  User: 25,
  Issue: 26,
  Snippet: 27
};

// Default export
export default {
  editor,
  languages,
  KeyMod,
  KeyCode,
  Range,
  Position,
  CompletionItemKind
};
