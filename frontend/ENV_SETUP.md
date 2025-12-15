# Configuração de Variáveis de Ambiente

## 📋 Arquivos .env

### Para Desenvolvimento Local

Crie o arquivo `.env` na pasta `frontend/`:

```env
VITE_API_URL=http://localhost/zard-flashcard-mastery/backend/api
```

### Para Produção

Crie o arquivo `.env.production` na pasta `frontend/`:

```env
VITE_API_URL=https://zardflashcard.gt.tc/backend/api
```

### Para Build de Produção

O código já detecta automaticamente o ambiente:
- **Produção (https)**: usa `https://zardflashcard.gt.tc/backend/api`
- **Desenvolvimento (localhost)**: usa `http://localhost/zard-flashcard-mastery/backend/api`

## 🚀 Como Usar

### Desenvolvimento

1. Crie o arquivo `.env`:
```bash
cd frontend
echo "VITE_API_URL=http://localhost/zard-flashcard-mastery/backend/api" > .env
```

2. Inicie o servidor:
```bash
npm run dev
```

### Produção

1. Antes do build, crie o arquivo `.env.production`:
```bash
cd frontend
echo "VITE_API_URL=https://zardflashcard.gt.tc/backend/api" > .env.production
```

2. Faça o build:
```bash
npm run build
```

**OU** use a detecção automática (o código já detecta se está em produção)

## 🔧 Detecção Automática

O código em `src/services/api.ts` já detecta automaticamente:
- Se a URL começa com `https://` → usa produção
- Se o hostname não é `localhost` → usa produção
- Caso contrário → usa desenvolvimento

Você só precisa criar os arquivos `.env` se quiser sobrescrever essa detecção automática.

## 📝 Nota

Os arquivos `.env` estão no `.gitignore` e não serão commitados por segurança.

