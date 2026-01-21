/**
 * Brand Package Exports
 *
 * Usage:
 *   import { brand, themeConfig, cssPath } from '@scope/docusaurus-brand';
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Re-export types
export type {
  BrandConfig,
  BrandColors,
  BrandFonts,
  BrandFont,
  BrandFontWithWeights,
  NavbarStyle,
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

// Get package directory for asset paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');

/**
 * Path to the generated brand CSS file.
 * Use in docusaurus.config.ts:
 *   theme: { customCss: [cssPath, './src/css/custom.css'] }
 */
export const cssPath = join(packageRoot, 'css', 'brand.css');

/**
 * Path to the ColorModeInit client module.
 * Use in docusaurus.config.ts:
 *   clientModules: [colorModeInitPath]
 */
export const colorModeInitPath = join(__dirname, 'theme', 'ColorModeInit.js');

/**
 * Asset paths for logo and favicon.
 * Copy these to your static folder or reference directly.
 */
export const assets = {
  logo: join(packageRoot, 'assets', 'logo.svg'),
  logoDark: join(packageRoot, 'assets', 'logo-dark.svg'),
  favicon: join(packageRoot, 'assets', 'favicon.ico'),
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
