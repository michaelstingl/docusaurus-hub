/**
 * Brand Package Exports
 *
 * Usage:
 *   import { brand, themeConfig, cssPath } from '@scope/docusaurus-brand';
 */

import * as path from 'path';

// Re-export types
export type {
  BrandConfig,
  BrandColors,
  BrandFonts,
  BrandFont,
  BrandFontWithWeights,
  NavbarStyle,
  DarkModeStyle,
  ColorVariants,
} from './types';

// Re-export brand configuration
export { brand } from './brand.config';

// Re-export CSS generation utilities
export {
  generateBrandCss,
  generateColorVariants,
  generateGoogleFontsUrl,
  hexToHsl,
  hslToHex,
} from './css-generator';

// __dirname in compiled output is dist/, so css is at dist/css/
// and theme is at dist/theme/

/**
 * Path to the generated brand CSS file.
 * Use in docusaurus.config.ts:
 *   theme: { customCss: [cssPath, './src/css/custom.css'] }
 */
export const cssPath = path.join(__dirname, 'css', 'brand.css');

/**
 * Path to the ColorModeInit client module.
 * Use in docusaurus.config.ts:
 *   clientModules: [colorModeInitPath]
 */
export const colorModeInitPath = path.join(__dirname, 'theme', 'ColorModeInit.js');

/**
 * Asset paths for logo and favicon.
 * Copy these to your static folder or reference directly.
 */
export const assets = {
  logo: path.join(__dirname, 'assets', 'logo.svg'),
  logoDark: path.join(__dirname, 'assets', 'logo-dark.svg'),
  favicon: path.join(__dirname, 'assets', 'favicon.ico'),
};

/**
 * Docusaurus themeConfig fragment.
 * Spread into your themeConfig for consistent styling.
 *
 * Usage:
 *   themeConfig: {
 *     ...brandThemeConfig,
 *     // your overrides
 *   }
 */
export const brandThemeConfig = {
  colorMode: {
    defaultMode: 'light' as const,
    disableSwitch: false,
    respectPrefersColorScheme: false, // Use ColorModeInit instead for 2-way toggle
  },
  navbar: {
    title: '', // Empty: logo is shown, first nav item indicates context
  },
};

/**
 * Alias for brandThemeConfig (matches RFC #5 spec)
 */
export const themeConfig = brandThemeConfig;
