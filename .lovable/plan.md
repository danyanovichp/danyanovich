
# Plan: Touch Swipe, Responsive Cases Layout, Remove CTA Button, Smooth Transitions, Detailed About Me

## Summary

1. **Cases page: mobile vertical, desktop horizontal** -- on phones (`< 768px`) projects stack vertically with scroll; on tablet/desktop keep the horizontal slider with touch swipe support
2. **Touch swipe gestures** for horizontal slider on tablet/desktop
3. **Remove "Связаться" yellow CTA button** from the header
4. **Smooth page transitions** -- improve the transition between pages
5. **Detailed About Me (Contact) page** -- add comprehensive professional profile with work experience, technical stack, education, and achievements from the provided resume

## Files to Change

### 1. `src/pages/Cases.tsx` -- Responsive layout + touch swipe

**Mobile (< 768px):** Remove horizontal slider, render projects as vertical cards stacked one after another. Each project is a full card with all content, user scrolls down naturally.

**Tablet/Desktop (>= 768px):** Keep horizontal full-screen slider. Add touch swipe support using `touchstart`/`touchmove`/`touchend` events with a swipe threshold (50px). Smooth `transition-transform duration-500 ease-out` stays.

### 2. `src/components/Header.tsx` -- Remove CTA button

Remove the yellow "Связаться" / "Contact" `<a>` tag entirely (lines 56-63). Keep only theme toggle, language toggle, and mobile menu.

### 3. `src/pages/Contact.tsx` -- Comprehensive About Me page

Replace the current simple bio with a rich, detailed professional profile based on the provided resume. Structure:

**New sections to add:**
- **Hero** -- "Данила Путинцев" name, title "Архитектор рабочих пространств и цифровых систем", contact links (Telegram, YouTube, LinkedIn, X, email)
- **Professional Profile** -- key competency statement, core focus areas, professional philosophy
- **Statistics** -- keep existing stats section but update values (50+ projects, 500+ templates, 100+ hours, 17 commercial proposals)
- **Work Experience** -- 3 main roles as expandable/visible blocks:
  - IT-Specialist & Manager at Viora Build (July 2024 - Jan 2026) with 4 technical projects (Email AI, ClickUp Reports Agent, Construction AI Agent, Telegram to ClickUp)
  - CEO at Viora Consulting (Sep 2025 - Jan 2026) with construction course
  - Digital Products Producer at Viora Development (Sep 2025 - Jan 2026) with 17 commercial proposals
  - Freelance -- Dan Yanovich (July 2020 - Jan 2026) with 50+ projects
- **Technical Stack** -- organized grid: No-Code, Programming, AI/ML, Databases, DevOps, Design
- **Education** -- Alpi AI Creator Course, Self-taught
- **Key Achievements** -- visual list with checkmarks
- **Contact Info** -- all links and availability info

Each section uses pastel card backgrounds, Space Grotesk headings, and DecorativeBlobs for visual richness. Work experience projects use collapsible accordion or visible cards with workflow descriptions.

### 4. `src/components/PageTransition.tsx` -- Smoother transitions

Check and improve the page transition animation for softer feel.

## Technical Details

### Touch swipe for Cases (desktop/tablet)
```typescript
// Track touch start/end positions
const touchStartX = useRef(0);
const touchEndX = useRef(0);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
};
const handleTouchMove = (e: React.TouchEvent) => {
  touchEndX.current = e.touches[0].clientX;
};
const handleTouchEnd = () => {
  const diff = touchStartX.current - touchEndX.current;
  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev();
  }
};
```

### Cases mobile layout
```typescript
// Use useIsMobile() hook
const isMobile = useIsMobile();

// Mobile: vertical scroll, all projects visible
// Desktop: horizontal slider with swipe
{isMobile ? (
  <div className="space-y-8 py-8 px-4">
    {portfolioProjects.map((project, index) => (
      // Full project card, no slider
    ))}
  </div>
) : (
  // Existing horizontal slider with touch events
)}
```

### About Me content structure (bilingual)
All content will be bilingual (RU/EN) using the `isRu` flag. The resume data will be stored as constants in the Contact component. Each work experience entry will be a pastel-colored card with:
- Company name and role
- Duration and format
- Description paragraphs
- Technical projects as nested cards
- Results with checkmark lists
- Tech stack badges

### Files summary

| File | Changes |
|------|---------|
| `src/pages/Cases.tsx` | Mobile vertical layout, desktop horizontal with touch swipe |
| `src/components/Header.tsx` | Remove yellow CTA button |
| `src/pages/Contact.tsx` | Full rewrite with detailed professional profile |
| `src/components/PageTransition.tsx` | Check/improve transition smoothness |
