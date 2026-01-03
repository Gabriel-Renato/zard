# 🔧 Solução: Erro 404 e Página Branca no InfinityFree

## ❌ O Problema

Você está vendo:
- Página branca
- Erro 404 do `errors.infinityfree.net`
- Arquivos não encontrados

## ✅ A Solução

O React precisa ser **compilado** antes de ser enviado ao servidor. Você não pode enviar o código fonte diretamente.

## 📋 Passos para Resolver

### 1. Compilar o Frontend (OBRIGATÓRIO)

```bash
cd frontend
npm install
npm run build
```

Isso cria a pasta `frontend/dist/` com os arquivos prontos para produção.

### 2. Fazer Upload dos Arquivos Corretos

**IMPORTANTE:** Você deve fazer upload:

✅ **DO**:
- Todos os arquivos de `frontend/dist/` → raiz do `htdocs/`
- Pasta `backend/` completa → `htdocs/backend/`
- Arquivo `.htaccess` na raiz

❌ **NÃO** faça upload de:
- Pasta `node_modules/`
- Pasta `src/` do frontend
- Arquivos `.tsx`, `.ts` (código fonte)

### 3. Estrutura no Servidor (InfinityFree)

```
htdocs/                    ← Raiz do seu site
├── index.html            ← Do frontend/dist/
├── assets/               ← Do frontend/dist/assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon.png           ← Se houver
├── .htaccess            ← IMPORTANTE! Para funcionar as rotas
└── backend/             ← Backend PHP
    ├── api/
    ├── config/
    └── .htaccess
```

### 4. Configurar a URL da API

Antes de fazer o build, crie o arquivo `frontend/.env.production`:

```env
VITE_API_URL=https://seusite.infinityfreeapp.com/backend/api
```

Ou ajuste diretamente no código `frontend/src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://seusite.infinityfreeapp.com/backend/api';
```

Depois faça o build novamente:
```bash
npm run build
```

### 5. Arquivo .htaccess na Raiz

O arquivo `.htaccess` na raiz é ESSENCIAL para o React Router funcionar. Ele deve conter:

```apache
Options -MultiViews
RewriteEngine On

# Frontend - React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/backend
RewriteRule ^ index.html [QSA,L]

# Backend
RewriteCond %{REQUEST_URI} ^/backend
RewriteRule ^ - [L]
```

## 🚀 Processo Completo de Deploy

```bash
# 1. No seu computador local
cd frontend

# 2. Instalar dependências (se ainda não fez)
npm install

# 3. Criar arquivo .env.production com a URL do seu site
echo "VITE_API_URL=https://seusite.infinityfreeapp.com/backend/api" > .env.production

# 4. Compilar
npm run build

# 5. Fazer upload via FTP:
#    - frontend/dist/* → htdocs/
#    - backend/ → htdocs/backend/
#    - .htaccess → htdocs/
```

## 🔍 Verificações

1. **Verificar se o build foi feito:**
   - Deve existir a pasta `frontend/dist/`
   - Deve ter `index.html` dentro
   - Deve ter pasta `assets/` com arquivos `.js` e `.css`

2. **Verificar no servidor:**
   - `htdocs/index.html` existe?
   - `htdocs/assets/` existe e tem arquivos?
   - `htdocs/.htaccess` existe?
   - `htdocs/backend/api/` existe?

3. **Verificar no navegador:**
   - Abra o Console (F12)
   - Veja se há erros de carregamento
   - Veja se os arquivos `.js` e `.css` estão sendo carregados

## ⚠️ Erros Comuns

### "Failed to load resource: 404"
- Arquivos não foram copiados corretamente
- `.htaccess` não está na raiz
- Caminhos incorretos

### "Página branca"
- Arquivos JS não estão carregando
- Erro no console do navegador
- Verifique se o build foi feito corretamente

### "CORS error"
- Backend não está acessível
- URL da API está incorreta
- Verifique `backend/config/database.php`

## 📞 Checklist Final

- [ ] Frontend compilado com `npm run build`
- [ ] Arquivos de `dist/` copiados para a raiz
- [ ] `.htaccess` na raiz do `htdocs/`
- [ ] Backend copiado para `htdocs/backend/`
- [ ] URL da API configurada corretamente
- [ ] Banco de dados criado e configurado
- [ ] Testado no navegador com console aberto (F12)

## 🎯 Resumo Rápido

**O problema:** Você está tentando rodar código fonte React no servidor.

**A solução:** Compile o React (`npm run build`) e faça upload apenas dos arquivos de `dist/`.


