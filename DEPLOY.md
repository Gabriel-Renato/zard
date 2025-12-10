# Guia de Deploy - InfinityFree

## Problema: Página Branca e Erro 404

Se você está vendo uma página branca e erros 404, é porque o frontend React precisa ser **compilado** antes de ser enviado para o servidor.

## Passo a Passo para Deploy no InfinityFree

### 1. Compilar o Frontend

No seu computador local, execute:

```bash
cd frontend
npm install
npm run build
```

Isso criará uma pasta `frontend/dist/` com os arquivos compilados.

### 2. Estrutura de Arquivos no Servidor

No InfinityFree, você deve organizar assim:

```
htdocs/
├── index.html          (do frontend/dist/)
├── assets/             (do frontend/dist/assets/)
├── .htaccess           (para roteamento SPA)
└── backend/            (pasta backend PHP completa)
    ├── api/
    ├── config/
    ├── database/
    └── .htaccess
```

### 3. Copiar Arquivos

**Opção A: Via FTP/FileZilla**
1. Conecte-se ao seu servidor InfinityFree via FTP
2. Copie TODOS os arquivos de `frontend/dist/` para a raiz do `htdocs/`
3. Copie a pasta `backend/` completa para `htdocs/backend/`
4. Copie o arquivo `frontend/.htaccess` para a raiz do `htdocs/`

**Opção B: Via Painel do InfinityFree**
1. Acesse o File Manager
2. Faça upload dos arquivos conforme acima

### 4. Configurar o .htaccess na Raiz

Na raiz do `htdocs/`, crie ou edite o `.htaccess`:

```apache
Options -MultiViews
RewriteEngine On

# Frontend - React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/backend
RewriteRule ^ index.html [QSA,L]

# Backend - API PHP
RewriteCond %{REQUEST_URI} ^/backend
RewriteRule ^ - [L]
```

### 5. Configurar o Backend

1. Edite `htdocs/backend/config/database.php` com suas credenciais MySQL
2. Importe o banco de dados: `backend/database/schema.sql`

### 6. Configurar Caminhos no Frontend

Se o frontend não estiver na raiz, você precisa ajustar o `vite.config.ts` antes de fazer o build:

```typescript
export default defineConfig({
  base: '/seu-subdiretorio/', // Se não estiver na raiz
  // ... resto da config
});
```

### 7. Verificar Configuração da API

No arquivo `frontend/src/services/api.ts`, certifique-se de que a URL da API está correta:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://seusite.com/backend/api';
```

Ou crie um arquivo `.env.production` no frontend antes do build:

```env
VITE_API_URL=https://seusite.com/backend/api
```

## Troubleshooting

### Erro 404 em todos os arquivos
- Verifique se todos os arquivos de `dist/` foram copiados
- Verifique permissões dos arquivos (644 para arquivos, 755 para pastas)
- Verifique se o `.htaccess` está na raiz

### Página branca
- Abra o console do navegador (F12) e verifique erros
- Verifique se os arquivos JS/CSS estão carregando
- Verifique se a URL da API está correta

### Erro CORS
- Os headers CORS já estão configurados no `backend/api/config.php`
- Certifique-se de que o backend está funcionando

### Build Local

Para testar localmente o build de produção:

```bash
cd frontend
npm run build
npm run preview
```

Isso simula como ficará em produção.

## Estrutura Final no Servidor

```
htdocs/
├── index.html              ← Frontend (React compilado)
├── assets/                 ← CSS, JS, imagens do frontend
├── .htaccess               ← Configuração SPA
├── favicon.png             ← Se houver
└── backend/                ← Backend PHP
    ├── api/
    │   ├── auth.php
    │   ├── solicitacoes.php
    │   ├── materias.php
    │   ├── flashcards.php
    │   ├── admin.php
    │   └── config.php
    ├── config/
    │   └── database.php
    ├── database/
    │   └── schema.sql
    └── .htaccess
```

## Importante

- **NUNCA** faça upload da pasta `node_modules/` - ela é muito grande
- **SEMPRE** faça o `npm run build` antes de fazer upload
- Faça upload apenas dos arquivos de `dist/`, não do código fonte do frontend
- O backend pode ser enviado completo (é apenas PHP)

