/* CRT Game Database — optional setup-guide enhancement, v1.
   Load AFTER app.js; existing game data and exporter are not modified. */
(() => {
  'use strict';
  const guidesByTitle = new Map();
  const escSetup = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const css = document.createElement('style');
  css.textContent = `
    .setup-panel{margin-top:20px;border-top:1px solid #3a4b56;padding-top:16px}
    .setup-panel h3{margin:0 0 10px}
    .setup-method{background:#16232c;border:1px solid #344752;border-radius:10px;padding:16px;margin:12px 0}
    .setup-method h4{margin:0 0 8px;color:#a5edbd}
    .setup-panel ol,.setup-panel ul{padding-left:22px;line-height:1.6}
    .setup-panel li{margin:6px 0}
    .setup-meta{color:#aebfc7;font-size:.9em;margin:8px 0}
    .setup-pill{display:inline-block;background:#30413c;color:#b7f3c6;border-radius:5px;padding:3px 7px;margin:2px 6px 2px 0;font-size:.78em}
    .setup-filter{margin:8px 0 12px;display:inline-flex;align-items:center;gap:8px;color:#b7d0d8}
    .setup-filter select{background:#14222c;color:#fff;border:1px solid #4b616c;border-radius:6px;padding:8px}
    .setup-guide-link{font-size:.83em;color:#a5edbd;margin-top:8px}
  `;
  document.head.appendChild(css);
  const modal = document.querySelector('.detail-card');
  const panel = document.createElement('section');
  panel.className = 'setup-panel';
  panel.id = 'setupGuides';
  if (modal) modal.appendChild(panel);

  const filterWrap = document.createElement('label');
  filterWrap.className = 'setup-filter';
  filterWrap.innerHTML = '<span>Setup guide</span><select id="setupFilter"><option value="">All games</option><option value="guide">Has setup guide</option><option value="advanced">Advanced setup</option><option value="none">No guide yet</option></select>';
  const filters = document.querySelector('.filters');
  if (filters) filters.appendChild(filterWrap);
  const filterEl = filterWrap.querySelector('select');

  function guideFor(g) { return guidesByTitle.get(String(g.title || '').trim().toLowerCase()); }
  function searchable(g) {
    const guide = guideFor(g);
    if (!guide) return '';
    return [guide.difficulty, guide.verification, ...(guide.methods || []).flatMap(m => [m.name,m.summary,m.sourceNote,...(m.utilities || []).flatMap(u => [u.name,u.role]),...(m.steps || []),...(m.knownIssues || [])])].join(' ').toLowerCase();
  }
  function renderGuide(g) {
    if (!panel) return;
    const guide = guideFor(g);
    if (!guide) {
      panel.innerHTML = '<h3>Setup &amp; Compatibility</h3><p class="setup-meta">No step-by-step guide has been documented for this game yet. Its community CRT mode report is still available above.</p>';
      return;
    }
    let html = `<h3>Setup &amp; Compatibility</h3><div class="setup-meta"><span class="setup-pill">${escSetup(guide.difficulty || 'Unrated')}</span> ${escSetup(guide.verification || 'Not verified')}</div>`;
    for (const m of guide.methods || []) {
      const output = m.reportedOutput;
      html += `<article class="setup-method"><h4>${escSetup(m.name)}</h4><p>${escSetup(m.summary)}</p>`;
      if (output) html += `<p class="setup-meta">Tested output: ${escSetup(output.width)}×${escSetup(output.height)} @ ${escSetup(output.refreshHz)} Hz (${escSetup(output.scan)})</p>`;
      if (m.utilities?.length) html += `<strong>Utilities used</strong><ul>${m.utilities.map(u => `<li><strong>${escSetup(u.name)}</strong> — ${escSetup(u.role)} <em>(${escSetup(u.requirement)})</em></li>`).join('')}</ul>`;
      if (m.steps?.length) html += `<strong>Setup steps</strong><ol>${m.steps.map(s => `<li>${escSetup(s)}</li>`).join('')}</ol>`;
      if (m.knownIssues?.length) html += `<strong>Known issues</strong><ul>${m.knownIssues.map(s => `<li>${escSetup(s)}</li>`).join('')}</ul>`;
      if (m.testedConfiguration) html += `<p class="setup-meta">Tested configuration: ${Object.entries(m.testedConfiguration).map(([k,v]) => escSetup(v)).join(' · ')}</p>`;
      if (m.sourceNote) html += `<p class="setup-meta">${escSetup(m.sourceNote)}</p>`;
      if (m.sourceUrl && /^https:\/\//i.test(m.sourceUrl)) html += `<p><a href="${escSetup(m.sourceUrl)}" target="_blank" rel="noopener noreferrer">Setup source</a></p>`;
      html += '</article>';
    }
    panel.innerHTML = html;
  }
  // app.js defines top-level function declarations; wrap them without editing its original code.
  if (typeof openDetail === 'function') {
    const previousOpen = openDetail;
    openDetail = function (g) { previousOpen(g); renderGuide(g); };
  }
  if (typeof filtered === 'function') {
    const previousFiltered = filtered;
    filtered = function () {
      let results = previousFiltered();
      const selection = filterEl.value;
      if (selection === 'guide') results = results.filter(g => !!guideFor(g));
      if (selection === 'advanced') results = results.filter(g => /advanced/i.test(guideFor(g)?.difficulty || ''));
      if (selection === 'none') results = results.filter(g => !guideFor(g));
      const q = document.querySelector('#search')?.value.trim().toLowerCase();
      if (q && Array.isArray(allGames)) {
        const originalSet = new Set(results);
        const extra = allGames.filter(g => !originalSet.has(g) && searchable(g).includes(q) &&
          (!selection || (selection === 'guide' && guideFor(g)) || (selection === 'advanced' && /advanced/i.test(guideFor(g)?.difficulty || '')) || (selection === 'none' && !guideFor(g))));
        results = results.concat(extra);
      }
      return results;
    };
  }
  filterEl.addEventListener('change', () => { if (typeof render === 'function') render(); });
  fetch('setup-guides.json').then(r => { if (!r.ok) throw Error('HTTP '+r.status); return r.json(); }).then(data => {
    for (const guide of data.guides || []) guidesByTitle.set(String(guide.gameTitle || '').trim().toLowerCase(), guide);
    if (typeof render === 'function') render();
  }).catch(error => {
    console.warn('Setup guides could not be loaded:', error);
    filterWrap.title = 'Could not load setup-guides.json';
  });
})();
