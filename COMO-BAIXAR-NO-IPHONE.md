# 📱 Como Baixar o App no iPhone

## ⚠️ Importante

O workflow atual do GitHub só gera **APK (Android)**. Para iPhone, você precisa gerar um **IPA (iOS)**.

## 🎯 Opções para Gerar App iOS

### Opção 1: AppCenter (Recomendado - Gratuito e Fácil)

**Não precisa de Mac!**

1. **Acesse:** https://appcenter.ms
2. **Crie uma conta** (gratuita)
3. **Crie um novo app:**
   - Clique em "Add new app"
   - Nome: "Zard"
   - OS: **iOS**
   - Platform: **React Native** (ou Capacitor)
4. **Conecte seu repositório:**
   - Vá em "Build" > "Connect repository"
   - Conecte com GitHub
   - Selecione o repositório `zard`
5. **Configure o build:**
   - Branch: `main`
   - Build script: Deixe padrão ou configure se necessário
6. **Inicie o build:**
   - Clique em "Save & Build"
   - Aguarde alguns minutos
7. **Baixe o IPA:**
   - Após o build, vá em "Distribute" > "Groups"
   - Baixe o IPA gerado

### Opção 2: Codemagic (Gratuito - Alternativa)

1. **Acesse:** https://codemagic.io
2. **Conecte repositório GitHub**
3. **Configure workflow iOS**
4. **Gere IPA automaticamente**

### Opção 3: Se Você Tem Mac

Se você tem um Mac:

```bash
cd /var/www/html/zard-flashcard-mastery/frontend

# 1. Build
npm run build

# 2. Sincronizar iOS
npm run ios:sync

# 3. Abrir no Xcode
npm run ios:open

# 4. No Xcode:
#    - Conecte seu iPhone via USB
#    - Selecione seu dispositivo
#    - Clique em "Run" (▶️)
#    - O app será instalado diretamente no iPhone
```

## 📱 Instalar no iPhone

### Método 1: Via TestFlight (Recomendado)

1. **Gere o IPA** (via AppCenter ou Mac)
2. **Faça upload no TestFlight:**
   - Acesse: https://appstoreconnect.apple.com
   - Crie um app
   - Faça upload do IPA
3. **Instale no iPhone:**
   - Baixe o app TestFlight
   - Aceite o convite
   - Instale o app

### Método 2: Instalação Direta (Ad Hoc)

1. **Gere IPA assinado** com seu certificado
2. **Transfira para iPhone:**
   - Via iTunes/Finder (Mac)
   - Via AirDrop
   - Via email/iCloud
3. **Instale:**
   - Abra o arquivo .ipa no iPhone
   - Vá em Configurações > Geral > Gerenciar VPN e Perfis
   - Confie no certificado
   - Instale o app

### Método 3: Via Xcode (Mac)

1. **Conecte iPhone via USB**
2. **No Xcode, selecione seu dispositivo**
3. **Clique em "Run"**
4. **O app será instalado automaticamente**

## 🔐 Requisitos para iOS

### Conta Apple Developer

- **Gratuita:** Para testar no seu iPhone (limitado)
- **Paga ($99/ano):** Para publicar na App Store

### Certificados

Você precisa de:
- **Certificado de Desenvolvimento**
- **Provisioning Profile**
- Configurados no Apple Developer Portal

## 🚀 Recomendação Rápida

**Use AppCenter:**
1. ✅ Gratuito
2. ✅ Não precisa de Mac
3. ✅ Fácil de configurar
4. ✅ Gera IPA automaticamente
5. ✅ Pode distribuir via link

## 📋 Passo a Passo AppCenter

1. Acesse: https://appcenter.ms
2. Crie conta (gratuita)
3. "Add new app" > iOS
4. Conecte repositório GitHub
5. Configure build
6. Build > Save & Build
7. Aguarde e baixe o IPA

## 💡 Dica

O AppCenter também pode gerar **APK para Android**, então você pode usar o mesmo serviço para ambos!

## 📚 Links Úteis

- [AppCenter Docs](https://docs.microsoft.com/appcenter)
- [Capacitor iOS](https://capacitorjs.com/docs/ios)
- [Apple Developer](https://developer.apple.com)

