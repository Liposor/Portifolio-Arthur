import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const path = (env.VITE_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')
  const base = path ? `/${path}/` : '/'
  const url = env.VITE_SITE_URL?.replace(/\/+$/, '')
  return {
    base,
    plugins: [{
      name: 'share-metadata',
      transformIndexHtml(html) {
        const origin = url && new URL(url)
        if (!origin || !['http:', 'https:'].includes(origin.protocol)) return html.replace('<!-- SHARE -->', '')
        const canonical = origin.href.replace(/\/+$/, '') + '/'
        const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
        return html.replace('<!-- SHARE -->', [
          `<link rel="canonical" href="${escape(canonical)}">`,
          `<meta property="og:url" content="${escape(canonical)}">`,
          '<meta name="twitter:card" content="summary">'
        ].join('\n'))
      }
    }]
  }
})
