

# Plan: Remove Decorative Blob Backgrounds

## Problem

The `DecorativeBlobs` component renders large pastel-colored blurred shapes that create ugly gradient transitions between sections -- visible as the washed-out beige/yellow band in the screenshot.

## Changes

### 1. `src/pages/Contact.tsx` -- Remove DecorativeBlobs

- Remove `DecorativeBlobs` import
- Remove `<DecorativeBlobs variant="hero" />` from the hero section (line 255)
- Remove `<DecorativeBlobs variant="section" />` from the social/contact section (line 555)
- Remove `overflow-hidden` from those sections since it was only needed to contain the blobs

### 2. `src/components/Footer.tsx` -- Remove DecorativeBlobs

- Remove `DecorativeBlobs` import
- Remove `<DecorativeBlobs variant="footer" />` (line 26)
- Remove `overflow-hidden` from the footer element

### 3. `src/pages/Support.tsx` -- Remove DecorativeBlobs

- Remove `DecorativeBlobs` import
- Remove `<DecorativeBlobs variant="hero" />` (line 60)

This keeps the `DecorativeBlobs` component file intact in case it's needed later, but removes it from all pages so the site has a clean, flat background throughout.

