# Plan: Content Architecture

## Philosophy

Content should be **portable** and **authorable** without deep framework knowledge.

- Markdown is the source of truth
- Frontmatter is minimal
- Configuration is explicit
- Build failures are informative

## Directory Structure (New)

```
project-root/
├── src/
│   ├── content/
│   │   ├── lectures/         # .md files only
│   │   └── assignments/      # .md files only
│   ├── config/
│   │   ├── course.ts         # Course metadata + modules
│   │   └── site.ts           # Site config ( Astro )
│   ├── layouts/
│   │   ├── Layout.astro      # Single layout (merge Base+Course)
│   │   └── Content.astro     # Content + sidebar + TOC
│   ├── components/
│   │   ├── LectureNav.astro  # Sidebar navigation
│   │   ├── TOC.astro         # Table of contents
│   │   ├── ProgressBar.astro # Progress indicator
│   │   └── Search.astro      # Fuse.js search
│   ├── lib/
│   │   ├── progress.ts       # localStorage (keep)
│   │   └── search.ts         # Fuse.js index builder
│   ├── pages/
│   │   ├── index.astro
│   │   ├── lectures.astro
│   │   ├── lectures/
│   │   │   └── [...slug].astro
│   │   └── assignments.astro
│   └── styles/
│       └── global.css        # Tailwind v3 + custom
├── public/
│   └── ...
├── astro.config.mjs
├── tailwind.config.mjs       # v3 config
├── package.json
└── course.config.ts          # (optional) Course-level config
```

## Content Authoring Workflow

### Adding a Lecture

1. Create file: `src/content/lectures/04-components.md`
2. Add frontmatter:
```yaml
---
title: Vue Components
lectureNumber: 4
module: 'Vue.js框架'
description: 'Component basics and props'
difficulty: intermediate
---
```
3. Write content in Markdown
4. Build: `npm run build`

**No other steps required.**

### Adding an Assignment

1. Create file: `src/content/assignments/hw03.md`
2. Add frontmatter:
```yaml
---
title: Component Exercise
assignmentNumber: 3
lectureRef: '04-components'
dueDate: '2026-03-15'
---
```
3. Link to assignment from lecture content:
```markdown
## Assignment
Complete [Homework 3](/assignments/hw03).
```

## Configuration Simplification

### Before (Current)
```
src/config/
├── index.ts          # Barrel
├── site.ts           # 5 exports
├── navigation.ts     # 4 exports
├── course.ts         # 10 exports, 100+ labels
└── search.ts         # 3 exports
```

### After (Planned)
```
src/config/
├── index.ts          # Barrel (simple)
├── course.ts         # CourseConfig + 10 hardcoded labels
└── site.ts           # SiteConfig only
```

**Lines of config:** ~500 → ~100

## Build Pipeline (Simplified)

### Before
```
npm run build
  1. astro build
  2. pagefind --site dist  (extra step)
```

### After
```
npm run build
  1. astro build
  2. (optional) fuse-index build
```

Fuse.js index can be:
- Built at runtime (simpler)
- Pre-built at build time (faster)
- Skipped entirely (no search)

## Styling Architecture

### Tailwind v3 Setup

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#3b82f6', dark: '#2563eb' },
        bg: { DEFAULT: '#ffffff', secondary: '#f8fafc' },
        text: { DEFAULT: '#1e293b', muted: '#64748b' },
        border: '#e2e8f0',
      }
    }
  }
}
```

### CSS Strategy

1. **Tailwind utilities** - Layout, spacing, colors
2. **Prose classes** - Typography (consider @tailwindcss/typography)
3. **Component classes** - Reusable patterns (cards, badges)
4. **No custom CSS** unless essential

## Content Rendering

### Lecture Page Structure

```astro
<!-- src/pages/lectures/[...slug].astro -->
<Layout title={lecture.data.title}>
  <div class="flex">
    <!-- Left: Navigation -->
    <LectureNav current={slug} />
    
    <!-- Center: Content -->
    <article class="prose max-w-3xl">
      <h1>{lecture.data.title}</h1>
      <Content />
      
      <!-- Progress Button -->
      <ProgressButton slug={slug} />
      
      <!-- Prev/Next -->
      <LectureNavPager current={lecture.data.lectureNumber} />
    </article>
    
    <!-- Right: TOC -->
    <TOC headings={headings} />
  </div>
</Layout>
```

### Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column, nav in hamburger |
| Tablet | Content + TOC |
| Desktop | Nav + Content + TOC |

## Data Flow

```
Build Time:
  content/lectures/*.md → getCollection() → sorted lectures
  content/assignments/*.md → getCollection() → linked to lectures

Runtime:
  localStorage → progress state → UI updates
  Fuse.js index → search queries → results
```

## Migration Path

1. **Phase 1:** Simplify config (remove labels)
2. **Phase 2:** Migrate content (remove unused fields)
3. **Phase 3:** Replace Pagefind with Fuse.js
4. **Phase 4:** Simplify layouts
5. **Phase 5:** Remove MDX if unused

## Success Metrics

- [ ] New lecture: < 1 minute to add
- [ ] Build time: < 10 seconds
- [ ] Config files: < 3
- [ ] Dependencies: < 10 production
