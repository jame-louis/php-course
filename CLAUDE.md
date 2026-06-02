# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site template for university course websites. It provides a complete system for managing course lectures and assignments with features like progress tracking, search, and responsive design.

## Development Commands

```bash
# Install dependencies
command npm install

# Start development server
command npm run dev

# Build for production
command npm run build

# Preview production build
command npm run preview
```

## Content Architecture

Content is managed through Astro's content collections defined in `src/content.config.ts`:

- **lectures**: Course lectures with frontmatter metadata
- **assignments**: Homework assignments linked to lectures via `lectureRef`

Content files are stored in `src/content/{collection}/` as Markdown with YAML frontmatter.

### Lecture Frontmatter Schema

```yaml
---
title: string
lectureNumber: number
module: '基础入门' | '核心概念' 
description: string
duration: string
difficulty: 'beginner' | 'intermediate' | 'advanced'
prerequisites: string[]
tags: string[]
hasSlides: boolean
hasAssignment: boolean
slidevUrl: string (optional)
draft: boolean
---
```

### Assignment Frontmatter Schema

```yaml
---
title: string
assignmentNumber: number
lectureRef: string  # Matches lecture slug (e.g., "lecture01")
week: number (optional)
difficulty: 'easy' | 'medium' | 'hard'
estimatedHours: number (optional)
points: number (optional)
submissionFormat: string
downloadFile: string (optional)
dueDate: date (optional)
draft: boolean
---
```

## Central Configuration

`src/config.ts` is the single source of truth for site configuration:

- `site`: Site metadata (title, description, lang)
- `courseInfo`: Course details (name, textbook, prerequisites, assessment)
- `mainNavItems`: Top navigation links
- `courseModules`: Module definitions for lectures
- `moduleNames`: Derived array of valid module names
- `labels`: All UI text strings
- `lectureLabels`, `assignmentLabels`, `syllabusLabels`: Page-specific labels

Always modify this file when changing navigation, labels, or course structure.

## Layout Hierarchy

- `BaseLayout.astro`: Root HTML structure, global styles
- `CourseLayout.astro`: Course-specific chrome (header, navigation)
- `DocLayout.astro`: Content pages with sidebar navigation and TOC

## Key Components

- `src/components/navigation/Sidebar.astro`: Lecture navigation sidebar
- `src/components/content/TOCSidebar.astro`: Table of contents from headings
- `src/components/search/SearchModal.astro`: Fuse.js search modal integration

## Styling System

Uses Tailwind CSS v3 with custom theme defined in `src/styles/global.css`:

```css
@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}
```

Custom prose styles via `.prose-custom` class for content rendering.

## Client-Side Features

### Progress Tracking
`src/lib/progress.ts` provides localStorage-based progress tracking:
- `markComplete(slug)`, `markIncomplete(slug)`, `toggleComplete(slug)`
- `getCompletionPercentage(total)` for progress bar

Used in lecture pages with "Mark Complete" buttons.

### Search
Fuse.js is integrated for client-side search:
- Search index built from content collections at build time
- Search modal in `src/components/search/SearchModal.astro`
- Triggered via keyboard shortcut (Ctrl/Cmd+K) or button

## Build Configuration

- Static output (`output: 'static'`)
- Base URL: `/course-template-astro/` (configured in `astro.config.mjs`)
- Shiki syntax highlighting with GitHub Dark theme
- Rehype plugins: `rehype-slug`, `rehype-autolink-headings` for TOC generation

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to main. Also supports Netlify deployment via `netlify.toml`.

## Important Notes

- Update `site` URL in `astro.config.mjs` before deploying
- Draft content (frontmatter: `draft: true`) is filtered out in production
- Mobile-first responsive design with touch-friendly targets (44px minimum)
- New modules must be added to `courseModules` in `src/config.ts` before use in lecture frontmatter
