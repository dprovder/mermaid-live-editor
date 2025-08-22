/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname
    }
  },
  test: {
    // Test environment configuration
    environment: 'happy-dom', // Fast DOM implementation, better for React testing

    // Setup files
    setupFiles: ['./src/tests/setup.ts'],

    // File patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'src/**/*.test.ts' // Include existing .test.ts files
    ],
    exclude: [
      'tests/**/*', // Exclude e2e tests directory
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'src/tests/**/*',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.d.ts',
        'docs/**/*',
        'tests/**/*',
        '**/node_modules/**',
        '**/.{idea,git,cache,output,temp}/**',
        'src/mocks/**/*'
      ],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      // Coverage thresholds
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    },

    // In-source testing for utility functions
    includeSource: ['src/**/*.{js,ts,tsx}'],

    // Test execution configuration
    globals: true, // Enable global test functions (describe, it, expect)
    clearMocks: true, // Clear mocks between tests
    restoreMocks: true, // Restore mocks after tests

    // Timeout configuration
    testTimeout: 10000, // 10 seconds for component tests
    hookTimeout: 10000, // 10 seconds for hooks

    // Watch mode configuration
    watch: {
      // Ignore node_modules and build directories
      ignored: ['**/node_modules/**', '**/dist/**', '**/docs/**']
    },

    // Reporter configuration
    reporter: process.env.CI ? ['basic'] : ['verbose'],

    // Pool options for better performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4
      }
    }
  }
});
