# CRT Game Database

**Find modern PC games that work on CRT displays — and learn how to configure them.**

[**Browse the game catalog**](https://soho110.github.io/crt-game-database/) · [**Create a VMMaker INI**](https://soho110.github.io/crt-game-database/exporter.html) · [**Community submissions (coming soon)**](https://github.com/soho110/crt-game-database/issues)

> **Community submissions are not open yet.** The submissions link currently points to GitHub Issues as a placeholder. New Issues are **not** automatically added to the database.

## What is this project?

**CRT Game Database** is a free, public reference for playing PC 2D, pixel-art, and retro-style games on CRT televisions and monitors, with an emphasis on **15 kHz consumer CRTs**, **CRT Emudriver**, and **VMMaker**.

The database combines community-reported CRT resolutions, refresh rates, original sources, and game-specific setup instructions where available. It helps answer two questions:

1. **What resolution and refresh rate should I try for this game?**
2. **What utilities, configuration, or workarounds might be needed?**

The November 2026 snapshot contains **316 indexed games** and **261 game records with CRT mode reports**. Counts may change as the catalog grows.

## How to use the website

### 1. Find a game

Open the [game catalog](https://soho110.github.io/crt-game-database/). Search by title or resolution, apply filters, and select a game to view its compatibility record.

### 2. Read the compatibility record

A record may include:

- **Reported CRT output resolution and refresh rate:** What a community contributor used or recommended.
- **Native render resolution:** Shown only when supported by evidence; it is not automatically the same as the reported display mode.
- **Scan type and compatibility notes:** Progressive, interlaced, and other caveats where known.
- **Source links:** Original community reports for further investigation.
- **Setup & Compatibility guides:** Documented tools, configuration steps, tested setups, and known issues when available.

**Example — Bloodstained: Curse of the Moon 2:** A community report lists **426×240 at 60 Hz**. One locally tested configuration uses **CRU** for the custom display mode and **Special K** for display/fullscreen handling, with a working refresh near **59.840 Hz**. This is one working method, **not** proof that all systems require those tools.

### 3. Export resolutions for your games

Open the [**VMMaker INI exporter**](https://soho110.github.io/crt-game-database/exporter.html).

1. Choose **Selected games only** and check the titles you want, or choose **All games**.
2. Optionally include the existing super-resolution and console baseline.
3. Click **Download VMMaker INI**.
4. Use **Download review CSV** to inspect entries requiring manual attention, such as non-8-aligned widths or missing refresh rates.
5. Import the INI into VMMaker and inspect generated timings before installing or using them.

The exporter deduplicates identical requests and preserves reported refresh rates. It does **not** guarantee that every generated mode is safe or compatible with every CRT. Some unusual widths may need **CRU** instead.

### 4. Follow a setup guide when needed

Some games support the desired resolution directly. Others need custom resolutions, fullscreen adjustments, or utilities such as Special K. When a guide exists, open the game's **Setup & Compatibility** section. Multiple working methods may be documented for the same game.

## Community contributions — coming soon

We plan to accept **new game reports, corrections, tested CRT configurations, and setup guides** through a moderated submission process. Reports will be reviewed before inclusion in the public database.

Useful reports should include the game and PC version, resolution, refresh rate, scan type, CRT and GPU, setup utilities, results, and supporting evidence where possible.

[**Community submission area — placeholder**](https://github.com/soho110/crt-game-database/issues)

## Important accuracy and safety notes

- **Community-reported CRT mode ≠ verified native framebuffer resolution.** A usable output mode does not by itself prove 1:1 pixel mapping.
- **Hardware varies.** A mode reported as working on one setup may not work on another CRT.
- **VMMaker INI files contain mode requests**, not validated modeline timings. VMMaker may adjust refresh rates to fit the selected monitor preset.
- **480i is not 240p.** Interlaced and progressive output should not be treated as equivalent.
- **Verify timings** and your CRT's capabilities before applying changes.

The historical source includes the [ArcadeControls CRT Emudriver compatibility thread](https://forum.arcadecontrols.com/index.php?topic=161951.0). Some catalog entries remain research candidates rather than independently verified results.

## Project files

| File | Purpose |
| --- | --- |
| `index.html`, `app.js`, `styles.css` | Searchable catalog and interface |
| `data/games.json` | Primary catalog and community reports |
| `data/games.csv` | Spreadsheet-friendly catalog export |
| `exporter.html` | Selected-game and full-library VMMaker INI exports |
| `setup-guides.js`, `setup-guides.json` | Game-specific setup guides |

### Run locally

This is a static GitHub Pages website. To run it locally, serve the repository over HTTP:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. Serving over HTTP is recommended because the site fetches JSON data.

## Roadmap

- [x] Public searchable game catalog
- [x] Community CRT mode reports and source references
- [x] Selective and full-library VMMaker INI exporter
- [x] Initial game-specific setup-guide support
- [ ] More verified native framebuffer resolutions and tested configurations
- [ ] Moderated community submissions
- [ ] Expanded troubleshooting and setup guides
- [ ] Optional launcher integration, including Playnite

---

*CRT Game Database is a community research project intended to make CRT PC gaming easier to reproduce while keeping reported compatibility distinct from verified technical facts.*
