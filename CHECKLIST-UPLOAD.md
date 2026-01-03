# ✅ Checklist de Upload para o Servidor

## 🚨 PROBLEMA: Tela Branca

Se você está vendo tela branca, significa que:
1. ❌ Os arquivos não foram compilados corretamente
2. ❌ Os arquivos errados foram enviados
3. ❌ A pasta `assets/` está faltando

## 📋 PASSO A PASSO CORRETO

### 1. Compilar o Frontend (NO SEU COMPUTADOR)

```bash
cd frontend
npm install
npm run build
```

### 2. Verificar o que foi gerado

Depois do build, deve existir:
```
frontend/dist/
├── index.html          ← Este arquivo
├── assets/             ← Esta pasta é ESSENCIAL
│   ├── index-XXXXX.js  ← Arquivo JavaScript
│   ├── index-XXXXX.css ← Arquivo CSS
│   └── ...
├── favicon.png
└── robots.txt
```

### 3. Fazer Upload para o Servidor (htdocs/)

**FAZER UPLOAD DE:**
- ✅ `frontend/dist/index.html` → `htdocs/index.html`
- ✅ `frontend/dist/assets/` (PASTA INTEIRA) → `htdocs/assets/`
- ✅ `frontend/dist/favicon.png` → `htdocs/favicon.png`
- ✅ `frontend/dist/robots.txt` → `htdocs/robots.txt` (opcional)
- ✅ `.htaccess` (da raiz do projeto) → `htdocs/.htaccess`
- ✅ `backend/` (PASTA INTEIRA) → `htdocs/backend/`

**NÃO FAZER UPLOAD DE:**
- ❌ `vite.config.ts`
- ❌ `package.json`
- ❌ Pasta `src/`
- ❌ Pasta `node_modules/`
- ❌ Qualquer arquivo `.ts` ou `.tsx`

### 4. Estrutura Final no Servidor (htdocs/)

```
htdocs/
├── index.html              ← Do frontend/dist/
├── assets/                 ← Do frontend/dist/assets/ (IMPORTANTE!)
│   ├── index-XXXXX.js
│   ├── index-XXXXX.css
│   └── ...
├── favicon.png
├── robots.txt
├── .htaccess              ← IMPORTANTE para rotas funcionarem
└── backend/               ← Backend PHP completo
    ├── api/
    ├── config/
    └── .htaccess
```

### 5. Verificar no Navegador

1. Abra o console (F12)
2. Vá na aba "Network" (Rede)
3. Recarregue a página
4. Verifique se:
   - ✅ `index.html` carrega (200 OK)
   - ✅ `assets/index-XXXXX.js` carrega (200 OK)
   - ✅ `assets/index-XXXXX.css` carrega (200 OK)

Se algum arquivo der 404, você não fez upload corretamente.

## 🔍 Verificação Rápida

Abra o arquivo `index.html` no servidor e veja se tem essas linhas:

```html
<script type="module" crossorigin src="./assets/index-XXXXX.js"></script>
<link rel="stylesheet" crossorigin href="./assets/index-XXXXX.css">
```

Se tiver `./assets/` (caminho relativo) está correto!
Se tiver `/assets/` (caminho absoluto) pode não funcionar em subdiretórios.

## ⚠️ Erros Comuns

### "Failed to load resource: 404"
- Pasta `assets/` não foi enviada
- Caminhos errados no index.html
- Arquivos não estão na mesma estrutura

### "Página branca"
- Arquivo JavaScript não está carregando
- Console do navegador mostra erro
- Verifique a aba Network no DevTools

### "MIME type error"
- Arquivo não está sendo servido corretamente
- Problema no servidor
- Verifique permissões dos arquivos (644)

## 📝 Resumo

**A regra de ouro:**
- O que está em `frontend/dist/` vai para `htdocs/`
- **SEMPRE** inclua a pasta `assets/` completa
- **NUNCA** envie código fonte (`.ts`, `.tsx`, `src/`)

