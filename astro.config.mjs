// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO(deploy): replace with the real GitHub Pages URL, e.g. https://<username>.github.io
  site: 'https://dunyi-zhou.github.io',
  // User-site repo (<username>.github.io) -> '/'; project-site repo -> '/<repo>/'
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
