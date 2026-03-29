/* ============================================================ */
/*  SCRIPTS PARTAGÉS - ECTA Saint-Alban                        */
/* ============================================================ */

// --- COMPTEUR PROCHAINE SORTIE ------------------------------------------------
function initCountdown() {
  const el = document.getElementById('agendaCountdown');
  if (!el) return;
  const day = new Date().getDay();
  const j = (7 - day) % 7 || 7;
  if (j === 0) {
    el.innerHTML = `<div class="cd-num">🚴</div><div class="cd-divider"></div><div class="cd-label">Sortie<br/>aujourd'hui !</div>`;
  } else {
    el.innerHTML = `<div class="cd-num">${j}</div><div class="cd-divider"></div><div class="cd-label">Jour${j>1?'s':''}<br/>avant la sortie</div>`;
  }
}

// --- ANNÉE FOOTER ---------------------------------------------------------------------
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = '© ' + new Date().getFullYear() + ' Entente Cyclotouriste Albanaise · Saint-Alban 22';
}

// --- MENU BURGER ----------------------------------------------------------------------
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMenu()  { document.getElementById('mobileMenu').classList.remove('open'); }

document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.burger');
  if (menu && burger) {
    if (!menu.contains(e.target) && !burger.contains(e.target)) menu.classList.remove('open');
  }
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 1024) closeMenu();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});

// --- LOGIQUE SPÉCIALE : MENU AUTO (OUVRIR AU BAS / FERMER AU SCROLL UP) ---
// Désactivée à la demande : le menu burger ne s'ouvre plus automatiquement au scroll.

// --- INITIALISATION COMMUNE ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFooterYear();
  
  // Rendu automatique si les éléments sont présents dans le DOM
  if (document.getElementById('albumsGrid')) renderGalerie();
  if (document.getElementById('actuGrid'))   renderActu();
  if (document.getElementById('agendaList')) {
    if (typeof loadMeteo === 'function') loadMeteo();
    if (typeof renderAgenda === 'function') renderAgenda();
  }
  
  // Cookie banner
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.transform = 'translateY(0)';
    setTimeout(() => {
      banner.style.transform = 'translateY(100%)';
    }, 4000);
  }
});


/* --- MÉTÉO (Open-Meteo) --- */
const JOURS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const WMO = {
  0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',
  51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',
  71:'🌨',73:'🌨',75:'❄️',80:'🌦',81:'🌧',82:'⛈️',
  95:'⛈️',96:'⛈️',99:'⛈️'
};
function wmoIcon(code){ return WMO[code] || '🌡'; }
async function loadMeteo(){
  const el = document.getElementById('meteoDays');
  if (!el) return;
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.5554&longitude=-2.5384&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=Europe%2FParis&forecast_days=7';
    const r = await fetch(url);
    const d = await r.json();
    const { time, weathercode, temperature_2m_max, temperature_2m_min, precipitation_probability_max, windspeed_10m_max } = d.daily;

    const cibles = [];
    for (let i = 0; i < time.length && cibles.length < 2; i++) {
      const jour = new Date(time[i]).getDay();
      if (jour === 4 || jour === 0) cibles.push(i);
    }

    el.innerHTML = cibles.map(i => {
      const date = new Date(time[i]);
      const jour = JOURS[date.getDay()];
      const isD = date.getDay() === 0;
      const isJ = date.getDay() === 4;
      return `<div class="meteo-day${isD?' is-sunday':''}">
        <div class="m-label">${jour}${isD?' 🚴':isJ?' 🚴':''}</div>
        <div class="m-icon">${wmoIcon(weathercode[i])}</div>
        <div class="m-temps">${Math.round(temperature_2m_max[i])}° / ${Math.round(temperature_2m_min[i])}°</div>
        <div class="m-pluie">💧 ${precipitation_probability_max[i]}%</div>
        <div class="m-vent">💨 ${Math.round(windspeed_10m_max[i])} km/h</div>
      </div>`;
    }).join('');
  } catch(e){
    el.innerHTML = '<span style="color:var(--gris);font-size:.85rem;">Météo temporairement indisponible.</span>';
  }
}

