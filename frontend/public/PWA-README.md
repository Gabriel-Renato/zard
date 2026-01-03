# 📱 Guia de Implementação PWA - Zard Flashcard Mastery

Este documento explica a implementação do Progressive Web App (PWA) no projeto.

## 📋 Arquivos Criados

### 1. `manifest.json`
Arquivo de manifesto PWA que define:
- Nome da aplicação (name, short_name)
- URL inicial (start_url)
- Modo de exibição (display: standalone)
- Cores do tema (theme_color, background_color)
- Ícones da aplicação (192x192 e 512x512)
- Configurações de idioma e direção

### 2. `service-worker.js`
Service Worker que gerencia:
- **Cache de arquivos estáticos**: HTML, CSS, JS, imagens
- **Funcionamento offline**: Permite uso básico sem internet
- **Estratégias de cache**:
  - **Network First**: Para páginas HTML (sempre tenta buscar atualização)
  - **Cache First**: Para assets estáticos (CSS, JS, imagens, fontes)
- **Limpeza automática**: Remove caches antigos ao atualizar

### 3. `service-worker-register.js`
Script que:
- Registra o Service Worker automaticamente
- Verifica atualizações periodicamente
- Gerencia notificações de atualização
- Funciona apenas em HTTPS ou localhost (requisito de segurança)

### 4. Pasta `icons/`
Contém os ícones da aplicação:
- `icon-192x192.png` - Ícone pequeno (192x192 pixels)
- `icon-512x512.png` - Ícone grande (512x512 pixels)

## 🚀 Como Gerar os Ícones

### Opção 1: Usando ImageMagick (Linux/Mac)
```bash
cd frontend/public/icons
./generate-icons.sh
```

### Opção 2: Usando Node.js (Sharp)
```bash
cd frontend/public/icons
npm install sharp
node generate-icons.js
```

### Opção 3: Manual
Crie manualmente os ícones:
- `icon-192x192.png` - 192x192 pixels
- `icon-512x512.png` - 512x512 pixels

Coloque-os na pasta `frontend/public/icons/`

## ✅ Verificação da Implementação

### 1. Verificar no index.html
O arquivo `frontend/index.html` deve conter:
```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#6366f1" />
<script src="/service-worker-register.js"></script>
```

### 2. Verificar no Console do Navegador
1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por mensagens como:
   - `[PWA] Service Worker registrado com sucesso`
   - `[PWA] Service Worker pronto para uso`

### 3. Verificar no Application Tab (Chrome DevTools)
1. Abra o DevTools (F12)
2. Vá na aba "Application"
3. Verifique:
   - **Manifest**: Deve mostrar o manifest.json carregado
   - **Service Workers**: Deve mostrar o service worker ativo
   - **Cache Storage**: Deve mostrar os caches criados

### 4. Testar Instalação
1. No Chrome/Edge: Procure pelo ícone de instalação na barra de endereços
2. No mobile: Use "Adicionar à Tela Inicial"
3. A aplicação deve abrir em modo standalone (sem barra do navegador)

## 🔒 Requisitos de Segurança

### HTTPS Obrigatório (exceto localhost)
- Service Workers **só funcionam** em:
  - `https://` (produção)
  - `http://localhost` (desenvolvimento)
  - `http://127.0.0.1` (desenvolvimento)

### Verificação Automática
O script `service-worker-register.js` verifica automaticamente se está em um ambiente seguro antes de registrar o service worker.

## 🛠️ Manutenção

### Atualizar o Cache
Quando fizer alterações importantes, atualize a versão do cache no `service-worker.js`:
```javascript
const CACHE_NAME = 'zard-flashcard-v2'; // Incremente a versão
```

### Limpar Cache Manualmente
No DevTools → Application → Storage → Clear site data

Ou programaticamente:
```javascript
// No console do navegador
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## 📝 Notas Importantes

1. **Build do Frontend**: Após fazer o build (`npm run build`), todos os arquivos da pasta `public/` são copiados para a raiz do `dist/`.

2. **Ícones**: Os ícones devem existir antes do primeiro acesso, caso contrário o PWA pode não instalar corretamente.

3. **Cache de APIs**: O service worker **não cacheia** requisições para `/backend/` para garantir dados sempre atualizados.

4. **Atualizações**: O service worker verifica atualizações automaticamente a cada hora. Para forçar atualização, use `window.updateServiceWorker()` no console.

## 🐛 Troubleshooting

### Service Worker não registra
- Verifique se está em HTTPS ou localhost
- Verifique o console para erros
- Limpe o cache do navegador

### Ícones não aparecem
- Verifique se os arquivos existem em `/icons/`
- Verifique o caminho no `manifest.json`
- Verifique o console para erros 404

### PWA não instala
- Verifique se o manifest.json está acessível
- Verifique se todos os ícones existem
- Verifique se está em HTTPS (produção)

## 📚 Referências

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

