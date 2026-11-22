CRT Game Database
Find modern PC games that work on CRT displays — and learn how to configure them.

Browse the game catalog · Create a VMMaker INI · Community submissions (coming soon)
Community submissions are not open yet. The link above points to the repository's Issues area as a placeholder; a structured submission and review workflow will be added later. Please do not assume a new Issue will automatically become a database entry.

What is this project?
CRT Game Database is a free, public, community-oriented reference for playing PC 2D, pixel-art, and retro-style games on CRT televisions and monitors, with an emphasis on 15 kHz consumer CRTs, CRT Emudriver, and VMMaker.

The database brings together reported CRT display modes, refresh rates, original community sources, and — where documented — game-specific setup instructions. It aims to answer two practical questions:
1. What resolution and refresh rate should I try for this game?
2. What configuration, utilities, or workarounds might be needed to get it displaying correctly?
The current catalog contains 316 indexed games and 261 game records with CRT mode reports (November 2026 snapshot). These counts will change as the database grows.
How to use the website
1. Find a game
Open the game catalog. Search by title or resolution, or use the filters to narrow the results. Select a game to open its compatibility record.
2. Read the compatibility record
A game record may include:
- Reported CRT output resolution and refresh rate — what a community contributor used or recommended.
- Native render resolution — shown only when supported by evidence; it is not automatically the same as the reported display mode.
- Scan type and compatibility notes — progressive, interlaced, and other caveats where known.
- Source links — so you can examine the original report.
- Setup & Compatibility guide — when available, instructions for tools such as CRU or Special K, tested configurations, and known issues.
Example: Bloodstained: Curse of the Moon 2 has a community-reported 426×240 at 60 Hz display mode. A documented local configuration uses CRU for the custom mode and Special K for display/fullscreen handling, with a working refresh near 59.840 Hz. This is one tested approach, not a claim that every system requires those tools.
3. Export modes for the games you own
Open the VMMaker INI exporter.
1. Choose Selected games only and check the games you want, or choose All games.
2. Optionally include the existing super-resolution and console baseline.
3. Download the VMMaker user-mode INI.
4. Download the review CSV to inspect entries that need special handling (for example, widths not divisible by eight, missing refresh rates, or unusually tall progressive modes).
5. Load the INI into VMMaker and inspect its generated timings before installing or using them.
The exporter deduplicates identical mode requests and preserves reported refresh rates; it does not generate guaranteed-safe timings for every CRT. Some custom widths may need CRU instead of VMMaker.
4. Follow setup guides when needed
Some games can select an appropriate display mode directly. Others need custom resolutions, fullscreen adjustments, or third-party utilities. Where available, open Setup & Compatibility in the game's details to follow a documented method. Different contributors may have different working methods for the same game.
Community contributions — coming soon
We plan to accept new games, CRT compatibility reports, corrections, and setup guides through a structured submission process. Proposed submissions will be reviewed before being included in the public database.

A useful report will identify the game and PC version, resolution, refresh rate, scan type, CRT and GPU, utilities or configuration steps, observed results, and supporting evidence where possible.

Submission area — placeholder (not accepting reports yet)
Important accuracy and safety notes
- Community-reported mode ≠ verified native framebuffer resolution. A usable CRT output resolution does not by itself prove 1:1 pixel mapping.
- Reports come from different hardware and display setups. A mode reported as working elsewhere may not work on your CRT.
- A VMMaker user-mode INI is a list of requested resolutions, not a list of validated modeline timings. VMMaker may adjust refresh rates to meet the selected monitor preset.
- Interlaced output is not equivalent to progressive 240p; verify the actual scan mode.
- Check timings and your CRT's capabilities before applying changes. Do not assume that every mode in a community report is safe for every 15 kHz television.
The historical community source is the ArcadeControls CRT Emudriver compatibility thread. The archive also contains research entries that need further verification.
Project files and technical information
File	Purpose
index.html, app.js, styles.css	Searchable game catalog and interface
data/games.json	Primary catalog and community-report data
data/games.csv	Spreadsheet-friendly catalog export
exporter.html	Select games and export VMMaker user-mode INI files
setup-guides.js, setup-guides.json	Optional game-specific setup guides and interface


This is a static website hosted with GitHub Pages. To run it locally, serve the repository over HTTP, for example:
python -m http.server 8000
Then visit http://localhost:8000/. Serving over HTTP is recommended because the website fetches JSON files.
Roadmap
- [x] Public searchable game catalog
- [x] Community-reported CRT resolutions and source references
- [x] Selective and full-library VMMaker INI exporter
- [x] Initial game-specific setup-guide support
- [ ] More verified native framebuffer resolutions and tested configurations
- [ ] Community submission forms and moderation queue
- [ ] Expanded setup guides and troubleshooting notes
- [ ] Optional launcher integration, including Playnite
CRT Game Database is a community research project. Its goal is to make CRT PC gaming easier to reproduce, while keeping reported compatibility separate from verified technical facts.