/* --- ACTUALITÉS --- */
const FALLBACK_SVG = `<div style="width:100%;height:110px;overflow:hidden;position:relative;background:#e8e0d8;border-bottom:1px solid #ddd;"> <svg viewBox="0 0 320 110" xmlns='http://www.w3.org/2000/svg' style="width:100%;height:100%;position:absolute;top:0;left:0;"> <rect width="320" height="110" fill="#ede8df"/> <rect x="0" y="0" width="90" height="48" rx="0" fill="#d4e8c2"/> <rect x="230" y="62" width="90" height="48" rx="0" fill="#d4e8c2"/> <rect x="150" y="0" width="60" height="30" rx="0" fill="#c8ddb0"/> <rect x="98" y="52" width="14" height="10" fill="#ccc4b8"/> <rect x="116" y="55" width="10" height="8" fill="#ccc4b8"/> <rect x="190" y="20" width="12" height="9" fill="#ccc4b8"/> <rect x="206" y="22" width="9" height="7" fill="#ccc4b8"/> <rect x="255" y="40" width="11" height="8" fill="#ccc4b8"/> <rect x="0" y="48" width="320" height="14" fill="#ffffff" opacity=".9"/> <line x1="0" y1="55" x2="320" y2="55" stroke="#f5f0e8" stroke-width=".5"/> <rect x="130" y="0" width="14" height="110" fill="#ffffff" opacity=".9"/> <line x1="137" y1="0" x2="137" y2="110" stroke="#f5f0e8" stroke-width=".5"/> <rect x="0" y="22" width="320" height="6" fill="#f8f4ee" opacity=".85"/> <rect x="0" y="80" width="320" height="6" fill="#f8f4ee" opacity=".85"/> <rect x="65" y="0" width="6" height="110" fill="#f8f4ee" opacity=".85"/> <rect x="210" y="0" width="6" height="110" fill="#f8f4ee" opacity=".85"/> <path d="M 0,55 L 130,55 L 137,48 L 137,22 L 210,22 L 213,22 L 213,55 L 320,55" fill="none" stroke="#e8357a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/> <circle cx="65" cy="55" r="3" fill="#e8357a" opacity=".7"/> <circle cx="137" cy="25" r="3" fill="#e8357a" opacity=".7"/> <circle cx="213" cy="55" r="3" fill="#e8357a" opacity=".7"/> <ellipse cx="137" cy="60" rx="6" ry="3" fill="rgba(232,53,122,.25)"/> <path d="M 137,48 Q 143,42 143,37 A 6,6 0 1 0 131,37 Q 131,42 137,48 Z" fill="#e8357a"/> <circle cx="137" cy="37" r="2.5" fill="white"/> <rect x="146" y="32" width="52" height="13" rx="3" fill="white" opacity=".9"/> <text x="172" y="42" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="700" fill="#333">Saint-Alban</text> <circle cx="298" cy="16" r="9" fill="white" opacity=".8"/> <text x="298" y="13" text-anchor="middle" font-family="sans-serif" font-size="7" font-weight="700" fill="#e8357a">N</text> <line x1="298" y1="14" x2="298" y2="8" stroke="#e8357a" stroke-width="1.2"/> <line x1="298" y1="14" x2="298" y2="20" stroke="#999" stroke-width="1"/> <line x1="295" y1="17" x2="301" y2="17" stroke="#999" stroke-width="1"/> </svg> <div style="position:absolute;bottom:7px;left:50%;transform:translateX(-50%);background:white;border-radius:2rem;padding:.2rem .85rem;box-shadow:0 2px 8px rgba(232,53,122,.25);font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:700;color:#e8357a;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;">🗺 Circuit du dimanche</div></div>`;

function renderActu() {
  const grid = document.getElementById('actuGrid');
  if (!grid) return;
  grid.innerHTML = ECTA_DATA.actualites.map(a => `
    <div class="actu-card">
      <div class="actu-card-top"></div>
      ${a.image ? `<img class="actu-card-img" src="${a.image}" alt="${a.titre}" onerror="this.outerHTML='${FALLBACK_SVG}'"/>` : FALLBACK_SVG}
      <div class="actu-card-body">
        <div class="actu-date">📅 ${a.date}</div>
        <h3>${a.titre}</h3>
        <p>${a.texte}</p>
        <span class="actu-tag">${a.tag}</span>
      </div>
    </div>
  `).join('');
}

/* --- AGENDA --- */
let circuitsDeblocked = sessionStorage.getItem('ecta_unlocked') === '1';

