import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import makeManifest from './utils/plugins/make-manifest';
import buildContentScript from './utils/plugins/build-content-script';
import { outputFolderName } from './utils/constants';
 
const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, outputFolderName);
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      '@src': root,
      // '@src/codegen': root + "/codegen",
      '@assets': assetsDir,
      '@pages': pagesDir,
    },
  },
  plugins: [react(), makeManifest(), buildContentScript()],
  publicDir,
  build: {
    outDir,
    sourcemap: process.env.__DEV__ === 'true',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        // util: resolve(root, 'util', 'util.ts'),
        // api: resolve(root, 'codegen', 'index.ts'),
        // base: resolve(root, 'codegen', 'base.ts'),
        // common: resolve(root, 'codegen', 'common.ts'),
        // index: resolve(root, 'codegen', 'api.ts'),
        devtools: resolve(pagesDir, 'devtools', 'index.html'),
        panel: resolve(pagesDir, 'panel', 'index.html'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        newtab: resolve(pagesDir, 'newtab', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
      },
      // external: './src',
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
      },
    },
  },
});
