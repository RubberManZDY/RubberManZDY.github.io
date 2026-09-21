// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rubbermanzdy.github.io',
  // User-site repo (<username>.github.io) -> '/'; project-site repo -> '/<repo>/'
  base: '/',
  // Hide the Astro dev toolbar (bottom bar in `npm run dev`)
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
