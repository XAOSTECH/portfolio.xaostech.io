import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: cloudflare({
    sessionKVBindingName: 'SESSIONS_KV',
    prerenderEnvironment: 'node',
    imageService: 'compile',
  }),
  site: 'https://portfolio.xaostech.io',
  // CSP is emitted from src/middleware.ts (single source of truth).
  // See shared/types/security.ts for why Astro's security.csp was removed.
});
