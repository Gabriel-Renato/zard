// Script de registro do Service Worker para PWA
// Este arquivo registra o service worker e gerencia atualizações

(function() {
  'use strict';

  // Verifica se o navegador suporta Service Workers
  if ('serviceWorker' in navigator) {
    // Aguarda o carregamento completo da página antes de registrar
    window.addEventListener('load', function() {
      registerServiceWorker();
    });
  } else {
    console.log('[PWA] Service Workers não são suportados neste navegador.');
  }

  /**
   * Registra o Service Worker
   */
  function registerServiceWorker() {
    // Verifica se está em HTTPS ou localhost (requisito para Service Workers)
    if (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      navigator.serviceWorker
        .register('/service-worker.js', {
          scope: '/' // Escopo do service worker (raiz do site)
        })
        .then(function(registration) {
          console.log('[PWA] Service Worker registrado com sucesso:', registration.scope);

          // Verifica se há atualizações disponíveis
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Novo service worker disponível
                console.log('[PWA] Nova versão disponível! Recarregue a página para atualizar.');
                // Opcional: Mostrar notificação para o usuário
                showUpdateNotification();
              }
            });
          });
        })
        .catch(function(error) {
          console.error('[PWA] Erro ao registrar Service Worker:', error);
        });

      // Listener para quando o service worker estiver pronto
      navigator.serviceWorker.ready.then(function(registration) {
        console.log('[PWA] Service Worker pronto para uso.');
      });

      // Listener para mensagens do service worker
      navigator.serviceWorker.addEventListener('message', function(event) {
        console.log('[PWA] Mensagem do Service Worker:', event.data);
      });

      // Verifica atualizações periodicamente (a cada hora)
      setInterval(function() {
        navigator.serviceWorker.getRegistration().then(function(registration) {
          if (registration) {
            registration.update();
          }
        });
      }, 3600000); // 1 hora em milissegundos

    } else {
      console.warn('[PWA] Service Workers requerem HTTPS (ou localhost). Atual: ' + location.protocol);
    }
  }

  /**
   * Mostra notificação de atualização disponível (opcional)
   */
  function showUpdateNotification() {
    // Você pode personalizar esta função para mostrar uma notificação
    // ou botão para atualizar a aplicação
    if (confirm('Uma nova versão está disponível! Deseja recarregar a página agora?')) {
      window.location.reload();
    }
  }

  /**
   * Força atualização do Service Worker (útil para desenvolvimento)
   */
  window.updateServiceWorker = function() {
    navigator.serviceWorker.getRegistration().then(function(registration) {
      if (registration) {
        registration.update();
        console.log('[PWA] Atualização do Service Worker solicitada.');
      }
    });
  };

})();

