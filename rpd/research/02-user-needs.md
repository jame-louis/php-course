# Research: User Needs Analysis

## User Types

### 1. Course Instructor (Primary Admin)
**Goal:** Publish and organize course content effectively.

**Current Workflow:**
1. Write lecture content in Markdown
2. Add YAML frontmatter (lectureNumber, module, etc.)
3. Place in `src/content/lectures/`
4. Run `npm run build`
5. Deploy to GitHub Pages

**Pain Points:**
- Frontmatter maintenance (keeping lectureNumbers sequential)
- Module names in Chinese (must match config exactly)
- No validation until build time
- No visual preview before commit

**Needs:**
- [ ] Simple content authoring (Markdown preferred)
- [ ] Automatic ordering/numbering
- [ ] Clear module organization
- [ ] Easy assignment linking
- [ ] Build verification

### 2. Students (Primary Consumers)
**Goal:** Access course materials and track progress.

**Current Workflow:**
1. Visit homepage
2. Navigate to lectures list
3. Click through lectures sequentially
4. Mark lectures complete

**Jobs-to-be-Done:**
1. **Find current lecture** - "Where was I?"
2. **Navigate sequentially** - "What's next?"
3. **Track progress** - "How much is left?"
4. **Search for topics** - "Find that thing about..."
5. **Access assignments** - "What's due?"

**Pain Points:**
- No "Continue Learning" button
- Progress lost across devices
- Search results not always relevant
- Hard to see overall course structure

**Needs (Prioritized):**
- [P0] Clear lecture navigation
- [P0] Progress indication
- [P1] Quick topic search
- [P1] Assignment visibility
- [P2] Cross-device sync
- [P2] Offline access

### 3. Template Adopters (Secondary)
**Goal:** Reuse this for their own courses.

**Current Workflow:**
1. Fork repository
2. Edit config files (course name, modules, labels)
3. Replace content
4. Customize styling
5. Deploy

**Pain Points:**
- Too many config files to touch
- Chinese labels scattered everywhere
- Unclear what can be safely changed
- No customization guide

**Needs:**
- [ ] Single config file for course info
- [ ] Clear customization docs
- [ ] Minimal config for basic use
- [ ] Theming system

## Jobs-to-be-Done Framework

### Main Job
**"Help students learn from structured course content"**

### Sub-jobs

| Job | Current Solution | Pain | Opportunity |
|-----|-----------------|------|-------------|
| Find next lecture | Browse list | No "continue" | Smart resumption |
| Track progress | localStorage checkmarks | Lost on new device | Server sync optional |
| Search content | Pagefind | Build complexity | Simpler client search? |
| Access assignments | Separate page | No connection to lectures | Auto-link related work |
| Navigate on mobile | Drawer | Clunky | Simpler single-column? |

## Feature Priorities

### Must Have (P0)
- Lecture content display
- Sequential navigation
- Module organization
- Progress tracking (any form)

### Should Have (P1)
- Search functionality
- Assignment listing
- Responsive design
- Assignment-lecture linking

### Could Have (P2)
- Cross-device progress
- Schedule view
- Advanced search filters
- Dark mode

### Won't Have (Explicit)
- Video hosting
- Assignment submission
- Gradebook
- Discussion forums
- Real-time features

## First Principles Insight

**The simplest viable system:**
1. Markdown files in folders
2. HTML pages rendered
3. List of lectures shown
4. "Done" checkbox on each

**Everything else is additive.** Current system has many "could haves" implemented, increasing complexity disproportionately to value.

## Key Question

Are we building a:
- **A)** Course content viewer (simple)
- **B)** Course management system (complex)

Current implementation leans toward B but without backend = over-engineered.

**Recommendation:** Explicitly target A, make B features pluggable/opt-in.
