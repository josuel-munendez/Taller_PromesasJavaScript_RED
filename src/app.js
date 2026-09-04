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
  geolocalizacion: 'Geolocalización',
  contacto: 'Contacto',
  dashboard: 'Dashboard'
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
    case 'contacto': loadContactData(); break;
    case 'dashboard': initDashboard(); break;
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
// PROMESA 3: PROMISE.ALL — POST + AUTOR + COMENTARIOS
// ================================================================
// Dispara 3 peticiones en paralelo con Promise.all([fetch, fetch, fetch]).
// Es ATOMICO: todo o nada. Si cualquiera falla, el .catch() cancela el
// resultado completo, por eso aqui se valida cada response.
function loadCombinedData() {
  const container = document.getElementById('combined-data');
  if (!container) return;

  showLoading('combined-data', 'Cargando datos combinados...');

  const postId = 1;

  Promise.all([
    fetch(`${API}/posts/${postId}`),
    fetch(`${API}/users/${postId}`),
    fetch(`${API}/posts/${postId}/comments`)
  ])
    .then(([postRes, userRes, commentsRes]) => {
      if (!postRes.ok || !userRes.ok || !commentsRes.ok) {
        throw new Error('Alguna solicitud fallo (HTTP no 2xx)');
      }
      return Promise.all([postRes.json(), userRes.json(), commentsRes.json()]);
    })
    .then(([post, author, comments]) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-bold text-emerald-400 mb-1">${sanitizeHTML(post.title)}</h3>
            <p class="text-slate-300 text-sm leading-relaxed">${sanitizeHTML(post.body)}</p>
          </div>
          <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 class="text-sm font-bold text-white mb-2">👤 Autor</h4>
            <p class="text-slate-300 text-sm">${sanitizeHTML(author.name)} — <span class="text-slate-500">@${sanitizeHTML(author.username)}</span></p>
            <p class="text-slate-500 text-xs mt-1">${sanitizeHTML(author.email)}</p>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white mb-2">💬 Comentarios (${comments.length})</h4>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${comments.map(comment => `
                <div class="bg-slate-800/40 rounded-lg p-3 border border-slate-800">
                  <p class="text-xs font-semibold text-emerald-400">${sanitizeHTML(comment.name)}</p>
                  <p class="text-slate-400 text-sm">${sanitizeHTML(comment.body)}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`;
    })
    .catch(error => {
      showError('combined-data', `Promise.all fallo (todo o nada): ${error.message}`);
    });
}

// ================================================================
// PROMESA 4: PROMISE.ALLSETTLED — 5 POSTS INDEPENDIENTES
// ================================================================
// Promise.allSettled NUNCA rechaza: espera a que cada peticion llegue a
// un estado final y devuelve un arreglo con 'fulfilled' o 'rejected'.
// Por eso aislar el fallo de un post no detiene el renderizado de los demas.
function loadSettledPosts() {
  const container = document.getElementById('settled-posts');
  if (!container) return;

  showLoading('settled-posts', 'Cargando posts...');

  const postIds = [1, 2, 3, 4, 5];

  const requests = postIds.map(id =>
    fetch(`${API}/posts/${id}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
  );

  Promise.allSettled(requests)
    .then(results => {
      container.innerHTML = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          const post = result.value;
          return `
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all">
              <span class="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-2 inline-block">✔ cargo</span>
              <h4 class="font-bold text-white text-sm mb-1">${sanitizeHTML(post.title)}</h4>
              <p class="text-slate-400 text-xs">${sanitizeHTML(post.body.substring(0, 80))}...</p>
            </div>`;
        }
        return `
          <div class="bg-red-950/30 rounded-xl p-4 border border-red-800/60">
            <span class="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded mb-2 inline-block">✖ fallo</span>
            <p class="text-red-400 text-sm">Post ID ${postIds[index]}</p>
            <p class="text-red-500/70 text-xs mt-1">${sanitizeHTML(result.reason.message)}</p>
          </div>`;
      }).join('');
    })
    .catch(error => {
      showError('settled-posts', error.message);
    });
}

