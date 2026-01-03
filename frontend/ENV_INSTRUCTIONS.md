# 🚀 Configuração de Ambiente - Zard Flashcard

## ✅ Configuração Automática

O código já está configurado para detectar automaticamente o ambiente!

- **Produção (https://zardflashcard.gt.tc/)**: Usa `https://zardflashcard.gt.tc/backend/api`
- **Desenvolvimento (localhost)**: Usa `http://localhost/zard-flashcard-mastery/backend/api`

## 📝 Arquivos .env Criados

Os seguintes arquivos foram criados:

### `.env` (Desenvolvimento)
```env
VITE_API_URL=http://localhost/zard-flashcard-mastery/backend/api
```

### `.env.production` (Produção)
```env
VITE_API_URL=https://zardflashcard.gt.tc/backend/api
```

## 🔨 Build para Produção

Quando você fizer o build para produção:

```bash
cd frontend
npm run build
```

O Vite automaticamente usará o `.env.production` se existir, ou a detecção automática.

## 📍 URLs Configuradas

### Desenvolvimento
- Frontend: `http://localhost:8080`
- API: `http://localhost/zard-flashcard-mastery/backend/api`

### Produção
- Frontend: `https://zardflashcard.gt.tc/`
- API: `https://zardflashcard.gt.tc/backend/api`

## ⚙️ Como Funciona

1. O código em `src/services/api.ts` verifica primeiro se existe `VITE_API_URL` no `.env`
2. Se não existir, detecta automaticamente:
   - Se é HTTPS → Produção
   - Se não é localhost → Produção
   - Caso contrário → Desenvolvimento

## 🔍 Verificar

Para verificar qual URL está sendo usada, abra o console do navegador e veja as requisições da API.

