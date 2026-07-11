# Protocol 15 · for Prapti 🎀

A premium, scroll-based interactive birthday website — soft pink, coquette,
editorial. Built with **Next.js 14** (App Router, TypeScript) and **GSAP**.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

- Start on a desktop-sized window for the full effect.
- The first screen asks you to **drag the baby photo into the folder** — as you
  hover it over the folder, it opens and the photo tucks in.
- Click anywhere once early on so the music is allowed to play (browsers block
  autoplay until you interact).

### Build a static version

```bash
npm run build      # writes a self-contained site to ./out
```

## The ten scenes

1. **Boot** — drag the baby photo into the "HALF WAY TO 30" folder
2. **Install** — `prapti_15.pkg` fills 0 → 15%
3. **Ink** — words written & erased in a magical ink hand
4. **Fifteen** — big editorial "15" typography
5. **Words of Wisdom** — notes revealed on scroll
6. **Protocol 15** — *pinned*; the initialisation bar fills as you scroll
7. **Celebration** — confetti, balloons, sparkles, music
8. **Birthday Wish** — *pinned*; the cake stays centered while scrolling summons
   "Make a wish…", the countdown, and the candle blow-out
9. **Secret Letters** — friends' letters + a "who wrote this?" reveal
10. **Ending** — a calm, warm finale

## Make it personal

- **Photos & music** → drop files into [`public/assets/`](public/assets/README.md)
  (`baby.jpg`, `friend1.jpg` … `music.mp3`). Placeholders show until you do.
- **Names, letters, quiz answers, wisdom notes** → edit [`lib/data.ts`](lib/data.ts).

## Project structure

```
app/            layout, global styles, page (composition + effect hook)
components/     one file per scene (presentational)
lib/data.ts     letters + wisdom content (edit me)
lib/experience  the GSAP orchestration (scene flow, pins, particles, audio)
public/assets/  photos, placeholders, optional music
```

## Notes

- Fonts are self-hosted via `next/font` (Cormorant Garamond, Fraunces, Dancing
  Script, Caveat, Space Grotesk) — no runtime font CDN.
- Add `?debug&to=doc` (or `install` / `ink`) to the URL to jump straight to a
  scene while editing.
- Deploying to GitHub Pages as a project site? Uncomment `basePath` /
  `assetPrefix` in [`next.config.mjs`](next.config.mjs).

Made with love. Happy Birthday, Prapti. ♡
