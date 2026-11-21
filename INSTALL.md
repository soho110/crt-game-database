# CRT Game Database — Windows mode exporter add-on (beta)

This add-on was designed against the existing public repository `soho110/crt-game-database` and its actual `data/games.json` schema (title, nativeResolution, nativeEvidence, crtResolution, refreshHz, sourceUrl). It does not replace any existing file.

## Install

1. Back up the GitHub repository.
2. Upload `exporter.html` and `exporter.js` to the repository root (alongside `index.html`, `app.js`, and `styles.css`).
3. Keep your existing `index.html`, `app.js`, `styles.css`, `data/games.json`, and VMMaker files unchanged.
4. Open `https://soho110.github.io/crt-game-database/exporter.html` after GitHub Pages deploys.
5. Optional: add `<a href="exporter.html">Windows mode exporter</a>` to the site's header navigation in `index.html`.

## Safety and limitations

- This is a **candidate mode exporter**, not a timing validator or a CRT mode installer.
- It does NOT edit `vmm.ini`, install modelines, change RetroArch, or change GroovyMAME.
- It uses a conservative *candidate filter* of progressive 192–288-line output, not proof of 15 kHz compatibility. Actual blanking, sync, refresh, pixel-clock, and display behavior must be tested.
- A community-reported CRT output is not evidence of native framebuffer resolution.
- If native resolution is present but unverified, it is labeled unverified in the CSV; it must not be interpreted as confirmed 1:1 rendering.
- 2560-wide fallback is an output raster, not the game's native width; check scaling and aspect ratio.
- Dynamic VMMaker user tables may ignore specified refresh rates. Static tables are not enabled by this add-on.
- VMMaker may reject or transform some entries. Test with a safe display path before installation.
- Current implementation does not verify installed mode slots, run Switchres, or auto-switch Windows games. Those are later phases.
- No existing user mode list is overwritten. Exported modes should be merged and validated manually rather than blindly replacing `user_modes - super.ini`.

## Next development milestones

1. Add per-game verified-native evidence with sources and game-specific output support.
2. Add monitor-timing validation and mode slot accounting using real VMMaker generation results.
3. Add per-game launcher profiles that select and restore an installed display mode.
4. Regression-test RetroArch/GroovyMAME before changing VMMaker mode tables.
