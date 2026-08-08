// @ts-check
import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import icon from 'astro-icon'; // Make sure this is imported

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://naamaofir.com",

  integrations: [react(), sitemap(), icon()],

  vite: {
    plugins: [tailwindcss()]
  },
    adapter: netlify(),

});