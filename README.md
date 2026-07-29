# Happy Girlfriend's Day 💌

A cozy, one-page interactive site: an envelope you open, a polaroid
memory gallery, a glassmorphism love letter, and a heart-confetti
finale — all drifting over a soft firefly/stardust background.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What to personalize before sending it

1. **Photos** — drop your images into `public/images/` named
   `us-1.jpg` through `us-6.jpg` (or edit the `photos` array in
   `components/GallerySection.tsx` to match your own filenames/captions).
2. **Headline & subline** — `components/HeroSection.tsx`, look for the
   `✏️ EDIT ME` comments near the `<h1>` and the line below it.
3. **The letter** — `components/LoveLetterSection.tsx`, edit the
   `letterLines` array (keep each entry roughly one line/thought so
   the line-by-line reveal reads naturally) and the sign-off name.
4. **Finale message** — `components/ConfettiBurst.tsx`, the two lines
   under the `✏️ EDIT ME` comment.
5. **Background music** — drop your song into `public/audio/` as
   `our-song.mp3` (or edit `AUDIO_SRC` in `components/MusicPlayer.tsx`
   to match your filename), and set `SONG_TITLE` / `SONG_ARTIST` at
   the top of that same file so the island shows the right name.
   Playback starts either when the envelope is tapped open or when
   the island itself is tapped — browsers require a real click/tap
   before audio is allowed to play, so it can't start on page load.

## File structure

```
app/
  layout.tsx        — fonts (Cormorant Garamond, Caveat, Quicksand) + metadata
  page.tsx           — assembles all sections
  globals.css        — base styles, scrollbar, polaroid tape, focus states
components/
  ParticleBackground.tsx  — canvas fireflies / hearts / stardust
  MusicPlayer.tsx         — top-right island: song name + play/pause
  FloatingDecor.tsx       — bobbing SVG stars & hearts
  HeroSection.tsx         — envelope open → headline reveal
  GallerySection.tsx      — polaroid grid
  LoveLetterSection.tsx   — glassmorphism letter, scroll-reveal lines
  ConfettiBurst.tsx       — grand finale heart confetti
tailwind.config.js   — palette (blush / lavender / rose / gold), keyframes
```

## Notes

- Everything respects `prefers-reduced-motion`.
- The palette and keyframes are all defined as Tailwind tokens in
  `tailwind.config.js` if you want to nudge the colors.
- No external particle/confetti library is used — both the background
  and the finale are plain `<canvas>`, so there's nothing extra to
  install beyond `framer-motion`.
