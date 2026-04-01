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

### Optional packages (graceful degradation)

Both optional packages integrate via **graceful degradation** — they enhance the hub when installed but everything works without them. No feature flags, no conditional logic in project code.

| Package | Integration | Not installed |
|---------|------------|---------------|
| Content-calc | Async `import()` in config → auto-discovers `plugins/calc/*.mjs` | No preprocessing, no error |
| Brand | `require()` with try/catch → injects CSS, theme config, color mode | Docusaurus defaults, no error |

#### Content-calc (`@michaelstingl/docusaurus-hub-content-calc`)

**Repo:** [`github.com/michaelstingl/docusaurus-hub-content-calc`](https://github.com/michaelstingl/docusaurus-hub-content-calc)

Replaces `{{key}}` placeholders in markdown with computed values. Provides locale-aware number formatters via `createFormatters(locale)`.

**How it integrates:** `docusaurus.config.ts` is an async config function. At startup it calls `createAutoPreprocessor('./plugins/calc')` which:

1. Scans `plugins/calc/` for `.mjs` files
2. Dynamically imports each, checks for `pathPattern` + `values` exports
3. Returns a Docusaurus preprocessor (or `undefined` if no modules found)
4. Broken modules log a warning and are skipped

**To add a calculation module:** drop a `.mjs` file into `plugins/calc/`. No config changes needed. See `plugins/calc/example-pricing.mjs` for the pattern.

#### Brand (`@michaelstingl/docusaurus-hub-brand`)

**Repo:** [`github.com/michaelstingl/docusaurus-hub-brand-package`](https://github.com/michaelstingl/docusaurus-hub-brand-package)

**How it integrates:** `docusaurus.config.ts` uses `require()` inside try/catch at the top level. When installed, the brand package provides:

- `cssPath` — Generated CSS (color variants, Google Fonts, dark mode)
- `colorModeInitPath` — Client module for OS color mode preference
- `brandThemeConfig` — Theme config fragment (spread into `themeConfig`)

**To customize:** Fork the brand-package repo, edit `src/brand.config.ts` (colors, fonts, navbar style), run `bun run build`.

### Key features

- **Mermaid diagrams**: Enabled via `@docusaurus/theme-mermaid`
- **Print/PDF styles**: `src/css/custom.css` has extensive `@media print` rules; use `.no-print` class to hide sections from PDF output
- **Home page redirect**: `src/pages/index.tsx` redirects `/` to the first docs instance

### Environment variables

All optional. Set in `.env` locally or auto-configured in GitHub Actions (`deploy.yml`):
`SITE_URL`, `BASE_URL`, `SITE_TITLE`, `SITE_TAGLINE`, `GITHUB_REPOSITORY`

## CI/CD

GitHub Actions deploys to GitHub Pages on push to `main`. The workflow supports an optional `brand_package` input for workflow_dispatch. Site URL is auto-detected from the repository homepage setting.
