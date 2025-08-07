import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: '../e-poka.frontend/build',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'public/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@poka': path.resolve(__dirname, 'src/features/poka'),
        '@chinese': path.resolve(__dirname, 'src/features/chinese'),
        '@account': path.resolve(__dirname, 'src/features/account'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@ui': path.resolve(__dirname, 'src/components/ui'),
        '@layout': path.resolve(__dirname, 'src/components/layout'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@icons': path.resolve(__dirname, 'src/assets/icons'),
      },
    },
  };
});
