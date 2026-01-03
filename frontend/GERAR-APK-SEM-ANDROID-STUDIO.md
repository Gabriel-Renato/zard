# 📱 Gerar APK SEM Android Studio (Linha de Comando)

Este guia mostra como gerar o APK usando apenas a linha de comando, sem precisar do Android Studio.

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18 ou superior)
2. **Java JDK 11 ou superior** instalado
3. **Android SDK** instalado (pode ser via Android Studio ou SDK Command Line Tools)

### Instalar Android SDK (sem Android Studio completo)

#### Opção 1: SDK Command Line Tools (Recomendado - mais leve)

1. Baixe o SDK Command Line Tools: https://developer.android.com/studio#command-tools
2. Extraia em uma pasta (ex: `~/Android/Sdk`)
3. Configure variáveis de ambiente:

**Linux/Mac:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

Adicione ao `~/.bashrc` ou `~/.zshrc`:
```bash
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

**Windows:**
- Adicione `ANDROID_HOME` nas variáveis de ambiente: `C:\Users\SeuUsuario\Android\Sdk`
- Adicione ao PATH: `%ANDROID_HOME%\tools` e `%ANDROID_HOME%\platform-tools`

4. Instale o SDK Platform:
```bash
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
```

#### Opção 2: Instalar Android Studio (mas não precisa usar)

Se você já tem Android Studio instalado, apenas configure o `ANDROID_HOME`:
- Linux/Mac: `export ANDROID_HOME=$HOME/Android/Sdk`
- Windows: `ANDROID_HOME=C:\Users\SeuUsuario\AppData\Local\Android\Sdk`

## 🚀 Método 1: Script Automático (Mais Fácil)

### Linux/Mac:

```bash
cd frontend
./build-apk.sh
```

Para APK de release:
```bash
./build-apk.sh release
```

### Windows:

```cmd
cd frontend
build-apk.bat
```

Para APK de release:
```cmd
build-apk.bat release
```

## 🚀 Método 2: Comandos NPM (Recomendado)

```bash
cd frontend

# APK de Debug (para testes)
npm run android:apk

# APK de Release (para distribuição)
npm run android:apk:release
```

## 🚀 Método 3: Comandos Manuais

```bash
cd frontend

# 1. Build do projeto web
npm run build

# 2. Sincronizar com Capacitor
npx cap sync android

# 3. Gerar APK de Debug
cd android
./gradlew assembleDebug  # Linux/Mac
# OU
gradlew.bat assembleDebug  # Windows

# 4. APK estará em:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 📦 Localização do APK

Após o build, o APK estará em:

- **Debug**: `frontend/android/app/build/outputs/apk/debug/app-debug.apk`
- **Release**: `frontend/android/app/build/outputs/apk/release/app-release.apk`

## 📱 Instalar no Dispositivo

### Via ADB (Android Debug Bridge)

1. Conecte o dispositivo via USB
2. Ative "Depuração USB" nas opções de desenvolvedor
3. Instale o APK:

```bash
adb install frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Transferência Manual

1. Copie o arquivo APK para o dispositivo
2. Abra o arquivo no dispositivo
3. Permita instalação de fontes desconhecidas
4. Instale o app

## 🔐 APK de Release (Assinado)

Para gerar um APK de release assinado (necessário para publicar na Play Store):

### 1. Criar Keystore

```bash
cd frontend/android/app
keytool -genkey -v -keystore zard-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias zard
```

Guarde a senha e informações fornecidas!

### 2. Configurar build.gradle

Edite `frontend/android/app/build.gradle` e adicione dentro de `android {`:

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

### 3. Gerar APK de Release

```bash
cd frontend/android
./gradlew assembleRelease
```

## 🐛 Solução de Problemas

### Erro: "SDK location not found"

Configure `ANDROID_HOME`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

### Erro: "Java not found"

Instale o JDK e configure `JAVA_HOME`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64  # Ajuste o caminho
```

### Erro: "gradlew: command not found"

Torne o script executável:
```bash
chmod +x frontend/android/gradlew
```

### Erro: "Failed to find target with hash string"

Instale o SDK Platform necessário:
```bash
sdkmanager "platforms;android-33"
```

### Erro: "Build failed"

Limpe o build anterior:
```bash
cd frontend/android
./gradlew clean
./gradlew assembleDebug
```

## ✅ Verificação Rápida

Teste se tudo está configurado:

```bash
# Verificar Java
java -version

# Verificar Android SDK
echo $ANDROID_HOME  # Linux/Mac
echo %ANDROID_HOME%  # Windows

# Verificar Gradle
cd frontend/android
./gradlew --version
```

## 📚 Comandos Úteis

```bash
# Limpar build anterior
cd frontend/android && ./gradlew clean

# Ver tarefas disponíveis
cd frontend/android && ./gradlew tasks

# Build apenas do app
cd frontend/android && ./gradlew :app:assembleDebug

# Ver informações do APK gerado
cd frontend/android && ./gradlew :app:assembleDebug --info
```

## ⚠️ Importante

- **Nunca commite o keystore ou senhas no Git!**
- Adicione `*.jks` e `*.keystore` no `.gitignore`
- O site web continua funcionando normalmente
- Para atualizar o app, refaça o build: `npm run build && npx cap sync android`