// ================================================================
// PAGINA CONTACTO — LISTA DE CONTACTOS DESDE LA API
// ================================================================
// Carga los usuarios de la API y los muestra como fichas de contacto
// (nombre, empresa, telefono, correo y ciudad). Usa el mismo patron
// fetch() -> .then() -> .map() que la lista de usuarios.
function loadContactData() {
  const container = document.getElementById('contact-list');
  if (!container) return;

  showLoading('contact-list', 'Cargando contactos...');

  fetch(`${API}/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      const cards = users.map(user => `
        <div class="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              ${sanitizeHTML(user.name.charAt(0))}
            </span>
            <div>
              <h4 class="font-bold text-white text-sm">${sanitizeHTML(user.name)}</h4>
              <p class="text-xs text-slate-500">${sanitizeHTML(user.company.name)}</p>
            </div>
          </div>
          <div class="space-y-1 text-xs text-slate-400">
            <p>📞 ${sanitizeHTML(user.phone)}</p>
            <p>✉️ ${sanitizeHTML(user.email)}</p>
            <p>📍 ${sanitizeHTML(user.address.city)}, ${sanitizeHTML(user.address.zipcode)}</p>
          </div>
        </div>
      `).join('');

      container.innerHTML = cards;
      const counter = document.getElementById('contact-count');
      if (counter) {
        counter.textContent = `${users.length} contactos cargados`;
      }
    })
    .catch(error => {
      showError('contact-list', error.message);
    })
    .finally(() => {
      console.log('[Contacto] Carga de contactos finalizada.');
    });
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
// PROMESA 6: PROMISE.ANY — EL PRIMER ÉXITO IMPORTA
// ================================================================
// Promise.any([.]) espera la PRIMERA promesa que se cumpla (fulfilled).
// Solo rechaza si TODAS fallan (error AggregateError). Aqui intentamos
// 3 endpoints y nos quedamos con el primero que responda con exito.
function loadAnyResult() {
  const container = document.getElementById('any-result');
  if (!container) return;

  showLoading('any-result', 'Buscando el primer éxito...');

  const attempts = [
    fetch(`${API}/posts/1`),
    fetch(`${API}/posts/2`),
    fetch(`${API}/posts/3`)
  ].map(promise => promise.then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }));

  Promise.any(attempts)
    .then(post => {
      container.innerHTML = `
        <span class="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-2 inline-block">🥇 Primer éxito</span>
        <h3 class="text-lg font-bold text-emerald-400 mb-1">Post #${post.id}: ${sanitizeHTML(post.title)}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${sanitizeHTML(post.body)}</p>`;
    })
    .catch(error => {
      // Promise.any rechaza con AggregateError si TODAS fallan.
      container.innerHTML = `
        <p class="text-red-400">Todas las opciones fallaron.</p>
        <p class="text-red-500/70 text-sm mt-1">${sanitizeHTML(error.message)}</p>`;
    })
    .finally(() => {
      console.log('[Paso 6] Búsqueda del primer éxito finalizada.');
    });
}

// ================================================================
// PROMESA 7: MÁQUINA DE ESTADOS — BUSCADOR DE POSTS POR USUARIO
// ================================================================
// UI reactiva guiada por una maquina de estados con 4 estados:
// IDLE (reposo) → PENDING (buscando) → FULFILLED (exito) / REJECTED (error).
// Object.freeze impide mutar accidentalmente los estados definidos.
const UI_STATE = Object.freeze({
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
});

