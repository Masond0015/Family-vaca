// ── Foam dots ──
const foamWrap = document.getElementById(‘foamDots’);
for (let i = 0; i < 28; i++) {
const d = document.createElement(‘div’);
d.className = ‘foam-dot’;
const size = 3 + Math.random() * 7;
d.style.cssText = `width:${size}px; height:${size}px; left:${Math.random()*100}%; top:${Math.random()*10}px; animation-delay:${Math.random()*3}s; animation-duration:${2+Math.random()*2}s;`;
foamWrap.appendChild(d);
}

// ── Countdown target: May 16, 2026 6:00 AM EDT (UTC-4) = 10:00 AM UTC ──
const target = new Date(Date.UTC(2026, 4, 16, 10, 0, 0)); // May = index 4

// For progress bar: reference start = now at page load
const startMs = Date.now();
const totalMs = target.getTime() - startMs;

function pad(n) { return String(Math.floor(n)).padStart(2, ‘0’); }

let prev = { d: -1, h: -1, m: -1, s: -1 };

function triggerPop(blockId) {
const el = document.getElementById(blockId);
el.classList.remove(‘pop’);
void el.offsetWidth;
el.classList.add(‘pop’);
}

function tick() {
const now = Date.now();
const diff = target.getTime() - now;

if (diff <= 0) {
[‘days’,‘hrs’,‘mins’,‘secs’].forEach(id => document.getElementById(id).textContent = ‘00’);
document.getElementById(‘pct-lbl’).textContent = ‘🎉 You're on vacation!’;
document.getElementById(‘fill’).style.width = ‘100%’;
return;
}

const totalSecs = Math.floor(diff / 1000);
const d = Math.floor(totalSecs / 86400);
const h = Math.floor((totalSecs % 86400) / 3600);
const m = Math.floor((totalSecs % 3600) / 60);
const s = totalSecs % 60;

if (d !== prev.d) { document.getElementById(‘days’).textContent = d;     triggerPop(‘b-days’); prev.d = d; }
if (h !== prev.h) { document.getElementById(‘hrs’).textContent  = pad(h); triggerPop(‘b-hrs’);  prev.h = h; }
if (m !== prev.m) { document.getElementById(‘mins’).textContent = pad(m); triggerPop(‘b-mins’); prev.m = m; }
if (s !== prev.s) { document.getElementById(‘secs’).textContent = pad(s); triggerPop(‘b-secs’); prev.s = s; }

const elapsed = now - startMs;
const pct = Math.min(100, (elapsed / totalMs) * 100);
document.getElementById(‘fill’).style.width = pct + ‘%’;
document.getElementById(‘pct-lbl’).textContent = pct.toFixed(2) + ‘% of the wait done’;
}

tick();
setInterval(tick, 1000);
