# Course Site

Astro-based static site for the course.

## Structure

- `src/content/lectures/` - Course lecture content (Markdown)
- `src/pages/` - Site pages (Home, Lectures, Assignments)
- `src/layouts/` - Page layouts
- `src/components/` - Reusable components

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build static site
npm run build

# Preview build
npm run preview
```

## Deployment

The site is configured for static output (`output: 'static'`). Deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify, etc.).

## Content Management

Lecture files are sourced from `../lectures/` and processed into `src/content/lectures/` with frontmatter added. To update content:

1. Edit files in `../lectures/`
2. Re-run the copy script to regenerate with updated frontmatter
3. Rebuild the site

## Features

- Lecture navigation with sidebar
- Previous/Next lecture links
- Syntax-highlighted code blocks
- Responsive design
- Links to Slidev presentations
- Assignments index
