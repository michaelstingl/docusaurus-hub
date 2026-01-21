#!/usr/bin/env bun
/**
 * Generate CSS from brand.config.ts
 * Run: bun run brand
 */

import { writeFileSync } from 'fs';
import { brand } from '../brand.config';
import { generateBrandCss } from '../src/utils/brand-css';

const css = generateBrandCss(brand);
const outPath = 'src/css/brand.generated.css';

writeFileSync(outPath, css);
console.log(`✓ Generated ${outPath}`);
