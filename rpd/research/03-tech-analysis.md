# Research: Technology Analysis

## Current Stack Evaluation

### 1. Astro Framework

**Why Astro?**
- Zero-JS by default
- Content collections with type safety
- Static site generation
- Islands architecture

**Are we using it well?**
- ✅ Content collections properly configured
- ✅ Static output mode appropriate
- ⚠️ No islands being used (all static)
- ⚠️ MDX integration unused

**Alternatives considered:**
| Option | Pros | Cons |
|--------|------|------|
| VitePress | Simpler, Vue-based | Less flexible layouts |
| Next.js | Dynamic features | Overkill for static content |
| 11ty | Very simple | Less type safety |
| Plain HTML | Zero dependencies | No build niceties |

**Verdict:** Astro is good choice, but we're underutilizing its features.

### 2. Tailwind CSS v4

**Why v4?**
- New CSS-first config
- Built-in Vite plugin
- Smaller bundle

**Risks:**
- Very new (released early 2025)
- Plugin ecosystem catching up
- Breaking changes from v3

**Current usage:**
- Custom theme with 7 color variables
- Prose-custom component (~70 rules)
- Utility classes throughout

**Verdict:** v4 benefits marginal, v3 would be more stable. Consider plain CSS for simpler maintenance.

### 3. Pagefind Search

**Why Pagefind?**
- Static search (no server)
- Fast client-side results
- Good relevance

**Costs:**
- Build step complexity
- ~500KB index (estimated for this site)
- `eval()` import workaround
- Adds 2-3s to build

**Alternatives:**
| Option | Pros | Cons |
|--------|------|------|
| Fuse.js | Client-only, simple | Slower for large sites |
| Algolia DocSearch | Better results | Requires API, external |
| Lunr.js | Client-side, established | Larger bundle |
| No search | Zero complexity | User pain |

**Verdict:** Overkill for <50 pages. Fuse.js or simple filter would suffice.

### 4. Content Collections (Zod)

**Current schema:**
```typescript
lectures: 13 fields
assignments: 8 fields
projects: 6 fields
materials: 5 fields
```

**Field usage analysis:**
| Field | Used? | Notes |
|-------|-------|-------|
| title | ✅ | Everywhere |
| lectureNumber | ✅ | Ordering |
| module | ✅ | Grouping |
| description | ✅ | Listings |
| duration | ⚠️ | Displayed but not essential |
| difficulty | ✅ | Badges |
| prerequisites | ❓ | Schema exists, usage? |
| tags | ❓ | Schema exists, usage? |
| hasSlides | ❓ | Field exists, UI? |
| hasAssignment | ❓ | Field exists, links? |
| slidevUrl | ❌ | Never used |
| draft | ✅ | Build filtering |
| publishDate | ❌ | Never used |

**Verdict:** ~40% of schema fields are speculative. Simplify to used fields only.

### 5. Progress Tracking (localStorage)

**Implementation:**
```typescript
STORAGE_KEY = 'course-progress'
Data: { completed: string[], timestamps: Record<string, number> }
```

**Pros:**
- Zero server needed
- Instant response
- Simple code

**Cons:**
- Lost on device switch
- Lost on browser clear
- No analytics for instructor

**Alternatives:**
| Option | Complexity | Benefit |
|--------|-----------|---------|
| Keep localStorage | Low | 80% use case |
| Add URL hash | Low | Share progress |
| GitHub gist sync | Medium | Cross-device |
| Database | High | Full persistence |

**Verdict:** localStorage is right choice. Everything else is over-engineering.

### 6. Mobile TOC Drawer

**Current implementation:**
- Fixed button (bottom-right)
- Overlay drawer
- Touch handlers
- 40 lines of JS

**Question:** Is this necessary?

**Alternative:** Simple anchor links at top of content, no drawer.

**Verdict:** Over-designed. Single-column mobile with TOC inline would be simpler.

## Dependency Audit

### Essential (cannot remove)
- astro
- @astrojs/mdx (if keeping .mdx)
- @astrojs/sitemap (nice for SEO)
- tailwindcss (if keeping Tailwind)
- rehype-slug (TOC needs IDs)

### Removable/Replaceable
- pagefind → Fuse.js or nothing
- rehype-autolink-headings → optional
- @tailwindcss/vite → standard Tailwind

## Technical Debt Score

| Area | Score | Notes |
|------|-------|-------|
| Dependencies | ⚠️ Medium | v4 Tailwind, Pagefind risk |
| Configuration | 🔴 High | Too many label files |
| Content Schema | ⚠️ Medium | Unused fields |
| Build Pipeline | 🔴 High | Pagefind complexity |
| Client JS | ✅ Low | Minimal, simple |

## First Principles Tech Stack

**If rebuilding today:**

```
Core:
- Astro 5.x (static output)
- Plain Markdown (no MDX)
- CSS modules OR Tailwind v3

Optional:
- Fuse.js for search (client-side)
- rehype-slug only
```

**Benefits:**
- Fewer dependencies
- Faster builds
- Simpler mental model
- Easier maintenance

**Tradeoffs:**
- Less "automatic" search quality
- No MDX components (rarely needed)
- Manual CSS theming

## Recommendations

1. **Downgrade Tailwind to v3** - Stability over bleeding edge
2. **Replace Pagefind with Fuse.js** - 90% quality, 10% complexity
3. **Simplify content schema** - Remove unused fields
4. **Consolidate config** - One course config file
5. **Remove MDX** - Not being used
