import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * HMR creates state inconsistencies, so we always reload the page.
 * @type {import('vite').PluginOption} PluginOption
 */
const alwaysFullReload = {
  name: 'always-full-reload',
  handleHotUpdate({ server }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    server.ws.send({ type: 'full-reload' });
    return [];
  }
};

export default defineConfig({
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: {
          editor: ['monaco-editor', 'codemirror'],
          mermaid: ['mermaid'],
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  envPrefix: 'MERMAID_',
  plugins: [
    react(),
    alwaysFullReload
  ],
  preview: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname
    }
  },
  server: {
    host: true,
    port: 3000
  },
  test: {
    coverage: {
      exclude: ['src/mocks', 'docs', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
      reporter: ['text', 'json', 'html', 'lcov']
    },
    environment: 'jsdom',
    exclude: [
      'tests/**/*',
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    // in-source testing
    includeSource: ['src/**/*.{js,ts,tsx}'],
    setupFiles: ['./src/tests/setup.ts']
  }
});