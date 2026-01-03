# 📱 Como Gerar APK com Site na InfinityFree

Seu site está na InfinityFree? Sem problemas! Você pode gerar APK online mesmo assim.

## 🎯 Solução: GitHub Actions (Gratuito)

**Você não precisa mover seu site para o GitHub!**

O GitHub será usado **apenas para gerar o APK**, não para hospedar seu site.

### Como Funciona:

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│  InfinityFree   │         │   GitHub     │         │  Seu Celular │
│  (Seu Site)     │         │  (Gera APK)  │         │   (App)      │
│                 │         │              │         │              │
│  ✅ Site Web    │         │  ✅ Código    │         │  ✅ APK      │
│  ✅ Funciona    │         │  ✅ Build     │         │  ✅ Instala  │
│  ✅ Normal      │         │  ✅ Automático│         │              │
└─────────────────┘         └──────────────┘         └─────────────┘
```

## 🚀 Passo a Passo Rápido

### 1. Criar Repositório no GitHub (5 minutos)

1. Acesse: https://github.com/new
2. Nome: `zard-apk` (ou qualquer nome)
3. Pode ser **privado** (gratuito)
4. Clique em **"Create repository"**

### 2. Fazer Upload do Código

**Opção A: Via Git (Recomendado)**

```bash
# No seu servidor ou computador
cd /var/www/html/zard-flashcard-mastery

# Inicializar Git (se ainda não tiver)
git init

# Adicionar apenas o necessário para gerar APK
git add frontend/ .github/

# Commit
git commit -m "Configurar build APK"

# Adicionar repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/zard-apk.git

# Push
git branch -M main
git push -u origin main
```

**Opção B: Via Interface Web (Mais Fácil)**

1. No repositório criado, clique em **"uploading an existing file"**
2. Arraste a pasta `frontend/` completa
3. Arraste a pasta `.github/` completa
4. Clique em **"Commit changes"**

### 3. Aguardar Build Automático

1. Vá em: `https://github.com/SEU-USUARIO/zard-apk/actions`
2. Você verá o workflow "Build Android APK" executando
3. Aguarde 3-5 minutos (primeira vez pode demorar mais)

### 4. Baixar APK

1. Clique no workflow que terminou (verde ✅)
2. Role até **"Artifacts"**
3. Clique em **"app-debug-apk"** para baixar

### 5. Instalar no Dispositivo

1. Transfira o APK para seu Android
2. Abra o arquivo
3. Permita instalação de fontes desconhecidas
4. Instale!

## ✅ Vantagens Desta Solução

- ✅ **Site continua na InfinityFree** - Não precisa mudar nada
- ✅ **GitHub é gratuito** - Plano gratuito é suficiente
- ✅ **Automático** - Gera APK a cada push
- ✅ **Fácil** - Apenas fazer upload do código
- ✅ **Não afeta seu site** - São coisas separadas

## 🔄 Atualizar o APK

Sempre que quiser gerar novo APK:

```bash
# Fazer mudanças no código (se necessário)
cd /var/www/html/zard-flashcard-mastery/frontend

# Commit e push
git add .
git commit -m "Atualizar app"
git push
```

O GitHub vai gerar novo APK automaticamente!

## 📋 O Que Você Precisa

1. ✅ Conta no GitHub (gratuita)
2. ✅ Código do frontend (você já tem)
3. ✅ 5 minutos para configurar

## 🎯 Estrutura Recomendada

```
Seu Projeto:
├── InfinityFree (Hospedagem Web)
│   └── Site funcionando normalmente ✅
│
└── GitHub (Apenas para APK)
    └── Código do frontend
    └── GitHub Actions gera APK ✅
```

## 💡 Dicas Importantes

1. **Não precisa sincronizar** - O código no GitHub é independente do site na InfinityFree
2. **Pode ser privado** - Seu repositório pode ser privado (gratuito)
3. **Atualize quando quiser** - Faça push apenas quando quiser gerar novo APK

## 🐛 Problemas Comuns

### "Não tenho Git instalado"

Use a interface web do GitHub para fazer upload manual dos arquivos.

### "Workflow não executa"

Verifique se:
- A pasta `.github/workflows/build-apk.yml` está no repositório
- Você fez push para a branch `main` ou `master`

### "Erro no build"

Veja os logs na aba "Actions" do GitHub para identificar o problema.

## 📚 Documentação Completa

- `GERAR-APK-ONLINE-INFINITYFREE.md` - Guia completo com todas as opções
- `frontend/SETUP-GITHUB-APK.md` - Setup passo a passo

## 🎉 Pronto!

Agora você pode:
- ✅ Manter seu site na InfinityFree
- ✅ Gerar APK automaticamente no GitHub
- ✅ Ter site web E app Android

São coisas separadas que funcionam juntas! 🚀

