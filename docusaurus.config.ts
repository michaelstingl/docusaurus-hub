/**
 * Docusaurus configuration
 * Docs instances are defined in docs.config.ts
 */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {docs} from './docs.config';

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
  future: { v4: true, experimental_faster: true },
  i18n: { defaultLocale: 'en', locales: ['en'] },

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
        theme: { customCss: './src/css/custom.css' },
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
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: SITE_TITLE,
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
