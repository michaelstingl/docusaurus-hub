/**
 * Docusaurus configuration
 * Docs instances are defined in docs.config.ts
 * Brand styling is optional - falls back to Docusaurus defaults
 */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {docs} from './docs.config';

// Optional brand package - falls back to Docusaurus defaults if not installed
let cssPath: string | undefined;
let colorModeInitPath: string | undefined;
let brandThemeConfig: Partial<Preset.ThemeConfig> = {};

try {
  const brand = require('@michaelstingl/docusaurus-hub-brand');
  cssPath = brand.cssPath;
  colorModeInitPath = brand.colorModeInitPath;
  brandThemeConfig = brand.brandThemeConfig || {};
} catch {
  // Brand package not installed - using Docusaurus defaults
  console.log('ℹ️  No brand package installed, using Docusaurus defaults');
}

// Environment variables (set automatically in GitHub Actions)
const {
  SITE_URL = 'http://localhost:3000',
  BASE_URL = '/',
  SITE_TITLE = 'Documentation',
  SITE_TAGLINE = '',
  GITHUB_REPOSITORY,
} = process.env;

const [mainDocs, ...extraDocs] = docs;

const editUrl = GITHUB_REPOSITORY
  ? `https://github.com/${GITHUB_REPOSITORY}/tree/main/`
  : undefined;

const config: Config = {
  title: SITE_TITLE,
  tagline: SITE_TAGLINE,
  favicon: 'img/favicon.ico',
  url: SITE_URL,
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  // TODO: Re-enable experimental_faster when Rspack "emitting after emit" bug is fixed
  // See: https://github.com/facebook/docusaurus/discussions/11140
  future: { v4: true, experimental_faster: false },
  i18n: { defaultLocale: 'en', locales: ['en'] },
  markdown: { format: 'detect' },

  // Initialize color mode from OS preference (if brand package installed)
  clientModules: [colorModeInitPath].filter(Boolean) as string[],

  presets: [
    [
      'classic',
      {
        docs: {
          path: mainDocs.path,
          routeBasePath: mainDocs.route,
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
          editUrl,
        },
        blog: false,
        // Use CSS from brand package (if installed) + local overrides
        theme: { customCss: [cssPath, './src/css/custom.css'].filter(Boolean) as string[] },
      } satisfies Preset.Options,
    ],
  ],

  plugins: extraDocs.map((doc) => [
    '@docusaurus/plugin-content-docs',
    {
      id: doc.id,
      path: doc.path,
      routeBasePath: doc.route,
      sidebarPath: './sidebars.ts',
      sidebarCollapsed: false,
      editUrl,
    },
  ]),

  themeConfig: {
    // Spread brand theme config (empty object if no brand package)
    ...brandThemeConfig,
    navbar: {
      ...(brandThemeConfig.navbar || {}),
      logo: { alt: 'Logo', src: 'img/logo.svg', srcDark: 'img/logo.svg' },
      items: [
        ...docs.map((doc, i) => ({
          type: 'docSidebar' as const,
          sidebarId: doc.id,
          ...(i > 0 && { docsPluginId: doc.id }),
          label: doc.label,
          position: 'left' as const,
        })),
        {
          href: GITHUB_REPOSITORY ? `https://github.com/${GITHUB_REPOSITORY}` : 'https://github.com',
          label: 'GitHub',
          position: 'right' as const,
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
