#!/bin/bash
set -e
URL="http://localhost:8765/"
OUT="/tmp/lighthouse-report.json"
npx lighthouse "$URL" --only-categories=seo --output=json --output-path="$OUT" --chrome-flags="--headless --no-sandbox" 2>/dev/null || true
if [ -f "$OUT" ]; then
  python3 -c "
import json
with open('$OUT') as f:
    data = json.load(f)
score = data['categories']['seo']['score']
print(f'SEO score: {score*100:.0f}/100')
for k,audit in data['audits'].items():
    if audit.get('score') == 0:
        print(f'FAIL: {audit[\"id\"]} - {audit[\"title\"]}')
"
fi
