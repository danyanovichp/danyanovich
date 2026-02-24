

# Plan: Add /support Page with Crypto Donations

## Overview

Create a new dedicated `/support` page with cryptocurrency wallet addresses, add navigation links to it from the header and footer.

## Changes

### 1. New file: `src/pages/Support.tsx`

A bilingual (RU/EN) page with:

- **Hero section** -- "Поддержать" / "Support Me" title with a heart icon and a short thank-you message explaining what support means
- **Crypto wallets section** -- cards for each cryptocurrency with:
  - Coin name + icon (Bitcoin, Ethereum, USDT, etc.)
  - Wallet address displayed in a monospace font
  - "Copy" button that copies the address to clipboard with a toast notification ("Адрес скопирован" / "Address copied")
  - QR-code placeholder area (optional, can be added later with actual QR images)
- **Motivational block** -- short text about how the support helps (developing templates, creating content, etc.)
- SEO metadata via the `<SEO>` component
- Consistent styling: pastel card backgrounds, DecorativeBlobs, AnimatedSection for scroll animations

The wallet addresses will be stored as a constant array inside the component. You'll fill in the actual addresses after deployment.

### 2. Update: `src/App.tsx`

- Add lazy import for Support page
- Add route: `<Route path="/support" element={<PageTransition><Support /></PageTransition>} />`

### 3. Update: `src/components/Header.tsx`

- Add "Поддержать" / "Support" link to `mainLinks` array (after "Products")

### 4. Update: `src/components/Footer.tsx`

- Add link to /support in the Resources column

### 5. Update: `src/lib/i18n.ts`

- Add translation keys for "nav.support" in both RU and EN resources

## Technical Details

### Crypto card component structure

```typescript
const cryptoWallets = [
  { name: 'Bitcoin (BTC)', icon: '₿', address: 'YOUR_BTC_ADDRESS', color: 'bg-pastel-yellow/30' },
  { name: 'Ethereum (ETH)', icon: 'Ξ', address: 'YOUR_ETH_ADDRESS', color: 'bg-pastel-lavender/30' },
  { name: 'USDT (TRC-20)', icon: '₮', address: 'YOUR_USDT_ADDRESS', color: 'bg-pastel-mint/30' },
];
```

Each card will have a copy-to-clipboard button using `navigator.clipboard.writeText()` and a `sonner` toast for feedback.

### Files summary

| File | Action |
|------|--------|
| `src/pages/Support.tsx` | Create new page |
| `src/App.tsx` | Add route + lazy import |
| `src/components/Header.tsx` | Add nav link |
| `src/components/Footer.tsx` | Add footer link |
| `src/lib/i18n.ts` | Add translation keys |

