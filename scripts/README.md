# Publications Update Scripts

This directory contains scripts to automatically update the publications data from Google Scholar.

## How It Works

The publications system uses a static JSON file (`data/publications.json`) that is automatically updated every 6 months using a GitHub Action.

### Components

1. **`update_publications.py`** - Python script that fetches publications from Google Scholar
2. **`requirements.txt`** - Python dependencies for the update script
3. **`.github/workflows/update-publications.yml`** - GitHub Action that runs the script every 6 months

## Manual Update

To manually update the publications data:

1. Install Python dependencies:
   ```bash
   cd scripts
   pip install -r requirements.txt
   ```

2. Run the update script:
   ```bash
   python update_publications.py
   ```

3. Commit and push the updated `data/publications.json` file:
   ```bash
   git add data/publications.json
   git commit -m "Update publications data"
   git push
   ```

## Automatic Updates

The GitHub Action runs automatically:
- **Schedule**: Every 6 months (January 1st and July 1st at midnight UTC)
- **Manual trigger**: Go to Actions tab → "Update Publications" → "Run workflow"

## Configuration

To change the Google Scholar author ID, edit the `scholar_id` parameter in `update_publications.py`:

```python
publications = fetch_publications(scholar_id="YOUR_SCHOLAR_ID")
```

You can find the Scholar ID in the Google Scholar profile URL:
`https://scholar.google.com/citations?user=AF8zRPwAAAAJ` → ID is `AF8zRPwAAAAJ`

## Troubleshooting

If the automatic update fails:
1. Check the GitHub Actions logs for error messages
2. Google Scholar may have rate limits - try running manually later
3. Verify the Scholar ID is correct
