# Portfolio — Next.js Migration

A modern, high-fidelity Next.js App Router migration of Tamiul Alam's portfolio ([tamiulalam.com](https://tamiulalam.com/)).

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19 & TypeScript
- **Styling**: Tailwind CSS & Custom Design System Tokens
- **Typography**: Bricolage Grotesque & Caveat
- **3D & Graphics Engine**:
  - Interactive 3D GitHub Contribution Skyline canvas (`<canvas class="Zvvb4QYJ">`) with isometric projection math, 3-shaded block faces, yaw/pitch mouse orbit drag, and day tooltips.
  - Interactive SVG Golden Snitch physics & flapping wings.
  - SVG paper and tape noise filters with dynamic stickers and scrapbook pins.
- **Motion & Scroll Choreography**: CSS Scroll Timeline, keyframe choreographies (Shore wave, Sound EQ, Pen draw, gradient animations).

## Project Architecture

```
├── .agents/
│   └── skills/
│       └── website-clone/
│           └── SKILL.md
├── app/
│   ├── globals.css              # Typography, keyframes, theme variables, and utility classes
│   ├── layout.tsx               # Root layout with metadata and dark theme configuration
│   ├── page.tsx                 # Home route (/)
│   └── about/
│       └── page.tsx             # About route (/about)
├── components/
│   ├── Navbar.tsx               # Floating frosted glass navigation
│   ├── Hero.tsx                 # Header, interactive Snitch, bio & socials
│   ├── Features.tsx             # Bento grid ("How I Work", "Daily Drivers", etc.)
│   ├── Work.tsx                 # Curated projects stack (Keythm, Nextdemy, etc.)
│   ├── About.tsx                # Home desk corkboard with polaroid and notes
│   ├── Blog.tsx                 # Featured writings & articles
│   ├── Guestbook.tsx            # Guestbook feedback & community notes
│   ├── Contact.tsx              # Interactive contact CTA ("Open to work" spinning dial, Snitch)
│   ├── Footer.tsx               # Footer navigation, local time display, and giant watermark
│   └── about/
│       ├── AboutHero.tsx        # Bio, crumpled paper texture, taped polaroids & bio
│       ├── AboutExperience.tsx  # Experience timeline (Roboto Studio, GitHub)
│       ├── AboutGithub.tsx      # Interactive 3D GitHub skyline canvas (1,951 contributions)
│       └── AboutCommunity.tsx   # Scrapbook, stickers, guestbook notes & collaboration
├── evidence_about/              # Parity audit evidence (recordings, screenshots & diff results)
├── public/
│   ├── blog/                    # Article thumbnails
│   ├── fonts/                   # Local WOFF2 font files
│   ├── icons/                   # App icons and sprite.svg
│   ├── media/                   # Web images and textures
│   ├── people/                  # Community avatars
│   ├── projects/                # Project screenshots and mockups
│   └── uses/                    # Software logos and tool icons
├── next.config.mjs              # Next.js build configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Scripts and project dependencies
```

## Measured Parity Benchmarks (`/about`)

Audited with automated Chrome DevTools Protocol (CDP) headless capture against live reference `https://tamiulalam.com/about`:

| Checkpoint                      | Reference   | Local       | Match Rate |
| ------------------------------- | ----------- | ----------- | ---------- |
| **Desktop Viewport (1440x900)** | 1425 x 5354 | 1425 x 5293 | **91.01%** |
| **Tablet Viewport (768x1024)**  | 768 x 6475  | 768 x 6398  | **88.24%** |
| **Mobile Viewport (390x844)**   | 390 x 7416  | 390 x 7345  | **93.13%** |
| **Scroll 0% (0px)**             | 1440 x 900  | 1440 x 900  | **90.98%** |
| **Scroll 10% (445px)**          | 1440 x 900  | 1440 x 900  | **96.16%** |
| **Scroll 25% (1114px)**         | 1440 x 900  | 1440 x 900  | **98.30%** |
| **Scroll 50% (2227px)**         | 1440 x 900  | 1440 x 900  | **95.72%** |
| **Scroll 75% (3341px)**         | 1440 x 900  | 1440 x 900  | **73.30%** |
| **Scroll 90% (4009px)**         | 1440 x 900  | 1440 x 900  | **60.96%** |
| **Scroll 100% (4454px)**        | 1440 x 900  | 1440 x 900  | **74.28%** |

_Note: Differences in lower scroll positions (75%–100%) reflect real-time live clock ticking (IST time display), continuous spinning keyframe animations (`#_S_1_` SVG path rotating dial), and floating sticky glass pill._

## Getting Started

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the Home page, and [http://localhost:3000/about](http://localhost:3000/about) for the About page.

## Production Build

```bash
pnpm build
pnpm start
```

# Teerex
