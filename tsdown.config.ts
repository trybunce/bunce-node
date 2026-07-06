import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  format: ['esm', 'cjs'],
  platform: 'node',
  fixedExtension: false,
  target: 'node20',
  sourcemap: true,
  clean: true,
  dts: {
    sourcemap: true,
    resolver: 'tsc',
  },
  deps: {
    neverBundle: ['axios'],
  },
})
