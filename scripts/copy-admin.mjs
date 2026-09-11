import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve(import.meta.dirname, '../admin/dist');
const dest = resolve(import.meta.dirname, '../dist/admin');

if (!existsSync(src)) {
	throw new Error(`Missing ${src}. Build the admin app first.`);
}

mkdirSync(resolve(import.meta.dirname, '../dist'), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`Copied admin dist → ${dest}`);
