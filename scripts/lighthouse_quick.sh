#!/bin/bash
set -e
URL="${1:-http://localhost:8765/}"
OUT="/tmp/lighthouse-report.json"
npx lighthouse "$URL" --only-categories=seo --output=json --output-path="$OUT" --chrome-flags="--headless --no-sandbox" > /dev/null 2>&1
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('$OUT','utf8'));
console.log('SEO score: ' + (data.categories.seo.score*100).toFixed(0) + '/100');
Object.values(data.audits).forEach(a => { if(a.score===0) console.log('FAIL: ' + a.id + ' - ' + a.title); });
"
