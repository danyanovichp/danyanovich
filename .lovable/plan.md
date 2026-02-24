

# Plan: Redesign for a Beautiful Personal Site

## Vision

Transform the site from a "product catalog" feel into a clean, elegant **personal brand site** -- inspired by Lovable's minimalist aesthetic. The focus shifts to: **who Dan is, what he does, and how to explore his projects**. Each section breathes with whitespace, subtle animations, and a warm personality.

## Current Issues

- Homepage is too bare (just title + consulting card)
- Navigation has "SUPPORT" which feels out of place as a main nav item
- The templates page has too many sections (AI Training, free templates, education, FAQ, reviews, tech carousel) -- it's overloaded
- Overall the site lacks a cohesive "personal brand" story flow
- DecorativeBlobs on the hero feel heavy on dark mode

## Changes

### 1. Homepage (`src/pages/Home.tsx`) -- Full Redesign

Replace the current minimal hero + consulting with a richer, more personal page:

```text
+------------------------------------------+
|  Hero: Name + one-liner tagline          |
|  (subtle gradient text, no blobs)        |
|  Two soft CTA links (not loud buttons)   |
+------------------------------------------+
|  "What I Do" -- 3 compact cards:         |
|  [Notion Systems] [AI & Automation] [Web]|
|  Each with icon, 1-line desc, link       |
+------------------------------------------+
|  "Projects" -- 2-3 featured cases        |
|  Minimal cards linking to /cases         |
+------------------------------------------+
|  Consulting CTA -- softer, inline        |
+------------------------------------------+
```

Key style changes:
- Remove DecorativeBlobs from hero (cleaner)
- Hero title: `text-4xl md:text-5xl` (smaller, more elegant)
- Subtitle as a single elegant line with `text-muted-foreground`
- CTA buttons become text links with subtle underline/arrow, not big filled buttons
- "What I Do" section uses 3 small cards with tiny icons (`h-4 w-4`) and short labels
- Featured projects pulled from `portfolioProjects` data (first 2-3 items)
- Consulting section becomes a subtle inline banner instead of a full card

### 2. Navigation (`src/components/Header.tsx`)

Reorder and simplify:
- **Home** / **Cases** / **Templates** / **About** / **Support**
- Move "ABOUT ME" to just "ABOUT" for brevity
- Keep Support but move it to last position

### 3. Templates Page (`src/pages/Templates.tsx`) -- Streamline

Remove visual clutter:
- **Remove** TechStackCarousel (it's distracting on a templates page)
- **Remove** AI Training "coming soon" card (adds noise)
- **Remove** Education section (courses, guides, AI prompts cards)
- **Remove** Free templates section (or move to a collapsible)
- **Remove** FAQ section (already has /faq page)
- **Remove** Reviews section (already has /reviews page)
- **Keep**: Hero description + filters + template cards grid only
- Template cards: reduce icon container padding from `py-6` to `py-4`

### 4. Global Style Refinements

#### `src/index.css`
- Add a subtle gradient utility class for hero text: `.text-gradient` with a soft foreground-to-muted gradient
- Reduce default section padding slightly for tighter feel

#### `src/components/ui/card.tsx`
- Already refined to `scale-[1.01]` -- keep as is

#### `src/components/Footer.tsx`
- Rename "PRODUCTS" column to "SERVICES" or "EXPLORE"
- Keep links as they are

### 5. Homepage "What I Do" Section

Three minimal cards using existing data from `useSiteSettings` expertise blocks:

```text
[FileText icon]          [Bot icon]           [Code2 icon]
Notion Systems           AI & Automation       Vibe Coding
Build workspace...       Prompts & flows...    Web apps with AI...
-> /templates            -> /cases             -> /cases
```

Each card: small icon, title, one-line description, subtle arrow link. No borders, just hover background change.

### 6. Featured Projects on Home

Pull 2-3 projects from `portfolioProjects` array, show as minimal cards:
- Project title + category badge + one-line summary
- Link to /cases

## Files Summary

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Full redesign: hero + "What I Do" + featured projects + consulting CTA |
| `src/pages/Templates.tsx` | Remove TechStackCarousel, AI Training, Education, Free Templates, FAQ, Reviews sections |
| `src/components/Header.tsx` | Reorder nav: Home, Cases, Templates, About, Support |
| `src/components/Footer.tsx` | Rename "Products" column header to "Explore" |
| `src/index.css` | Add `.text-gradient` utility class |

## Technical Notes

- Import `portfolioProjects` in Home.tsx to show featured cases
- Import expertise blocks from `useSiteSettings` for "What I Do" cards
- Use `lucide-react` icons: `FileText`, `Bot`, `Code2`, `ArrowRight`
- All sections remain bilingual (RU/EN) using `i18n.language === 'ru'`
- No new dependencies needed

