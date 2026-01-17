# Publications Update Scripts

This directory contains tools for updating the publications data displayed on the website.

## How It Works

The publications system uses a static JSON file (`data/publications.json`) that contains:
- **Top 5 Most Recent Publications** - Sorted by year
- **Top 5 Most Cited Publications** - Sorted by citation count

## File Structure

```json
{
  "mostRecent": [ ... 5 publications ... ],
  "mostCited": [ ... 5 publications ... ],
  "lastUpdated": "2025-01-17T00:00:00Z",
  "note": "Description"
}
```

## Manual Update Process

### Option 1: Run the Helper Script

```bash
cd scripts
node update_publications.js
```

This will display instructions and current status.

### Option 2: Direct Update

1. **Visit Google Scholar Profile:**
   - URL: https://scholar.google.com/citations?user=AF8zRPwAAAAJ

2. **Identify Publications:**
   - Sort by year → Note the 5 most recent publications
   - Sort by citations → Note the 5 most cited publications

3. **Update JSON File:**
   - Edit `data/publications.json`
   - Update the `mostRecent` array with the 5 most recent publications
   - Update the `mostCited` array with the 5 most cited publications
   - Update `lastUpdated` to current date (ISO format)

4. **Commit Changes:**
   ```bash
   git add data/publications.json
   git commit -m "Update publications data"
   git push
   ```

## Publication Format

Each publication should have this structure:

```json
{
  "id": 1,
  "title": "Paper Title",
  "authors": "Author Names",
  "venue": "Conference/Journal Name",
  "year": 2024,
  "citations": 42,
  "link": "https://link-to-paper.com"
}
```

## Reminder Schedule

Update publications every **6 months** (January & July):
- The GitHub Action creates a reminder issue automatically
- Follow the manual update process above
- Close the issue when complete

## Future Enhancements

An automated fetching system is planned for future implementation using:
- Semantic Scholar API (free, no auth required)
- OpenAlex API (open access publication database)
- Custom scraping with proper rate limiting
