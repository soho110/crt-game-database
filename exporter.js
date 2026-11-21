'use strict';
const $=s=>document.querySelector(s);
let catalog=[],chosen=new Set(),results=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function parseRes(s){const m=String(s||'').trim().match(/^(\d+)\s*[x×]\s*(\d+)\s*(i)?$/i);return m?{w:+m[1],h:+m[2],interlace:!!m[3]}:null}
function isVerifiedNative(g){const evidence=String(g.nativeEvidence||'');return !!(parseRes(g.nativeResolution)&&/\b(verified|confirmed|measured)\b/i.test(evidence)&&!/\b(not|unverified|needs|unknown|unconfirmed|uncertain)\b/i.test(evidence))}
function nativeCandidate(m){return !!(m&&!m.interlace&&m.w>=240&&m.h>=192&&m.h<=288)}
function reportCandidate(m){return !!(m&&!m.interlace&&m.w>=240&&m.h>=192&&m.h<=288)}
function paddedSuggestion(native){
  if(!native||native.interlace||native.w<240||native.h<160||native.h>=240)return null;
  const target=240,top=(target-native.h)/2;
  return {w:native.w,h:target,top,bottom:target-native.h-top,scale:2560/native.w};
}
function propose(g){
  const native=parseRes(g.nativeResolution),report=parseRes(g.crtResolution);
  const verified=isVerifiedNative(g),hz=Number(g.refreshHz)||Number($('#refresh').value);
  const strategy=$('#strategy').value;
  const pad=$('#padded').checked?paddedSuggestion(native):null;
  const padded=pad?`${pad.w}×${pad.h} output, ${pad.top} top / ${pad.bottom} bottom blank lines; centered unscaled rendering REQUIRED and not verified`:null;
  const evidence=verified?'Verified native (record evidence)':native?'Native resolution unverified':'Native unknown';
  let mode=null,kind='unresolved',note='';
  if(strategy!=='super'&&nativeCandidate(native)&&(strategy==='native'||verified)){
    mode=native;kind=verified?'native-verified':'native-unverified';
    note=verified?'Native candidate; VMMaker timings and game display support still untested':'Unverified native candidate; do not treat as confirmed';
  } else if(strategy==='native'){
    note='No eligible native output candidate in the record';
  } else {
    // A reported CRT output is not evidence of native framebuffer resolution.
    const base=reportCandidate(report)?report:(nativeCandidate(native)?native:null);
    if(base){
      const factor=2560/base.w;
      mode={w:2560,h:base.h,interlace:false};kind='super-candidate';
      note=`Super fallback, ${factor.toFixed(3)}× horizontal factor (${Number.isInteger(factor)?'integer':'non-integer'}). ${reportCandidate(report)?'Community-reported CRT output':'Unverified native candidate'} is the reference; verify scaling, timing and game support`;
    } else note='No established progressive 15 kHz output candidate; research required';
  }
  // Padded suggestions are alternatives only. They are never silently exported as installable modes.
  return {g,mode,hz,kind,note,evidence,padded};
}
function visible(){const q=$('#find').value.toLowerCase().trim();return catalog.filter(g=>g.title.toLowerCase().includes(q))}
function renderList(){
  const v=visible();
  const hidden=[...chosen].filter(title=>!v.some(g=>g.title===title)).length;
  $('#count').textContent=`${chosen.size} selected (${hidden} hidden by search) • ${v.length} shown • ${catalog.length} total`;
  $('#games').innerHTML=v.map(g=>`<label class="gamepick"><input type="checkbox" data-title="${esc(g.title)}" ${chosen.has(g.title)?'checked':''}><span>${esc(g.title)}</span><small>${esc(g.nativeResolution||'Native unknown')} / ${esc(g.crtResolution||'CRT unknown')}</small></label>`).join('');
  $('#games').querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{el.checked?chosen.add(el.dataset.title):chosen.delete(el.dataset.title);renderList();renderPreview()}));
  $('#selectedList').innerHTML=chosen.size?[...chosen].sort().map(title=>`<button type="button" data-remove="${esc(title)}" title="Remove ${esc(title)}">${esc(title)} ×</button>`).join(''):'<small class="muted">No games selected.</small>';
  $('#selectedList').querySelectorAll('button').forEach(el=>el.addEventListener('click',()=>{chosen.delete(el.dataset.remove);renderList();renderPreview()}));
}
function renderPreview(){
  results=catalog.filter(g=>chosen.has(g.title)).map(propose);
  const unique=new Map();
  results.forEach(r=>{if(r.mode)unique.set(`${r.mode.w}x${r.mode.h}@${r.hz}`,r)});
  const unresolved=results.filter(r=>!r.mode).length;
  $('#summary').textContent=`${results.length} games • ${unique.size} unique proposed modes • ${unresolved} unresolved • ${results.filter(r=>r.padded).length} padded alternatives for research. No timings validated.`;
  $('#preview').innerHTML=results.map(r=>`<tr><td>${esc(r.g.title)}</td><td>${esc(r.evidence)}${r.g.crtResolution?'<br><small>Community CRT report: '+esc(r.g.crtResolution)+'</small>':''}</td><td>${r.mode?`${r.mode.w} × ${r.mode.h} @ ${r.hz} Hz`:'—'}<br><small>${esc(r.kind)}</small></td><td class="${r.kind==='native-verified'?'good':'warn'}">${esc(r.note)}${r.padded?'<br><span class="info">Padded alternative (not exported): '+esc(r.padded)+'</span>':''}</td></tr>`).join('');
  $('#exportIni').disabled=!unique.size;$('#exportCsv').disabled=!results.length;
}
function download(name,data,mime){const blob=new Blob([data],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function exportIni(){
  const uniq=new Map();results.forEach(r=>{if(r.mode)uniq.set(`${r.mode.w}x${r.mode.h}@${r.hz}`,r)});
  const lines=['## Windows game mode candidates - VMMaker 2.0 beta 15','## Candidate modes only; no timings or game output verified.','## DO NOT replace your working user_modes file.','', '## Proposed user modes'];
  [...uniq.values()].sort((a,b)=>a.mode.h-b.mode.h||a.mode.w-b.mode.w||a.hz-b.hz).forEach(r=>lines.push(`${r.mode.w} x ${r.mode.h} @ ${r.hz.toFixed(6)} windows_candidate`));
  download('windows_game_user_modes_candidates.ini',lines.join('\r\n')+'\r\n','text/plain');
}
const csv=s=>'"'+String(s??'').replace(/"/g,'""')+'"';
function exportCsv(){
  const rows=[['Game','Native candidate','Native evidence','Reported CRT output','Evidence classification','Proposed output','Refresh Hz','Selection type','Padded planning alternative (not exported)','Validation note','Source URL']];
  results.forEach(r=>rows.push([r.g.title,r.g.nativeResolution||'',r.g.nativeEvidence||'',r.g.crtResolution||'',r.evidence,r.mode?`${r.mode.w}x${r.mode.h}`:'',r.hz,r.kind,r.padded||'',r.note,r.g.sourceUrl||'']));
  download('windows_game_mode_mapping.csv',rows.map(row=>row.map(csv).join(',')).join('\r\n')+'\r\n','text/csv');
}
$('#find').addEventListener('input',renderList);
['strategy','refresh','padded'].forEach(id=>$('#'+id).addEventListener('change',renderPreview));
$('#selectShown').addEventListener('click',()=>{visible().forEach(g=>chosen.add(g.title));renderList();renderPreview()});
$('#clearAll').addEventListener('click',()=>{chosen.clear();renderList();renderPreview()});
$('#exportIni').addEventListener('click',exportIni);
$('#exportCsv').addEventListener('click',exportCsv);
fetch('data/games.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{if(!Array.isArray(data))throw Error('Invalid catalog');catalog=data.filter(g=>g&&typeof g.title==='string');renderList();renderPreview()}).catch(e=>{$('#count').textContent='Unable to load data/games.json: '+e.message});
