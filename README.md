# Metadata Analysis

Standalone Flask application for **https://metadata.hminhtri.cloud/** with its
own white-and-green visual identity. It has no navigation or branding tied
to the portfolio. The portfolio project card opens this site in a new tab.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask --app app run --debug
```

Open `http://127.0.0.1:5000/`. The application is served at `/` on its own
host, not at `/projects/metadata` on the portfolio. Select the root folder of
an **unzipped JSON export** from Facebook or Instagram using a browser that
supports `webkitdirectory` (for example, Chrome or Edge). No uploaded files
are sent to Flask, persisted or logged. Only matching JSON datasets are read;
photos and other files are ignored. Refreshing the tab clears the results.

The **Xem thử với dữ liệu Facebook** button loads a public, pre-analyzed
dashboard generated from the site owner's real Facebook export. Visitors can
explore the dashboard without downloading their own data. The public result
includes search terms, activity titles, timestamps and aggregate trends; it
does **not** include raw export files or media. This demo is intentionally
public; only the visitor's own selected folder remains private on their device.
The page also explains in Vietnamese how to download a Facebook JSON export
through Accounts Center. HTML exports cannot be analyzed.

To regenerate the demo from the owner's unzipped export (locally only):

```bash
node scripts/build-demo.mjs /path/to/unzipped-facebook-export
```

This updates `static/demo/facebook.json` using the same analysis engine as
folder selection. The source folder must never be added to this repository.

The browser reads up to 20 MiB per matching file and 50 MiB total. Invalid
JSON or unexpected schemas are reported individually; other valid datasets
still work. A folder must contain at least one supported dataset with valid
timestamped records. The matching logic requires the expected relative path.

`static/js/metadata-engine.mjs` refactors the original Facebook logic from
`../dllt/meta_data_analysis/facebook_data_analysis`: monthly/yearly/hourly
search counts, titles and word frequencies, friends added and cumulative per
year, interactions, profile picture updates, comments, reactions and likes.
Instagram support derives follower/following, post-like, comment and story-like
timelines from the second sample's schema. Facebook search, interactions and
profile dates use Asia/Ho_Chi_Minh, matching the original scripts; Facebook
friends/comments/reactions and all Instagram data use UTC.

## Tests

The sample folders stay in `../dllt/meta_data_analysis` and are never copied
into this project. Run the analysis comparisons with Node.js 22+:

```bash
node --test tests/metadata.test.mjs
```

An optional end-to-end Chrome test starts the local Flask server and selects
both actual export folders. It requires Playwright installed separately and
Google Chrome at `/Applications/Google Chrome.app`:

```bash
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tests/metadata-browser.mjs
```

## Deploy separately to Vercel

1. Create a **new** repository `hminhtri-cloud/metadata` for this folder and
   import this folder as a **separate Vercel project**, with its Root Directory
   set to the repository root. Do not deploy it as part of `profile`.
2. Add `metadata.hminhtri.cloud` as a domain on the new Vercel project. Apply
   the DNS record Vercel gives you for that domain; the DNS and domain binding
   must be configured in the hosting account (they cannot be set from
   `vercel.json` alone).
3. Verify `https://metadata.hminhtri.cloud/` serves the page and its CSS/JS
   assets. The main portfolio's project card links directly to this URL and
   its GitHub button links to the future `hminhtri-cloud/metadata` repository.

`vercel.json` includes the templates and static assets in the Python function.
No API, persistent storage or upload service is required.
# meta_DA