function renderAgenda() {
  const list = document.getElementById('agendaList');
  if (!list) return;
  list.innerHTML = ECTA_DATA.agenda.map((s, i) => {
    const parcours = s.parcours || [{ distance: s.distance, lien: s.lien }];
    const distBadges = parcours.map(p => `<span class="badge-dist">🚴 ${p.distance}</span>`).join(' ');
    const hasLien = parcours.some(p => p.lien);
    return `
      <div class="agenda-item" id="ag${i}">
        <div class="agenda-item-header" onclick="toggleAgenda(${i})">
          <div class="agenda-meta">
            <span class="agenda-date">${s.date}</span>
            <span class="agenda-titre">${s.titre}</span>
          </div>
          <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">
            ${distBadges}
            ${(hasLien || s.locked) ? '🔒' : ''}
            <span class="agenda-toggle">▼</span>
          </div>
        </div>
        <div class="agenda-body">
          ${s.videos ? `<div class="video-grid">${s.videos.map(v => `<div class="video-container"><iframe src="${v}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`).join('')}</div>` : ''}
          <div id="circuit${i}">${renderCircuit(s, i)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCircuit(sortie, i) {
  const parcours = sortie.parcours || [{ distance: sortie.distance, lien: sortie.lien }];
  const hasLien = parcours.some(p => p.lien);
  if (!hasLien && !sortie.locked) return `<div style="background:var(--gris-clair);border-radius:var(--radius);padding:1.5rem;text-align:center;color:var(--gris);margin-top:1rem;">🗺 Circuit Openrunner à venir - revenez bientôt !</div>`;
  if (circuitsDeblocked) return circuitUnlocked(sortie);
  return circuitLocked(i);
}

function circuitLocked(i) {
  return `<div class="circuit-lock">
    <div class="lock-icon">🔒</div>
    <h4>Circuit réservé aux licenciés</h4>
    <p>Saisissez le mot de passe communiqué par le club pour accéder au circuit.</p>
    <div class="lock-form">
      <input class="lock-input" type="password" placeholder="Mot de passe..." id="pwd${i}" onkeydown="if(event.key==='Enter') checkPwd(${i})" />
      <button class="lock-btn" onclick="checkPwd(${i})">Accéder 🚴</button>
    </div>
    <div class="lock-error" id="err${i}">❌ Mot de passe incorrect</div>
  </div>`;
}

function circuitUnlocked(sortie) {
  const parcours = sortie.parcours || [{ distance: sortie.distance, lien: sortie.lien }];
  const liens = parcours.filter(p => p.lien).map(p =>
    `<a class="circuit-link" href="${p.lien}" target="_blank">🗺 Circuit ${p.distance} sur Openrunner</a>`
  ).join('<br/>');
  const contenu = liens || `<p style="color:var(--gris);font-size:.9rem;">🗺 Circuit Openrunner à venir - revenez bientôt !</p>`;
  return `<div class="circuit-unlocked">
    <span class="circuit-unlocked-badge">✅ Accès licencié</span>
    <br/>
    <div style="display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-top:1rem;">
      ${contenu}
    </div>
    <button class="lock-logout-btn" onclick="lockCircuits()">Se déconnecter</button>
  </div>`;
}

function toggleAgenda(i) {
  document.getElementById(`ag${i}`).classList.toggle('open');
}

function checkPwd(i) {
  const input = document.getElementById(`pwd${i}`).value;
  if (btoa(input) === ECTA_DATA.motDePasse) {
    circuitsDeblocked = true;
    sessionStorage.setItem('ecta_unlocked', '1');
    renderAgenda();
  } else {
    document.getElementById(`err${i}`).style.display = 'block';
  }
}

function lockCircuits() {
  circuitsDeblocked = false;
  sessionStorage.removeItem('ecta_unlocked');
  renderAgenda();
}

/* --- GALERIE --- */
let currentAlbum = null;
let currentPhotoIndex = 0;
let diaporamaInterval = null;

function renderGalerie() {
  const grid = document.getElementById('albumsGrid');
  if (!grid) return;
  grid.innerHTML = ECTA_DATA.galerie.map((album, i) => `
    <div class="album-card" onclick="openAlbum(${i})">
      <div class="album-cover">
        <img src="${album.couverture}" alt="${album.titre}">
        <div class="album-count">${album.photos.length} photos</div>
      </div>
      <div class="album-title">${album.titre}</div>
    </div>
  `).join('');
}

function openAlbum(i) {
  currentAlbum = ECTA_DATA.galerie[i];
  currentPhotoIndex = 0;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  
  // Arrêt du diaporama si on ferme
  if (diaporamaInterval) {
    clearInterval(diaporamaInterval);
    diaporamaInterval = null;
    const icon = document.getElementById('diaporamaIcon');
    if(icon) icon.textContent = '▶️';
  }
}

function toggleDiaporama() {
  const icon = document.getElementById('diaporamaIcon');
  if (diaporamaInterval) {
    // Mode Pause
    clearInterval(diaporamaInterval);
    diaporamaInterval = null;
    icon.textContent = '▶️';
  } else {
    // Mode Lecture
    diaporamaInterval = setInterval(() => {
      lightboxNav(1);
    }, 2500); // Change la photo toutes les 2.5 secondes
    icon.textContent = '⏸️';
  }
}

function updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const title = document.getElementById('lightboxTitle');
  const thumbs = document.getElementById('lightboxThumbs');

  title.textContent = currentAlbum.titre;
  img.src = currentAlbum.photos[currentPhotoIndex];
  counter.textContent = `${currentPhotoIndex + 1} / ${currentAlbum.photos.length}`;

  thumbs.innerHTML = currentAlbum.photos.map((p, i) => `
    <img class="lightbox-thumb ${i === currentPhotoIndex ? 'active' : ''}" 
         src="${p}" onclick="currentPhotoIndex=${i};updateLightbox();">
  `).join('');
  
  const activeThumb = thumbs.querySelector('.active');
  if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function lightboxNav(dir) {
  currentPhotoIndex = (currentPhotoIndex + dir + currentAlbum.photos.length) % currentAlbum.photos.length;
  updateLightbox();
}
