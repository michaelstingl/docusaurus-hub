#!/usr/bin/env bun
/**
 * Generate CSS from brand configuration
 * Run: bun src/generate-css.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { brand } from './brand.config';
import { generateBrandCss } from './css-generator';

const css = generateBrandCss(brand);
const outDir = 'dist/css';
const outPath = `${outDir}/brand.css`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, css);

console.log(`✓ Generated ${outPath}`);
