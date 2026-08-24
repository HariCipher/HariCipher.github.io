# Site Guide — where everything lives

A map of this portfolio for changing things yourself. Written for the state of the
code on **2026-08-24**.

Rule of thumb: **words live in one file, layout lives in one file, styling lives in
one file.** If you only want to change what the site *says*, you never need to open
a component.

---

## 1. The 60-second version

| I want to change… | Open this |
|---|---|
| Any text, link, project, blog, job, or skill | `client/src/data/portfolio.ts` |
| The order of the sections on the page | `client/src/pages/Home.tsx` |
| The nav bar links | `client/src/components/Navigation.tsx` (top of file) |
| Any colour, spacing, border, or font size | `client/src/index.css` |
| The hero headline words | `client/src/components/Hero.tsx` |
| How a section is laid out | its component in `client/src/components/` |
| Get changes onto the live site | just `git push` — see §9 |

---

## 2. Running it

```bash
corepack pnpm install     # once
corepack pnpm dev         # dev server, http://localhost:3000
corepack pnpm check       # TypeScript — run this after editing any .ts/.tsx
corepack pnpm build       # production build into dist/
```

`corepack pnpm check` is the fast safety net. If you rename a field in
`portfolio.ts` and forget to update a component, this is what tells you, in about
three seconds, exactly which line broke.

---

## 3. The page, top to bottom

The whole page is assembled in **`client/src/pages/Home.tsx`**. It reads almost
like a table of contents:

```
Navigation      the floating bar
Hero            the big SOC × ANALYSIS panel
ToolBand        the scrolling strip of tool logos
SelectedWork    section 01 — the project card shelf
About           section 02 — profile
Writing         section 03 — the Medium ledger
Experience      section 04 — jobs + skills
Contact         the closing spread and footer
```

**To reorder sections**, move the lines in `Home.tsx`. **To remove one**, delete
its line (and its import). Everything except `Hero` and `Navigation` is wrapped in
`<SectionReveal>` — keep that wrapper when you move things, it's what gives the
scroll animation. `Navigation` lives in `App.tsx`, not `Home.tsx`, and must stay
outside every `<SectionReveal>`: a transformed ancestor becomes the containing
block for `position: fixed` children, so wrapping it would make the bar scroll
away with the page instead of staying pinned.

Each section also has an HTML `id` (`#work`, `#about`, `#writing`, `#experience`,
`#contact`) — that's what the nav links jump to.

---

## 4. Content — `client/src/data/portfolio.ts`

**This is the file you'll edit most.** Nothing in it is layout; it's all just
words and links. Five exports:

### `projects`
The cards on the shelf in section 01. Each entry:

```ts
{
  id: "tracex",            // internal key, must be unique
  stamp: "01",             // the small number on the card
  title: "TRACEX",
  summary: "…",
  tags: ["Python", "EVTX"],
  href: "https://github.com/…",
  image: "/portfolio-assets/optimized/work-archive.webp",
}
```

Add an object here and a new card appears — the shelf's fan spread recalculates
its angles from the array length, so you never touch the layout code.
**There are currently 4 projects.** You mentioned wanting more; just add them here.

### `focusItems`
The short "what I work on" rows in the About section.

### `writingItems`
The Medium ledger in section 03. Currently your 4 published posts. Each:

```ts
{
  stamp: "2026 / 06",      // shown on the left of the row
  title: "…",
  description: "…",        // one or two lines
  tags: ["Splunk", "Home lab"],
  href: "https://medium.com/@thisisharilal/…",
}
```

When you publish a new post, add it to the **top** of this array. The header count
(`ENTRIES / 04`) counts the array, so it updates itself.

`writingProfileHref` just below is the link the "more to come" row points at.

### `experiences`
Section 04. Each record renders as an image plate plus a written account, and they
**alternate sides automatically** — record 1 has the image left, record 2 has it
right, record 3 would be left again. You don't set the side; it's derived from
position in the array.

```ts
{
  id: "fellowship",
  stamp: "02",
  role: "Fellowshell",
  organisation: "Detail to be added",
  location: "—",
  mode: "—",                    // Remote / On-site / Hybrid
  period: "Sep 2025 — Jan 2026",
  summary: "…",                 // one paragraph
  points: ["…", "…"],           // the ruled bullet list
  stack: ["Splunk", "Wazuh"],   // the small boxed tool chips
  image: "",                    // "" ⇒ renders the empty IMAGE SLOT frame
}
```

Two things worth knowing:

- **`image: ""` is deliberate**, not a bug. An empty string renders the hatched
  placeholder frame with the "IMAGE SLOT" label. To fill it, drop a `.webp` into
  `client/public/portfolio-assets/optimized/` and set
  `image: "/portfolio-assets/optimized/your-file.webp"`.
