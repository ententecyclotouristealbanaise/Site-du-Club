// ──────────────────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────────────────
let mode = 'velo';
let speedKmh = 25;
let waypoints = [];
let routePolyline = null;
let windMarkers = [];
let chartInstances = {};
let lastWeatherData = null;
let lastWeatherPts = null;

// Date/heure par défaut : maintenant
const now = new Date();
now.setMinutes(0, 0, 0);
document.getElementById('depart-datetime').value = now.toISOString().slice(0, 16);

// ──────────────────────────────────────────────────────
//  MAP INIT
// ──────────────────────────────────────────────────────
const map = L.map('map', {
  center: [46.8, 2.3],
  zoom: 6,
  zoomControl: false // Custom position via css
});

L.control.zoom({ position: 'bottomright' }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap',
  maxZoom: 19
}).addTo(map);

// La carte est initialisée avant que la mise en page (nav, polices) soit
// stabilisée : on force Leaflet à recalculer ses dimensions à chaque fois
// que le conteneur change de taille, sinon les tuiles ne s'affichent que
// sur une bande à gauche.
function refreshMapSize() { map.invalidateSize(); }
if (window.ResizeObserver) {
  new ResizeObserver(refreshMapSize).observe(document.getElementById('map'));
}
window.addEventListener('load', refreshMapSize);
window.addEventListener('resize', refreshMapSize);
setTimeout(refreshMapSize, 300);

// ──────────────────────────────────────────────────────
//  WAYPOINTS & ROUTE
// ──────────────────────────────────────────────────────
function addWaypoint(lat, lng, ele = null) {
  waypoints.push({ lat, lng, ele });
  drawRoute();
  updateStats();
}

function drawRoute() {
  if (routePolyline) map.removeLayer(routePolyline);

  if (waypoints.length < 2) return;

  const latlngs = waypoints.map(w => [w.lat, w.lng]);
  routePolyline = L.polyline(latlngs, {
    color: '#3b82f6', // Accent blue
    weight: 5,
    opacity: 0.9,
    lineJoin: 'round',
    lineCap: 'round',
    className: 'route-path'
  }).addTo(map);

  if (waypoints.length === 2) {
    map.fitBounds(routePolyline.getBounds(), { padding: [60, 60] });
  }
}


