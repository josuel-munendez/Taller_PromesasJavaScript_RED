/**
 * ================================================================
 * SPA TUTORIAL: PROMESAS + API GRATUITA + TAILWIND CSS LOCAL
 * ================================================================
 *
 * Estructura SPA con navegacion por hash (#page)
 * Secciones: 7 patrones de Promesas + Videos + Reportes + Geolocalizacion
 *
 * API usada: JSONPlaceholder (https://jsonplaceholder.typicode.com/)
 * ================================================================
 */

const API = 'https://jsonplaceholder.typicode.com';

const PAGES = {
  home: 'Inicio',
  'promise-basica': 'Promise básica',
  'promise-array': 'Promise + array',
  'promise-all': 'Promise.all',
  'promise-allsettled': 'Promise.allSettled',
  'promise-race': 'Promise.race',
  'promise-any': 'Promise.any',
  'maquina-estados': 'Máquina de Estados',
  videos: 'Videos',
  reportes: 'Reportes',
  geolocalizacion: 'Geolocalización'
};

// ================================================================
// UTILIDADES
// ================================================================

function sanitizeHTML(raw) {
  if (typeof raw !== 'string') return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  return raw.replace(/[&<>"']/g, match => map[match]);
}

function showLoading(containerId, message = 'Cargando...') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<p class="text-slate-500">${sanitizeHTML(message)}</p>`;
}

function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<p class="text-red-400">Error: ${sanitizeHTML(message)}</p>`;
}

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  return hash;
}

function navigateTo(page) {
  window.location.hash = page;
}

function updateNavActive() {
  const currentPage = getPageFromHash();
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === currentPage) {
      link.classList.add('bg-slate-800', 'text-emerald-400');
      link.classList.remove('text-slate-400');
    } else {
      link.classList.remove('bg-slate-800', 'text-emerald-400');
      link.classList.add('text-slate-400');
    }
  });
}

function updatePageTitle() {
  const currentPage = getPageFromHash();
  const title = PAGES[currentPage] || currentPage;
  const titleEl = document.getElementById('page-title');
  if (titleEl) {
    titleEl.textContent = title;
  }
}

function showPage(pageName) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.add('hidden');
  });
  const target = document.getElementById(`page-${pageName}`);
  if (target) {
    target.classList.remove('hidden');
  }
  updateNavActive();
  updatePageTitle();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================================================
// RUTAS SPA
// ================================================================

function handleRoute() {
  const page = getPageFromHash();
  if (!PAGES[page]) {
    navigateTo('home');
    return;
  }
  showPage(page);
  loadPageData(page);
}

function loadPageData(page) {
  switch (page) {
    case 'promise-basica': loadSinglePost(); break;
    case 'promise-array': loadUsersList(); break;
    case 'promise-all': loadCombinedData(); break;
    case 'promise-allsettled': loadSettledPosts(); break;
    case 'promise-race': loadRaceResult(); break;
    case 'promise-any': loadAnyResult(); break;
    case 'maquina-estados': initSearchIfNeeded(); break;
    case 'videos': break;
    case 'reportes': break;
    case 'geolocalizacion': break;
    default: break;
  }
}


// ================================================================
// PROMESA 5: PROMISE.RACE — CARRERA API vs TEMPORIZADOR
// ================================================================
// Promise.race([.]) resuelve/rechaza con la PRIMERA promesa que
// llegue a un estado final. Aqui competimos la peticion a la API
// contra un temporizador de 2 segundos: si gana el temporizador,
// lanzamos un error de timeout para demostrar el rechazo.
function loadRaceResult() {
  const container = document.getElementById('race-result');
  if (!container) return;

  showLoading('race-result', 'Esperando resultado de la carrera...');

  const apiRequest = fetch(`${API}/posts/1`)
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      return response.json();
    });

  // Temporizador de 2 segundos que SIEMPRE rechaza (timeout).
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('⏱ ¡Ganó el temporizador! La API tardó más de 2 segundos.')), 2000);
  });

  Promise.race([apiRequest, timeout])
    .then(post => {
      container.innerHTML = `
        <span class="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-2 inline-block">✔ Ganó la API</span>
        <h3 class="text-lg font-bold text-emerald-400 mb-1">${sanitizeHTML(post.title)}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${sanitizeHTML(post.body)}</p>`;
    })
    .catch(error => {
      container.innerHTML = `<p class="text-red-400">${sanitizeHTML(error.message)}</p>`;
    })
    .finally(() => {
      console.log('[Paso 5] Carrera finalizada.');
    });
}


