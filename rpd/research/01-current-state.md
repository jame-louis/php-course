# Research: Current State Analysis

## Project Overview

Astro-based static site for university course (前端框架课程). Built as a reusable template for course websites.

## Directory Structure

```
src/
├── components/          # 7 subdirectories + 3 files
│   ├── assignments/
│   ├── content/         # TOCSidebar
│   ├── lectures/        # Progress button
│   ├── navigation/      # Sidebar
│   ├── projects/
│   ├── search/          # SearchModal
│   └── ui/              # small components
├── config/              # Centralized configuration
│   ├── index.ts         # Barrel export
│   ├── site.ts          # Site metadata
│   ├── navigation.ts    # Nav config
│   ├── course.ts        # Course-specific labels
│   └── search.ts        # Search config
├── content/             # Content collections
│   ├── lectures/        # 3 lectures (md files)
│   ├── assignments/     # Assignment files
│   ├── projects/        # Project files
│   └── materials/       # Resource files
├── layouts/
│   ├── BaseLayout.astro    # HTML shell
│   ├── CourseLayout.astro  # + header/footer
│   └── DocLayout.astro     # + sidebar + TOC
├── lib/
│   └── progress.ts      # localStorage utilities
├── pages/
│   ├── index.astro      # Homepage
│   ├── lectures.astro   # Lecture listing
│   ├── assignments.astro
│   ├── projects.astro
│   ├── materials.astro
│   ├── schedule.astro
│   ├── syllabus.astro
│   └── lectures/        # Dynamic lecture routes
│       └── [...slug].astro
└── styles/
    └── global.css       # Tailwind v4 theme
```

## Dependencies Analysis

### Production Dependencies
| Package | Purpose | Verdict |
|---------|---------|---------|
| astro | Framework | Core - necessary |
| @astrojs/mdx | MDX support | Maybe overkill? Only using .md |
| @astrojs/sitemap | SEO | Nice but not essential |

### Dev Dependencies
| Package | Purpose | Verdict |
|---------|---------|---------|
| @tailwindcss/vite | Styling | v4 is bleeding edge, risk? |
| pagefind | Search | Complex, adds build step |
| rehype-slug | Heading IDs | Essential for TOC |
| rehype-autolink-headings | Anchor links | Nice-to-have |

**Total footprint:** ~17KB claimed, but build complexity is high.

## Features Inventory

### ✅ Complete Features
1. **Homepage** - Hero, stats, modules grid, recent lectures
2. **Lecture listing** - Grouped by module, progress bar, difficulty badges
3. **Lecture pages** - Content rendering, prev/next nav, TOC sidebar
4. **Progress tracking** - localStorage, completion %, checkmarks
5. **Search** - Pagefind integration, keyboard shortcuts
6. **Assignments/Projects/Materials** - Basic listing pages
7. **Schedule/Syllabus** - Static info pages

### ⚠️ Partial/Incomplete
1. **Mobile TOC** - Drawer works but complex
2. **Search** - Multi-language support TODO
3. **Slidev integration** - `slidevUrl` field exists but unused
4. **Schedule** - Empty state if no week data

### ❌ Not Started
1. Cross-device progress sync
2. Assignment auto-linking
3. Content migration scripts
4. Theme customization guide

## Configuration Complexity

**Label explosion:** 100+ label strings defined in `config/course.ts`
- lectureLabels (6)
- syllabusLabels (5)
- assignmentLabels (10)
- projectLabels (6)
- materialsLabels (3)
- scheduleLabels (5)
- infoSectionLabels (4)
- progressLabels (1)
- materialTypeLabels (5)

**Question:** Is this level of i18n/configurability necessary for a template?

## Code Quality Issues

### Duplication
1. Progress bar logic duplicated in lectures.astro and potentially lecture detail
2. Config barrel pattern adds indirection
3. Similar card UIs across pages not componentized

### Complexity Hotspots
1. **SearchModal.astro** (250 lines) - Complex state management, uses `eval()`
2. **lectures.astro** (158 lines) - Dense template logic
3. **DocLayout.astro** (114 lines) - Mobile drawer complexity

### Unused/Speculative Code
1. MDX integration - no .mdx files in content
2. week field in lectures - used for schedule but often empty
3. publishDate field - never used
4. slidevUrl - referenced in schema but no UI

## Build Pipeline

```
npm run build
  → astro build (static)
  → pagefind --site dist (search index)
```

**Pagefind issues:**
- Adds ~2-3s to build
- Requires `eval()` import hack
- Index size unknown

## Pain Points Identified

1. **Content authoring friction** - Need to maintain frontmatter, lecture numbers, refs
2. **Configuration burden** - Too many labels to customize
3. **Build complexity** - Pagefind requirement
4. **Mobile experience** - TOC drawer feels heavy
5. **Template adoption** - Hard to understand all config options
6. **Dependency risk** - Tailwind v4, Pagefind both have breaking potential

## What Works Well

1. **Astro content collections** - Type-safe, good DX
2. **Progress tracking** - Simple localStorage approach
3. **Responsive design** - Generally good mobile handling
4. **Sidebar navigation** - Clear lecture ordering
5. **Tailwind styling** - Consistent, maintainable
