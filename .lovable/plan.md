

# Plan: Simplify Home Page and Refine Style

## Overview

Remove the Products section from the Home page entirely, refine the overall visual style to be cleaner and more Lovable-like, and improve the Templates page with a proper description of what Notion templates are.

## Changes

### 1. `src/pages/Home.tsx` -- Simplify to Hero + Consulting only

- **Remove** the entire Products section (filter chips, product grid, "All Products" button)
- **Remove** unused imports: `useState`, `useMemo`, `Layout`, `GraduationCap`, `Bot`, `Badge`, `useProducts`, `premiumTemplates`, `pastelBgClasses`, `getIconComponent`, `ProductType`, filter logic
- Keep only: Hero section + Consulting section
- Update hero CTA buttons: "Шаблоны Notion" / "Notion Templates" (link to /templates) and "Кейсы" / "Cases" (link to /cases)

### 2. `src/pages/Templates.tsx` -- Smaller icons + Notion description

- Reduce icon size from `h-12 w-12` to `h-5 w-5` in template cards (both available and development sections)
- Reduce the `aspect-video` placeholder height to a smaller ratio like `aspect-[3/1]` or use a compact padding instead
- Add a descriptive section about what Notion templates are, placed before the template grid:
  - RU: "Готовые системы в Notion для бизнеса и жизни. Каждый шаблон -- это продуманная структура с базами данных, автоматизациями и визуализациями."
  - EN: "Ready-made Notion systems for business and life. Each template is a thoughtful structure with databases, automations, and visualizations."

### 3. `src/components/ui/card.tsx` -- Softer hover effect

- Reduce hover scale from `hover:scale-[1.02]` to `hover:scale-[1.01]` for subtler interaction
- Lighten shadow: `hover:shadow-md` instead of `hover:shadow-lg`

### 4. `src/pages/Home.tsx` -- Style refinements (Lovable-inspired)

- Reduce hero title size slightly: `text-4xl md:text-6xl lg:text-7xl` (from 5xl/7xl/8xl)
- Use lighter font weight for subtitle
- Consulting card: softer, more minimal design

### 5. `src/components/Header.tsx` -- Update navigation

- Change "ПРОДУКТЫ" / "PRODUCTS" link to point to `/templates` and label it "ШАБЛОНЫ" / "TEMPLATES"

### 6. `src/components/Footer.tsx` -- Update product links

- Change "Все продукты" / "All Products" link to point to `/templates` and label it "Шаблоны Notion" / "Notion Templates"

## Technical Details

### Home page structure (after changes)

```text
+----------------------------------+
|          Hero Section            |
|   Title + Subtitle + Desc       |
|   [Notion Templates] [Cases]    |
+----------------------------------+
|       Consulting Section         |
|   Card with booking CTA         |
+----------------------------------+
```

### Template card icon area (before vs after)

```text
Before:  aspect-[4/3] container with h-12 w-12 icon (large empty area)
After:   py-6 container with h-5 w-5 icon (compact, refined)
```

### Files summary

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Remove Products section, simplify imports, update CTA links |
| `src/pages/Templates.tsx` | Smaller icons, add Notion description section |
| `src/components/ui/card.tsx` | Softer hover effects |
| `src/components/Header.tsx` | Rename "Products" nav link to "Templates", point to /templates |
| `src/components/Footer.tsx` | Rename "All Products" to "Notion Templates", point to /templates |

