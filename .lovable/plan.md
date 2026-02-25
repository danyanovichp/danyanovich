

# Plan: Add NOWPayments Donation Widget to Support Page

## What Changes

Add a prominent NOWPayments donation button/section to the Support page, linking to `https://nowpayments.io/donation/danyanovich`. This will be placed **above** the manual crypto wallets section as the primary donation method.

## Implementation

### `src/pages/Support.tsx`

Add a new section between the Hero and the Crypto Wallets sections:

- A card with a `CreditCard` (or `ExternalLink`) icon from lucide-react
- Bilingual title: "Быстрый донат" / "Quick Donation"
- Bilingual description explaining this is the easiest way to donate via any crypto
- A styled button/link that opens `https://nowpayments.io/donation/danyanovich` in a new tab
- Styled consistently with the rest of the page (rounded-2xl, pastel background, hover effect)

```text
+------------------------------------------+
|  Hero (existing)                         |
+------------------------------------------+
|  NEW: NOWPayments Donation Card          |
|  [CreditCard icon]                       |
|  "Quick Donation" title                  |
|  "Support via any cryptocurrency" desc   |
|  [Donate Now ->] button (opens link)     |
+------------------------------------------+
|  Crypto Wallets (existing)               |
+------------------------------------------+
|  Motivational (existing)                 |
+------------------------------------------+
```

### Details

- Uses `<a href="..." target="_blank" rel="noopener noreferrer">` wrapped in a styled button
- Icon: `ExternalLink` from lucide-react for the button, `CreditCard` for the card header
- Background: `bg-pastel-peach/20` to differentiate from wallet cards
- No new dependencies needed

