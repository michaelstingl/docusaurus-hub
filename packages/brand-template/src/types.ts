/**
 * Brand configuration types
 */

export type BrandColors = {
  /** Main brand color - used for navbar bg (dark mode), links, primary UI */
  primary: string;
  /** Highlight color - used for hover states, accents */
  accent: string;
  /** Secondary color - used as primary in dark mode */
  neutral: string;
};

export type BrandFont = {
  /** Font family name (must be available via Google Fonts or locally) */
  family: string;
  /** Font weight */
  weight: number;
};

export type BrandFontWithWeights = {
  /** Font family name */
  family: string;
  /** Font weights to load */
  weights: number[];
};

export type BrandFonts = {
  /** Heading font configuration */
  heading: BrandFont;
  /** Body text font configuration */
  body: BrandFontWithWeights;
};

export type NavbarStyle = 'dark' | 'light' | 'auto';

/** Dark mode background style */
export type DarkModeStyle = 'branded' | 'neutral';

export type BrandConfig = {
  /** Brand color palette */
  colors: BrandColors;
  /** Typography configuration */
  fonts: BrandFonts;
  /** Navbar style: 'dark' = light text on dark bg, 'light' = dark text, 'auto' = follows theme */
  navbar: NavbarStyle;
  /** Dark mode style: 'branded' = brand color background, 'neutral' = dark gray background */
  darkMode?: DarkModeStyle;
};

/**
 * Generated color variants for Infima CSS variables
 */
export type ColorVariants = {
  base: string;
  dark: string;
  darker: string;
  darkest: string;
  light: string;
  lighter: string;
  lightest: string;
};
