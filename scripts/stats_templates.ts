import * as fs from 'fs';
const c = fs.readFileSync('src/data/notionTemplates.ts', 'utf8');
const matches = [...c.matchAll(/\{[\s\S]*?slug:/g)];
console.log('Total template objects:', matches.length);
const paid = [...c.matchAll(/price:\s*(\d+)/g)].filter(m => parseInt(m[1]) > 0).length;
const free = [...c.matchAll(/price:\s*0\b/g)].length;
console.log('Paid:', paid, 'Free:', free, 'Total slugs:', [...c.matchAll(/slug:/g)].length);
