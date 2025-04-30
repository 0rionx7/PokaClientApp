import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    build: {
      outDir: '../e-poka.frontend/build',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    },
    plugins: [tsConfigPaths(), react()],
  };
});
