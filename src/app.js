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
// PROMESA 1: PROMISE BASICA — CARGAR VARIOS POSTS
// ================================================================
// Demuestra el patron basico de una Promise con fetch() y la cadena
// .then()/.catch()/.finally(). Segun el taller (Parte 2.2) carga los
// posts con IDs 1, 3 y 5 usando Promise.allSettled para aislar cada
// fallo por post. Si ninguno tiene exito muestra el aviso global
// "No se pudieron cargar los posts".
function loadSinglePost() {
  const postIds = [1, 3, 5];
  const container = document.getElementById('single-post');
  if (!container) return;

  showLoading('single-post', 'Cargando posts...');

  const requests = postIds.map(id =>
    fetch(`${API}/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Post ${id}: error HTTP ${response.status}`);
        }
        return response.json();
      })
  );

  Promise.allSettled(requests)
    .then(results => {
      const successful = results.filter(result => result.status === 'fulfilled');

      if (successful.length === 0) {
        container.innerHTML = '<p class="text-red-400">No se pudieron cargar los posts</p>';
        return;
      }

      container.innerHTML = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          const post = result.value;
          return `
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-3">
              <h4 class="text-lg font-bold text-emerald-400 mb-2">${sanitizeHTML(post.title)}</h4>
              <p class="text-slate-300 text-sm leading-relaxed">${sanitizeHTML(post.body)}</p>
              <span class="inline-block mt-3 text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                Post ID: ${post.id} | Autor ID: ${post.userId}
              </span>
            </div>`;
        }
        return `<p class="text-red-400 text-sm">Post ID ${postIds[index]}: no se pudo cargar.</p>`;
      }).join('');
    })
    .catch(error => {
      showError('single-post', error.message);
    })
    .finally(() => {
      console.log('[Paso 1] Promesa basica completada: ', postIds.length, 'posts procesados.');
    });
}

// ================================================================
// PROMESA 2: PROMISE + ARRAY — LISTA DE USUARIOS
// ================================================================
// La API devuelve un ARRAY de usuarios. Se usa .map() para transformar
// cada elemento del arreglo en una tarjeta HTML, demostrando el patron
// fetch() -> .then() -> .map() para renderizado de colecciones.
function loadUsersList() {
  const container = document.getElementById('users-list');
  if (!container) return;

  showLoading('users-list', 'Cargando usuarios...');

  fetch(`${API}/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      container.innerHTML = users.map(user => `
        <div class="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ${sanitizeHTML(user.name.charAt(0))}
            </span>
            <div>
              <h4 class="font-bold text-white text-sm">${sanitizeHTML(user.name)}</h4>
              <p class="text-xs text-slate-500">@${sanitizeHTML(user.username)}</p>
            </div>
          </div>
          <div class="space-y-1 text-xs text-slate-400">
            <p>✉️ ${sanitizeHTML(user.email)}</p>
            <p>🏢 ${sanitizeHTML(user.company.name)}</p>
            <p>📍 ${sanitizeHTML(user.address.city)}</p>
            <p>🌐 ${sanitizeHTML(user.website)}</p>
          </div>
        </div>
      `).join('');
    })
    .catch(error => {
      showError('users-list', error.message);
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