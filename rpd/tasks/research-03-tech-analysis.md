---
name: research-tech-analysis
description: Analyze technology choices - what's essential vs incidental complexity
phase: research
dependsOn: [research-current-state]
---

# Research Task 3: Technology Analysis

## Goal
Evaluate current tech stack from first principles - what's essential vs incidental?

## Current Stack

| Layer | Technology | Purpose | Question |
|-------|-----------|---------|----------|
| Framework | Astro | Static site generation | Is this the right choice? |
| Styling | Tailwind v4 | CSS utility classes | v4 vs v3 benefits? |
| Search | Pagefind | Static search | Necessary or bloat? |
| Content | MDX + Collections | Content management | Over-engineered? |
| Animation | CSS/JS | Interactions | Minimal enough? |

## Analysis Questions

### Astro
- [ ] Why Astro over alternatives (Next.js, Vitepress, etc.)?
- [ ] Are we using Astro islands architecture effectively?
- [ ] Is static output the right choice?

### Content Collections
- [ ] Does Zod schema validation add value?
- [ ] Is the content config too complex?
- [ ] Could simpler file-based routing work?

### Search (Pagefind)
- [ ] Do students actually use search?
- [ ] What's the build time cost?
- [ ] Alternative: Client-side only?

### Progress Tracking
- [ ] localStorage - right approach?
- [ ] Should this be server-side?
- [ ] Is the implementation minimal?

### Dependencies
- [ ] Which deps are essential?
- [ ] Which could be removed?
- [ ] What's the maintenance burden?

## Output
Write findings to `rpd/research/03-tech-analysis.md`
