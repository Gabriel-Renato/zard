# 📱 Como Gerar o APK do App Zard

Este guia explica como gerar o arquivo APK para instalar o app Zard em dispositivos Android.

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18 ou superior)
2. **Java JDK 11 ou superior** instalado
3. **Android Studio** instalado (para usar o Android SDK)
4. **Android SDK** configurado (via Android Studio)

### Instalar Android Studio

1. Baixe o Android Studio: https://developer.android.com/studio
2. Instale e abra o Android Studio
3. Vá em `Tools > SDK Manager`
4. Instale o SDK Platform Android (API 33 ou superior)
5. Instale o Android SDK Build-Tools
6. Configure a variável de ambiente `ANDROID_HOME`:
   - Linux/Mac: `export ANDROID_HOME=$HOME/Android/Sdk`
   - Windows: Adicione `ANDROID_HOME` nas variáveis de ambiente apontando para `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`

## 🚀 Passo a Passo

### 1. Build do Projeto Web

Primeiro, faça o build do projeto React:

```bash
cd frontend
npm run build
```

Isso criará a pasta `dist` com os arquivos otimizados.

### 2. Sincronizar com Capacitor

Sincronize os arquivos web com o projeto Android:

```bash
npm run cap:sync
```

Ou use o comando completo:

```bash
npm run android:build
```

### 3. Abrir no Android Studio

Abra o projeto Android no Android Studio:

```bash
npm run android:open
```

Ou manualmente:
- Abra o Android Studio
- Selecione `Open an Existing Project`
- Navegue até `frontend/android` e abra

### 4. Gerar o APK

#### Opção A: APK de Debug (para testes)

1. No Android Studio, vá em `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. Aguarde a compilação
3. O APK estará em: `frontend/android/app/build/outputs/apk/debug/app-debug.apk`

#### Opção B: APK de Release (para distribuição)

1. **Criar Keystore** (primeira vez apenas):
   ```bash
   cd frontend/android/app
   keytool -genkey -v -keystore zard-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias zard
   ```
   - Guarde a senha e as informações fornecidas!

2. **Configurar o build.gradle**:
   - Edite `frontend/android/app/build.gradle`
   - Adicione as configurações de signing (veja exemplo abaixo)

3. **Gerar APK de Release**:
   - No Android Studio: `Build > Generate Signed Bundle / APK`
   - Selecione `APK`
   - Escolha o keystore criado
   - Digite as senhas
   - O APK estará em: `frontend/android/app/build/outputs/apk/release/app-release.apk`

### 5. Instalar no Dispositivo

#### Via ADB (Android Debug Bridge)

```bash
# Conecte o dispositivo via USB e ative "Depuração USB"
adb install frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

#### Via Transferência Manual

1. Copie o arquivo APK para o dispositivo Android
2. Abra o arquivo no dispositivo
3. Permita instalação de fontes desconhecidas se solicitado
4. Instale o app

## 🔧 Comandos Úteis

```bash
# Build e sincronizar
npm run android:build

# Apenas sincronizar
npm run cap:sync

# Abrir Android Studio
npm run android:open

# Build do web apenas
npm run build
```

## 📝 Configuração de Release (build.gradle)

Adicione isso em `frontend/android/app/build.gradle` dentro de `android {`:

```gradle
signingConfigs {
    release {
        storeFile file('zard-release-key.jks')
        storePassword 'sua-senha-aqui'
        keyAlias 'zard'
        keyPassword 'sua-senha-aqui'
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

## ⚠️ Importante

- **Nunca commite o keystore ou senhas no Git!**
- Adicione `*.jks` e `*.keystore` no `.gitignore`
- O site web continua funcionando normalmente - o app é apenas uma versão nativa
- Para atualizar o app, faça `npm run build` e `npm run cap:sync` novamente

## 🐛 Solução de Problemas

### Erro: "SDK location not found"
Configure a variável `ANDROID_HOME` no seu sistema.

### Erro: "Java not found"
Instale o JDK e configure `JAVA_HOME`.

### Erro: "Gradle sync failed"
- Abra o Android Studio
- Vá em `File > Invalidate Caches / Restart`
- Selecione `Invalidate and Restart`

### App não carrega conteúdo
Verifique se a URL da API está acessível e se o `capacitor.config.ts` está correto.

## 📚 Documentação

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)

