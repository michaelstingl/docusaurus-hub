# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Docusaurus 3.9 multi-instance documentation hub. Content can live in local folders, external paths, or other repositories. This repo contains only the site framework and configuration. The package manager is **bun** (not npm/yarn).

## Commands

```bash
bun install              # Install dependencies
bun run start            # Dev server (localhost:3000)
bun run build            # Production build → build/
bun run serve            # Serve production build locally
bun run clear            # Clear Docusaurus cache (.docusaurus/)
bun run typecheck        # TypeScript check (tsc)
```

After changing config files, run `bun run clear && bun run build` to verify.

## Architecture

### Configuration chain

`docs.config.ts` is the single source of truth for all docs instances. It defines an array of `DocsInstance` objects (id, path, route, label). Both `docusaurus.config.ts` and `sidebars.ts` import from it.

- The first entry in `docs.config.ts` becomes the main docs plugin (via preset-classic); all others become additional `@docusaurus/plugin-content-docs` plugins.
- `sidebars.ts` auto-generates sidebars from the same array — no manual sidebar config needed.
- Navbar items are also generated from the docs array.

To add a new docs section: add one entry to `docs.config.ts` and create the content folder. Everything else is automatic.

### Content source

Docs content paths in `docs.config.ts` can point to local folders (`content/docs`), relative paths to other repos (`../../other-repo/docs`), or absolute paths. In CI, external repos are checked out separately (see `deploy.yml`).

### Companion packages

Two optional packages from [`github.com/michaelstingl/docusaurus-hub-*`](https://github.com/michaelstingl?tab=repositories&q=docusaurus-hub). Both are generic and reusable.

#### Content-calc (`@michaelstingl/docusaurus-hub-content-calc`)

**Repo:** [`github.com/michaelstingl/docusaurus-hub-content-calc`](https://github.com/michaelstingl/docusaurus-hub-content-calc)

Generic markdown preprocessor that replaces `{{key}}` placeholders with computed values. Provides `createPreprocessor()` factory and locale-aware number formatters via `createFormatters(locale)`.

Each calculation module exports `pathPattern` (which files to process) and `values` (key-value map). Modules are registered in `docusaurus.config.ts` via `createPreprocessor([...modules])`.

To add a calculation module: create a `.mjs` file in `plugins/` exporting `pathPattern` and `values`, then add it to the `createPreprocessor()` array in `docusaurus.config.ts`.

#### Brand (`@michaelstingl/docusaurus-hub-brand`)

**Repo:** [`github.com/michaelstingl/docusaurus-hub-brand-package`](https://github.com/michaelstingl/docusaurus-hub-brand-package)

Optional branding package. The config uses try/catch to gracefully fall back to Docusaurus defaults when not installed. Exports:

- `cssPath` — Generated CSS with color variants, fonts (Google Fonts), dark mode styles
- `colorModeInitPath` — Client module for OS color mode preference
- `brandThemeConfig` — Theme config fragment (navbar style, color mode settings)

Fork the repo and configure in `src/brand.config.ts` (colors, fonts, navbar style, dark mode). Build with `bun run build` to regenerate `dist/`.

### Key features

- **Mermaid diagrams**: Enabled via `@docusaurus/theme-mermaid`
- **Print/PDF styles**: `src/css/custom.css` has extensive `@media print` rules; use `.no-print` class to hide sections from PDF output
- **Home page redirect**: `src/pages/index.tsx` redirects `/` to the first docs instance

### Environment variables

All optional. Set in `.env` locally or auto-configured in GitHub Actions (`deploy.yml`):
`SITE_URL`, `BASE_URL`, `SITE_TITLE`, `SITE_TAGLINE`, `GITHUB_REPOSITORY`

## CI/CD

GitHub Actions deploys to GitHub Pages on push to `main`. The workflow supports an optional `brand_package` input for workflow_dispatch. Site URL is auto-detected from the repository homepage setting.
