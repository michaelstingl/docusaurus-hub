/**
 * Brand Configuration
 *
 * Customize these values for your brand.
 * CSS is auto-generated from this configuration.
 */

import type { BrandConfig } from './types';

export const brand: BrandConfig = {
  colors: {
    // Main brand color - navbar background (dark mode), links, primary UI elements
    primary: '#2e8555',

    // Accent color - hover states, highlights, call-to-action elements
    accent: '#25c2a0',

    // Neutral color - becomes primary color in dark mode
    neutral: '#25c2a0',
  },

  fonts: {
    // Heading font - used for h1-h6, navbar
    heading: {
      family: 'Inter',
      weight: 600,
    },

    // Body font - used for paragraphs, general text
    body: {
      family: 'Inter',
      weights: [400, 700],
    },
  },

  // Navbar style:
  // - 'dark': White text on dark background (uses primary color)
  // - 'light': Dark text on light background
  // - 'auto': Follows the current theme
  navbar: 'dark',

  // Dark mode style:
  // - 'branded': Brand color as background (intense, fully branded)
  // - 'neutral': Traditional dark gray background (subtle, easier on eyes)
  darkMode: 'neutral',
};
