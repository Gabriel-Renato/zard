# 🚀 Como Usar Codemagic para Gerar App iOS

## ✅ Arquivo Criado

Criei o arquivo `frontend/codemagic.yaml` configurado para seu projeto Capacitor.

## 📋 Próximos Passos

### 1. Fazer Commit e Push

```bash
cd /var/www/html/zard-flashcard-mastery
git add frontend/codemagic.yaml frontend/ios/App/ExportOptions.plist
git commit -m "Adicionar configuração Codemagic para iOS"
git push
```

### 2. No Codemagic

1. **Clique em "Check for configuration files"** (botão azul)
   - Ou aguarde alguns segundos e atualize a página

2. **O Codemagic vai detectar o arquivo `codemagic.yaml`**

3. **Clique em "Start new build"**

4. **Aguarde o build terminar** (alguns minutos)

5. **Baixe o IPA gerado**

## ⚠️ Importante sobre Code Signing

O arquivo está configurado para **desenvolvimento** (sem assinatura). Para distribuir:

1. **Configure certificados no Codemagic:**
   - Vá em "Environment variables"
   - Adicione suas credenciais da Apple Developer

2. **Ou use TestFlight:**
   - Gere o IPA
   - Faça upload manual no App Store Connect
   - Distribua via TestFlight

## 🔧 Se Der Erro

Se o build falhar:

1. **Veja os logs** no Codemagic
2. **Verifique se:**
   - O caminho do projeto está correto (`frontend`)
   - As dependências estão instaladas
   - O Capacitor está sincronizado

## 📱 Instalar no iPhone

Após gerar o IPA:

1. **Via TestFlight:**
   - Upload no App Store Connect
   - Instale via TestFlight

2. **Instalação direta:**
   - Transfira IPA para iPhone
   - Confie no certificado
   - Instale

## ✅ Resumo

1. ✅ Arquivo `codemagic.yaml` criado
2. ⏳ Faça commit e push
3. ⏳ Clique em "Check for configuration files"
4. ⏳ Inicie o build
5. ⏳ Baixe o IPA