function initSearchIfNeeded() {
  const input = document.getElementById('user-id-input');
  const button = document.getElementById('search-btn');
  const statusEl = document.getElementById('search-status');
  const resultsEl = document.getElementById('search-results');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (!input || !button) return; // la seccion de maquina de estados no esta presente

  let state = UI_STATE.IDLE;

  function setUI(nextState, statusMessage) {
    state = nextState;
    if (statusEl) {
      statusEl.classList.remove('hidden');
      const styles = {
        [UI_STATE.PENDING]: 'bg-yellow-950/40 border border-yellow-800/60 text-yellow-400',
        [UI_STATE.FULFILLED]: 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-400',
        [UI_STATE.REJECTED]: 'bg-red-950/40 border border-red-800/60 text-red-400',
        [UI_STATE.IDLE]: 'bg-slate-800/50 border border-slate-700 text-slate-400'
      };
      statusEl.className = `rounded-lg p-3 text-sm font-medium mb-3 ${styles[nextState]}`;
      statusEl.textContent = statusMessage;
    }
    // Bloquea el boton mientras buscamos (PENDING)
    const isBusy = nextState === UI_STATE.PENDING;
    button.disabled = isBusy;
    btnText.textContent = isBusy ? 'Buscando...' : 'Buscar';
    btnSpinner.classList.toggle('hidden', !isBusy);
  }

  function searchPosts() {
    const userId = Number(input.value);
    if (!Number.isInteger(userId) || userId < 1 || userId > 10) {
      setUI(UI_STATE.REJECTED, '⚠ ID inválido. Usa un número entre 1 y 10.');
      return;
    }

    setUI(UI_STATE.PENDING, 'Buscando posts del usuario...');

    fetch(`${API}/users/${userId}/posts`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(posts => {
        if (posts.length === 0) {
          setUI(UI_STATE.FULFILLED, 'El usuario no tiene posts publicados.');
        } else {
          setUI(UI_STATE.FULFILLED, `✔ Se encontraron ${posts.length} posts.`);
        }
        resultsEl.innerHTML = posts.map(post => `
          <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-800">
            <p class="text-sm font-semibold text-emerald-400">#${post.id} ${sanitizeHTML(post.title)}</p>
            <p class="text-xs text-slate-400">${sanitizeHTML(post.body.substring(0, 100))}...</p>
          </div>
        `).join('');
      })
      .catch(error => {
        setUI(UI_STATE.REJECTED, `✖ Error: ${error.message}`);
        resultsEl.innerHTML = '';
      });
  }

  button.addEventListener('click', searchPosts);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') searchPosts();
  });
}

// ================================================================
// VIDEOS
// ================================================================
// initVideos se implementa en app.js; la seccion HTML ya esta en index.html.
// Accede a la camara con navigator.mediaDevices.getUserMedia() que devuelve
// una Promise, captura frames con canvas.toDataURL('image/png') y detiene
// la transmision deteniendo cada track del stream (mediaStream.getTracks()).
function initVideos() {
  const video = document.getElementById('video-preview');
  const startBtn = document.getElementById('start-camera');
  const stopBtn = document.getElementById('stop-camera');
  const captureBtn = document.getElementById('capture-photo');
  const canvas = document.getElementById('photo-canvas');
  const photoStatus = document.getElementById('photo-status');
  const info = document.getElementById('video-info');

  if (!video || !startBtn) return;

  let stream = null;

  async function startCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Tu navegador no soporta acceso a cámara');
      }
      stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false });
      video.srcObject = stream;
      startBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
      captureBtn.classList.remove('hidden');
      photoStatus.textContent = 'Cámara activa. Haz clic en "Capturar foto".';
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      info.innerHTML = `
        <p>Resolución: ${settings.width}×${settings.height}</p>
        <p>Velocidad: ${(settings.frameRate || 0).toFixed(0)} fps</p>`;
    } catch (error) {
      photoStatus.innerHTML = `<p class="text-red-400">Error al iniciar cámara: ${sanitizeHTML(error.message)}</p>`;
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
    video.srcObject = null;
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    captureBtn.classList.add('hidden');
    photoStatus.textContent = 'Cámara detenida.';
  }

  function capturePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.classList.remove('hidden');
    photoStatus.innerHTML = `
      <p class="text-emerald-400 mb-2">✔ Foto capturada</p>
      <img src="${canvas.toDataURL('image/png')}" class="rounded-lg border border-slate-700" alt="Foto capturada">`;
  }

  startBtn.addEventListener('click', startCamera);
  stopBtn.addEventListener('click', stopCamera);
  captureBtn.addEventListener('click', capturePhoto);
}

