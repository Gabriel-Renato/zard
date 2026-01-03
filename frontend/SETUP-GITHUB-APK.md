# 🚀 Setup Rápido: Gerar APK no GitHub (Site na InfinityFree)

Guia rápido para gerar APK mesmo com site hospedado na InfinityFree.

## ⚡ Setup em 5 Minutos

### 1. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `zard-apk` (ou qualquer nome)
3. Marque como **Privado** (se quiser)
4. Clique em **"Create repository"**

### 2. Fazer Upload do Código

**Opção A: Via Git (Recomendado)**

```bash
cd /var/www/html/zard-flashcard-mastery

# Inicializar Git (se ainda não tiver)
git init

# Adicionar arquivos necessários
git add frontend/ .github/

# Commit
git commit -m "Configurar build APK"

# Adicionar repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/zard-apk.git

# Push
git branch -M main
git push -u origin main
```

**Opção B: Via Interface Web do GitHub**

1. No repositório criado, clique em **"uploading an existing file"**
2. Arraste a pasta `frontend/` e `.github/`
3. Clique em **"Commit changes"**

### 3. Aguardar Build

1. Vá em: `https://github.com/SEU-USUARIO/zard-apk/actions`
2. Você verá o workflow "Build Android APK" executando
3. Aguarde 3-5 minutos (primeira vez pode demorar mais)

### 4. Baixar APK

1. Clique no workflow que terminou (verde ✅)
2. Role até a seção **"Artifacts"**
3. Clique em **"app-debug-apk"** para baixar
4. Ou vá em **"Releases"** para baixar da release

### 5. Instalar no Dispositivo

1. Transfira o APK para seu Android
2. Abra o arquivo
3. Permita instalação de fontes desconhecidas
4. Instale!

## 🔄 Atualizar APK

Sempre que quiser gerar novo APK:

```bash
# Fazer mudanças no código
cd /var/www/html/zard-flashcard-mastery/frontend

# Commit e push
git add .
git commit -m "Atualizar app"
git push
```

O GitHub vai gerar novo APK automaticamente!

## ✅ Vantagens

- ✅ **Gratuito** - GitHub Actions é gratuito
- ✅ **Automático** - Gera APK a cada push
- ✅ **Fácil** - Apenas fazer push
- ✅ **Não afeta InfinityFree** - Site continua funcionando normalmente

## 🎯 Importante

- O código no GitHub é **apenas para gerar APK**
- Seu **site continua na InfinityFree** normalmente
- Eles **não precisam estar no mesmo lugar**

## 🐛 Problemas?

### "Não tenho Git"

Use a interface web do GitHub para fazer upload manual.

### "Workflow não executa"

Verifique se a pasta `.github/workflows/` está no repositório.

### "Erro no build"

Veja os logs na aba "Actions" para identificar o problema.

