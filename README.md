# Docusaurus Template

Minimal Docusaurus template with multi-instance docs.

## Quick Start

```bash
bun install
bun run start
```

## Project Structure

```
docs.config.ts       ← Single source of truth for docs sections
sidebars.ts          ← Auto-generated from docs.config.ts
docusaurus.config.ts ← Site config (imports docs.config.ts)

content/
  docs/    → Main docs (/)
  api/     → API reference (/api)
  guides/  → Guides (/guides)
```

## Add a New Docs Section

1. Add entry in `docs.config.ts`:

```ts
export const docs: DocsInstance[] = [
  { id: 'docs', path: 'content/docs', route: '/', label: 'Docs' },
  { id: 'api', path: 'content/api', route: '/api', label: 'API' },
  { id: 'guides', path: 'content/guides', route: '/guides', label: 'Guides' },
  { id: 'sdk', path: '../sdk-repo/docs', route: '/sdk', label: 'SDK' },  // ← add
];
```

2. Create content (if local):

```bash
mkdir -p content/sdk
echo "# SDK Documentation" > content/sdk/intro.md
```

Done. Sidebar + navbar appear automatically.

## Deploy to GitHub Pages

1. Repository Settings → Pages → Source: "GitHub Actions"
2. Push to main

Site URL: `https://{owner}.github.io/{repo}/`

## Update Docusaurus

```bash
# Check for updates
bun outdated

# Update all Docusaurus packages
bun install @docusaurus/core@latest @docusaurus/preset-classic@latest \
            @docusaurus/faster@latest @docusaurus/module-type-aliases@latest \
            @docusaurus/tsconfig@latest @docusaurus/types@latest

# Test build
bun run clear && bun run build
```

## Environment Variables

All optional. Set in `.env` locally or auto-configured in GitHub Actions.

| Variable | Description | Default |
|----------|-------------|---------|
| `SITE_URL` | Site URL | localhost / github.io |
| `BASE_URL` | Base path | `/` or `/{repo}/` |
| `SITE_TITLE` | Navbar title | `Documentation` |
| `SITE_TAGLINE` | Site tagline | (empty) |
| `GITHUB_REPOSITORY` | `owner/repo` | enables "Edit this page" |
