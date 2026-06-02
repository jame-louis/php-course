# RPD Workflow: First Principles Rethink

**Goal:** Rethink the course template from first principles to create a cleaner, more focused, and maintainable architecture.

## Workflow Structure

```
rpd/
├── README.md          # This file - overview of the workflow
├── research/          # Research findings and analysis
│   ├── 01-current-state.md
│   ├── 02-user-needs.md
│   ├── 03-tech-analysis.md
│   └── 04-first-principles.md
├── plan/              # Design decisions and architecture
│   ├── 01-core-entities.md
│   ├── 02-content-architecture.md
│   ├── 03-feature-priorities.md
│   └── 04-implementation-roadmap.md
└── tasks/             # Executable tasks
    ├── research-*.md  # Research phase tasks (COMPLETED)
    ├── plan-*.md      # Planning phase tasks (COMPLETED)
    └── do-*.md        # Execution tasks (PENDING)
```

## Phases

### Phase 1: Research 🔍
Break down to first principles:
- What is the fundamental purpose?
- Who are the users and what do they need?
- What are the current pain points?
- What technology choices are essential vs incidental?

**Status:** ✅ COMPLETE

### Phase 2: Plan 📝
Build up from fundamentals:
- Define core entities and relationships
- Design minimal viable architecture
- Prioritize features ruthlessly
- Create implementation roadmap

**Status:** ✅ COMPLETE

### Phase 3: Do ⚡
Execute with precision:
- One task at a time
- Verify at each step
- Document decisions

**Status:** 🔄 READY TO START

## Key Decisions Summary

| Decision | From | To | Impact |
|----------|------|-----|--------|
| Search | Pagefind | Fuse.js | 10x simpler, faster build |
| Tailwind | v4 | v3 | Stability |
| Config | 5 files | 2 files | Maintainability |
| Content | 4 types | 2 types | Focus |
| Labels | 100+ configurable | 10 hardcoded | Simplicity |
| Mobile TOC | Drawer | Inline | Less JS |
| MDX | Yes | No | Fewer deps |

## Next Steps

See `rpd/plan/04-implementation-roadmap.md` for detailed execution plan.

Ready to begin implementation. Use TaskList to see available tasks.