// ================================================================
// PROMESA 8 (TALLER PARTE 3.2): USUARIO + TODOS — timeout con race
// ================================================================
// Obtiene un usuario y sus todos, los combina y muestra un resumen.
// Implementa un timeout de 3 segundos usando Promise.race() de forma que
// si la API tarda mas, se muestra un aviso de tiempo agotado.
function loadUserWithTodos() {
  const input = document.getElementById('utd-user-id');
  const button = document.getElementById('utd-load-btn');
  const resultsEl = document.getElementById('utd-result');

  if (!input || !button || !resultsEl) return;

  button.addEventListener('click', async () => {
    const userId = Number(input.value) || 1;
    resultsEl.innerHTML = '<p class="text-slate-500">Cargando usuario y sus tareas...</p>';

    const apiPromise = Promise.all([
      fetch(`${API}/users/${userId}`).then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); }),
      fetch(`${API}/users/${userId}/todos`).then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
    ]);

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('⏱ Tiempo agotado (3s). La API no respondió a tiempo.')), 3000)
    );

    try {
      const [user, todos] = await Promise.race([apiPromise, timeout]);
      const completed = todos.filter(t => t.completed).length;
      const pending = todos.length - completed;
      resultsEl.innerHTML = `
        <div class="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h3 class="font-bold text-white mb-1">${sanitizeHTML(user.name)}</h3>
          <p class="text-slate-500 text-sm mb-3">${sanitizeHTML(user.email)}</p>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="bg-emerald-500/10 rounded-lg p-3">
              <p class="text-2xl font-bold text-emerald-400">${completed}</p>
              <p class="text-xs text-slate-400">Completadas</p>
            </div>
            <div class="bg-yellow-500/10 rounded-lg p-3">
              <p class="text-2xl font-bold text-yellow-400">${pending}</p>
              <p class="text-xs text-slate-400">Pendientes</p>
            </div>
            <div class="bg-slate-700/20 rounded-lg p-3">
              <p class="text-2xl font-bold text-white">${todos.length}</p>
              <p class="text-xs text-slate-400">Total</p>
            </div>
          </div>
        </div>`;
    } catch (error) {
      resultsEl.innerHTML = `<p class="text-red-400">${sanitizeHTML(error.message)}</p>`;
    }
  });
}

// ================================================================
// DESAFÍO FINAL (BONUS): DASHBOARD DE USUARIOS
// ================================================================
// Combina varias metricas con Promise.all(), muestra el top 3 de
// usuarios con mas posts y un post aleatorio, y se autorefresca cada
// 30 segundos con una pequena maquina de estados de carga.
const DASHBOARD_STATE = Object.freeze({
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
});

let dashboardTimer = null;