// ──────────────────────────────────────────────────────
//  STATS
// ──────────────────────────────────────────────────────
function updateStats() {
  const n = waypoints.length;
  document.getElementById('stat-pts').textContent = n;

  if (n < 2) {
    document.getElementById('stat-dist').innerHTML = '—<span class="unit"> km</span>';
    document.getElementById('stat-time').textContent = '—';
    document.getElementById('stat-elev').innerHTML = '—<span class="unit"> m</span>';
    document.getElementById('stat-arrival').textContent = '—';
    return;
  }

  let dist = 0;
  for (let i = 1; i < n; i++) {
    dist += haversine(waypoints[i - 1], waypoints[i]);
  }

  const speed = speedKmh;
  const mins = Math.round((dist / speed) * 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const timeStr = h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m} min`;

  document.getElementById('stat-dist').innerHTML = `${dist.toFixed(1)}<span class="unit"> km</span>`;
  document.getElementById('stat-time').textContent = timeStr;

  // Heure d'arrivée
  const dtVal = document.getElementById('depart-datetime').value;
  if (dtVal) {
    const depart = new Date(dtVal);
    const arrival = new Date(depart.getTime() + mins * 60000);
    const arrStr = arrival.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const dayStr = arrival.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const arrDay = new Date(arrival); arrDay.setHours(0, 0, 0, 0);
    const isTomorrow = arrDay - today === 86400000;
    document.getElementById('stat-arrival').textContent = isTomorrow ? `${dayStr} ${arrStr}` : arrStr;
  }

  // Dénivelé
  let gain = 0;
  for (let i = 1; i < n; i++) {
    if (waypoints[i].ele && waypoints[i - 1].ele) {
      const d = waypoints[i].ele - waypoints[i - 1].ele;
      if (d > 0) gain += d;
    }
  }
  document.getElementById('stat-elev').innerHTML = gain > 0
    ? `${Math.round(gain)}<span class="unit"> m</span>`
    : '—<span class="unit"> m</span>';
}

function haversine(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// ──────────────────────────────────────────────────────
//  GPX IMPORT
// ──────────────────────────────────────────────────────
document.getElementById('gpx-input').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    parseGPX(ev.target.result);
  };
  reader.readAsText(file);
  this.value = '';
});

function parseGPX(text) {
  resetParcours(false);
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');

  let trkpts = doc.querySelectorAll('trkpt');
  if (trkpts.length === 0) trkpts = doc.querySelectorAll('rtept');
  if (trkpts.length === 0) trkpts = doc.querySelectorAll('wpt');

  if (trkpts.length === 0) {
    showToast('❌ Aucun point GPX valide');
    return;
  }

  const step = Math.max(1, Math.floor(trkpts.length / 80)); // Limit points
  trkpts.forEach((pt, i) => {
    if (i % step !== 0 && i !== trkpts.length - 1) return;
    const lat = parseFloat(pt.getAttribute('lat'));
    const lng = parseFloat(pt.getAttribute('lon'));
    const eleEl = pt.querySelector('ele');
    const ele = eleEl ? parseFloat(eleEl.textContent) : null;
    if (!isNaN(lat) && !isNaN(lng)) waypoints.push({ lat, lng, ele });
  });

  drawRoute();
  updateStats();

  if (routePolyline) {
    map.fitBounds(routePolyline.getBounds(), { padding: [40, 40] });
  }
  showToast(`✅ GPX importé — ${waypoints.length} points`);
}

// Drag & drop
const mapEl = document.getElementById('map');
mapEl.addEventListener('dragover', e => e.preventDefault());
mapEl.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && (file.name.endsWith('.gpx') || file.name.endsWith('.tcx'))) {
    const reader = new FileReader();
    reader.onload = ev => parseGPX(ev.target.result);
    reader.readAsText(file);
  }
});

// ──────────────────────────────────────────────────────
//  MODE
// ──────────────────────────────────────────────────────
function setMode(m) {
  mode = m;
  document.getElementById('btn-velo').classList.toggle('active', m === 'velo');
  document.getElementById('btn-course').classList.toggle('active', m === 'course');
  speedKmh = m === 'velo' ? 25 : 10;
  const slider = document.getElementById('speed-slider');
  slider.min = m === 'velo' ? 12 : 5;
  slider.max = m === 'velo' ? 50 : 20;
  slider.value = speedKmh;
  document.getElementById('speed-label').textContent = speedKmh + ' km/h';
  updateStats();
}

function onSpeedChange(val) {
  speedKmh = parseInt(val);
  document.getElementById('speed-label').textContent = speedKmh + ' km/h';
  updateStats();
}

// ──────────────────────────────────────────────────────
//  WEATHER API
// ──────────────────────────────────────────────────────
async function analyserParcours() {
  if (waypoints.length < 2) {
    showToast('⚠️ Tracez d\'abord un parcours (minimum 2 points)');
    return;
  }

  showLoading(true, 'Récupération des données météo...');
  clearWindMarkers();

  try {
    const dt = document.getElementById('depart-datetime').value;
    const departTime = dt ? new Date(dt) : new Date();

    const ptsCount = parseInt(document.getElementById('pts-slider').value) || 5;
    const pts = samplePoints(waypoints, ptsCount);
    const weatherData = await fetchWeatherForPoints(pts, departTime);

    lastWeatherData = weatherData;
    lastWeatherPts = pts;

    renderWeatherPanel(weatherData, pts);
    renderWindArrows(weatherData, pts);
    renderCharts(weatherData, pts);

    document.getElementById('wind-legend').style.display = 'flex';
    document.getElementById('btn-export').style.display = 'inline-flex';
    document.getElementById('charts-empty').style.display = 'none';

    switchTab('vent');
    setStatus('Météo à jour', true);
    showToast('✅ Analyse terminée');

  } catch (err) {
    console.error(err);
    showToast('❌ Erreur météo : ' + err.message);
    setStatus('Erreur', false);
  } finally {
    showLoading(false);
  }
}

function samplePoints(pts, n) {
  if (pts.length === 0) return [];

  let currentDist = 0;
  pts[0].cumulDist = 0;
  for (let i = 1; i < pts.length; i++) {
    currentDist += haversine(pts[i - 1], pts[i]);
    pts[i].cumulDist = currentDist;
  }

  if (pts.length <= n) return pts;

  const result = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.round(i * (pts.length - 1) / (n - 1));
    result.push(pts[idx]);
  }
  return result;
}

async function fetchWeatherForPoints(pts, startTime) {
  const iso = startTime.toISOString();
  const dateStr = iso.slice(0, 10);

  const results = await Promise.all(pts.map(async (pt, i) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${pt.lat.toFixed(4)}&longitude=${pt.lng.toFixed(4)}&hourly=temperature_2m,precipitation_probability,windspeed_10m,winddirection_10m&wind_speed_unit=kmh&timezone=auto&forecast_days=3`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Erreur pour le point ${i + 1}`);
    const data = await resp.json();

    const timeOffsetHours = (pt.cumulDist || 0) / speedKmh;
    const targetTime = new Date(startTime.getTime() + timeOffsetHours * 3600000);

    const times = data.hourly.time;
    let closest = 0;
    let minDiff = Infinity;

    for (let j = 0; j < times.length; j++) {
      const t = new Date(times[j]);
      const diff = Math.abs(t - targetTime);
      if (diff < minDiff) {
        minDiff = diff;
        closest = j;
      }
    }

    return {
      time: times[closest],
      temp: data.hourly.temperature_2m[closest],
      precip: data.hourly.precipitation_probability[closest],
      windSpeed: data.hourly.windspeed_10m[closest],
      windDir: data.hourly.winddirection_10m[closest],
      lat: pt.lat,
      lng: pt.lng
    };
  }));

  return results;
}

// ──────────────────────────────────────────────────────
//  WIND LOGIC & RENDER
// ──────────────────────────────────────────────────────
function windComponent(travelBearing, windDir, windSpeed) {
  const diff = ((windDir - travelBearing + 360) % 360);
  const rad = diff * Math.PI / 180;
  return windSpeed * Math.cos(rad); // >0 = headwind, <0 = tailwind
}

function bearingBetween(a, b) {
  const lat1 = a.lat * Math.PI / 180, lat2 = b.lat * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
}

function windArrowColor(headwindKmh) {
  if (headwindKmh < -3) return '#10b981'; // green
  if (headwindKmh > 3) return '#ef4444';  // red
  return '#f59e0b';                       // yellow
}

function renderWeatherPanel(data, pts) {
  const avgTemp = avg(data.map(d => d.temp));
  const avgWind = avg(data.map(d => d.windSpeed));
  const avgPrecip = avg(data.map(d => d.precip));

  let headwindScore = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const bearing = bearingBetween(pts[i], pts[i + 1]);
    headwindScore += windComponent(bearing, data[i].windDir, data[i].windSpeed);
  }
  const avgHeadwind = headwindScore / (pts.length - 1);
  const windLabel = avgHeadwind > 3 ? '<span style="color:var(--red);">🔴 Défavorable</span>' :
    avgHeadwind < -3 ? '<span style="color:var(--green);">🟢 Favorable</span>' : '🟡 Neutre';

  document.getElementById('weather-content').innerHTML = `
    <div class="weather-summary">
      <div class="weather-row">
        <span class="wlabel">🌡️ Température</span>
        <span class="wvalue">${avgTemp.toFixed(1)} °C</span>
      </div>
      <div class="weather-row">
        <span class="wlabel">💨 Vent moyen</span>
        <span class="wvalue">${avgWind.toFixed(0)} km/h</span>
      </div>
      <div class="weather-row">
        <span class="wlabel">🌧 Pluie</span>
        <span class="wvalue" style="color:${avgPrecip > 50 ? 'var(--red)' : avgPrecip > 20 ? 'var(--yellow)' : 'var(--green)'}">${avgPrecip.toFixed(0)} %</span>
      </div>
      <div class="weather-row">
        <span class="wlabel">🧭 Bilan vent</span>
        <span class="wvalue">${windLabel}</span>
      </div>
    </div>
  `;
}

function renderWindArrows(data, pts) {
  clearWindMarkers();
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const bearing = i < pts.length - 1
      ? bearingBetween(pts[i], pts[i + 1])
      : (i > 0 ? bearingBetween(pts[i - 1], pts[i]) : 0);

    const hw = windComponent(bearing, d.windDir, d.windSpeed);
    const color = windArrowColor(hw);

    const arrowHtml = `
      <div style="transform:rotate(${d.windDir}deg); font-size:24px; color:${color}; text-shadow:0 2px 4px rgba(0,0,0,0.4); line-height:1;">
        ➤
      </div>`;

    const icon = L.divIcon({
      html: arrowHtml,
      className: 'wind-arrow-icon',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const hwText = hw > 3 ? 'Vent de face' : hw < -3 ? 'Vent arrière' : 'Vent latéral';

    const marker = L.marker([d.lat, d.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:var(--font-ui); padding:4px;">
          <div style="font-weight:700;margin-bottom:8px;font-size:14px;">Point kilométrique ${i + 1}</div>
          <div style="display:grid;gap:6px;font-size:13px;color:var(--text-main);">
            <div>🌡️ Temp : <b>${d.temp.toFixed(1)} °C</b></div>
            <div>💨 Vent : <b>${d.windSpeed.toFixed(0)} km/h</b> (${dirToText(d.windDir)})</div>
            <div style="margin-top:4px;padding:6px 10px;border-radius:6px;background:rgba(0,0,0,0.04);border-left:3px solid ${color};">
              <b>${hwText}</b> (${Math.abs(hw).toFixed(0)} km/h)
            </div>
            <div style="color:var(--text-muted);font-size:11px;margin-top:4px;">${d.time.replace('T', ' ')}</div>
          </div>
        </div>
      `);
    windMarkers.push(marker);
  }
}