- **An empty `points: []` renders no bullet list at all** — no empty box, no
  placeholder text. Same for `stack: []`. So the Fellowshell record stays clean
  until you fill it in.

### `skillGroups`
The four-column index that closes section 04. Add a group and the grid takes it;
the header count updates itself. Flat lists only — no percentages or proficiency
bars, by design.

---

## 5. Components — what each file does

All in `client/src/components/`.

| File | What it renders |
|---|---|
| `Navigation.tsx` | The floating bar. **Nav links are the array at the top of the file** — `["Work", "#work"]` etc. Also owns the drop-in animation and the sliding ink hover indicator. |
| `Hero.tsx` | The opening panel. Headline text is hardcoded here (it's three lines, not data). Also owns the entrance timeline — see §6. |
| `ToolBand.tsx` | The scrolling logo strip. The logo list is in this file. |
| `SelectedWork.tsx` | Section 01. Contains `ProjectShelf`, which picks the fanned or grid layout by screen width. |
| `ProjectCard.tsx` | One card, plus the closing "Explore more" card. |
| `About.tsx` | Section 02. |
| `Writing.tsx` | Section 03, the ledger. Reads `writingItems`. |
| `Experience.tsx` | Section 04. Reads `experiences` and `skillGroups`. |
| `Contact.tsx` | Closing spread and footer. |
| `SectionHeading.tsx` | The shared `01 / Selected work / big title` block every section uses. Change it once, all sections follow. |
| `SectionReveal.tsx` | The scroll animation wrapper. See §6. |
| `SectionField.tsx` | The ambient pattern drifting behind each section. See §6. |

### `components/reactbits/`
Four vendored components from [reactbits.dev](https://www.reactbits.dev/), kept
close to upstream so they can be re-pulled:

- `Waves.tsx` — the drifting line field behind the hero
- `MagnetLines.tsx` — the tick array on the hero's radar disc
- `BounceCards.tsx` — the fanned project shelf
- `LogoLoop.tsx` — the tool strip

**Don't restyle these files directly.** They take props for colour and size; pass
those from the component that uses them. There's one exception, documented in the
CSS: `Waves.css` ships a broken `transform` line that paints a stray dot, so it's
neutralised in `index.css` rather than by editing the vendored file.

### `components/ui/`
~60 shadcn/ui files that came with the template. **The portfolio's own sections
use none of them** — only `App.tsx` touches this folder, importing `sonner`
(toasts) and `tooltip` as app-wide providers. Everything else here is unused.
You can ignore the folder.

### Unused files
The template's leftovers (`DashboardLayout`, `DashboardLayoutSkeleton`,
`ManusDialog`, `AIChatBox`, `Map`, `pages/ComponentShowcase`) have been deleted —
nothing the site rendered ever reached them.

Four unreferenced modules are still there on purpose: `_core/hooks/useAuth.ts`
and the `ui/form`, `ui/resizable`, `ui/spinner` primitives. They cost nothing —
the bundler drops anything unimported — and they're the kind of thing you reach
for later. `contexts/ThemeContext.tsx` **is** used: `App.tsx` wraps the site in
its `ThemeProvider`.

---

## 6. Animation — there are exactly four

Everything animated is GSAP. No other animation library is installed.

**1. Nav bar drop-in** — `Navigation.tsx`
The bar slides down from above, then the brand and links drop in one by one just
after it. Runs once on mount.

**2. Hero entrance** — `Hero.tsx`
One timeline, runs once on mount, then it's finished. Order:

```
0.00s  the wave field fades up
0.05s  the background art slides in from the right
0.16s  the radar disc slides in from the right and scales up
0.10s  the top status line drops in
0.20s  the kicker line slides in from the left
0.28s  the three headline lines slide in from the left, one by one
0.58s  the intro paragraph rises
0.66s  the two buttons rise, one after the other
0.74s  the bottom meta row rises
```

The whole timeline starts at `0.18s` so it reads as a continuation of the nav bar
rather than a competing second animation. To retime anything, the last number on
each `.from(...)` line is its start time on the timeline — change that. To make
something arrive from a different direction, change `x` (negative = from the left)
or `y` (positive = from below).

Separately, the hero has **ambient** motion that never stops: the waves drift and
bend away from your cursor, the ring mark turns slowly, and the radar ticks point
at the pointer. That's not part of the entrance and isn't affected by retiming it.

**3. Section page-settle** — `SectionReveal.tsx`
Every section below the hero starts slightly **zoomed and tipped away from you**,
then settles to exactly normal size as you scroll it into place — the feel of a
page being turned down flat. It's *scrubbed*, meaning it's tied to your scroll
position rather than being a fixed-length animation that fires once, so scrolling
back up plays it backwards. The whole effect is these values:

```ts
{ transformPerspective: 1500, transformOrigin: "50% 0%",
  scale: 1.06, rotateX: 7, y: 44, opacity: 0.28 }   // where it starts
start: "top 96%", end: "top 44%"                     // the scroll range it plays across
scrub: 0.7                                           // how much it lags your scroll
```

Which knob does what:

- `rotateX: 7` is the page turn. **`transformOrigin: "50% 0%"` is what makes it
  read as paper** — the section hinges on its top edge. Change the origin to the
  centre and it stops looking like a page and starts looking like a card flipping.
- `scale: 1.06` is the zoom. Push it past ~1.1 and text is noticeably soft on the
  way in.
- `transformPerspective: 1500` is the depth of the tilt. Lower is more dramatic.
- Widening the gap between `96%` and `44%` makes the settle slower and more gradual.
- `scrub: 0.7` is the smoothing. `true` pins it exactly to the scrollbar (sharper,
  twitchier); a larger number lags further behind (softer, laggier).

Every end value is an exact identity transform (`scale: 1`, `rotateX: 0`, `y: 0`),
which is deliberate — a section at rest must be pixel-crisp, and it only is if the
transform resolves to nothing at all.

`ease: "none"` is not a style choice: with `scrub`, the scroll position *is* the
progress, so any other ease would fight it.

There is deliberately **no page-level transition on route change** — every section
performs its own settle as it scrolls into view, which is where the effect belongs.
Wrapping the whole route in it would put the entire page on one composited layer
for an animation that is already finished at scroll 0.

**4. Ambient section fields** — `SectionField.tsx`
Every section below the hero has a faint pattern drifting behind it, the way the
hero has its wave field. One component, six variants, one per section:

| Variant | Section | What it is |
|---|---|---|
| `grid` | Selected work | engineering paper, drifting diagonally |
| `contour` | About | survey contour rings, swelling on a slow loop |
| `rules` | Writing | ruled ledger paper, drifting upward |
| `ticks` | Experience | a measurement scale, drifting sideways |
| `hatch` | Contact | drafting hatch, drifting diagonally |

A seventh — `orbit`, an instrument dial turning — still exists in `SectionField.tsx`
and in the CSS but is **unused**: its only consumer was the deleted case-study
section. It's available if you want it on another section.

To change one, swap the `variant` prop on the `<SectionField />` line in that
section's component. To change how far it slides as you scroll, pass
`parallax={120}` — higher is more travel, `0` turns the scroll link off and
leaves only the drift.

Each field is two nested elements on purpose: the outer one carries the
scroll parallax (GSAP), the inner one carries the continuous drift (CSS). If both
lived on one element they'd overwrite each other's `transform`.

The drift speeds and pattern sizes are in `index.css` under "Ambient section
fields". **If you change a pattern's `background-size`, change its keyframe by the
same number** — each one translates by exactly one tile so the loop has no visible
seam, and mismatching them makes the pattern visibly jump every cycle.

**Reduced motion:** all of these check `prefers-reduced-motion` and skip entirely.
Nothing is hidden by CSS, so with motion reduced the page is just immediately in
its final state — never blank. If you add an animation, follow that pattern.

---

## 7. Styling — `client/src/index.css`

One file, ~310 lines, no CSS modules, no Tailwind classes in the markup.
Class names in the components map one-to-one to selectors here.

### The palette — line 24, `:root`

```css
--paper:       #e9e6e0   /* page background */
--paper-light: #f4f1eb   /* raised panels */
--ink:         #111111   /* text and hard borders */
--ink-soft:    #34332f   /* body copy */
--rule:        #c5c1b8   /* hairlines */
--mist:        #d7d4ce
--signal:      #c7f052   /* the lime accent — used sparingly, on purpose */
```

Change a token here and it propagates everywhere. **This is the right way to
retheme the site.** Fonts are Space Grotesk (display) and IBM Plex Mono (labels).

### Roughly where things are

| Lines | What |
|---|---|
| 24 | palette tokens |
| 57–81 | nav bar + the sliding indicator |
| 83–130 | hero, waves, radar scope |
| 132–144 | the shared section scaffold |
| 146–167 | project shelf and cards |
| 169–171 | the contact heading's upright `<em>` |
| 172–174 | about / profile |
| 175–177 | writing image, contact spread, footer |
| 179–189 | reduced-motion block, then the 960px and 640px breakpoints |
| 191–229 | project cards, tool band |
| 231–237 | `.section-reveal` — the page-settle layer hints |
| 239–288 | ambient section fields and their drift keyframes |
| 290–309 | the writing ledger |
| 310–344 | experience records and the skills index |
| 345–360 | the 960px and 640px breakpoints for the newer sections |

These numbers drift every time you edit the file. If one looks wrong, grep for the
section comment instead — every block is headed by a `/* ... */` line naming it.

Two responsive breakpoints only: **960px** (tablet) and **640px** (phone). At
960px the experience records stop alternating and stack into a single column.

### One trick worth knowing
The alternating experience layout is done with `direction: rtl` on every second
record, with `direction: ltr` restored on its children. That flips the two columns
without needing a second grid definition — which is why the component doesn't care
which side a record is on.

---

## 8. Images

Live in `client/public/portfolio-assets/optimized/`, served at
`/portfolio-assets/optimized/…`.

```
hero-field.webp            behind the hero                        107K
work-archive.webp          the shelf texture behind project cards 145K
research-field.webp        the plate in the Writing section       273K
components-schematic.webp  the Gardiyan experience plate           93K
fellowshell-desk.webp      the FellowShell experience plate       355K
s-mark.webp                brand mark — nav, footer, favicon       15K
```

To add one: drop it in that folder and reference it from `portfolio.ts`. Four
rules, each of which has already bitten this project once:

1. **Start the path with `/`.** `"portfolio-assets/…"` without the leading slash
   is relative to the current URL — it happens to work on `/` and 404s everywhere
   else.
2. **Actually convert to WebP.** Renaming a PNG to `.webp` fools nothing; two
   files here were a 10MB PNG and a JPEG wearing a `.webp` extension. Browsers
   sniff the real type and render them anyway, which is exactly why it goes
   unnoticed.
3. **Keep it under ~300KB** and no more than ~1400px on the long edge. The plates
   never render larger than about 550px wide.
4. They're decorative — empty `alt`, hidden from screen readers.

### Image alignment — `imageFocus`

The plates are tall; the images are not. Every one gets cropped, so what matters
is *what survives the crop*. Each experience record takes an optional
`imageFocus` (a CSS `background-position`, default `center`):

```ts
image: "/portfolio-assets/optimized/components-schematic.webp",
imageFocus: "50% 50%",   // first number = horizontal, second = vertical
```

Lower the second number to keep a subject's head in frame; lower the first to
favour the left of the image.

A focal point can only shift the image by however much is being cropped — if a
picture is half empty, no value rescues it, and the fix is to crop the source
file to its content. That's why `components-schematic.webp` is 710px wide rather
than the 1184px it started at: the right 40% was blank grid paper, and a tall
plate cropped straight onto the emptiness.

---

## 9. Deploying

The site is live at **https://haricipher.github.io/**, served by GitHub Pages
from `HariCipher/HariCipher.github.io`.

**You never deploy by hand.** Push to `main` and
`.github/workflows/deploy.yml` builds the site and publishes it — typically
live a minute or two later. Watch it under the repo's Actions tab, or run
`gh run watch`.

What the workflow does that a local `pnpm build` does not:

- runs **only** `vite build`. `pnpm build` also bundles the Express server,
  which Pages cannot execute. Nothing on the page needs it — the portfolio is
  entirely static, and the tRPC client in `main.tsx` is configured but never
  queried, so it makes no requests.
- copies `index.html` to **`404.html`**. Pages serves that file for any unknown
  path, which hands the URL to the router instead of GitHub's own 404 page.
- adds **`.nojekyll`**, or Pages would skip the `assets/` folder's files.
- deletes `__manus__/`, the dev-only log collector.

### Production leaves the dev tooling behind

`vite.config.ts` loads the Manus plugins only when `command === "serve"`. They
are preview-environment tools — a runtime overlay, a JSX source tagger for the
visual editor, a log collector — and in a production build the runtime inlined
its own copy of React into `index.html`, taking it from 1KB to 368KB. If you
ever see the built `index.html` balloon again, that is what came back.

### Gotchas

- **Anything the browser must fetch needs a root-absolute path** (`/portfolio-assets/…`).
- **In-page links are `href="#id"` plus a `preventDefault` handler.** A bare
  `href="work"` resolves relative to the current URL and navigates to `/work`,
  which no route serves.
- The repo is **public** — required for Pages. Don't commit anything you would
  not publish. `.gitignore` already excludes `.env`, `node_modules/`, and
  `dist/`.

---

## 10. Things that will bite you

- **Not a git repository.** There is no undo. Copy a file before a big edit.
- The `server/` folder is template scaffolding — auth, database, tRPC. The
  portfolio is entirely static and doesn't use it. Leave it alone.
- After editing `portfolio.ts`, run `corepack pnpm check`. Adding a field to one
  record but not the others is the single easiest mistake to make, and this
  catches it instantly.
- Content rule, stated at the top of `portfolio.ts` and worth keeping:
  **evidence-led, editorial, and free of invented achievements.** Every claim in
  the experience section traces to the résumé; every blog description comes from
  the article's own opening. Keep it that way — it's the reason the site reads as
  credible.
