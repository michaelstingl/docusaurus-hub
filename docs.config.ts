/**
 * Docs instances configuration
 * Single source of truth - used by docusaurus.config.ts and sidebars.ts
 *
 * To add a new docs section:
 * 1. Add entry here
 * 2. Create content folder with at least one .md file
 * 3. Done - sidebar + navbar appear automatically
 */

export type DocsInstance = {
  id: string;     // Unique identifier (used for sidebar + plugin)
  path: string;   // Content folder (can be relative, e.g., '../other-repo/docs')
  route: string;  // URL path (use '/' for main docs)
  label: string;  // Navbar label
};

export const docs: DocsInstance[] = [
  { id: 'docs', path: 'content/docs', route: '/', label: 'Docs' },
  { id: 'api', path: 'content/api', route: '/api', label: 'API' },
  { id: 'guides', path: 'content/guides', route: '/guides', label: 'Guides' },
  // { id: 'sdk', path: '../sdk-repo/docs', route: '/sdk', label: 'SDK' },
];
