// Service Worker para PWA - Zard Flashcard Mastery
// Versão do cache - incrementar quando houver atualizações importantes
const CACHE_NAME = 'zard-flashcard-v1';
const RUNTIME_CACHE = 'zard-runtime-v1';

// Arquivos essenciais para cachear na instalação
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Estratégia de cache: Network First com fallback para cache
// Prioriza buscar da rede, mas usa cache se offline
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Estratégia de cache: Cache First
// Usa cache se disponível, senão busca da rede
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Retorna página offline se disponível
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    throw error;
  }
}

// Evento: Instalação do Service Worker
// Cacheia arquivos estáticos essenciais
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando arquivos estáticos');
      // Cacheia arquivos estáticos essenciais
      // Nota: Ícones podem não existir ainda, mas o cache.addAll ignora erros individuais
      return cache.addAll(STATIC_CACHE_URLS).catch((error) => {
        console.log('[Service Worker] Erro ao cachear alguns arquivos:', error);
        // Continua mesmo se alguns arquivos falharem (ex: ícones ainda não gerados)
      });
    })
  );
  // Força ativação imediata do novo service worker
  self.skipWaiting();
});

// Evento: Ativação do Service Worker
// Remove caches antigos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches que não são os atuais
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Assume controle imediato de todas as páginas
  return self.clients.claim();
});

// Evento: Interceptação de requisições
// Aplica estratégias de cache baseadas no tipo de recurso
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições para APIs do backend (não cacheia)
  if (url.pathname.startsWith('/backend/')) {
    return; // Deixa passar direto para a rede
  }

  // Ignora requisições de outros domínios (CDNs, APIs externas)
  if (url.origin !== location.origin) {
    return; // Deixa passar direto para a rede
  }

  // Estratégia para diferentes tipos de recursos
  if (request.destination === 'document') {
    // Páginas HTML: Network First
    event.respondWith(networkFirst(request));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    // Assets estáticos: Cache First
    event.respondWith(cacheFirst(request));
  } else {
    // Outros recursos: Network First
    event.respondWith(networkFirst(request));
  }
});

// Evento: Mensagens do cliente (opcional - para atualizações)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

