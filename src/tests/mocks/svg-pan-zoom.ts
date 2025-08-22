import { vi } from 'vitest';

// Mock svg-pan-zoom instance
const mockSvgPanZoom = {
  destroy: vi.fn(),
  zoom: vi.fn(),
  zoomIn: vi.fn(),
  zoomOut: vi.fn(),
  zoomBy: vi.fn(),
  zoomAtPoint: vi.fn(),
  zoomAtPointBy: vi.fn(),
  pan: vi.fn(),
  panBy: vi.fn(),
  fit: vi.fn(),
  contain: vi.fn(),
  center: vi.fn(),
  updateBBox: vi.fn(),
  resize: vi.fn(),
  reset: vi.fn(),
  resetZoom: vi.fn(),
  resetPan: vi.fn(),
  getZoom: vi.fn().mockReturnValue(1),
  getPan: vi.fn().mockReturnValue({ x: 0, y: 0 }),
  getSizes: vi.fn().mockReturnValue({
    width: 800,
    height: 600,
    realZoom: 1,
    viewBox: { x: 0, y: 0, width: 800, height: 600 }
  }),
  setBeforePan: vi.fn(),
  setOnPan: vi.fn(),
  setBeforeZoom: vi.fn(),
  setOnZoom: vi.fn(),
  setOnUpdatedCTM: vi.fn()
};

// Mock svg-pan-zoom factory function
const mockSvgPanZoomFactory = vi.fn().mockReturnValue(mockSvgPanZoom);

export default mockSvgPanZoomFactory;
