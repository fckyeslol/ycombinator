# Prewave — YC Startup School 2026 presentation site

A single-page site that represents Prewave for the YC Project Session. Built to the
spec in [`SDD.md`](./SDD.md). Static HTML/CSS/vanilla JS — no build step.

## Run locally
Open `index.html` in a browser, or serve it:
```bash
npx serve .        # or: python -m http.server
```

## Deploy (Vercel)
```bash
npx vercel         # preview
npx vercel --prod  # production URL to paste into the YC form
```
No framework, no build — Vercel serves the static files directly.

## Before it goes live — 3 open items
1. **Record the video.** Replace the `<figure class="player">` placeholder in
   `index.html` with a real `<video>` (the markup to swap in is in an HTML comment
   right above it). The 16:9 box already reserves the exact space — no layout shift.
2. ~~**Live account link.**~~ Done — points to https://www.instagram.com/andresbilbao/
3. ~~**Deploy.**~~ Done — live at https://fckyeslol.github.io/ycombinator/ (GitHub Pages,
   `main` branch root). Pushing to `main` auto-redeploys in ~1 min.

## Design notes
- Direction: "mission control for personal brands" — light instrument panel.
- Signature: the hero `40k → 700k+` trajectory is *drawn* on load (cobalt → emerald).
- Type: Space Grotesk (display/data) + Inter (body).
- Accessibility: keyboard focus states, `prefers-reduced-motion` respected, AA contrast.
- Performance: zero framework JS; well inside the microsite budget (JS < 80kb, CSS < 15kb).
