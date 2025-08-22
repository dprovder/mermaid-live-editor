import { describe, it, expect } from 'vitest';

// Simple utility function for testing
function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

// Simple object utility
function deepClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}

describe('Simple Utilities', () => {
  describe('add function', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('adds negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('adds zero', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('multiply function', () => {
    it('multiplies two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
    });

    it('multiplies negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });

  describe('deepClone function', () => {
    it('clones simple objects', () => {
      const original = { name: 'test', value: 42 };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('clones arrays', () => {
      const original = [1, 2, 3, { nested: true }];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[3]).not.toBe(original[3]);
    });

    it('handles null', () => {
      expect(deepClone(null)).toBe(null);
    });

    it('handles primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
    });
  });
});
