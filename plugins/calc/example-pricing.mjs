/**
 * Example calculation module
 *
 * Drop .mjs files into plugins/calc/ — they are auto-discovered.
 * Each module must export:
 *   - pathPattern (string): only files whose path includes this are processed
 *   - values (Record<string, string>): {{key}} → replacement value
 *
 * Delete this file and create your own, or keep it as a reference.
 */

import { createFormatters } from '@michaelstingl/docusaurus-hub-content-calc';

const { fmt, fmtDec } = createFormatters('en-US');

// Only process markdown files under content/docs/
export const pathPattern = 'content/docs/';

export const values = {
  'pricing.users':  fmt(1500),       // → "1,500"
  'pricing.base':   fmtDec(9.99),    // → "9.99"
  'pricing.annual': fmtDec(99.90),   // → "99.90"
};
