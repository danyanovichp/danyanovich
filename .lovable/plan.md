
# Plan: Update Products, Remove Admin Tools, Clean Up UI

## Overview

This plan addresses several changes: updating all template products to "available" status with price 5000 RUB and Telegram purchase link, removing Python from Tech Stack, removing newsletter, removing the review submission form (keeping display only), and removing admin management pages while preserving existing data.

## Changes

### 1. Update all products in database to "available" status

**Database update** (via insert tool):
- Set all products with `status = 'development'` or any status to `status = 'available'`  
- Set `price = '5 000 ₽'`, `price_value = 5000` for products that were in development
- Set `link = 'https://t.me/danyanovich'` for all products

Also update the **static data** in `src/data/premiumTemplates.ts`:
- Change ALL templates: `status: 'available'`, `price: '5 000 ₽'`, `priceValue: 5000`, `link: 'https://t.me/danyanovich'`

### 2. Remove Python from Tech Stack

**File:** `src/components/TechStackCarousel.tsx`
- Remove the Python entry from the `techStack` array (lines 69-76)

### 3. Remove Newsletter

**File:** `src/components/Footer.tsx`
- Remove the `NewsletterSignup` import and the newsletter column from the footer grid
- Change grid from `lg:grid-cols-4` to `lg:grid-cols-3`

### 4. Reviews page -- remove submission form, keep display only

**File:** `src/pages/Reviews.tsx`
- Remove the entire "Submit Review Form" section (lines 195-316)
- Remove unused imports: `Send`, `Clock`, `Input`, `Textarea`, `Label`, `z`, `checkReviewRateLimit`, `ReviewFormData`
- Remove form-related state (`formData`, `errors`, `submitted`, `rateLimitSeconds`) and handlers
- Keep the reviews list display section as-is

### 5. Remove Admin pages and routes

**File:** `src/App.tsx`
- Remove lazy imports for: `AdminLandings`, `AdminProducts`, `LandingEditor`, `AdminReviews`, `AdminSiteEditor`, `Auth`
- Remove routes: `/auth`, `/admin/landings`, `/admin/landings/new`, `/admin/landings/:templateId`, `/admin/products`, `/admin/reviews`, `/admin/site-editor`
- Also fix duplicated `<Route path="*">` and duplicated `<YandexMetrika />` / `<GoogleAnalytics />`

**File:** `src/pages/TemplateLanding.tsx`
- Remove admin-related imports (`useAuth`, `useLandingEditor` editing parts, `useProductEditor`, `InlineEditPanel`, `ProductEditPanel`)
- Remove admin edit panel and product edit panel sections
- Remove inline editing logic (keep only display mode)

**File:** `src/components/Header.tsx`  
- No changes needed (header doesn't link to admin pages)

### 6. Files that remain but become unused (can be kept for reference)

These files will no longer be imported but the data they created in the database remains intact:
- `src/pages/AdminProducts.tsx`
- `src/pages/AdminLandings.tsx`  
- `src/pages/AdminReviews.tsx`
- `src/pages/AdminSiteEditor.tsx`
- `src/pages/LandingEditor.tsx`
- `src/pages/Auth.tsx`
- `src/components/InlineEditPanel.tsx`
- `src/components/ProductEditPanel.tsx`
- `src/components/editors/*.tsx`
- `src/hooks/useProductEditor.ts`
- `src/hooks/useLandingEditor.ts`

These files can be deleted to keep the project clean, but all data created via these tools stays in the database.

---

## Technical Details

### Database Update (SQL via insert tool)

```sql
UPDATE products 
SET status = 'available', 
    price = '5 000 ₽', 
    price_value = 5000, 
    link = 'https://t.me/danyanovich'
WHERE status = 'development' OR link IS NULL OR link = '#';
```

Also update existing products (gtd-os, journal-os, life-os) to use Telegram link.

### Static Data Changes (`premiumTemplates.ts`)

All ~25 templates will have their `status`, `price`, `priceValue`, and `link` fields updated.

### Route Cleanup (`App.tsx`)

Remove 7 admin routes and their lazy imports. Fix duplicate `<Route path="*">` and duplicate analytics components.

### TemplateLanding.tsx Simplification

Remove admin editing capabilities while keeping all display logic intact. The page will still load data from DB and static files, show all sections (hero, pain points, features, FAQ, reviews, etc.) -- just without the ability to edit inline.
