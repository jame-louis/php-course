import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://jame-louis.github.io',
  base: '/course-template-astro/',
  output: 'static',
  integrations: [sitemap()],
  redirects: {
    '/schedule': '/course-template-astro/syllabus',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  }
});
