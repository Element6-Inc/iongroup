// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Add content config
  content: {
    // Enable content collections
    collections: {
      features: {
        type: 'content',
        directory: 'src/content/features',
      },
    },
  },
  
  server: {
    host: true, // Listen on all IPs
    watch: {
      // More aggressive polling settings
      usePolling: true,
      interval: 500,
      threshold: 0
    }
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        timeout: 30000,
        overlay: false,
        // Force client to use full reload
        clientPort: 4321
      },
      watch: {
        // Force Vite to use polling
        usePolling: true,
        interval: 500
      }
    }
  },
});