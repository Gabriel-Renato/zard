# 🌐 Gerar APK Online - Site na InfinityFree

Como seu site está hospedado na InfinityFree, aqui estão as melhores opções para gerar APK online:

## 🎯 Opção 1: GitHub Actions (Recomendado - Gratuito)

Mesmo que seu site esteja na InfinityFree, você pode usar o GitHub apenas para gerar o APK.

### Como Funciona:

1. **Crie um repositório no GitHub** (pode ser privado e gratuito)
2. **Faça upload do código** do frontend
3. **O GitHub gera o APK automaticamente**
4. **Baixe o APK** e instale no dispositivo

### Passo a Passo:

```bash
# 1. Criar repositório no GitHub (via site ou CLI)
# 2. Fazer upload do código
git init
git add frontend/
git commit -m "Código para gerar APK"
git remote add origin https://github.com/SEU-USUARIO/zard-apk.git
git push -u origin main

# 3. O GitHub Actions vai gerar o APK automaticamente
# 4. Baixe em: https://github.com/SEU-USUARIO/zard-apk/actions
```

**Vantagens:**
- ✅ Totalmente gratuito
- ✅ Automático (gera APK a cada push)
- ✅ Não precisa instalar nada
- ✅ Funciona mesmo com site na InfinityFree

## 🎯 Opção 2: GitLab CI/CD (Alternativa Gratuita)

Similar ao GitHub, mas usando GitLab:

1. Crie conta no GitLab (gratuito)
2. Crie um repositório
3. Faça upload do código
4. O GitLab gera o APK automaticamente

## 🎯 Opção 3: Serviços de Build Online

### A. AppCenter (Microsoft) - Gratuito

1. Acesse: https://appcenter.ms
2. Crie uma conta
3. Conecte seu repositório (GitHub/GitLab)
4. Configure build para Android
5. Gere APK automaticamente

### B. Bitrise - Plano Gratuito Disponível

1. Acesse: https://bitrise.io
2. Conecte repositório
3. Configure workflow Android
4. Gere APK

### C. CircleCI - Plano Gratuito

1. Acesse: https://circleci.com
2. Conecte repositório
3. Configure build Android
4. Gere APK

## 🎯 Opção 4: Build em Servidor Online (VPS/Cloud)

Se você tem acesso a um servidor Linux (mesmo que seja outro serviço):

### Usar o Script Automático:

```bash
# No servidor online
cd /caminho/do/projeto/frontend
./build-apk.sh
```

O APK será gerado e você pode baixar via FTP/SFTP.

## 🎯 Opção 5: GitHub Codespaces (Editor Online)

1. Crie repositório no GitHub
2. Abra o projeto no GitHub Codespaces (editor online)
3. Execute os comandos:
```bash
cd frontend
npm run android:apk
```
4. Baixe o APK gerado

## 📋 Comparação Rápida

| Serviço | Gratuito | Fácil | Automático | Recomendado |
|---------|----------|-------|------------|-------------|
| GitHub Actions | ✅ Sim | ⭐⭐⭐⭐⭐ | ✅ Sim | ⭐⭐⭐⭐⭐ |
| GitLab CI | ✅ Sim | ⭐⭐⭐⭐ | ✅ Sim | ⭐⭐⭐⭐ |
| AppCenter | ✅ Sim | ⭐⭐⭐ | ✅ Sim | ⭐⭐⭐ |
| Bitrise | ✅ Limitado | ⭐⭐⭐ | ✅ Sim | ⭐⭐⭐ |
| CircleCI | ✅ Limitado | ⭐⭐⭐ | ✅ Sim | ⭐⭐⭐ |

## 🚀 Recomendação: GitHub Actions

**Por quê?**
- ✅ Totalmente gratuito
- ✅ Muito fácil de usar
- ✅ Automático
- ✅ Não precisa do site estar no GitHub
- ✅ Apenas o código do frontend precisa estar lá

### Setup Rápido GitHub Actions:

1. **Crie repositório no GitHub:**
   - Vá em: https://github.com/new
   - Nome: `zard-apk` (ou qualquer nome)
   - Pode ser privado

2. **Faça upload do código:**
```bash
# No seu computador ou servidor
cd /var/www/html/zard-flashcard-mastery
git init
git add frontend/ .github/
git commit -m "Configurar build APK"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/zard-apk.git
git push -u origin main
```

3. **Aguarde o build:**
   - Vá em: `https://github.com/SEU-USUARIO/zard-apk/actions`
   - Aguarde alguns minutos

4. **Baixe o APK:**
   - Na aba "Actions", clique no workflow
   - Baixe o APK em "Artifacts"

## 🔄 Atualizar o APK

Sempre que quiser gerar um novo APK:

```bash
# Faça as mudanças no código
git add .
git commit -m "Atualizar app"
git push
```

O GitHub vai gerar um novo APK automaticamente!

## 💡 Dica: Sincronizar com InfinityFree

Você pode manter:
- **Código no GitHub** → Para gerar APK
- **Site na InfinityFree** → Para hospedagem web

Eles não precisam estar no mesmo lugar! O GitHub só precisa do código do frontend para gerar o APK.

## 🐛 Problemas Comuns

### "Não tenho Git instalado"

Use o GitHub Desktop ou faça upload manual via interface web do GitHub.

### "Não quero usar GitHub"

Use GitLab, AppCenter ou outro serviço da lista acima.

### "Quero gerar localmente mas não tenho Android Studio"

Use os scripts que criamos:
```bash
cd frontend
./build-apk.sh  # Linux/Mac
# OU
build-apk.bat   # Windows
```

## 📚 Próximos Passos

1. Escolha uma opção acima
2. Siga o passo a passo
3. Baixe e instale o APK
4. Pronto! 🎉

