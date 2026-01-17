#!/usr/bin/env python3
"""
Script to update publications from Google Scholar
Run this script to fetch the latest publications and update data/publications.json
"""

import json
from datetime import datetime
from scholarly import scholarly

def fetch_publications(scholar_id="AF8zRPwAAAAJ", max_publications=100):
    """
    Fetch publications from Google Scholar for the given author ID

    Args:
        scholar_id: Google Scholar author ID (default: Prof. Kurdahi's ID)
        max_publications: Maximum number of publications to fetch

    Returns:
        List of publication dictionaries
    """
    print(f"Fetching publications for scholar ID: {scholar_id}")

    try:
        # Search for the author
        author = scholarly.search_author_id(scholar_id)
        author = scholarly.fill(author, sections=['publications'])

        publications = []

        for idx, pub in enumerate(author['publications'][:max_publications]):
            try:
                # Fill publication details
                pub_filled = scholarly.fill(pub)

                # Extract relevant information
                publication = {
                    "id": idx + 1,
                    "title": pub_filled.get('bib', {}).get('title', 'Untitled'),
                    "authors": pub_filled.get('bib', {}).get('author', 'Unknown'),
                    "venue": pub_filled.get('bib', {}).get('venue', pub_filled.get('bib', {}).get('journal', 'Unknown')),
                    "year": int(pub_filled.get('bib', {}).get('pub_year', 0)),
                    "citations": int(pub_filled.get('num_citations', 0)),
                    "link": pub_filled.get('pub_url', pub_filled.get('eprint_url', f"https://scholar.google.com/citations?user={scholar_id}"))
                }

                publications.append(publication)
                print(f"  Fetched: {publication['title'][:50]}... ({publication['citations']} citations)")

            except Exception as e:
                print(f"  Error fetching publication {idx}: {e}")
                continue

        print(f"\nSuccessfully fetched {len(publications)} publications")
        return publications

    except Exception as e:
        print(f"Error fetching author publications: {e}")
        return []

def update_publications_file(publications, output_file="data/publications.json"):
    """
    Update the publications JSON file with new data

    Args:
        publications: List of publication dictionaries
        output_file: Path to the output JSON file
    """
    data = {
        "publications": publications,
        "lastUpdated": datetime.utcnow().isoformat() + "Z"
    }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nPublications data written to {output_file}")
    print(f"Total publications: {len(publications)}")
    print(f"Last updated: {data['lastUpdated']}")

if __name__ == "__main__":
    # Fetch publications from Google Scholar
    publications = fetch_publications()

    if publications:
        # Update the JSON file
        update_publications_file(publications)
        print("\n✓ Publications updated successfully!")
    else:
        print("\n✗ No publications were fetched. Please check your internet connection or Google Scholar availability.")
