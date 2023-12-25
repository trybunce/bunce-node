import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    logHeapUsage: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
    },
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
    isolate: false,
    clearMocks: true,
    typecheck: {
      checker: 'tsc',
      tsconfig: './tsconfig.json',
    },
  },
})
