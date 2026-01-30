
# Plan: CMS Editors for Home and "About Me" Pages

## Current State Analysis

Your site already has a robust CMS infrastructure:
- **Admin Products** (`/admin/products`) - for managing templates, courses, AI prompts
- **Admin Landings** (`/admin/landings`) - for editing template landing pages  
- **Inline Edit Panel** - floating edit controls on template pages
- **Database tables**: `products`, `template_landings`, `template_faq`, `public_reviews`

However, the **Home page** and **Contact (About Me)** page content is currently **hardcoded** in:
- `src/lib/i18n.ts` - translations (bio, section titles)
- `src/pages/Contact.tsx` - social links, expertise blocks, tools, websites, reviews, programs
- `src/pages/Home.tsx` - hero text, consulting section, product filters

---

## What We Will Build

### 1. New Database Table: `site_settings`

A single table to store all editable site content as JSON blocks:

| Column | Type | Description |
|--------|------|-------------|
| `key` | text (PK) | Section identifier (e.g., `hero`, `bio`, `social_links`) |
| `value` | jsonb | Section data |
| `updated_at` | timestamp | Last update time |

### 2. New Admin Page: `/admin/site-editor`

A centralized dashboard with tabs/sections for editing:

**Tab: Home Page**
- Hero section (title, subtitle, description in RU/EN)
- Consulting section (title, price, description)

**Tab: About Me**  
- Bio text (3 paragraphs, RU/EN)
- Statistics (numbers for projects, templates, websites, hours)
- Expertise blocks (add/remove, edit titles, descriptions, links)
- Tools section (add/remove tools with icons)
- Websites section (add/remove portfolio links)
- Programs & Games (add/remove items)
- Social links (YouTube, Telegram, LinkedIn, X, Notion)

### 3. Hook: `useSiteSettings`

A React hook that:
- Fetches settings from database
- Falls back to default static values if not in DB
- Provides update functions for admin

### 4. Inline Editing for About Me Page

Similar to template landings:
- Floating edit panel visible only for admins
- Click-to-edit fields directly on the page
- Save/discard changes

---

## Implementation Steps

### Step 1: Database Setup
Create `site_settings` table with:
- Public read access (everyone sees the site)
- Admin-only write access via RLS

### Step 2: Create Hook
`src/hooks/useSiteSettings.ts`:
- Fetch from `site_settings` table
- Merge with default values from i18n
- CRUD operations for admins

### Step 3: Admin Site Editor Page
`src/pages/AdminSiteEditor.tsx`:
- Tabs for different sections
- Form fields for each editable area
- Live preview capability
- Save/import buttons

### Step 4: Update Home Page
- Replace hardcoded i18n strings with dynamic data
- Keep i18n as fallback for SEO/initial load

### Step 5: Update Contact Page  
- Replace hardcoded arrays (socialLinks, expertiseBlocks, tools, websites, etc.)
- Add inline edit panel for admin users
- Make sections editable in place

### Step 6: Navigation Update
- Add "Site Settings" link in admin header
- Add route `/admin/site-editor`

---

## Technical Details

**Database Migration SQL:**
```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read site settings" 
  ON site_settings FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Admins can update site settings" 
  ON site_settings FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));
```

**Default Settings Structure:**
```typescript
interface SiteSettings {
  hero: {
    title_ru: string;
    title_en: string;
    subtitle_ru: string;
    subtitle_en: string;
    description_ru: string;
    description_en: string;
  };
  bio: {
    paragraph1_ru: string;
    paragraph1_en: string;
    paragraph2_ru: string;
    paragraph2_en: string;
    paragraph3_ru: string;
    paragraph3_en: string;
  };
  stats: {
    projects: number;
    templates: number;
    websites: number;
    hours: number;
  };
  social_links: Array<{
    icon: string;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    handle: string;
    link: string;
  }>;
  expertise_blocks: Array<{...}>;
  tools: Array<{...}>;
  websites: Array<{...}>;
  programs: Array<{...}>;
  consulting: {
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    price: string;
  };
}
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/hooks/useSiteSettings.ts` | Create - new hook |
| `src/pages/AdminSiteEditor.tsx` | Create - new admin page |
| `src/pages/Home.tsx` | Modify - use dynamic data |
| `src/pages/Contact.tsx` | Modify - use dynamic data + inline edit |
| `src/App.tsx` | Modify - add route |
| Database | Create - `site_settings` table |

---

## Benefits

1. **No more AI requests** for simple text/link changes
2. **Instant updates** - changes reflect immediately on the site
3. **Bilingual support** - edit RU and EN versions in one place
4. **Consistent with existing CMS** - same patterns as products/landings
5. **Fallback safety** - if DB is empty, static defaults work

---

## Alternative Considerations

**Option A: Single Admin Page (Recommended)**
- One centralized `/admin/site-editor` with all sections
- Pros: All settings in one place, easier navigation
- Cons: Longer page with multiple sections

**Option B: Inline Editing Only**
- Edit directly on Home/Contact pages when logged in as admin
- Pros: See changes in context
- Cons: More complex implementation, harder to edit both languages
