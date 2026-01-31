/**
 * =============================================================================
 * vite.config.ts - Vite Build Configuration
 * =============================================================================
 * 
 * Configuration for Vite bundler, optimized for production deployment.
 * 
 * Key Features:
 * - React plugin for JSX/TSX transformation
 * - Optimized chunking for better caching
 * - Asset organization with hash-based naming
 * - ESNext target for modern browsers
 * 
 * @see https://vitejs.dev/config/
 * =============================================================================
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // React plugin for JSX transformation and Fast Refresh
  plugins: [react()],

  // Base public path - '/' for root deployment on Vercel
  // Use './' for relative paths if deploying to subdirectory
  base: '/',

  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',

    // Disable sourcemaps in production for security and smaller bundle
    sourcemap: false,

    // Use esbuild for faster minification
    minify: 'esbuild',

    // Split CSS into separate files for better caching
    cssCodeSplit: true,

    // Warn if chunks exceed 500KB (helps identify bloated bundles)
    chunkSizeWarningLimit: 500,

    // Rollup-specific options for fine-grained control
    rollupOptions: {
      output: {
        /**
         * Manual Chunk Splitting
         * Separates vendor libraries into separate files for:
         * - Better caching (vendors change less frequently than app code)
         * - Parallel loading of chunks
         * - Smaller initial bundle size
         */
        manualChunks: {
          // React ecosystem in one chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Three.js and 3D libraries (largest dependency)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/postprocessing', 'postprocessing'],
          // GSAP animation library
          'vendor-gsap': ['gsap'],
        },

        /**
         * Asset Naming Strategy
         * Organizes output files into logical directories:
         * - Images: assets/images/
         * - CSS: assets/css/
         * - Other: assets/
         * 
         * Hash in filename enables long-term caching
         */
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // Image files
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // CSS files
          if (/\.css$/.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // All other assets
          return 'assets/[name]-[hash][extname]';
        },

        // JavaScript chunk files go to assets/js/
        chunkFileNames: 'assets/js/[name]-[hash].js',

        // Entry point files also go to assets/js/
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },

    // Target modern browsers for smaller, faster code
    target: 'esnext',

    // Disable module preload polyfill (not needed for modern browsers)
    modulePreload: {
      polyfill: false
    }
  },

  /**
   * Dependency Optimization
   * Pre-bundles these dependencies during dev server startup
   * for faster page loads during development
   */
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'three']
  }
})