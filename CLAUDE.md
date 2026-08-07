# CLAUDE.md

Personal portfolio site for Shubhanan Sharma. Single page, no backend.
Deployed on Vercel at https://shubhanan-sharma.vercel.app/ (auto-deploys on push).

## Commands

```bash
npm install       # required — node_modules is not committed
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # eslint; must exit clean
```

## Stack

Vite 6 · React 19 · Tailwind CSS v4 · framer-motion · lucide-react · EmailJS · react-router-dom

`@` is aliased to `src/` (`vite.config.js`).

## Tailwind v4: colour tokens must be declared

There is **no `tailwind.config.js`**. Theme config is CSS-first, in `src/index.css`.

A colour utility only exists if its `--color-*` is declared in the `@theme` block.
Using an undeclared token — `bg-brand`, `text-subtle` — produces **no CSS and no
error**. It fails silently and looks like a styling mystery. This bit the site
before: eight tokens were referenced across ~20 call sites but never declared,
which is why carousel dots were invisible and error toasts had no background.

Declared tokens: `border` `background` `foreground` `primary` `card`
`muted-foreground` `accent` `destructive` `destructive-foreground`.

Note `muted-foreground` is declared but `muted` is **not** — they're separate
tokens. `muted-foreground` has ~12 call sites including `bg-muted-foreground/30`
on the inactive carousel dots.

Add a new one in three places: `@theme` (`--color-x: hsl(var(--x))`), `:root`, and
`.dark`. Grep for a token before using it.

Two more v4 gotchas:

- `dark:` defaults to `prefers-color-scheme`. This site toggles a `.dark` class, so
  `@custom-variant dark (&:where(.dark, .dark *))` at the top of `index.css` rebinds
  it. Without that line, `dark:` utilities follow the OS instead of the toggle.
- `tailwindcss-animate` is not installed, so `animate-in`, `slide-in-from-*` and
  `fade-out-80` emit nothing. Define animations as `--animate-*` tokens in `@theme`.
  `scrollbar-hide` is not core Tailwind either, but it *is* defined locally as an
  `@utility` in `index.css` and used by the skills tab strip — not dead code.

## Structure

```
index.html                 pre-paint theme script, SEO + OG meta, inline SVG favicon
src/pages/Home.jsx         composes every section in display order
src/pages/NotFound.jsx     404 page (needs the vercel.json rewrite to be reachable)
src/components/*Section.jsx  one self-contained <section id="…"> each
src/components/            Navbar, Footer, StarBackground are not sections
src/components/ui/         toast primitives (shadcn-derived)
src/App.jsx, main.jsx      router + Toaster mount, React entry point
src/hooks/, src/lib/       use-toast, cn() class merger
src/index.css              @theme tokens, keyframes, @utility classes
vercel.json                SPA rewrite; without it Vercel 404s before the router runs
```

## Conventions

- **Named exports only** for components (`export const Foo`). No default exports
  except `App.jsx`.
- Section content lives as a module-scope `const` at the top of its own component
  file, above the component.
- framer-motion variants are local `const`s declared above the JSX.
- Theme state lives in `Navbar.jsx`; `ExperienceSection.jsx` re-derives it with a
  `MutationObserver` to invert the CRED logo. Two readers of one DOM signal — if a
  third appears, extract a `useTheme` hook instead.
- `eslint.config.js` needs `eslint-plugin-react`'s `jsx-uses-vars`: without it
  `no-unused-vars` can't see JSX-only references and lint fails with false positives
  on `motion`, `Icon`. Don't "simplify" it back to the Vite default.

## Editing content

| What | Where |
|---|---|
| Experience | `ExperienceSection.jsx` → `experiences` |
| Projects | `ProjectsSection.jsx` → `projects` |
| Skills | `SkillsSection.jsx` → `skillsData` |
| Education | `EducationSection.jsx` (inline JSX) |
| Hero copy, rotating titles | `HeroSection.jsx` → `titles` |

An `experiences` entry is keyed on the **company**, which renders in the left
column. `roles[]` holds one or more `{ title, start, end }` in the right
column, **newest first**, on a small rail with a dot per role; two or more roles
also get a connecting line. All roles render identically — the rail and dates
convey the progression, not colour. `description: []` renders no bullet block.

