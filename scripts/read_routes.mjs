import fs from 'fs';
const text = fs.readFileSync('.codex-build/prerender.mjs','utf8');
const m = text.match(/var prerenderRoutes = ([^;]+);/);
if(m){
    try {
        const arr = eval(m[1]);
        console.log(JSON.stringify(arr, null, 2));
    } catch(e) {
        console.log('[]');
    }
}
