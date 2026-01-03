# ✅ Arquivo Codemagic Corrigido - Copie e Cole

## 📋 Copie Este Arquivo Completo no Codemagic

Vá em **Settings** > **codemagic.yaml** no Codemagic e **SUBSTITUA TUDO** por este conteúdo:

```yaml
workflows:
  ios-workflow:
    name: iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    environment:
      vars:
        XCODE_PROJECT: "ios/App/App.xcodeproj"
        XCODE_SCHEME: "App"
        BUNDLE_ID: "com.zard.flashcard"
        APP_ID: 69587605cd4ec8cbc103fc68
      node: 22
      xcode: latest
    scripts:
      - name: Install dependencies
        script: |
          npm ci
      - name: Build web assets
        script: |
          npm run build
      - name: Sync Capacitor
        script: |
          npx cap sync ios
      - name: Build ipa for distribution
        script: |
          cd ios/App
          xcodebuild archive \
            -project "App.xcodeproj" \
            -scheme "$XCODE_SCHEME" \
            -archivePath $CM_BUILD_DIR/build/App.xcarchive \
            CODE_SIGN_IDENTITY="" \
            CODE_SIGNING_REQUIRED=NO \
            CODE_SIGNING_ALLOWED=NO
      - name: Export IPA
        script: |
          xcodebuild -exportArchive \
            -archivePath $CM_BUILD_DIR/build/App.xcarchive \
            -exportPath $CM_BUILD_DIR/build/ipa \
            -exportOptionsPlist ios/App/ExportOptions.plist
    artifacts:
      - build/ipa/*.ipa
    publishing:
      email:
        recipients:
          - gabrielrenatosouzadearaujo@gmail.com
        notify:
          success: true
          failure: false
```

## ✅ O Que Foi Removido

- ❌ `cocoapods: default` (removido)
- ❌ `Install CocoaPods dependencies` (removido)
- ❌ `groups: app_store_credentials` (removido - não necessário agora)
- ❌ `XCODE_WORKSPACE` (mudado para `XCODE_PROJECT`)
- ❌ `cd frontend` (removido - workflow já roda em frontend)
- ❌ `xcode-project use-profiles` (removido - não necessário sem assinatura)

## ✅ O Que Foi Corrigido

- ✅ Usa `XCODE_PROJECT` ao invés de `XCODE_WORKSPACE`
- ✅ Caminhos corretos (sem `frontend/` extra)
- ✅ Build simplificado
- ✅ Sem CocoaPods

## 🚀 Após Copiar

1. **Salve o arquivo** no Codemagic
2. **Inicie um novo build**
3. **Deve funcionar agora!**

## 📝 Passos do Workflow

1. Install dependencies (npm ci)
2. Build web assets (npm run build)
3. Sync Capacitor (npx cap sync ios)
4. Build ipa (xcodebuild archive)
5. Export IPA (xcodebuild -exportArchive)

**Total: 5 passos (sem CocoaPods!)**

