import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import path from 'node:path';

export default defineConfig({
  integrations: [react(), icon({ iconDir: 'src/assets/icons' })],
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@utils': path.resolve('./src/utils'),
        '@assets': path.resolve('./src/assets'),
        '@styles': path.resolve('./src/styles'),
      },
    },
  },
});