export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Serve favicon and images from R2 (with fallback to public/)
    if (pathname === '/XAOSTECH_LOGO.png' || pathname.startsWith('/img/')) {
      const filename = pathname === '/XAOSTECH_LOGO.png' ? 'XAOSTECH_LOGO.png' : pathname.replace(/^\/img\//, '');
      try {
        if (env.IMG) {
          const object = await env.IMG.get(filename);
          if (object) {
            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set('Cache-Control', 'public, max-age=604800');
            return new Response(object.body, { headers });
          }
        }
      } catch (err) {
        console.error(`Failed to serve image ${filename}:`, err);
      }
    }

    // Serve static files from dist/
    return fetch(request);
  },
};
