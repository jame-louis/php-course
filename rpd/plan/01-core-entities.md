# Plan: Core Entities Design

## Entity: Lecture (Primary)

**Purpose:** The main content unit that students consume.

### Schema (Simplified)

```typescript
interface Lecture {
  // Required
  title: string;           // Display title
  lectureNumber: number;   // Sequential ordering (manual)
  module: string;          // Module name (matches course config)
  
  // Optional
  description?: string;    // Short summary
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;       // e.g., "90分钟"
  
  // System
  draft?: boolean;         // Filter from production
}
```

**Removed fields (from 13 → 6):**
- `week` - Use lectureNumber for ordering
- `prerequisites` - Not used in UI
- `tags` - Not used in UI
- `hasSlides` - Infer from slidevUrl
- `hasAssignment` - Check assignment collection
- `slidevUrl` - Add to content as link
- `publishDate` - Not used

### File Naming Convention

```
content/lectures/
├── 01-introduction.md      # lectureNumber = 1
├── 02-setup.md             # lectureNumber = 2
└── 03-basics.md            # lectureNumber = 3
```

**Note:** `lectureNumber` in frontmatter must match numeric prefix. This is convention, not enforced.

## Entity: Assignment (Secondary)

**Purpose:** Homework linked to lectures.

### Schema (Simplified)

```typescript
interface Assignment {
  // Required
  title: string;
  assignmentNumber: number;
  lectureRef: string;      // e.g., "01-introduction" (matches lecture file slug)
  
  // Optional
  dueDate?: string;        // ISO date
  points?: number;         // Default: 100
  downloadFile?: string;   // Relative path
  
  // System
  draft?: boolean;
}
```

**Removed fields:**
- `week` - Use lectureRef
- `difficulty` - Not displayed
- `estimatedHours` - Not displayed
- `submissionFormat` - Hardcoded or in content

### File Naming

```
content/assignments/
├── hw01.md                 # assignmentNumber = 1, lectureRef = "01-introduction"
└── hw02.md
```

## Entity: Course Config (New)

**Purpose:** Single source of truth for course metadata.

### Structure

```typescript
// src/config/course.ts (merged from 5 files)
interface CourseConfig {
  // Identity
  title: string;
  description: string;
  
  // Structure
  modules: string[];       // Ordered list of module names
  
  // Info (for homepage)
  textbook?: string;
  prerequisites?: string;
  assessment?: string;
  
  // Defaults
  defaultLectureDuration?: string;
}
```

**Removed:** All label files consolidated to hardcoded UI strings.

## Relationships

```
CourseConfig.modules[]
    ↓ contains
Lecture.module (string match)
    ↓ referenced by
Assignment.lectureRef (slug match)
```

**Key decisions:**
1. String matching for module names (simple, explicit)
2. Slug matching for lecture→assignment (clear, debuggable)
3. No foreign key constraints (Astro collections don't support it)

## Content Validation

**Build-time checks (lightweight):**
1. All lectures have required fields
2. lectureNumbers are unique
3. module names exist in CourseConfig.modules
4. Assignment lectureRefs point to existing lectures

**Not validating:**
- Sequential lectureNumbers (gaps OK)
- File name / lectureNumber match (convention only)
- Duplicate assignmentNumbers (sorted by number)

## File Structure

```
src/content/
├── lectures/
│   ├── 01-introduction.md
│   ├── 02-setup.md
│   └── ...
└── assignments/
    ├── hw01.md
    └── ...

src/config/
├── course.ts          # CourseConfig + hardcoded labels
├── site.ts            # Site metadata (astro.config uses)
└── index.ts           # Barrel export (keep simple)
```

## Migration from Current

| Current | New |
|---------|-----|
| lectures with 13 fields | lectures with 6 fields |
| projects collection | Merge into lectures OR remove |
| materials collection | Convert to markdown list in lecture |
| 5 config files | 2-3 config files |
| Chinese labels everywhere | Hardcoded Chinese UI |
