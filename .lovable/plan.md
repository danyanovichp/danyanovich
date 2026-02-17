
# Plan: Navigation Reorder, Transparent Diagram Background, Bigger Architecture, Mobile Fixes

## 1. Move "Products" to 4th (last) position in navigation

**File:** `src/components/Header.tsx`

Reorder `mainLinks` array so Products is last:
- Current: Home, Products, Cases, Contact
- New: Home, Cases, Contact, Products

## 2. WorkflowDiagram: transparent theme-aware background

**File:** `src/components/WorkflowDiagram.tsx`

- Replace hardcoded `backgroundColor: '#141414'` with theme-aware CSS class `bg-muted/30` (transparent, adapts to light/dark theme)
- Change node text fill from hardcoded `hsl(0 0% 80%)` to `currentColor` with opacity so it adapts to theme
- Increase connection stroke opacity for better visibility on light backgrounds

## 3. WorkflowDiagram: make bigger and more visually appealing

**File:** `src/components/WorkflowDiagram.tsx`

- Increase `SVG_H` from 240 to 340 for taller diagram
- Increase `NODE_W` from 120 to 150 and `NODE_H` from 50 to 60 for bigger nodes
- Increase font sizes (icon: 16 to 20, label: 12 to 14)
- Remove `maxHeight: 260` cap so diagram shows at full size
- Increase connection stroke width from 2.5 to 3
- Add subtle glow/shadow on nodes for depth

**File:** `src/pages/Cases.tsx`

- Remove "Архитектура" label or make it bigger as section header
- Give the diagram more vertical space

## 4. Mobile responsiveness fixes

**File:** `src/components/WorkflowDiagram.tsx`
- Reduce `min-w-[600px]` to `min-w-[500px]` for better mobile fit
- Ensure horizontal scroll works smoothly on mobile

**File:** `src/pages/Cases.tsx`
- Navigation arrows: reduce size on mobile (`h-10 w-10` on mobile, `h-12 w-12` on desktop)
- Move arrows slightly inward from edges for thumb reach
- Ensure dots are above safe area on mobile
- Title text size adjustments for small screens

**File:** `src/pages/Home.tsx`
- Product grid: on mobile use `grid-cols-2` instead of single column for better use of space
- Filter chips: ensure they don't overflow on small screens

## Technical Details

### Navigation reorder (Header.tsx)
```typescript
const mainLinks = [
  { href: "/", label: t('nav.home') },
  { href: "/cases", label: isRu ? 'КЕЙСЫ' : 'CASES' },
  { href: "/contact", label: t('nav.contact') },
  { href: "/products", label: isRu ? 'ПРОДУКТЫ' : 'PRODUCTS' },
];
```

### WorkflowDiagram theme-aware background
```typescript
// Before
style={{ backgroundColor: '#141414' }}

// After
className="w-full overflow-x-auto rounded-2xl p-6 bg-muted/20 border border-border/10"
// No inline backgroundColor -- adapts to light/dark theme automatically
```

### WorkflowDiagram sizing
```typescript
const NODE_W = 150;
const NODE_H = 60;
const SVG_W = 1000;
const SVG_H = 340;
```

### Files summary

| File | Changes |
|------|---------|
| `src/components/Header.tsx` | Reorder nav links: Products last |
| `src/components/WorkflowDiagram.tsx` | Transparent bg, bigger nodes, theme-aware colors |
| `src/pages/Cases.tsx` | Mobile-friendly arrows and spacing |
| `src/pages/Home.tsx` | Mobile grid improvements |
