# frxskie.me

Personal portfolio website built with React, TypeScript, Tailwind CSS, and Material 3 Expressive components.

Live site: [frxskie.me](https://frxskie.me)

## Features

- **Material 3 Expressive theme**: Custom pale-pink (`#ffb8bf`) scheme with expressive shapes and spring transitions.
- **Theme switching**: Light and dark mode with persistence in `localStorage`.
- **Hero section**: Looping typewriter headline and live status indicator backed by GitHub Gist polling.
- **Favorites**: Category cards with image tiles covering foods, games, and activities.
- **Project showcase**: Responsive project cards with preview screenshots and repository links.
- **Connect**: Direct links to GitHub and Discord with filled back-to-top navigation.
- **Responsive and accessible**: Mobile navigation, skip links, and semantic landmarks with respect for reduced-motion preferences.

## Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn-m3e
- **Animation**: Motion (motion/react)
- **Icons**: Material Symbols via bundled Iconify data
- **Bundler**: Vite 8
- **Tooling**: Bun, Oxlint
- **Hosting**: GitHub Pages

## Project Structure

```
.
├── CNAME                  # Custom domain configuration (frxskie.me)
├── assets/                # Static images and favicon
├── scripts/               # Icon bundle generator (scripts/icons.mjs)
├── src/
│   ├── App.tsx            # Main layout and section composition
│   ├── components/        # Portfolio sections and UI primitives
│   │   └── m3e/           # Vendored shadcn-m3e components
│   ├── data/              # Content configuration (portfolio.ts)
│   ├── hooks/             # Status fetch hook (use-status.ts)
│   ├── lib/m3e/           # M3 tokens, color utilities, and shape definitions
│   ├── index.css          # Tailwind and Material tokens
│   └── main.tsx           # Entry point and theme providers
└── .github/workflows/     # GitHub Actions deployment workflow
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2+)

### Development

```bash
bun install
bun run dev
```

The development server runs at `http://127.0.0.1:5173`.

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start development server |
| `bun run build` | Type-check and build production bundle to `dist/` |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Lint code with Oxlint |
| `bun run gen:icons` | Scan code and generate bundled icon data |
| `bun run check:icons` | Verify bundled icons match usage |

## Deployment

The repository uses `.github/workflows/pages.yml` to build and deploy to GitHub Pages on pushes to `main`.

During build, Vite copies `CNAME` and `assets/` into `dist/`. Custom domain routing requires corresponding DNS records pointing `frxskie.me` to GitHub Pages.

## License

This project is licensed under the [MIT License](LICENSE).

Vendored [shadcn-m3e](https://github.com/Crysta1221/shadcn-m3e) components are copyright 2026 Crysta1221 under the MIT License. Material tokens and ripple derive from Google Compose Material3 and Material Web (Apache-2.0). Shape definitions derive from [matraic/m3e](https://github.com/matraic/m3e) (MIT). Fonts (Roboto Flex, JetBrains Mono) are licensed under SIL Open Font License 1.1.
