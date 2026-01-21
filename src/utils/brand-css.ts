/**
 * Generate CSS from brand.config.ts
 */

import type { BrandConfig } from '../../brand.config';

// Convert hex to HSL
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Generate Infima color variants
function generateColorVariants(hex: string): Record<string, string> {
  const [h, s, l] = hexToHsl(hex);
  return {
    base: hex,
    dark: hslToHex(h, s, Math.max(0, l - 5)),
    darker: hslToHex(h, s, Math.max(0, l - 8)),
    darkest: hslToHex(h, s, Math.max(0, l - 12)),
    light: hslToHex(h, s, Math.min(100, l + 5)),
    lighter: hslToHex(h, s, Math.min(100, l + 8)),
    lightest: hslToHex(h, s, Math.min(100, l + 12)),
  };
}

// Generate Google Fonts URL
function generateGoogleFontsUrl(brand: BrandConfig): string {
  const families: string[] = [];

  const { heading, body } = brand.fonts;
  families.push(`family=${heading.family.replace(' ', '+')}:wght@${heading.weight}`);
  families.push(`family=${body.family.replace(' ', '+')}:wght@${body.weights.join(';')}`);

  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

// Generate complete CSS
export function generateBrandCss(brand: BrandConfig): string {
  const primary = generateColorVariants(brand.colors.primary);
  const neutral = generateColorVariants(brand.colors.neutral);
  const fontsUrl = generateGoogleFontsUrl(brand);

  let css = `/**
 * Auto-generated from brand.config.ts
 * Do not edit manually - run: bun run brand
 */

/* Fonts */
@import url('${fontsUrl}');

:root {
  /* Brand colors */
  --brand-primary: ${brand.colors.primary};
  --brand-accent: ${brand.colors.accent};
  --brand-neutral: ${brand.colors.neutral};

  /* Infima primary variants */
  --ifm-color-primary: ${primary.base};
  --ifm-color-primary-dark: ${primary.dark};
  --ifm-color-primary-darker: ${primary.darker};
  --ifm-color-primary-darkest: ${primary.darkest};
  --ifm-color-primary-light: ${primary.light};
  --ifm-color-primary-lighter: ${primary.lighter};
  --ifm-color-primary-lightest: ${primary.lightest};

  /* Fonts */
  --ifm-font-family-base: '${brand.fonts.body.family}', sans-serif;
  --ifm-heading-font-family: '${brand.fonts.heading.family}', sans-serif;
  --ifm-heading-font-weight: ${brand.fonts.heading.weight};

  --ifm-code-font-size: 95%;
}

/* Dark mode */
[data-theme='dark'] {
  --ifm-background-color: var(--brand-primary);
  --ifm-background-surface-color: ${primary.light};
  --ifm-color-primary: var(--brand-neutral);
  --ifm-color-primary-light: ${neutral.light};
  --ifm-color-primary-lighter: ${neutral.lighter};
  --ifm-color-primary-lightest: ${neutral.lightest};
}
`;

  // Dark navbar styling
  if (brand.navbar === 'dark') {
    css += `
/* Dark navbar (always dark background) */
.navbar {
  background-color: var(--brand-primary);
}

.navbar__title,
.navbar__link {
  font-family: var(--ifm-heading-font-family);
  color: #FFFFFF !important;
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--brand-accent) !important;
}

/* Navbar icons */
.navbar .clean-btn {
  color: #FFFFFF;
}

.navbar .clean-btn:hover {
  color: var(--brand-accent);
}
`;
  }

  return css;
}