// ================================================================
// REPORTES
// ================================================================

let currentReportData = null;

function initReports() {
  const genUsersBtn = document.getElementById('gen-report-users');
  const genPostsBtn = document.getElementById('gen-report-posts');
  const genCombinedBtn = document.getElementById('gen-report-combined');
  const downloadBtn = document.getElementById('download-report');
  const printBtn = document.getElementById('print-report');
  const previewEl = document.getElementById('report-preview');

  if (!genUsersBtn) return;

  function renderReport(title, lines) {
    const timestamp = new Date().toISOString();
    const report = [
      `========================================`,
      `  REPORTE: ${title}`,
      `  Generado: ${timestamp}`,
      `========================================`,
      ``,
      ...lines,
      ``,
      `========================================`,
      `  Fin del reporte`,
      `========================================`
    ].join('\n');

    currentReportData = report;
    previewEl.textContent = report;
    downloadBtn.classList.remove('hidden');
    printBtn.classList.remove('hidden');
  }

  genUsersBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API}/users?_limit=5`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const users = await response.json();

      const lines = users.map((u, i) => [
        `Usuario #${i + 1}:`,
        `  Nombre:     ${u.name}`,
        `  Username:   ${u.username}`,
        `  Email:      ${u.email}`,
        `  Telefono:   ${u.phone}`,
        `  Empresa:    ${u.company.name}`,
        `  Ciudad:     ${u.address.city}`,
        `  Website:    ${u.website}`,
        ``
      ].join('\n')).join('');

      renderReport('Reporte de Usuarios', lines.split('\n'));
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  genPostsBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API}/posts?_limit=10`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const posts = await response.json();

      const lines = posts.map(p => [
        `Post #${p.id}:`,
        `  Titulo: ${p.title}`,
        `  Body: ${p.body.substring(0, 80)}...`,
        `  Autor ID: ${p.userId}`,
        ``
      ].join('\n')).join('');

      renderReport('Reporte de Posts', lines.split('\n'));
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  genCombinedBtn.addEventListener('click', async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch(`${API}/users?_limit=5`),
        fetch(`${API}/posts?_limit=5`)
      ]);
      if (!usersRes.ok || !postsRes.ok) throw new Error('Error al obtener datos');

      const users = await usersRes.json();
      const posts = await postsRes.json();

      const lines = [
        `=== COMBINADO ===`,
        ``,
        `--- Usuarios (${users.length}) ---`,
        ...users.map(u => `  ${u.name} (${u.username}) - ${u.email}`),
        ``,
        `--- Posts (${posts.length}) ---`,
        ...posts.map(p => `  Post #${p.id}: "${p.title.substring(0, 50)}..." (Usuario ${p.userId})`),
        ``,
        `--- Resumen ---`,
        `  Total usuarios: ${users.length}`,
        `  Total posts: ${posts.length}`,
        `  Posts por usuario (promedio): ${(posts.length / users.length).toFixed(1)}`
      ];

      renderReport('Reporte Combinado', lines);
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!currentReportData) return;
    const blob = new Blob([currentReportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// ================================================================
// GEOLOCALIZACION
// ================================================================

function initGeolocation() {
  const getLocationBtn = document.getElementById('get-location');
  const geoInfo = document.getElementById('geo-info');
  const geoError = document.getElementById('geo-error');
  const mapFrame = document.getElementById('map-frame');

  if (!getLocationBtn) return;

  getLocationBtn.addEventListener('click', async () => {
    geoError.classList.add('hidden');
    geoInfo.innerHTML = `<p class="text-yellow-400">Obteniendo ubicación...</p>`;

    if (!navigator.geolocation) {
      geoError.classList.remove('hidden');
      geoError.textContent = '❌ Tu navegador no soporta geolocalización.';
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'denied') {
          geoError.classList.remove('hidden');
          geoError.textContent = '❌ Permiso de ubicación denegado. Haz clic en el ícono de candado 🔒 en la barra de direcciones, selecciona "Sitio no seguro" o "Información del sitio", luego activa "Ubicación" y recarga la página.';
          return;
        }
      } catch (e) {
        // Si el navegador no soporta permissions.query, continuamos de todos modos
      }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const { timestamp } = position;

        geoInfo.innerHTML = `
          <div class="space-y-1">
            <p><strong>Latitud:</strong> <span class="text-emerald-400">${latitude.toFixed(6)}</span></p>
            <p><strong>Longitud:</strong> <span class="text-emerald-400">${longitude.toFixed(6)}</span></p>
            <p><strong>Precisión:</strong> ±${accuracy.toFixed(1)} metros</p>
            <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
        `;

        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
        mapFrame.src = mapUrl;
      },
      (error) => {
        geoInfo.innerHTML = '';
        geoError.classList.remove('hidden');

        switch (error.code) {
          case error.PERMISSION_DENIED:
            geoError.textContent = '❌ Permiso de ubicación denegado. Haz clic en el ícono de candado 🔒 en la barra de direcciones, selecciona "Sitio no seguro" o "Información del sitio", luego activa "Ubicación" y recarga la página.';
            break;
          case error.POSITION_UNAVAILABLE:
            geoError.textContent = '❌ Ubicación no disponible. Verifica que tu dispositivo tenga GPS o conexión a red.';
            break;
          case error.TIMEOUT:
            geoError.textContent = '❌ La solicitud de ubicación expiró. Inténtalo de nuevo.';
            break;
          default:
            geoError.textContent = `❌ Error desconocido: ${error.message}`;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

// ================================================================
// SIDEBAR Y NAVEGACION
// ================================================================

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const mainContent = document.getElementById('main-content');

  function isMobile() {
    return window.matchMedia('(max-width: 1023px)').matches;
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    if (isMobile()) {
      overlay.classList.add('hidden');
    }
    if (!isMobile() && mainContent) {
      mainContent.classList.remove('ml-64');
    }
  }

  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    if (isMobile()) {
      overlay.classList.remove('hidden');
    }
    if (!isMobile() && mainContent) {
      mainContent.classList.add('ml-64');
    }
  }

  function handleBreakpointChange() {
    if (isMobile()) {
      closeSidebar();
    } else {
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.add('hidden');
      if (mainContent) {
        mainContent.classList.add('ml-64');
      }
    }
  }

  const mql = window.matchMedia('(max-width: 1023px)');

  function handleBreakpointChangeDebounced() {
    clearTimeout(handleBreakpointChange.timer);
    handleBreakpointChange.timer = setTimeout(handleBreakpointChange, 50);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !sidebar.classList.contains('-translate-x-full');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
      if (isMobile()) {
        closeSidebar();
      }
    });
  });

  window.addEventListener('hashchange', handleRoute);
  mql.addEventListener('change', handleBreakpointChangeDebounced);
  handleBreakpointChange();
}

// ================================================================
// INICIALIZACION
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('[App] DOM listo. Iniciando SPA...');

  initSidebar();
  initVideos();
  initReports();
  initGeolocation();
  initSearchIfNeeded();

  handleRoute();
});