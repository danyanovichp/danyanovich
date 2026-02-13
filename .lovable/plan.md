

# Plan: Final Admin Cleanup and Auth Removal

## Current Status

The admin panel pages and components have been **successfully deleted**. No admin routes, no inline editors, no product editors remain in the app. However, there are a few leftover artifacts that should be cleaned up.

## What Will Be Changed

### 1. Clean up `useSiteSettings.ts`

Remove the dead admin write methods (`updateSetting`, `updateMultipleSettings`, `resetToDefaults`) and the `isAdmin`/`isSaving` state since they can never execute. Keep only the read logic (fetching settings from the database for display).

### 2. Delete unused `useTemplateReviews.ts`

This hook has save/delete review functions and is not imported anywhere in the app. It should be deleted.

### 3. Remove `user_roles` table and `has_role` function from database

Since authentication and admin roles are no longer needed:
- Drop the `user_roles` table
- Drop the `has_role` database function  
- Drop the `app_role` enum type

This removes the last database-level admin infrastructure. All product data, reviews, template landings, and site settings remain untouched.

### 4. Regarding Lovable Cloud authentication

Lovable Cloud authentication cannot be "disabled" as a toggle from code. However, since:
- The `Auth.tsx` page has been deleted
- No `supabase.auth` calls exist anywhere in the frontend code
- No login/signup UI exists

Users have **no way to authenticate**. The auth system is effectively unused. The `user_roles` table cleanup (step 3) removes the last auth-related database object your app uses.

---

## Technical Details

### Files to modify

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useSiteSettings.ts` | Simplify | Remove all write methods, keep read-only |
| `src/hooks/useTemplateReviews.ts` | Delete | Not imported anywhere |

### Database migration

```sql
-- Drop admin role infrastructure
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);
DROP TYPE IF EXISTS public.app_role CASCADE;
```

### Simplified `useSiteSettings.ts` return

```typescript
return {
  settings,
  isLoading,
  refetch: fetchSettings,
};
```

All write-related exports (`updateSetting`, `updateMultipleSettings`, `resetToDefaults`, `isSaving`) will be removed.

