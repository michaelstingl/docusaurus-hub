/**
 * Brand configuration
 * Single source of truth for colors, fonts, and navbar style.
 * CSS is auto-generated from these settings via: bun run brand
 */

export type BrandConfig = {
  colors: {
    primary: string;    // Main brand color (navbar bg in dark mode, links)
    accent: string;     // Highlight color (hover states)
    neutral: string;    // Secondary color (dark mode primary)
  };
  fonts: {
    heading: { family: string; weight: number };
    body: { family: string; weights: number[] };
  };
  navbar: 'dark' | 'light' | 'auto';
};

// Example configuration - customize for your brand
export const brand: BrandConfig = {
  colors: {
    primary: '#2e8555',   // Docusaurus green
    accent: '#ffcc00',    // Yellow highlight
    neutral: '#25c2a0',   // Teal for dark mode
  },
  fonts: {
    heading: { family: 'Inter', weight: 600 },
    body: { family: 'Inter', weights: [400, 700] },
  },
  navbar: 'auto',  // 'dark' = white text, 'light' = dark text, 'auto' = theme-based
};
