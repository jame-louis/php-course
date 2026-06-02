import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to prefix absolute asset paths with base URL
 * Transforms /assets/... to /base-url/assets/...
 */
export function rehypeAssetPrefix(baseUrl = '') {
  // Normalize base URL: ensure it starts with / and doesn't end with /
  const base = baseUrl ? `/${baseUrl.replace(/^\//, '').replace(/\/$/, '')}` : '';

  return function(tree) {
    visit(tree, 'element', (node) => {
      // Handle img src
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (src.startsWith('/assets/') || src.startsWith('/images/')) {
          node.properties.src = `${base}${src}`;
        }
      }

      // Handle source srcset (for responsive images)
      if (node.tagName === 'source' && node.properties?.srcset) {
        const srcset = node.properties.srcset;
        if (srcset.startsWith('/assets/') || srcset.startsWith('/images/')) {
          node.properties.srcset = `${base}${srcset}`;
        }
      }
    });
  };
}
