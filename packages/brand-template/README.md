# Docusaurus Brand Package Template

This is a template for creating branded Docusaurus themes. Customize the brand configuration, build the package, and publish it for use across multiple Docusaurus projects.

## Quick Start

1. **Copy this template** to your own repository
2. **Customize** `src/brand.config.ts` with your colors, fonts, and navbar style
3. **Replace** the logo files in `src/assets/`
4. **Build** the package: `bun run build`
5. **Publish** or use as a git dependency

## Usage in Docusaurus Projects

### Installation

```bash
# From npm (if published)
npm install @your-scope/docusaurus-brand

# Or as a git dependency in package.json:
"@your-scope/docusaurus-brand": "git+ssh://git@github.com:org/brand-package.git"
```

### Configuration

```ts
// docusaurus.config.ts
import {
  cssPath,
  colorModeInitPath,
  brandThemeConfig,
} from '@your-scope/docusaurus-brand';

export default {
  // ...

  // Use the brand's color mode initialization
  clientModules: [colorModeInitPath],

  presets: [
    [
      'classic',
      {
        theme: {
          // Include the brand CSS
          customCss: [cssPath, './src/css/custom.css'],
        },
      },
    ],
  ],

  themeConfig: {
    // Spread the brand's theme config
    ...brandThemeConfig,

    // Your customizations
    navbar: {
      ...brandThemeConfig.navbar,
      logo: {
        alt: 'My Site',
        src: 'img/logo.svg',
      },
      // ... items
    },
  },
};
```

## Customization

### Brand Configuration

Edit `src/brand.config.ts`:

```ts
export const brand: BrandConfig = {
  colors: {
    primary: '#2e8555',   // Main brand color
    accent: '#25c2a0',    // Hover/highlight color
    neutral: '#25c2a0',   // Dark mode primary
  },
  fonts: {
    heading: { family: 'Inter', weight: 600 },
    body: { family: 'Inter', weights: [400, 700] },
  },
  navbar: 'dark',  // 'dark' | 'light' | 'auto'
};
```

### Colors

| Property | Usage |
|----------|-------|
| `primary` | Navbar background (dark mode), links, primary buttons |
| `accent` | Hover states, highlights, CTAs |
| `neutral` | Becomes primary color in dark mode |

Color variants (dark, darker, light, lighter, etc.) are automatically generated.

### Fonts

Fonts are loaded from Google Fonts. Specify:
- `family`: Font family name (e.g., "Inter", "Roboto", "Open Sans")
- `weight` / `weights`: Font weights to load

### Navbar Style

| Value | Description |
|-------|-------------|
| `'dark'` | White text on dark background (uses primary color) |
| `'light'` | Dark text on light background |
| `'auto'` | Follows the current theme |

### Assets

Replace the files in `src/assets/`:
- `logo.svg` - Light theme logo
- `logo-dark.svg` - Dark theme logo (optional)
- Add `favicon.ico` if needed

## Package Exports

```ts
import {
  // Brand configuration
  brand,

  // Paths for Docusaurus config
  cssPath,
  colorModeInitPath,
  assets,

  // Theme config fragment
  brandThemeConfig,

  // Utilities (for custom CSS generation)
  generateBrandCss,
  generateColorVariants,
} from '@your-scope/docusaurus-brand';
```

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# The build creates:
# - dist/index.js, dist/index.d.ts (main exports)
# - dist/css/brand.css (generated CSS)
# - dist/theme/ (client modules)
# - dist/assets/ (logos, favicon)
```

## Publishing

### To npm

```bash
# Update package.json name to @your-scope/docusaurus-brand
npm publish --access public
```

### To GitHub Packages

```bash
# Add to package.json:
# "publishConfig": { "registry": "https://npm.pkg.github.com" }
npm publish
```

### As Git Dependency

No publishing needed. Reference directly in `package.json`:

```json
{
  "dependencies": {
    "@your-scope/docusaurus-brand": "git+ssh://git@github.com:org/brand.git#v1.0.0"
  }
}
```

## License

MIT
