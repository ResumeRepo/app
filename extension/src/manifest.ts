import type { Manifest } from 'webextension-polyfill';
import pkg from '../package.json';

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  description: pkg.description,
  options_ui: {
    page: 'src/pages/options/index.html',
  },
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon32.png',
  },
  // rewrite newtab content to custom page
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  devtools_page: 'src/pages/devtools/index.html',
  // @ts-ignore
  side_panel: {
    default_path: "src/pages/panel/index.html",
  },
  icons: {
    '16': 'icon16.png',
    '32': 'icon32.png',
    '48': 'icon48.png',
    '128': 'icon128.png',
  },
  permissions: [
    "activeTab",
    "sidePanel",
    "scripting",
    "tabs",
    "storage"
  ],
  content_scripts: [
    {
      run_at: "document_end",
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      css: ['contentStyle.css'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['contentStyle.css', 'icon-128.png', 'icon-34.png'],
      matches: [],
    },
  ],
  host_permissions: [
    "https://en.wikipedia.org/*", "https://engadget.com/*"
  ],
  content_security_policy: {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  externally_connectable: {
    "matches": ["https://*.nextrole.app/*", "https://*.nextrole.app/*", "*://localhost/*"]
  }
};

export default manifest;
