# CRT Game Database — research build 0.1

A responsive static website for searching PC 2D / pixel-art game CRT compatibility reports.

## Run locally

Open `index.html` in a browser. For best results, serve this folder over HTTP (for example, `python -m http.server 8000`) because the catalog is loaded from `data/games.json`.

## Deploy publicly

### Option A — GitHub Pages (fewest moving parts)

1. Create a **public** GitHub repository and upload the contents of this folder.
2. Open the repository **Settings → Pages**.
3. Under the build/deployment section, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub will publish the site at `https://<your-username>.github.io/<repository-name>/`.

GitHub Pages supports static HTML, CSS, and JavaScript from a public repository on GitHub Free: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

### Option B — Cloudflare Pages (automatic deployment from Git)

This is a static HTML/CSS/JavaScript site; no server or paid database is required for this first version. Cloudflare Pages supports static HTML and can deploy from a GitHub repository.

1. Create a GitHub repository and upload the contents of this folder.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select the repository. Set production branch to `main`, build command to `exit 0`, and build output directory to `.` (the repository root).
4. Deploy. Cloudflare will provide a `*.pages.dev` address.

Official deployment guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Data structure

`data/games.json` powers the website. `data/games.csv` is the editable spreadsheet export. Each entry separates `nativeResolution` from `crtResolution`. A forum-reported CRT mode is not proof of the game's native framebuffer resolution.

## Data limitations

- ArcadeControls community compatibility thread: https://forum.arcadecontrols.com/index.php?topic=161951.0
- The imported community modes are reported settings, not independent hardware verification. Some later-added reports came from a contributor's PC CRT / 120 Hz environment and are flagged in the notes for 15 kHz validation.
- The initial 99-title research seed contains candidate native resolutions and many entries still require verification.
- The catalog is a research build, not an exhaustive representation of every game in the forum thread or the linked spreadsheet.
- 480i and progressive modes are distinguished; interlaced output is not represented as equivalent to 240p.
- Verify every timing on a protected test setup before connecting a consumer CRT. arcade_15 is a timing envelope, not a guarantee that every television will lock to every mode.

## Next development steps

1. Import the complete ArcadeControls spreadsheet and reconcile duplicates / corrections.
2. Add exact PC release year, developer-confirmed native render resolution, and per-build notes.
3. Validate VMMaker mode syntax and generate export files only from tested timing profiles.
4. Add contributor submission and moderation workflow.
