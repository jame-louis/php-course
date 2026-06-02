# Research: First Principles Synthesis

## The Fundamental Truth

**This is a content publishing system.** Nothing more.

Strip away all assumptions and we're left with:
1. Author writes educational content
2. Students read it in sequence
3. Students track what they've read

Everything else is optional.

## Current vs Essential

| Current | Essential | Simplification |
|---------|-----------|----------------|
| 4 content types | 1 (lectures) | Remove assignments, projects, materials as collections |
| 100+ config labels | ~10 | Hardcode UI strings |
| Pagefind search | Fuse.js | 90% quality, 10% complexity |
| MDX + Markdown | Markdown only | Not using MDX features |
| Tailwind v4 | Tailwind v3 or CSS | Stability |
| 13 lecture fields | 6 fields | Remove unused schema |
| Complex mobile TOC | Simple anchors | Remove drawer complexity |
| Multi-file config | Single config | One `course.json` |

## Anti-Goals (What We Reject)

Building this would be over-engineering:
- ❌ LMS features (grades, submissions)
- ❌ User authentication
- ❌ Real-time anything
- ❌ Video hosting/streaming
- ❌ Comment systems
- ❌ Analytics dashboard
- ❌ Multi-tenancy
- ❌ WYSIWYG editor

## Guiding Principles

### 1. Content Over Chrome
The content matters more than the UI. A student should remember what they learned, not how the site looked.

**Implication:** Minimal styling, maximal readability.

### 2. Flat Over Deep
Every feature adds decision fatigue. Prefer fewer, simpler options.

**Implication:** Single config file, sensible defaults, minimal customization.

### 3. Static Over Dynamic
If it can be built at build time, it should be. Dynamic features require justification.

**Implication:** Client-side search only, localStorage progress, no server.

### 4. Explicit Over Implicit
Magic creates confusion. Prefer clear, verbose configuration.

**Implication:** Explicit ordering (not automatic), explicit relationships.

### 5. Boring Over Clever
Maintainable code is readable code. Avoid clever tricks.

**Implication:** No barrel exports, no complex type gymnastics.

## The Minimal Viable System

If starting from scratch:

```
content/
  lecture-01.md
  lecture-02.md
  ...

Config (course.json):
{
  "title": "Course Name",
  "modules": ["Module 1", "Module 2"],
  "lectures": [
    { "slug": "lecture-01", "module": "Module 1" },
    ...
  ]
}
```

That's it. No:
- Schema validation (Markdown linting sufficient)
- Multiple content types (flat is fine)
- Complex search (browser find + simple filter)
- Progress tracking beyond localStorage

## From MVP to Current

**What we add back (with justification):**

1. **Astro content collections** - Type safety is worth it
2. **Basic search** - Fuse.js for topic finding
3. **Progress bar** - Motivation for students
4. **Module grouping** - Clear organization
5. **Assignments** - But as simple links, not collections

**What we remove (without regret):**

1. Pagefind → Fuse.js
2. Tailwind v4 → v3
3. MDX support
4. 100+ label configs → 10 hardcoded
5. Complex mobile TOC → Simple anchors
6. Projects/Materials collections → Merge with assignments or remove
7. Schedule page → Optional, not core

## Decision Framework

For any feature, ask:

1. **Does it help students learn?** (No → reject)
2. **Can it be simpler?** (Yes → simplify)
3. **Does it add maintenance burden?** (Yes → justify)
4. **Is there a standard way?** (No → reconsider)

## Success Criteria

The rethought system succeeds if:

- [ ] New instructor can set up in < 30 minutes
- [ ] Content authoring requires only Markdown knowledge
- [ ] Build completes in < 10 seconds
- [ ] Lighthouse score > 90 without effort
- [ ] Mobile experience is acceptable (not perfect)
- [ ] Code is understandable to junior developers

## Key Decisions Summary

| Decision | From | To | Rationale |
|----------|------|-----|-----------|
| Search | Pagefind | Fuse.js | 10x simpler |
| Tailwind | v4 | v3 | Stability |
| Config | 5 files | 1 file | Simplicity |
| Content | 4 types | 2 types (lectures, assignments) | Focus |
| Labels | 100+ configurable | 10 hardcoded | YAGNI |
| Mobile TOC | Drawer | Inline | Simpler |
| MDX | Yes | No | Unused |
