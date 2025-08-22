import { vi } from 'vitest';

// Mock Mermaid library
export default {
  initialize: vi.fn(),
  parse: vi.fn().mockResolvedValue({
    parser: 'success'
  }),
  render: vi.fn().mockResolvedValue({
    svg: '<svg><g><text>Mocked Diagram</text></g></svg>',
    bindFunctions: undefined
  }),
  mermaidAPI: {
    initialize: vi.fn(),
    parse: vi.fn().mockResolvedValue(true),
    render: vi.fn().mockResolvedValue('<svg><g><text>Mocked Diagram</text></g></svg>'),
    getDiagramFromText: vi.fn().mockReturnValue({
      type: 'flowchart',
      parser: {
        parse: vi.fn()
      }
    }),
    getSiteConfig: vi.fn().mockReturnValue({
      theme: 'default'
    }),
    updateSiteConfig: vi.fn(),
    reset: vi.fn(),
    globalReset: vi.fn()
  },
  parseError: vi.fn()
};

// Export additional types that might be imported
export const mermaidAPI = {
  initialize: vi.fn(),
  parse: vi.fn(),
  render: vi.fn(),
  getDiagramFromText: vi.fn(),
  getSiteConfig: vi.fn(),
  updateSiteConfig: vi.fn(),
  reset: vi.fn(),
  globalReset: vi.fn()
};
