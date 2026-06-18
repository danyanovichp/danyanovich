import fs from 'fs';
const data = JSON.parse(fs.readFileSync('/tmp/lighthouse-report.json', 'utf8'));
const score = data.categories.seo.score;
console.log('SEO score: ' + (score*100).toFixed(0) + '/100');
Object.values(data.audits).forEach(audit => {
  if (audit.score === 0) {
    console.log('FAIL: ' + audit.id + ' - ' + audit.title);
  }
});
