import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { renderHead, robotsTxt, sitemapXml, llmsTxt } from './seo.js'
export { routes, notFoundRoute, redirects } from './routes.js'

export function render(path) {
  return renderToString(<App path={path} />)
}
