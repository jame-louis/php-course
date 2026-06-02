import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAssetPrefix } from './src/plugins/rehypeAssetPrefix.mjs';

export default defineConfig({
  site: 'https://jame-louis.github.io',
  base: '/php-course/',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeAssetPrefix, '/php-course']
    ]
  }
});
