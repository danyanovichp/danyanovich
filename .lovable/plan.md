
# Plan: UI Improvements -- Remove Sections, Restructure Content, Cases Horizontal Scroll, About Me Redesign

## Summary of Changes

1. **Remove "Как это работает" (BeforeAfterSection)** from the Home page
2. **Move "Инструменты" (TechStackCarousel)** from Home page to Products page
3. **Rename "Экспресс-аудит" button** to "Связаться" / "Contact" in Header
4. **Cases page: horizontal full-screen scroll** -- each project takes the full viewport width, user swipes/clicks left-right to navigate between projects
5. **About Me (Contact) page redesign** -- make it visually richer with decorative blobs, pastel cards, larger typography, and better section styling

## Files to Change

### 1. `src/pages/Home.tsx`
- Remove `<BeforeAfterSection />` import and usage
- Remove `<TechStackCarousel />` import and usage

### 2. `src/pages/Templates.tsx` (Products page)
- Add `<TechStackCarousel />` at the top or bottom of the Products page

### 3. `src/components/Header.tsx`
- Change "Экспресс-аудит" / "Express Audit" text to "Связаться" / "Contact"
- Update the pre-filled Telegram message to a more generic contact message

### 4. `src/pages/Cases.tsx` -- Full horizontal scroll redesign
- Each project card becomes a full-viewport-width slide
- Horizontal navigation with arrow buttons and dot indicators
- Use CSS `snap-x` scroll snapping or state-based slide switching
- Projects scroll left-right instead of vertically
- Keep all existing content (workflow diagram, features grid, results) inside each slide
- Add keyboard arrow navigation support

### 5. `src/pages/Contact.tsx` -- About Me visual upgrade
- Add `DecorativeBlobs` to hero section for visual richness
- Use pastel card backgrounds for expertise blocks (rotating `pastelBgClasses`)
- Make hero heading larger with `font-display` (Space Grotesk)
- Add pastel backgrounds to Tools, Social, Programs sections
- Improve statistics section with pastel accent backgrounds
- Add decorative elements between sections
- Make reviews carousel cards more colorful
- Bigger section headings with Space Grotesk

### 6. `src/components/BeforeAfterSection.tsx`
- No changes needed (just removed from Home, file stays for potential future use)

## Technical Details

### Cases horizontal scroll layout
```text
Full-screen horizontal scroll:
+-- Container (h-[calc(100vh-header)] overflow-hidden)
    +-- Navigation arrows (left/right, fixed position)
    +-- Dot indicators (bottom center)
    +-- Slides wrapper (flex, transition transform)
        +-- Slide 1 (w-full, flex-shrink-0, overflow-y-auto)
            +-- Project card content (padded, scrollable vertically)
        +-- Slide 2 ...
        +-- Slide 3 ...
```

Implementation approach:
- State-based: `currentSlide` index controls which slide is visible
- `transform: translateX(-${currentSlide * 100}%)` for smooth transitions
- Arrow buttons on sides for navigation
- Dot indicators at bottom
- Each slide is vertically scrollable for long content
- Keyboard arrow support (left/right)
- Touch swipe support via CSS `snap-x`

### About Me (Contact) visual improvements
- Hero: add `DecorativeBlobs variant="hero"`, increase heading to `text-4xl md:text-6xl lg:text-7xl font-display`
- Stats: wrap each stat in a pastel-colored card
- Expertise blocks: assign rotating pastel backgrounds like Cases page
- Tools section: pastel card backgrounds
- Social section: replace glass-orb decoratives with `DecorativeBlobs`
- Reviews: add pastel tints to active card
- Achievements: colorful timeline dots

### Header CTA rename
```typescript
// Before
{i18n.language === 'ru' ? 'Экспресс-аудит' : 'Express Audit'}

// After
{i18n.language === 'ru' ? 'Связаться' : 'Contact'}
```

### Files summary

| File | Action |
|------|--------|
| `src/pages/Home.tsx` | Remove BeforeAfterSection and TechStackCarousel |
| `src/pages/Templates.tsx` | Add TechStackCarousel |
| `src/components/Header.tsx` | Rename CTA button text |
| `src/pages/Cases.tsx` | Full rewrite: horizontal full-screen scroll layout |
| `src/pages/Contact.tsx` | Visual upgrade: blobs, pastel cards, bigger typography |
