import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  external: ['react', 'react-dom'],
  // To support React Server Components
  banner: {
    js: '"use client";',
  },
});
