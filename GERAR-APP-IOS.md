# 📱 Como Gerar App para iPhone (iOS)

## ⚠️ Importante sobre iOS

Gerar app para iPhone é **mais complexo** que Android porque:

1. **Requer macOS** - Só funciona em Mac (não Linux/Windows)
2. **Requer Xcode** - Ferramenta da Apple (só no Mac)
3. **Requer conta Apple Developer** - Para publicar na App Store ($99/ano)
4. **GitHub Actions** - Precisa de runner macOS (pago) ou usar serviços externos

## 🎯 Opções Disponíveis

### Opção 1: Usar Mac Local (Mais Fácil)

Se você tem um Mac:

```bash
cd frontend

# 1. Build do projeto
npm run build

# 2. Sincronizar iOS
npm run ios:sync

# 3. Abrir no Xcode
npm run ios:open

# 4. No Xcode:
#    - Conecte seu iPhone
#    - Selecione seu dispositivo
#    - Clique em "Run" (▶️)
```

### Opção 2: GitHub Actions com macOS Runner (Pago)

O GitHub Actions oferece runners macOS, mas são **pagos** (não incluídos no plano gratuito).

### Opção 3: Serviços Online (Recomendado)

#### A. AppCenter (Microsoft) - Gratuito

1. Acesse: https://appcenter.ms
2. Crie conta e projeto
3. Conecte repositório GitHub
4. Configure build para iOS
5. Gere IPA automaticamente

#### B. Bitrise - Plano Gratuito Disponível

1. Acesse: https://bitrise.io
2. Conecte repositório
3. Configure workflow iOS
4. Gere app

#### C. Codemagic - Plano Gratuito Disponível

1. Acesse: https://codemagic.io
2. Conecte repositório
3. Configure build iOS
4. Gere IPA

## 📋 Pré-requisitos para iOS

1. **Conta Apple Developer** (para publicar na App Store)
   - Gratuita: Para testar no seu iPhone
   - Paga ($99/ano): Para publicar na App Store

2. **Certificados e Provisioning Profiles**
   - Configurados no Apple Developer Portal
   - Necessários para assinar o app

## 🚀 Setup Inicial (Mac)

Se você tem Mac:

```bash
# 1. Instalar Xcode (via App Store)
# 2. Instalar CocoaPods
sudo gem install cocoapods

# 3. No projeto
cd frontend
npm run build
npx cap sync ios
npx cap open ios

# 4. No Xcode, configure:
#    - Team (sua conta Apple)
#    - Bundle Identifier
#    - Certificados
```

## 📦 Gerar IPA (para distribuição)

### Via Xcode (Mac):

1. Abra o projeto no Xcode
2. Product > Archive
3. Organizer > Distribute App
4. Escolha método (App Store, Ad Hoc, Enterprise)
5. Gere IPA

### Via Linha de Comando (Mac):

```bash
cd frontend/ios/App
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -configuration Release \
  -archivePath build/App.xcarchive \
  archive

xcodebuild -exportArchive \
  -archivePath build/App.xcarchive \
  -exportPath build \
  -exportOptionsPlist ExportOptions.plist
```

## 🔄 Workflow GitHub Actions para iOS

Para gerar automaticamente (requer runner macOS):

```yaml
jobs:
  build-ios:
    runs-on: macos-latest  # Runner macOS (pago)
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Sync iOS
        run: npx cap sync ios
      - name: Build IPA
        run: |
          cd ios/App
          xcodebuild archive ...
```

## 💡 Recomendação

Para iOS, recomendo usar **AppCenter** ou **Codemagic**:
- ✅ Gratuito (com limites)
- ✅ Não precisa de Mac
- ✅ Automático
- ✅ Fácil de configurar

## 📚 Recursos

- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [AppCenter Docs](https://docs.microsoft.com/appcenter)
- [Codemagic Docs](https://docs.codemagic.io)

## ⚠️ Diferenças Android vs iOS

| Aspecto | Android | iOS |
|---------|---------|-----|
| APK/IPA | APK | IPA |
| Sistema | Linux/Windows/Mac | Apenas Mac |
| Ferramenta | Android Studio | Xcode |
| Conta | Google Play ($25) | Apple Developer ($99/ano) |
| GitHub Actions | Ubuntu (gratuito) | macOS (pago) |

## 🎯 Resumo

- ✅ **Android**: Já configurado e funcionando
- ⚠️ **iOS**: Requer Mac ou serviço online (AppCenter/Codemagic)

Para iOS, a forma mais fácil é usar **AppCenter** ou **Codemagic** (gratuitos e não precisam de Mac).

