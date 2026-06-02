# generate-lecture

Generate lecture content and self-checks from `_source/lecturexx.md` files.

## Usage

```bash
/generate-lecture          # Interactive mode for next unprocessed lecture
/generate-lecture 01       # Generate specific lecture (interactive)
/generate-lecture --all    # Batch generate all lectures (shows table first)
/generate-lecture --all --dry-run   # Preview what would be generated
/generate-lecture 01 --force        # Overwrite existing files
/generate-lecture --all --no-selfchecks  # Skip self-check generation
```

## How It Works

1. **Scan**: Reads all `_source/lecturexx.md` files
2. **Analyze**: Extracts title (first H1), estimates difficulty based on content complexity
3. **Propose**: Shows batch table with AI-suggested metadata (module, difficulty, description)
4. **Confirm**: User reviews and optionally edits any field
5. **Generate**: Creates files in `src/content/lectures/` and `src/content/selfchecks/`

## Module Assignment Rules (Default)

- Lectures 1-8 → `基础入门`
- Lectures 9-15 → `核心概念`

User can override during confirmation step.

## Self-Check Generation

For each lecture, generates 3-5 self-check questions:
- Questions based on key concepts from headers and code examples
- Answers derived from content
- Tagged with `needs-review: true` flag

## Output Files

- `src/content/lectures/lecturexx.md` - Lecture with full frontmatter
- `src/content/selfchecks/lecturexx-q1.md` - Self-check questions

## Metadata Schema

Lecture frontmatter includes:
- `title`, `lectureNumber`, `module`, `description`
- `duration` (default: 90分钟)
- `difficulty` (beginner/intermediate/advanced)
- `prerequisites`, `tags`
- `hasSlides`, `hasAssignment`, `draft`

---

## Implementation

This skill executes `scripts/generate-lecture.cjs` with the provided arguments.

### Workflow

1. **Parse arguments** - Check for `--all`, `--dry-run`, `--force`, `--no-selfchecks`, specific lecture number

2. **Scan source files** - Find all `_source/lecture*.md` files, extract lecture numbers

3. **For each lecture, analyze content**:
   - Extract title from first `# ` heading
   - Count code blocks, tables, images to estimate complexity
   - Generate description from first paragraph or summary
   - Assign module based on lecture number (1-8=基础入门, 9+=核心概念)
   - Determine difficulty (beginner: 1-3, intermediate: 4-8, advanced: 9+)

4. **Present batch table** (if `--all`) or single lecture preview:
   ```
   | Lecture | Title | Module | Difficulty | Status |
   |---------|-------|--------|------------|--------|
   | 01 | PHP概述... | 基础入门 | beginner | CREATE |
   ```

5. **Generate files**:
   - Skip if target exists and no `--force` (unless `--dry-run`)
   - Create lecture markdown with YAML frontmatter + cleaned content
   - Generate 3-5 self-check files per lecture (unless `--no-selfchecks`)

6. **Report results** - List created files, flag any `needs-review` self-checks

### Examples

```bash
# Preview all lectures that would be generated
/generate-lecture --all --dry-run

# Generate a specific lecture
/generate-lecture 03

# Generate all lectures
/generate-lecture --all

# Regenerate existing lectures
/generate-lecture --all --force

# Generate lectures without self-checks
/generate-lecture --all --no-selfchecks
```
