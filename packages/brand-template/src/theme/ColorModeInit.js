/**
 * Initialize color mode from OS preference on first visit.
 * After that, user choice is stored in localStorage.
 *
 * Usage in docusaurus.config.ts:
 *   clientModules: [require.resolve('@scope/brand/theme/ColorModeInit.js')]
 */

const STORAGE_KEY = 'theme';

export function onRouteDidUpdate() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // If user already made a choice, respect it
  if (localStorage.getItem(STORAGE_KEY)) return;

  // Check OS preference and set initial theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(STORAGE_KEY, 'dark');
  }
}
