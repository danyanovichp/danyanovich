

# Plan: Redesign Site in Pomelli / Google Labs Style

## Design Direction

A minimalist, polished aesthetic inspired by Pomelli (dark glass panels, warm accents, clean rounded cards) and Google Labs (generous whitespace, bold clean typography, pastel accent colors, pill-shaped elements). The current glassmorphism foundation stays but gets refined with softer colors and more breathing room.

## Key Visual Changes

**Color palette update:**
- Light mode: warm off-white background (#FAFAF8), soft gray cards, subtle lime-green/pastel accents for badges
- Dark mode: deep charcoal (#1A1A1A) background, slightly lighter card surfaces (#242424), warm muted borders
- Accent colors: soft lime (#C8E972), warm coral (#E8654A), muted teal -- used sparingly for badges and highlights

**Typography:**
- Larger, bolder headings with more letter-spacing
- Lighter body text weight for elegance
- Increase spacing between sections dramatically

**Cards and components:**
- Softer borders (border-border/10 instead of /20)
- Larger border-radius (3xl/4xl)
- Remove aggressive hover transforms (no more -translate-y-1 on every card)
- Subtle hover: just border brightness change + soft shadow

**Header:**
- Cleaner, more minimal -- reduce visual weight
- Thinner border, more transparent background

## Files to Change

### 1. `src/index.css` -- Color system overhaul
- Update CSS variables for both light and dark modes
- Warmer, more modern palette
- Softer shadows

### 2. `tailwind.config.ts` -- Add accent colors
- Add lime, coral accent color tokens
- Update animation timings for subtlety

### 3. `src/components/ui/card.tsx` -- Softer card defaults
- Remove aggressive hover translate
- Larger border-radius (3xl)
- Softer shadow transitions

### 4. `src/components/ui/button.tsx` -- Cleaner buttons
- More rounded (pill shape for default)
- Outlined variant more prominent
- Subtler hover effects

### 5. `src/components/ui/badge.tsx` -- Pastel accent badges
- Rounded-full stays, add softer color options

### 6. `src/components/Header.tsx` -- Minimal header
- Reduce padding, make more airy
- Cleaner pill nav with less visual weight

### 7. `src/pages/Portfolio.tsx` -- Full redesign
- Hero: large bold title, generous padding, clean subtitle with no badge clutter
- Project cards: large rounded cards with dark inner panels for workflow diagrams
- Workflow diagram gets a dedicated dark panel (like Pomelli's dark editor area)
- Feature sections as clean grid cards instead of heavy accordions
- Results as simple checkmark lists with good spacing
- Tags displayed as small pastel pills

### 8. `src/components/WorkflowDiagram.tsx` -- Pomelli-style dark panel
- Dark background panel (always dark regardless of theme, like Pomelli's editor)
- Larger nodes with more padding
- Smoother gradient connections
- Better spacing and larger SVG canvas

### 9. `src/pages/Home.tsx` -- Cleaner home
- Remove emoji from section titles
- More whitespace between sections
- Cleaner product cards matching new card style

### 10. `src/components/Footer.tsx` -- Minimal footer
- More whitespace, lighter feel

## Technical Details

### CSS Variables (light mode)
```css
:root {
  --background: 40 20% 98%;
  --foreground: 0 0% 12%;
  --card: 40 10% 100%;
  --card-foreground: 0 0% 12%;
  --primary: 0 0% 12%;
  --primary-foreground: 40 20% 98%;
  --secondary: 40 10% 93%;
  --muted: 40 10% 95%;
  --muted-foreground: 0 0% 45%;
  --border: 40 10% 88%;
  --accent-lime: 78 70% 55%;
  --accent-coral: 12 75% 55%;
}
```

### CSS Variables (dark mode)  
```css
.dark {
  --background: 0 0% 10%;
  --foreground: 40 10% 92%;
  --card: 0 0% 14%;
  --border: 0 0% 22%;
  --muted: 0 0% 18%;
}
```

### Card component
```typescript
// Remove hover:-translate-y-1, use softer transition
className: "rounded-3xl bg-card/80 backdrop-blur-xl border border-border/10 
  shadow-sm hover:shadow-md hover:border-border/30 transition-all duration-300"
```

### Portfolio page structure
```text
Portfolio Page (generous padding, clean layout)
+-- Hero: large title, subtitle, no badge
+-- Project cards (vertical stack, max-w-5xl, centered)
    +-- Project Card (rounded-3xl, large padding)
        +-- Header: category pill (lime/coral), title, tags
        +-- Summary text
        +-- Dark Panel: Workflow Diagram (always dark bg, rounded-2xl)
        +-- Feature Grid (2-col on desktop): simple feature cards
        +-- Results: clean checkmark list
```

### Workflow diagram dark panel
```text
- Container: bg-[#1a1a1a] rounded-2xl p-6 (always dark)
- Nodes: larger (120x50), more rounded, white/light text
- Connections: thicker (2.5px), softer gradients
- Canvas: SVG_W=1000, SVG_H=240 for more breathing room
```

### Files summary

| File | Action |
|------|--------|
| `src/index.css` | Update color palette, softer shadows, warmer tones |
| `tailwind.config.ts` | Add accent color tokens |
| `src/components/ui/card.tsx` | Softer defaults, larger radius, remove aggressive hover |
| `src/components/ui/button.tsx` | More pill-shaped, subtler effects |
| `src/components/Header.tsx` | Cleaner, more minimal |
| `src/pages/Portfolio.tsx` | Full redesign with clean cards and dark panels |
| `src/components/WorkflowDiagram.tsx` | Dark panel style, larger nodes |
| `src/pages/Home.tsx` | Remove emojis, cleaner spacing |
| `src/components/Footer.tsx` | More minimal |

