# Plan: Feature Priorities

## Priority Matrix

| Feature | Current | Priority | Action | Effort |
|---------|---------|----------|--------|--------|
| Lecture content | ✅ | P0 | Keep | - |
| Lecture navigation | ✅ | P0 | Keep | - |
| Progress tracking | ✅ | P0 | Keep | - |
| Module grouping | ✅ | P0 | Keep | - |
| Responsive design | ✅ | P0 | Keep | - |
| Search | ✅ | P1 | Simplify | Medium |
| Assignment listing | ✅ | P1 | Simplify | Low |
| Assignment-lecture link | ⚠️ | P1 | Implement | Low |
| Homepage | ✅ | P1 | Simplify | Low |
| TOC sidebar | ✅ | P1 | Simplify | Low |
| Schedule page | ✅ | P2 | Remove | - |
| Syllabus page | ✅ | P2 | Optional | Low |
| Projects collection | ✅ | P2 | Remove | - |
| Materials collection | ✅ | P2 | Remove | - |
| Slides integration | ⚠️ | P2 | Remove | - |
| Dark mode | ❌ | P3 | Defer | Medium |
| Cross-device sync | ❌ | P3 | Reject | High |
| Comments | ❌ | P3 | Reject | High |

## Detailed Actions

### Keep (No Changes)

**Lecture content rendering**
- Current: MDX + Markdown
- Action: Keep Markdown, remove MDX
- Rationale: Not using MDX components

**Progress tracking**
- Current: localStorage
- Action: Keep as-is
- Rationale: Right complexity level

**Responsive design**
- Current: Tailwind v4
- Action: Downgrade to v3
- Rationale: Stability

### Simplify

**Search**
- Current: Pagefind (build-time index)
- New: Fuse.js (client-side) or nothing
- Rationale: 10x simpler, 90% as good
- Tradeoff: Slower for >100 pages

**Assignment listing**
- Current: Separate collection with 8 fields
- New: Simpler schema, link from lectures
- Rationale: Reduce complexity

**Homepage**
- Current: Complex stats, modules grid
- New: Simpler hero + recent lectures
- Rationale: Faster to first content

**TOC sidebar**
- Current: Mobile drawer + desktop sidebar
- New: Inline on mobile, sidebar on desktop
- Rationale: Remove drawer complexity

### Remove

**Schedule page**
- Why: Requires `week` field that's often empty
- Alternative: Manual markdown table if needed
- Migration: Remove route, redirect to syllabus

**Projects collection**
- Why: Overkill for course template
- Alternative: List projects in a lecture
- Migration: Convert to markdown

**Materials collection**
- Why: Same as projects
- Alternative: Resources section in lectures
- Migration: Convert to markdown

**Slides integration**
- Why: `slidevUrl` field never used
- Alternative: Regular links in content
- Migration: Remove field, use markdown links

### Defer/Reject

**Dark mode**
- Defer: Nice to have, not essential
- Effort: Medium (need color system)
- Criteria: Implement if requested

**Cross-device progress sync**
- Reject: Requires backend
- Alternative: Export/import progress JSON
- Effort: High for small gain

**Comments/discussion**
- Reject: Out of scope
- Alternative: Use GitHub discussions
- Effort: Very high

## Implementation Order

```
Phase 1: Foundation
├── Downgrade Tailwind v4 → v3
├── Simplify content schemas
└── Consolidate config files

Phase 2: Features
├── Replace Pagefind → Fuse.js
├── Simplify mobile TOC
└── Link assignments to lectures

Phase 3: Cleanup
├── Remove projects collection
├── Remove materials collection
├── Remove schedule page
└── Remove MDX dependency

Phase 4: Polish
├── Simplify homepage
├── Add assignment links in lectures
└── Documentation
```

## Risk Assessment

| Change | Risk | Mitigation |
|--------|------|------------|
| Tailwind v4→v3 | Breaking styles | Test all pages |
| Remove collections | Content loss | Migrate before remove |
| Replace search | Worse UX | A/B test with users |
| Simplify config | Breaking adopters | Major version bump |

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-01 | Remove Pagefind | Build complexity exceeds value |
| 2026-06-01 | Keep localStorage | Cross-device requires backend |
| 2026-06-01 | Remove projects/materials | Flatten content hierarchy |
| 2026-06-01 | Hardcode labels | Config flexibility unused |
| 2026-06-01 | Tailwind v3 | Stability over features |