function dirToText(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round(deg / 45) % 8];
}

function clearWindMarkers() {
  windMarkers.forEach(m => map.removeLayer(m));
  windMarkers = [];
}

// ──────────────────────────────────────────────────────
//  CHARTS
// ──────────────────────────────────────────────────────
function renderCharts(data, pts) {
  const labels = data.map((d, i) => `Pt ${i + 1}`);
  const headwinds = data.map((d, i) => {
    const bearing = i < pts.length - 1 ? bearingBetween(pts[i], pts[i + 1]) : (i > 0 ? bearingBetween(pts[i - 1], pts[i]) : 0);
    return windComponent(bearing, d.windDir, d.windSpeed);
  });

  Chart.defaults.font.family = "'DM Mono', monospace";
  Chart.defaults.color = '#64748b';

  makeChart('chart-wind', 'line', labels, [{
    label: 'Vent km/h', data: data.map(d => d.windSpeed),
    borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.15)',
    tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: '#3b82f6'
  }]);

  makeChart('chart-headwind', 'bar', labels, [{
    label: 'Force abs. (km/h)', data: headwinds.map(Math.abs),
    backgroundColor: headwinds.map(v => v > 3 ? '#ef4444' : v < -3 ? '#10b981' : '#f59e0b'),
    borderRadius: 6
  }]);

  makeChart('chart-temp', 'line', labels, [{
    label: '°C', data: data.map(d => d.temp),
    borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.15)',
    tension: 0.4, fill: true, pointRadius: 4
  }]);

  makeChart('chart-precip', 'bar', labels, [{
    label: 'Pluie %', data: data.map(d => d.precip),
    backgroundColor: data.map(d => d.precip > 50 ? '#ef4444' : '#3b82f6'),
    borderRadius: 6
  }]);

  const hasEle = waypoints.some(w => w.ele);
  if (hasEle) {
    const sampleEle = samplePoints(waypoints.filter(w => w.ele), 20);
    const eleLabels = sampleEle.map((_, i) => `${i + 1}`);
    makeChart('chart-elev', 'line', eleLabels, [{
      label: 'Altitude (m)', data: sampleEle.map(w => w.ele),
      borderColor: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.15)',
      tension: 0.3, fill: true, pointRadius: 0
    }]);
    document.getElementById('tab-btn-gradient').style.display = 'block';
  }
}

