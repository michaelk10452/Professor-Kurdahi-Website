#!/usr/bin/env node

/**
 * Publications Update Script
 *
 * This script provides instructions for manually updating the publications data.
 * Run this every 6 months to keep publications current.
 *
 * AUTOMATED METHOD (Coming Soon):
 * This will eventually use an API to fetch publications automatically.
 *
 * MANUAL METHOD (Current):
 * Follow these steps to update publications manually:
 *
 * 1. Visit Google Scholar: https://scholar.google.com/citations?user=AF8zRPwAAAAJ
 * 2. Sort by "Recent" and note the 5 most recent publications
 * 3. Sort by "Cited by" and note the 5 most cited publications
 * 4. Update data/publications.json with the new information
 * 5. Commit and push the changes
 *
 * JSON Format Required:
 * {
 *   "mostRecent": [ {id, title, authors, venue, year, citations, link}, ... ],
 *   "mostCited": [ {id, title, authors, venue, year, citations, link}, ... ],
 *   "lastUpdated": "ISO date string",
 *   "note": "Description"
 * }
 */

const fs = require('fs');
const path = require('path');

const SCHOLAR_ID = 'AF8zRPwAAAAJ';
const DATA_FILE = path.join(__dirname, '..', 'data', 'publications.json');

console.log('📚 Publications Update Tool\n');
console.log('This tool helps you update Professor Kurdahi\'s publications.\n');
console.log('MANUAL UPDATE PROCESS:');
console.log('======================\n');
console.log(`1. Visit: https://scholar.google.com/citations?user=${SCHOLAR_ID}`);
console.log('2. Note the 5 most recent publications (sorted by year)');
console.log('3. Note the 5 most cited publications (sorted by citations)\n');
console.log('4. Update the file: data/publications.json');
console.log('5. Run: git add data/publications.json');
console.log('6. Run: git commit -m "Update publications data"');
console.log('7. Run: git push\n');

console.log('Current publications file location:');
console.log(`  ${DATA_FILE}\n`);

// Read and display current data
try {
  const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log('Current Data:');
  console.log(`  Last Updated: ${currentData.lastUpdated}`);
  console.log(`  Most Recent Publications: ${currentData.mostRecent?.length || 0}`);
  console.log(`  Most Cited Publications: ${currentData.mostCited?.length || 0}\n`);
} catch (error) {
  console.error('⚠️  Could not read current publications file:', error.message, '\n');
}

console.log('💡 TIP: You can also edit the file directly in your code editor.');
console.log('📖 See scripts/README.md for more details.\n');
