# 📱 Alternativas para Gerar App iOS (AppCenter Descontinuado)

## ⚠️ Importante

O **Visual Studio AppCenter foi descontinuado** em 31 de março de 2025. Precisamos usar outras alternativas.

## 🎯 Melhores Alternativas Gratuitas

### Opção 1: Codemagic (Recomendado - Gratuito)

**✅ Melhor opção agora!**

1. **Acesse:** https://codemagic.io
2. **Crie conta** (gratuita com 500 minutos/mês)
3. **Conecte repositório GitHub:**
   - Clique em "Add application"
   - Selecione GitHub
   - Escolha o repositório `zard`
4. **Configure workflow:**
   - Platform: **iOS**
   - Framework: **Capacitor**
   - Branch: `main`
5. **Inicie o build:**
   - Clique em "Start new build"
   - Aguarde alguns minutos
6. **Baixe o IPA:**
   - Após o build, baixe o IPA gerado

**Vantagens:**
- ✅ Gratuito (500 min/mês)
- ✅ Não precisa de Mac
- ✅ Fácil de configurar
- ✅ Suporta Capacitor

### Opção 2: Bitrise (Plano Gratuito)

1. **Acesse:** https://bitrise.io
2. **Crie conta** (plano gratuito disponível)
3. **Conecte repositório**
4. **Configure workflow iOS**
5. **Gere IPA automaticamente**

### Opção 3: EAS Build (Expo) - Se Usar Expo

Se você quiser migrar para Expo:
- https://expo.dev
- Gratuito com limites
- Fácil de usar

### Opção 4: GitHub Actions com macOS Runner (Pago)

O GitHub Actions oferece runners macOS, mas são **pagos**:
- $0.08 por minuto
- Não incluído no plano gratuito

### Opção 5: Mac Local (Se Você Tem Mac)

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
#    - Conecte iPhone via USB
#    - Selecione dispositivo
#    - Clique em "Run" (▶️)
```

## 🚀 Recomendação: Codemagic

**Por quê Codemagic?**
- ✅ Gratuito (500 minutos/mês)
- ✅ Não precisa de Mac
- ✅ Fácil configuração
- ✅ Suporta Capacitor nativamente
- ✅ Interface simples

## 📋 Passo a Passo Codemagic

### 1. Criar Conta

1. Acesse: https://codemagic.io
2. Clique em "Get started"
3. Crie conta (pode usar GitHub)

### 2. Adicionar App

1. Clique em "Add application"
2. Selecione "GitHub"
3. Autorize acesso
4. Selecione repositório `zard`
5. Clique em "Finish: Add application"

### 3. Configurar Build

1. **Platform:** iOS
2. **Project type:** Capacitor
3. **Branch:** main
4. **Build configuration:** Deixe padrão ou customize

### 4. Iniciar Build

1. Clique em "Start new build"
2. Aguarde alguns minutos
3. Baixe o IPA quando pronto

## 📱 Instalar no iPhone

### Via TestFlight (Recomendado)

1. **Faça upload no App Store Connect:**
   - Acesse: https://appstoreconnect.apple.com
   - Crie um app
   - Faça upload do IPA

2. **Instale no iPhone:**
   - Baixe TestFlight
   - Aceite convite
   - Instale o app

### Instalação Direta (Ad Hoc)

1. **Gere IPA assinado** com certificado
2. **Transfira para iPhone**
3. **Confie no certificado** em Configurações
4. **Instale o app**

## 🔄 Alternativa: Usar Apenas Android

Se gerar iOS for muito complicado, você pode:
- ✅ Focar apenas em Android (já está funcionando)
- ✅ Usar PWA no iPhone (funciona como app)
- ✅ Adicionar iOS depois quando tiver Mac

## 📚 Links Úteis

- [Codemagic](https://codemagic.io)
- [Bitrise](https://bitrise.io)
- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)

## 💡 Dica

O **Codemagic** é a melhor alternativa gratuita ao AppCenter. É fácil de usar e não precisa de Mac!

