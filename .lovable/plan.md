
# Plan: Google Labs Style Redesign with Bold Typography and Visual Elements

## Overview

Transform the site to match the Google Labs aesthetic: bold geometric typography (Space Grotesk font), colorful blob-shaped decorative elements, vibrant pastel card backgrounds, playful animations, and generous whitespace. The current dark glass style will shift to a brighter, more colorful and experimental feel.

## Key Design Changes

**Font: Space Grotesk**
- Replace Inter with Space Grotesk for headings (bold, geometric, similar to Google Sans)
- Keep Inter for body text (clean readability)
- Import from Google Fonts

**Color palette shift:**
- Bright pastel accent colors: yellow (#FAEF5D), pink (#FFB6E1), lavender (#B8B5FF), mint green (#7DF9A3), coral (#FF8A65)
- White/light background stays, cards get colorful pastel backgrounds
- Dark mode keeps softer dark tones

**Decorative blob shapes:**
- CSS blob shapes (border-radius organic forms) as background decorations
- Floating animated blobs in hero sections and footer (like Google Labs community section)
- Color-coded per section

**Card style update:**
- Cards get colorful pastel background tints (yellow, pink, lavender, blue)
- Larger border-radius (3xl/4xl)
- No borders or very subtle ones
- Hover: gentle scale + shadow

**Animations:**
- Smooth scroll-triggered fade-in/slide-up (already exists, will enhance)
- Floating blob animations (gentle drift)
- Card entrance stagger animations

## Files to Change

### 1. `src/index.css` -- Font + blob utilities + colors
- Add Space Grotesk import from Google Fonts
- Update heading font-family to Space Grotesk
- Add blob shape CSS utilities (organic border-radius patterns)
- Add floating animation keyframes
- Add pastel accent color variables

### 2. `tailwind.config.ts` -- New colors + animations
- Add pastel color tokens (pastel-yellow, pastel-pink, pastel-lavender, pastel-mint, pastel-coral)
- Add blob float animation
- Add font family for Space Grotesk

### 3. `src/components/Header.tsx` -- Cleaner Google Labs style header
- Simpler nav: left-aligned links, center logo, right controls
- Remove pill background on nav container
- Clean text links with underline hover effect
- Bolder logo text using Space Grotesk

### 4. `src/pages/Home.tsx` -- Google Labs inspired home
- Hero: much larger heading with Space Grotesk, colorful decorative blobs behind text
- Product cards: each gets a random pastel background color (yellow, pink, lavender, blue) like Google Labs experiment cards
- "View all" button as a wide pill button (like Google Labs)
- Decorative blob shapes between sections
- Remove glass-orb, replace with colorful CSS blobs

### 5. `src/pages/Cases.tsx` -- Colorful project cards
- Each project card gets a distinct pastel accent background
- Workflow diagrams stay dark (contrast panel)
- Feature cards get lighter tint backgrounds
- More playful layout with decorative elements

### 6. `src/components/WorkflowDiagram.tsx` -- Keep dark panel
- No major changes, the dark panel contrast works well against colorful backgrounds

### 7. `src/components/BeforeAfterSection.tsx` -- Colorful cards
- Each before/after card gets a pastel background tint
- Bolder headings with Space Grotesk

### 8. `src/components/TechStackCarousel.tsx` -- Remove emoji from heading
- Clean up title

### 9. `src/components/Footer.tsx` -- Decorative footer
- Add colorful blob shapes as background decoration (like Google Labs community section)
- Rotated pill-shaped CTA links overlaying blobs

### 10. `src/components/ui/card.tsx` -- Remove dark hover effects
- Lighter, cleaner default styling
- Support for colorful backgrounds

### 11. New `src/components/DecorativeBlobs.tsx` -- Reusable blob component
- SVG/CSS blob shapes in various pastel colors
- Configurable: circle, squircle, organic blob
- Used as background decoration across pages

## Technical Details

### Font setup (index.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
}
```

### Pastel colors (tailwind.config.ts)
```typescript
colors: {
  pastel: {
    yellow: '#FAEF5D',
    pink: '#FFB6E1',
    lavender: '#B8B5FF',
    mint: '#7DF9A3',
    coral: '#FF8A65',
    blue: '#89CFF0',
  }
}
```

### Blob shape CSS
```css
.blob-circle { border-radius: 50%; }
.blob-squircle { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
.blob-organic { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
.blob-flower { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; }
```

### Home page product cards
Each card gets assigned a pastel color from a rotating array:
```typescript
const pastelColors = ['bg-pastel-yellow', 'bg-pastel-pink', 'bg-pastel-lavender', 'bg-pastel-mint', 'bg-pastel-coral'];
// Card gets pastelColors[index % pastelColors.length]
```

### DecorativeBlobs component
```typescript
// Renders 5-6 colorful blob shapes positioned absolutely
// Used in hero sections and footer
// Gentle floating animation with different delays
```

### Google Labs inspired card layout (Home page)
```text
Products Section
+-- Section title (Space Grotesk, bold)
+-- 4-col horizontal scroll or grid
    +-- Card (pastel-yellow bg, rounded-3xl)
        +-- Large image area (rounded inner panel)
        +-- Title (Space Grotesk bold)
        +-- Description
        +-- "Try it" pill button
    +-- Card (pastel-pink bg, rounded-3xl)
    +-- Card (pastel-lavender bg, rounded-3xl)
    +-- Card (pastel-blue bg, rounded-3xl)
+-- "View all" wide pill button (centered)
```

### Files summary

| File | Action |
|------|--------|
| `src/index.css` | Add Space Grotesk font, blob utilities, pastel variables |
| `tailwind.config.ts` | Add pastel colors, blob animations, font family |
| `src/components/ui/card.tsx` | Lighter defaults, support colorful bg |
| `src/components/Header.tsx` | Simpler Google Labs style nav |
| `src/components/Footer.tsx` | Add decorative blobs |
| `src/components/DecorativeBlobs.tsx` | New -- reusable blob shapes |
| `src/pages/Home.tsx` | Colorful cards, blobs, Space Grotesk headings |
| `src/pages/Cases.tsx` | Pastel card backgrounds, bolder typography |
| `src/components/BeforeAfterSection.tsx` | Colorful card tints |
| `src/components/TechStackCarousel.tsx` | Clean up heading |
