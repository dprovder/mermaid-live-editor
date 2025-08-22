import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render function that includes common providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Initial route for React Router
   */
  initialRoute?: string;
  /**
   * Whether to wrap with React Router
   */
  withRouter?: boolean;
}

/**
 * Enhanced render function with common providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { initialRoute = '/', withRouter = false, ...renderOptions } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    if (withRouter) {
      // Set initial route if using Router
      if (initialRoute !== '/') {
        window.history.pushState({}, 'Test page', initialRoute);
      }

      return <BrowserRouter>{children}</BrowserRouter>;
    }

    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Setup user-event with sensible defaults
 */
export function setupUserEvent() {
  return userEvent.setup();
}

/**
 * Helper to create a mock function with TypeScript support
 */
export function createMockFn<T extends (...args: any[]) => any>(): T {
  return vi.fn() as T;
}

/**
 * Helper to wait for async operations to complete
 */
export async function waitForAsyncOperations() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Mock local storage
 */
export function mockLocalStorage() {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    length: 0,
    key: vi.fn()
  };
}

/**
 * Mock session storage
 */
export function mockSessionStorage() {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    length: 0,
    key: vi.fn()
  };
}

/**
 * Mock window location
 */
export function mockWindowLocation(url = 'http://localhost:3000/') {
  const location = new URL(url);

  Object.defineProperty(window, 'location', {
    value: {
      href: location.href,
      protocol: location.protocol,
      host: location.host,
      hostname: location.hostname,
      port: location.port,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      origin: location.origin,
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn()
    },
    writable: true
  });
}

/**
 * Helper to create test data for Mermaid diagrams
 */
export function createTestDiagramData() {
  return {
    simple: 'graph TD\n  A-->B',
    flowchart: `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]`,
    sequence: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`,
    classDiagram: `classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label`
  };
}

/**
 * Helper to create test state data
 */
export function createTestStateData() {
  return {
    code: 'graph TD\n  A-->B',
    mermaid: '{"theme": "default"}',
    autoSync: true,
    panZoom: true,
    grid: false,
    rough: false,
    editorMode: 'code' as const
  };
}

/**
 * Mock fetch with configurable responses
 */
export function mockFetch(responses: Record<string, any> = {}) {
  return vi.fn().mockImplementation((url: string) => {
    const response = responses[url] || { ok: true, json: () => Promise.resolve({}) };
    return Promise.resolve(response);
  });
}

/**
 * Helper to mock canvas context
 */
export function mockCanvasContext() {
  const context = {
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Array(4) })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => ({ data: new Array(4) })),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn()
  };

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => context
  });

  return context;
}

/**
 * Helper to create a mock file for file upload tests
 */
export function createMockFile(name = 'test.txt', content = 'test content', type = 'text/plain') {
  return new File([content], name, { type });
}

/**
 * Helper to trigger a custom event
 */
export function triggerCustomEvent(element: Element, eventType: string, eventData: any = {}) {
  const event = new CustomEvent(eventType, { detail: eventData });
  element.dispatchEvent(event);
}

/**
 * Helper to mock SVG elements which don't have methods in jsdom
 */
export function mockSVGElements() {
  Object.defineProperty(SVGElement.prototype, 'getBBox', {
    value: () => ({ x: 0, y: 0, width: 100, height: 100 })
  });

  Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
    value: () => 100
  });

  Object.defineProperty(SVGElement.prototype, 'getScreenCTM', {
    value: () => ({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0,
      inverse: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
    })
  });
}

// Re-export everything from @testing-library/react for convenience
export * from '@testing-library/react';
export { userEvent };

// Make vi available for tests
export { vi } from 'vitest';
