# Plan: Implementation Roadmap

## Overview

**Goal:** Execute the simplification plan in 4 phases, each verifiable and reversible.

**Total estimated effort:** 2-3 days
**Risk level:** Medium (breaking changes to config)

---

## Phase 1: Foundation (Day 1)

### 1.1 Downgrade Tailwind v4 → v3
**Files:** `package.json`, `astro.config.mjs`, `src/styles/global.css`

**Steps:**
1. Uninstall `@tailwindcss/vite`
2. Install `tailwindcss@3`, `autoprefixer`, `postcss`
3. Create `tailwind.config.mjs` with v3 syntax
4. Create `postcss.config.mjs`
5. Update `global.css` to use v3 directives
6. Update `astro.config.mjs` remove vite plugin

**Verify:**
```bash
npm run dev
# Check: styles render correctly
# Check: no console errors
# Check: responsive breakpoints work
```

**Rollback:** `git checkout -- package.json astro.config.mjs src/styles/`

### 1.2 Simplify Content Schemas
**Files:** `src/content.config.ts`

**Steps:**
1. Remove unused fields from lectures schema
2. Remove unused fields from assignments schema
3. Keep only: lectures, assignments (remove projects, materials)

**Verify:**
```bash
npm run build
# Check: no type errors
# Check: build succeeds
```

**Rollback:** Restore original `content.config.ts`

### 1.3 Consolidate Config Files
**Files:** `src/config/*.ts`

**Steps:**
1. Merge course.ts labels into hardcoded strings
2. Keep only essential config exports
3. Delete navigation.ts, search.ts
4. Simplify index.ts barrel

**Verify:**
```bash
npm run build
# Check: no import errors
# Check: site renders
```

---

## Phase 2: Search Replacement (Day 1-2)

### 2.1 Remove Pagefind
**Files:** `package.json`, `astro.config.mjs`, search components

**Steps:**
1. Uninstall `pagefind`
2. Remove `postbuild` script from package.json
3. Remove SearchModal component (temporary)

**Verify:**
```bash
npm run build
# Check: build completes without pagefind step
# Check: build time < 10 seconds
```

### 2.2 Add Fuse.js Search
**Files:** `src/lib/search.ts`, `src/components/search/Search.astro`

**Steps:**
1. Install `fuse.js`
2. Create search index builder (runs at build time)
3. Create simple search component
4. Add to navigation

**Verify:**
```bash
npm run build && npm run preview
# Check: search works
# Check: results relevant
# Check: keyboard navigation works
```

---

## Phase 3: Content Cleanup (Day 2)

### 3.1 Remove Projects Collection
**Files:** `src/content/projects/`, `src/pages/projects.astro`, references

**Steps:**
1. Remove directory
2. Remove page
3. Remove from content.config.ts
4. Remove from navigation

**Verify:**
```bash
npm run build
# Check: no 404s
# Check: no reference errors
```

### 3.2 Remove Materials Collection
**Same pattern as 3.1**

### 3.3 Remove Schedule Page
**Files:** `src/pages/schedule.astro`, navigation references

**Steps:**
1. Remove page
2. Remove from navigation
3. Add redirect to syllabus

**Verify:**
```bash
npm run build
# Check: /schedule redirects or 404s appropriately
```

### 3.4 Remove MDX Dependency
**Files:** `package.json`, `astro.config.mjs`

**Steps:**
1. Uninstall `@astrojs/mdx`
2. Remove from astro integrations

**Verify:**
```bash
npm run build
# Check: no MDX errors
```

---

## Phase 4: UI Simplification (Day 2-3)

### 4.1 Simplify Mobile TOC
**Files:** `src/layouts/DocLayout.astro`, `src/components/content/TOCSidebar.astro`

**Steps:**
1. Remove mobile drawer
2. Add inline TOC at top of content
3. Keep desktop sidebar TOC

**Verify:**
```bash
npm run dev
# Check: mobile shows inline TOC
# Check: desktop shows sidebar TOC
# Check: no drawer JavaScript errors
```

### 4.2 Simplify Homepage
**Files:** `src/pages/index.astro`

**Steps:**
1. Reduce stats section
2. Simplify modules grid
3. Keep recent lectures
4. Remove unused imports

**Verify:**
```bash
npm run dev
# Check: homepage renders
# Check: links work
# Check: mobile responsive
```

### 4.3 Link Assignments to Lectures
**Files:** `src/pages/lectures/[...slug].astro`

**Steps:**
1. Query assignments by lectureRef
2. Show "Related Assignment" card
3. Link to assignment page

**Verify:**
```bash
npm run build
# Check: lectures show related assignments
# Check: links work
```

---

## Phase 5: Final Verification (Day 3)

### 5.1 Build Verification
```bash
npm run build
# Target: < 10 seconds
# Target: 0 errors
# Target: 0 warnings
```

### 5.2 Runtime Verification
```bash
npm run preview
# Check: all pages load
# Check: navigation works
# Check: search works
# Check: progress tracking works
# Check: mobile responsive
```

### 5.3 Lighthouse Audit
```bash
# Run Lighthouse
# Target: Performance > 90
# Target: Accessibility > 90
# Target: Best Practices > 90
# Target: SEO > 90
```

---

## Task Breakdown

| Task | Est. Time | Dependencies |
|------|-----------|--------------|
| 1.1 Tailwind v3 | 1h | None |
| 1.2 Simplify schemas | 30m | None |
| 1.3 Consolidate config | 1h | 1.2 |
| 2.1 Remove Pagefind | 30m | None |
| 2.2 Add Fuse.js | 2h | 2.1 |
| 3.1 Remove projects | 30m | 1.2 |
| 3.2 Remove materials | 30m | 1.2 |
| 3.3 Remove schedule | 30m | None |
| 3.4 Remove MDX | 15m | None |
| 4.1 Simplify mobile TOC | 1h | None |
| 4.2 Simplify homepage | 1h | 1.3 |
| 4.3 Assignment links | 1h | 1.2 |
| 5.x Verification | 2h | All |

**Total: ~12 hours**

---

## Success Criteria

- [ ] Build time < 10 seconds (from ~30s with Pagefind)
- [ ] Dependencies reduced by 30%+
- [ ] Config files consolidated to 2-3
- [ ] All existing content still renders
- [ ] Lighthouse score maintained or improved
- [ ] Mobile experience acceptable

---

## Rollback Plan

If critical issues found:

1. **Branch protection:** All changes on `simplify` branch
2. **Checkpoint commits:** After each phase
3. **Emergency revert:** `git reset --hard phase-1-complete`
4. **Gradual revert:** Revert individual commits if needed

---

## Post-Implementation

1. Update README with new setup instructions
2. Document simplified content format
3. Tag release as v2.0.0 (breaking changes)
4. Update todos.md to reflect new state
