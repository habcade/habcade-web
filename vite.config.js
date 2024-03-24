import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    cacheDir: '.vite',
    base: "./",
    plugins: [react(), splitVendorChunkPlugin()],
    optimizeDeps: {
        parallel: true,
    }
});
