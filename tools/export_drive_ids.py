#!/usr/bin/env python3
"""Export Google Drive file IDs from a public folder page by scraping links.

Usage: python3 export_drive_ids.py FOLDER_ID
"""
import sys
import re
import csv
import os

try:
    import requests
except Exception:
    requests = None


def fetch(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'
    }
    if requests:
        r = requests.get(url, headers=headers, timeout=20)
        r.raise_for_status()
        return r.text
    else:
        # fallback
        from urllib.request import Request, urlopen
        req = Request(url, headers=headers)
        with urlopen(req, timeout=20) as f:
            return f.read().decode('utf-8', errors='ignore')


def extract_ids(html):
    ids = set()
    # common pattern for file links
    for m in re.findall(r'/file/d/([a-zA-Z0-9_-]{10,})', html):
        ids.add(m)
    # sometimes full urls appear
    for m in re.findall(r'd/([a-zA-Z0-9_-]{10,})/view', html):
        ids.add(m)
    return sorted(ids)


def save_csv(folder_id, items, outpath):
    with open(outpath, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['file_id', 'view_url', 'download_url'])
        for fid in items:
            w.writerow([
                fid,
                f'https://drive.google.com/uc?export=view&id={fid}',
                f'https://drive.google.com/uc?export=download&id={fid}'
            ])


def main():
    if len(sys.argv) < 2:
        print('Usage: export_drive_ids.py FOLDER_ID')
        sys.exit(2)
    folder_id = sys.argv[1]
    url = f'https://drive.google.com/drive/folders/{folder_id}'
    print('Fetching', url)
    try:
        html = fetch(url)
    except Exception as e:
        print('Erreur fetch:', e)
        sys.exit(1)

    ids = extract_ids(html)
    if not ids:
        print('Aucun ID trouvé par scraping simple. Le dossier peut nécessiter l’API Drive.')
        # try to extract any lh3 urls (direct images)
        imgs = set(re.findall(r'https://lh3.googleusercontent.com/[^"\s]+', html))
        if imgs:
            print(f'Trouvé {len(imgs)} URLs directes d\'images. Elles seront sauvegardées dans images_urls.txt')
            p = os.path.join(os.getcwd(), 'tools', f'flora_images_urls.txt')
            with open(p, 'w', encoding='utf-8') as f:
                for u in sorted(imgs):
                    f.write(u + '\n')
            print('Saved:', p)
        sys.exit(0)

    out = os.path.join(os.getcwd(), 'tools', f'flora_drive_ids_{folder_id}.csv')
    save_csv(folder_id, ids, out)
    print(f'Found {len(ids)} file IDs. Saved to {out}')


if __name__ == '__main__':
    main()