function loadDashboardData() {
  const metricsEl = document.getElementById('dashboard-metrics');
  const statusEl = document.getElementById('dashboard-status');
  if (!metricsEl) return;

  // Marca el estado PENDING mientras se cargan las metricas.
  dashboardState = DASHBOARD_STATE.PENDING;
  if (statusEl) statusEl.textContent = '⏳ Actualizando métricas...';

  // Obtenemos todos los datos en paralelo con Promise.all.
  Promise.all([
    fetch(`${API}/users`).then(r => { if (!r.ok) throw new Error('users'); return r.json(); }),
    fetch(`${API}/posts`).then(r => { if (!r.ok) throw new Error('posts'); return r.json(); }),
    fetch(`${API}/comments`).then(r => { if (!r.ok) throw new Error('comments'); return r.json(); }),
    fetch(`${API}/albums`).then(r => { if (!r.ok) throw new Error('albums'); return r.json(); })
  ])
    .then(([users, posts, comments, albums]) => {
      dashboardState = DASHBOARD_STATE.FULFILLED;

      // Top 3 usuarios con mas posts.
      const countByUserId = posts.reduce((acc, post) => {
        acc[post.userId] = (acc[post.userId] || 0) + 1;
        return acc;
      }, {});
      const topUsers = [...users]
        .sort((a, b) => (countByUserId[b.id] || 0) - (countByUserId[a.id] || 0))
        .slice(0, 3);

      // Un post aleatorio destacado.
      const featured = posts[Math.floor(Math.random() * posts.length)];
      const featuredAuthor = users.find(u => u.id === featured.userId);

      const cards = [
        { label: 'Usuarios', value: users.length, color: 'text-emerald-400' },
        { label: 'Posts', value: posts.length, color: 'text-purple-400' },
        { label: 'Comentarios', value: comments.length, color: 'text-blue-400' },
        { label: 'Álbumes', value: albums.length, color: 'text-amber-400' }
      ];

      metricsEl.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          ${cards.map(card => `
            <div class="bg-slate-900 rounded-xl p-5 border border-slate-800 text-center">
              <p class="text-3xl font-bold ${card.color}">${card.value}</p>
              <p class="text-xs text-slate-400 mt-1 uppercase tracking-wide">${card.label}</p>
            </div>
          `).join('')}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h3 class="font-bold text-white mb-3">🏆 Top 3 usuarios con más posts</h3>
            <div class="space-y-2">
              ${topUsers.map((u, i) => `
                <div class="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                  <span class="text-sm text-slate-300">${i + 1}. ${sanitizeHTML(u.name)}</span>
                  <span class="text-xs font-bold text-emerald-400">${countByUserId[u.id] || 0} posts</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h3 class="font-bold text-white mb-3">⭐ Post aleatorio destacado</h3>
            <p class="text-emerald-400 font-semibold mb-1">${sanitizeHTML(featured.title)}</p>
            <p class="text-slate-400 text-sm">${sanitizeHTML(featured.body.substring(0, 140))}...</p>
            <p class="text-xs text-slate-500 mt-3">✍ ${sanitizeHTML(featuredAuthor ? featuredAuthor.name : 'Desconocido')}</p>
          </div>
        </div>`;

      if (statusEl) {
        statusEl.textContent = `✔ Actualizado ${new Date().toLocaleTimeString()} (refresco cada 30 s)`;
      }
    })
    .catch(error => {
      dashboardState = DASHBOARD_STATE.REJECTED;
      metricsEl.innerHTML = `<p class="text-red-400">Error al cargar las métricas: ${sanitizeHTML(error.message)}</p>`;
      if (statusEl) statusEl.textContent = '✖ Falló la actualización';
    });
}

let dashboardState = DASHBOARD_STATE.IDLE;

function initDashboard() {
  const metricsEl = document.getElementById('dashboard-metrics');
  if (!metricsEl) return;

  // Carga inicial.
  loadDashboardData();

  // Autorefresco cada 30 segundos (solo se configura una vez).
  if (!dashboardTimer) {
    dashboardTimer = setInterval(loadDashboardData, 30000);
  }
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
  const exportCsvBtn = document.getElementById('export-csv');
  const limitSelect = document.getElementById('report-limit');
  const timeEl = document.getElementById('report-time');
  const previewEl = document.getElementById('report-preview');

  if (!genUsersBtn) return;

  // Separador visual entre registros del reporte.
  const SEPARATOR = '-'.repeat(72);

  // Filas actuales en forma estructurada (para exportar a CSV).
  let currentRows = [];

  // Devuelve la cantidad de registros elegida en el selector (5, 10, 15, 20).
  function selectedLimit() {
    return Number(limitSelect ? limitSelect.value : 5);
  }

  // Muestra el tiempo de generacion medido con performance.now().
  function showElapsed(start) {
    if (timeEl) {
      timeEl.textContent = `⏱ Tiempo de generación: ${(performance.now() - start).toFixed(1)} ms`;
    }
  }

  // Crea un Blob y lo descarga con URL.createObjectURL (patrón del taller).
  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Escapa un valor para CSV (entre comillas si contiene separadores).
  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function rowsToCsv(rows, headers) {
    const lines = rows.map(row =>
      headers.map(header => csvCell(row[header])).join(',')
    );
    return [headers.join(','), ...lines].join('\n');
  }

  function renderReport(title, lines, rows, headers) {
    const timestamp = new Date().toISOString();
    const report = [
      `========================================`,
      `  REPORTE: ${title}`,
      `  Generado: ${timestamp}`,
      `  Registros: ${rows.length}`,
      `========================================`,
      ``,
      ...lines,
      ``,
      `========================================`,
      `  Fin del reporte`,
      `========================================`
    ].join('\n');

    currentReportData = report;
    currentRows = { rows, headers };
    previewEl.textContent = report;
    downloadBtn.classList.remove('hidden');
    printBtn.classList.remove('hidden');
    if (exportCsvBtn) exportCsvBtn.classList.remove('hidden');
  }

  genUsersBtn.addEventListener('click', async () => {
    const start = performance.now();
    try {
      const limit = selectedLimit();
      const response = await fetch(`${API}/users?_limit=${limit}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const users = await response.json();

      const lines = users.map((u, i) => {
        const block = [
          `  ▸ Usuario #${i + 1}`,
          `  Nombre:     ${u.name}`,
          `  Username:   ${u.username}`,
          `  Email:      ${u.email}`,
          `  Telefono:   ${u.phone}`,
          `  Empresa:    ${u.company.name}`,
          `  Ciudad:     ${u.address.city}`,
          `  Website:    ${u.website}`
        ];
        if (i < users.length - 1) block.push(``, SEPARATOR, ``);
        return block.join('\n');
      }).join('\n');

      const rows = users.map(u => ({
        nombre: u.name,
        username: u.username,
        email: u.email,
        telefono: u.phone,
        empresa: u.company.name,
        ciudad: u.address.city,
        website: u.website
      }));
      renderReport('Reporte de Usuarios', lines.split('\n'), rows, ['nombre', 'username', 'email', 'telefono', 'empresa', 'ciudad', 'website']);
      showElapsed(start);
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  genPostsBtn.addEventListener('click', async () => {
    const start = performance.now();
    try {
      const limit = selectedLimit();
      const response = await fetch(`${API}/posts?_limit=${limit}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const posts = await response.json();

      const lines = posts.map((p, i) => {
        const block = [
          `  ▸ Post #${p.id}`,
          `  Titulo: ${p.title}`,
          `  Body: ${p.body.substring(0, 80)}...`,
          `  Autor ID: ${p.userId}`
        ];
        if (i < posts.length - 1) block.push(``, SEPARATOR, ``);
        return block.join('\n');
      }).join('\n');

      const rows = posts.map(p => ({
        id: p.id,
        titulo: p.title,
        contenido: p.body,
        autorId: p.userId
      }));
      renderReport('Reporte de Posts', lines.split('\n'), rows, ['id', 'titulo', 'contenido', 'autorId']);
      showElapsed(start);
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  genCombinedBtn.addEventListener('click', async () => {
    const start = performance.now();
    try {
      const limit = selectedLimit();
      const [usersRes, postsRes] = await Promise.all([
        fetch(`${API}/users?_limit=${limit}`),
        fetch(`${API}/posts?_limit=${limit}`)
      ]);
      if (!usersRes.ok || !postsRes.ok) throw new Error('Error al obtener datos');

      const users = await usersRes.json();
      const posts = await postsRes.json();

      const lines = [
        `  === COMBINADO ===`,
        ``,
        `  --- Usuarios (${users.length}) ---`,
        ``,
        ...users.map((u, i) => {
          const block = [
            `  ▸ ${u.name} (${u.username})`,
            `    Email: ${u.email}`,
            `    Empresa: ${u.company.name}`,
            `    Ciudad: ${u.address.city}`
          ];
          if (i < users.length - 1) block.push('', SEPARATOR, '');
          return block.join('\n');
        }),
        ``,
        `  === Posts (${posts.length}) ===`,
        ``,
        ...posts.map((p, i) => {
          const block = [
            `  ▸ Post #${p.id} — "${p.title.substring(0, 50)}..."`,
            `    Autor ID: ${p.userId}`,
            `    Cuerpo: ${p.body.substring(0, 60)}...`
          ];
          if (i < posts.length - 1) block.push('', SEPARATOR, '');
          return block.join('\n');
        }),
        ``,
        `  --- Resumen ---`,
        `  Total usuarios: ${users.length}`,
        `  Total posts: ${posts.length}`,
        `  Posts por usuario (promedio): ${(posts.length / users.length).toFixed(1)}`
      ];

      const comboRows = users.map(u => ({ tipo: 'usuario', nombre: u.name, email: u.email, detalle: u.company.name }))
        .concat(posts.map(p => ({ tipo: 'post', nombre: p.title, email: '', detalle: p.body.substring(0, 40) })));
      renderReport('Reporte Combinado', lines, comboRows, ['tipo', 'nombre', 'email', 'detalle']);
      showElapsed(start);
    } catch (error) {
      previewEl.innerHTML = `<p class="text-red-400">Error al generar reporte: ${sanitizeHTML(error.message)}</p>`;
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!currentReportData) return;
    downloadFile(`reporte-${Date.now()}.txt`, currentReportData, 'text/plain');
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Exportar a CSV desde las filas estructuradas del ultimo reporte.
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      if (!currentRows.rows || !currentRows.headers) return;
      const csv = rowsToCsv(currentRows.rows, currentRows.headers);
      downloadFile(`reporte-${Date.now()}.csv`, csv, 'text/csv');
    });
  }
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
  loadUserWithTodos();

  handleRoute();
});