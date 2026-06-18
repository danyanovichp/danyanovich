const fs=require('fs');
const c=fs.readFileSync('src/data/notionTemplates.ts','utf8');
const slugs=[...c.matchAll(/slug:\s*\"([^\"]+)\"/g)].map(m=>m[1]);
const uniq=new Set(slugs);
console.log('total slugs:',slugs.length,'unique:',uniq.size);
if(slugs.length!==uniq.size){
  const counts={};
  slugs.forEach(s=>counts[s]=(counts[s]||0)+1);
  const dups=Object.entries(counts).filter(([k,v])=>v>1);
  console.log('duplicates:',dups);
}
