# Course Template Astro - TODOs

## Phase 4: Features (Partially Complete)

### 4.2 Pagefind Search - DONE
- [x] Install pagefind
- [x] Configure postbuild script
- [x] Create SearchModal component
- [x] Add search trigger to navigation
- [x] Style search results with highlights (basic excerpt shown)
- [ ] Multi-language support for Chinese search optimization

### 4.3 Progress Tracking - DONE
- [x] Create localStorage utilities
- [x] Add "Mark Complete" button to lecture pages
- [x] Show completion checkmarks in lecture list
- [x] Add global progress bar on lecture listing page
- [ ] "Continue Learning" section on homepage
- [ ] Progress persistence across devices (requires backend)

### 4.4 Scroll Spy for TOC - DONE
- [x] Add rehype-slug and rehype-autolink-headings
- [x] Implement IntersectionObserver-based scroll spy
- [ ] Smooth scroll offset handling for sticky header

---

## Open Questions / Future Enhancements

### Content Migration
- [ ] Should assignments be auto-linked to lectures via `lectureRef`?
- [ ] How to handle missing lecture numbers (gaps in numbering)?
- [ ] Should slides be integrated or just linked externally? (currently `slidevUrl` field exists but unused in template)

### Schedule Feature
- [ ] Should schedule be auto-generated from lecture metadata or manually curated?
- [ ] Do we need calendar view, week view, or just list view?
- [ ] Should due dates for assignments be integrated into the schedule?

### Syllabus Structure
- [ ] Should syllabus be auto-generated from lecture metadata or manually curated?
- [ ] Do we need calendar/schedule view or just outline?

### Progress Tracking
- [ ] Should progress persist across devices (requires backend) or local only?
- [ ] Should we track video watch time or just page visits?
- [ ] Add completion percentage to homepage hero section

### Search
- [ ] Search scope: currently indexes all pages; should it exclude drafts?
- [ ] Add search filters (lectures only, assignments only, etc.)
- [ ] Search result highlighting improvements

### SEO & Deployment
- [ ] Configure actual `site` URL in `astro.config.mjs`
- [ ] Add Open Graph images
- [ ] Verify Lighthouse score > 90
- [ ] Branch previews for pull requests?

### Accessibility
- [ ] Audit keyboard navigation
- [ ] Verify ARIA labels on all interactive elements
- [ ] Test screen reader compatibility

### Template-Specific
- [ ] Add setup documentation (how to customize course name, modules, etc.)
- [ ] Create a script to generate new lecture/assignment files
- [ ] Add a theme customization guide (colors, fonts)
- [ ] Consider making module tabs dynamic based on actual lecture data