function makeChart(id, type, labels, datasets) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
  }
  const ctx = document.getElementById(id).getContext('2d');
  chartInstances[id] = new Chart(ctx, {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'DM Mono', size: 12 },
          padding: 10,
          cornerRadius: 8,
          displayColors: false
        }
      },
      scales: {
        x: { grid: { display: false, drawBorder: false } },
        y: {
          grid: { color: 'rgba(203, 213, 225, 0.4)', borderDash: [4, 4], drawBorder: false },
          beginAtZero: true
        }
      }
    }
  });
}

function switchTab(name) {
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  const tabMap = {
    vent: ['tab-vent', 'tab-vent2'],
    temperature: ['tab-temperature', 'tab-temperature2'],
    gradient: ['tab-gradient']
  };
  ['tab-vent', 'tab-vent2', 'tab-temperature', 'tab-temperature2', 'tab-gradient'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  });
  (tabMap[name] || []).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('visible');
  });
}

// ──────────────────────────────────────────────────────
//  UTILS & EXPORT
// ──────────────────────────────────────────────────────
function avg(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

function exportResume() {
  if (!lastWeatherData || !lastWeatherPts) return;
  const dStr = document.getElementById('depart-datetime').value;
  const depart = dStr ? new Date(dStr).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

  let head = 0, tail = 0, cross = 0;
  for (let i = 0; i < lastWeatherData.length; i++) {
    const bearing = i < lastWeatherPts.length - 1 ? bearingBetween(lastWeatherPts[i], lastWeatherPts[i + 1]) : (i > 0 ? bearingBetween(lastWeatherPts[i - 1], lastWeatherPts[i]) : 0);
    const hw = windComponent(bearing, lastWeatherData[i].windDir, lastWeatherData[i].windSpeed);
    if (hw > 3) head++;
    else if (hw < -3) tail++;
    else cross++;
  }
  const total = lastWeatherData.length;
  const pHead = Math.round((head / total) * 100);
  const pTail = Math.round((tail / total) * 100);
  const pCross = Math.round((cross / total) * 100);

  const text = `## 🚴 RoadWind — Résumé météo\n\n` +
    `- **📅 Créneau:** de ${depart} à ${document.getElementById('stat-arrival').textContent}\n` +
    `- **🚴 Vitesse:** ${speedKmh} km/h\n` +
    `- **📏 Distance:** ${document.getElementById('stat-dist').textContent.replace('km','').trim()} km\n` +
    `- **⏱️ Durée estimée:** ${document.getElementById('stat-time').textContent}\n\n` +
    `### 💨 Bilan du vent\n` +
    `- **🔴 Vent de face:** ${pHead}%\n` +
    `- **🟢 Vent de dos:** ${pTail}%\n` +
    `- **🟡 Vent latéral:** ${pCross}%\n\n` +
    `### 📊 Moyennes\n` +
    `- **🌡️ Température:** ${avg(lastWeatherData.map(d=>d.temp)).toFixed(1)} °C\n` +
    `- **💨 Vitesse vent:** ${avg(lastWeatherData.map(d=>d.windSpeed)).toFixed(0)} km/h\n` +
    `- **🌧 Pluie:** ${avg(lastWeatherData.map(d=>d.precip)).toFixed(0)} %`;

  navigator.clipboard.writeText(text).then(() => showToast('📋 Résumé Markdown copié !'));
}

function resetParcours(confirm = true) {
  waypoints = [];
  lastWeatherData = null;
  lastWeatherPts = null;
  if (routePolyline) { map.removeLayer(routePolyline); routePolyline = null; }
  clearWindMarkers();
  updateStats();
  document.getElementById('btn-export').style.display = 'none';
  document.getElementById('wind-legend').style.display = 'none';
  document.getElementById('weather-content').innerHTML = `
    <div class="empty-state">
      <div class="icon">🌤️</div>
      <p>Importez un fichier GPX pour commencer l'analyse.</p>
    </div>`;
  document.getElementById('charts-empty').style.display = 'flex';
  document.getElementById('tab-btn-gradient').style.display = 'none';
  ['tab-vent', 'tab-vent2', 'tab-temperature', 'tab-temperature2', 'tab-gradient'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  });
  setStatus('Prêt', false);
  if (confirm) showToast('🗑️ Parcours effacé');
}

// ──────────────────────────────────────────────────────
//  UI HELPERS
// ──────────────────────────────────────────────────────
function showLoading(show, text = '') {
  const el = document.getElementById('loading');
  if (show) {
    el.classList.remove('hidden');
    if (text) document.getElementById('loading-text').textContent = text;
  } else {
    el.classList.add('hidden');
  }
}

function setStatus(text, isSuccess = false) {
  document.getElementById('status-text').textContent = text;
  document.querySelector('.map-badge .dot').style.background = isSuccess ? 'var(--green)' : 'var(--accent-blue)';
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

document.getElementById('depart-datetime').addEventListener('change', updateStats);
