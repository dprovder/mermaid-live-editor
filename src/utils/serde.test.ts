import { describe, it, expect, beforeEach } from 'vitest';
import { serializeState, deserializeState, pakoSerde } from './serde';
import type { State } from '../types';

describe('serde utilities', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = {
      code: 'graph TD\n  A-->B',
      mermaid: '{"theme": "default"}',
      autoSync: true,
      panZoom: true,
      grid: false,
      rough: false,
      editorMode: 'code'
    };
  });

  describe('serializeState', () => {
    it('serializes state with pako by default', () => {
      const result = serializeState(mockState);
      
      expect(result).toBeTypeOf('string');
      expect(result).toMatch(/^pako:/);
    });

    it('serializes state with base64 when specified', () => {
      const result = serializeState(mockState, 'base64');
      
      expect(result).toBeTypeOf('string');
      expect(result).toMatch(/^base64:/);
    });

    it('throws error for unknown serde type', () => {
      expect(() => {
        // @ts-expect-error - intentionally passing invalid type
        serializeState(mockState, 'invalid');
      }).toThrow('Unknown serde type: invalid');
    });

    it('produces different output for different serde types', () => {
      const pakoResult = serializeState(mockState, 'pako');
      const base64Result = serializeState(mockState, 'base64');
      
      expect(pakoResult).not.toBe(base64Result);
      expect(pakoResult.startsWith('pako:')).toBe(true);
      expect(base64Result.startsWith('base64:')).toBe(true);
    });
  });

  describe('deserializeState', () => {
    it('deserializes pako serialized state', () => {
      const serialized = serializeState(mockState, 'pako');
      const result = deserializeState(serialized);
      
      expect(result).toEqual(mockState);
    });

    it('deserializes base64 serialized state', () => {
      const serialized = serializeState(mockState, 'base64');
      const result = deserializeState(serialized);
      
      expect(result).toEqual(mockState);
    });

    it('handles legacy format without type prefix (assumes base64)', () => {
      // Create a base64-only serialized string (without prefix)
      const json = JSON.stringify(mockState);
      const base64Only = btoa(json);
      
      const result = deserializeState(base64Only);
      expect(result).toEqual(mockState);
    });

    it('throws error for unknown serde type in prefixed format', () => {
      expect(() => {
        deserializeState('invalid:somedata');
      }).toThrow('Unknown serde type: invalid');
    });

    it('handles empty state object', () => {
      const emptyState = {} as State;
      const serialized = serializeState(emptyState);
      const result = deserializeState(serialized);
      
      expect(result).toEqual(emptyState);
    });
  });

  describe('pakoSerde', () => {
    it('compresses and decompresses data correctly', () => {
      const testString = 'This is a test string that should be compressed and decompressed correctly.';
      
      const compressed = pakoSerde.serialize(testString);
      const decompressed = pakoSerde.deserialize(compressed);
      
      expect(decompressed).toBe(testString);
    });

    it('produces compressed output that is different from input', () => {
      const testString = 'This is a test string for compression.';
      const compressed = pakoSerde.serialize(testString);
      
      expect(compressed).not.toBe(testString);
      expect(compressed.length).toBeGreaterThan(0);
    });

    it('handles unicode characters correctly', () => {
      const unicodeString = '测试 🚀 العربية';
      
      const compressed = pakoSerde.serialize(unicodeString);
      const decompressed = pakoSerde.deserialize(compressed);
      
      expect(decompressed).toBe(unicodeString);
    });

    it('handles empty string', () => {
      const empty = '';
      
      const compressed = pakoSerde.serialize(empty);
      const decompressed = pakoSerde.deserialize(compressed);
      
      expect(decompressed).toBe(empty);
    });
  });

  describe('round-trip serialization', () => {
    it('maintains data integrity through multiple serialize/deserialize cycles', () => {
      let state = mockState;
      
      // Perform multiple round trips
      for (let i = 0; i < 3; i++) {
        const serialized = serializeState(state);
        state = deserializeState(serialized);
      }
      
      expect(state).toEqual(mockState);
    });

    it('handles complex state objects with nested data', () => {
      const complexState: State = {
        ...mockState,
        code: `graph TD
          A[Start] --> B{Is it?}
          B -->|Yes| C[OK]
          B -->|No| D[End]`,
        mermaid: JSON.stringify({
          theme: 'dark',
          themeVariables: {
            primaryColor: '#ff0000',
            primaryTextColor: '#ffffff'
          },
          flowchart: {
            htmlLabels: true
          }
        })
      };
      
      const serialized = serializeState(complexState);
      const result = deserializeState(serialized);
      
      expect(result).toEqual(complexState);
    });
  });
});