**Dates are computed, never hardcoded.** `start`/`end` are `'YYYY-MM'`; `end`
omitted means "Present". The helpers at the top of `ExperienceSection.jsx` derive
every visible label — `formatRange`, `formatSpan`, `monthsBetween`, `spanOf`,
`tenureOf` — so an ongoing role's duration keeps counting on its own. Company
tenure spans the last role's `start` to the first role's `end`.

Counting is **elapsed months**: Aug 2025 - Jul 2026 is `11 mos`. A role that ran
through the whole of its end month is therefore one short, so it sets an explicit
`months:` override — Transvolt's Jun–Jul 2025 is `months: 2`. `spanOf` prefers the
override; only reach for it when the elapsed count is genuinely wrong.

`skillsData` key order drives tab order, and the first key must match the
`useState` default in `SkillsSection` (currently `'SRE & Infra'`). Broken URLs are
hidden by an `onError` handler, so a dead CDN degrades to text-only chips.

Three logo cases, in order of preference:

1. **devicon** (`cdn.jsdelivr.net/gh/devicons/devicon/...`) — the default. Full
   colour, reads on both themes.
2. **`mono: true`** for near-black marks, which get `brightness-0 dark:invert` so
   they render in the theme's text colour. Currently Kong, Framer Motion,
   Express.js, GitHub. Without it they measure 1.05–1.56:1 against the dark
   background — effectively invisible.
3. **No `logo`** for concepts that have no mark (IaC, CI/CD, Networking).

Not in devicon, sourced elsewhere: Kong and Claude Code from `cdn.simpleicons.org`,
Loki from the `grafana/loki` repo. React Query has no icon anywhere — text only.

**Before adding an icon, check it survives dark mode.** A near-black logo vanishes
on `#05080F` and this has bitten the site three times (LeetCode, Kong, then
Express/Framer). Load the icon into a canvas, take the mean luminance of its opaque
pixels and compute contrast against the background; under ~2:1 means it needs
`mono`. Two caveats learned the hard way: saturation is a bad proxy for "has real
colour" (near-black pixels compute high saturation), and `crossOrigin='anonymous'`
sampling fails on hosts without CORS headers — scipy.org renders fine but cannot be
measured. Still un-fixed and dim on dark: Django 1.36, Pandas 1.76, Mongoose 1.91,
React Hook Form 1.96.

## Contact form

EmailJS, client-side. Needs `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`,
`VITE_EMAILJS_PUBLIC_KEY` (see `.env.example`). Without them `emailjs.send` rejects
and the user gets the error toast. Vite inlines `VITE_*` into the bundle — these are
public by design, so never put a secret behind that prefix.

On Vercel these must also be set in Project → Settings → Environment Variables;
`.env` is local only. Missing them there = every submit shows the error toast.

## Known follow-ups

Not blocking, in rough value order:

1. **~7 MB of oversized project images.** `pureView.png` 1.42 MB, `pomodoLock.png`
   1.19 MB, `noMoRecs.png` 1.16 MB, `natours.png` 1.03 MB — all rendered into slots
   32–48 px tall. Converting to WebP at display size is the largest perf win left.
2. **Self-host the ~50 devicon SVGs** in `public/icons/`. Removes a third-party
   runtime dependency and ~50 cross-origin requests.
3. **Move section data to `src/data/`.** `skillsData` is ~255 of SkillsSection's
   511 lines; `projects` is ~120 of ProjectsSection's 493.
4. **Code-split the 452 kB JS bundle** (142 kB gzip); framer-motion dominates it.
5. **No `prefers-reduced-motion` handling.** `StarBackground` runs ~130 concurrent
   infinite animations with no escape hatch.
6. **Small mobile tap targets.** Measured at 390px: hamburger 36×36, theme toggle
   32×32, carousel arrows 34×34, carousel dots 8×8. All clear WCAG 2.5.8 AA (24px)
   except the dots; none reach the 44px AAA / Apple HIG target.
7. **Hero copy predates the SRE role** — rotating titles still lead with
   "Full Stack Developer" / "Passionate about AI/ML".
8. `class-variance-authority` exists only for the two-variant `cva` in
   `ui/toast.jsx`; it could be a plain conditional string.
