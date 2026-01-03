# 🚀 Comandos Rápidos para Gerar APK

## 🎯 Método Mais Rápido (SEM Android Studio)

```bash
cd frontend

# Gerar APK de Debug (testes)
npm run android:apk

# Gerar APK de Release (distribuição)
npm run android:apk:release
```

## 📝 Scripts Automáticos

### Linux/Mac:
```bash
cd frontend
./build-apk.sh          # APK de debug
./build-apk.sh release   # APK de release
```

### Windows:
```cmd
cd frontend
build-apk.bat          # APK de debug
build-apk.bat release  # APK de release
```

## 🔧 Comandos Manuais

```bash
cd frontend

# 1. Build do projeto web
npm run build

# 2. Sincronizar com Android
npm run cap:sync

# 3. Gerar APK (sem Android Studio)
cd android
./gradlew assembleDebug    # Linux/Mac
gradlew.bat assembleDebug  # Windows
```

## 📦 Localização do APK

- **Debug**: `frontend/android/app/build/outputs/apk/debug/app-debug.apk`
- **Release**: `frontend/android/app/build/outputs/apk/release/app-release.apk`

## 📱 Instalar no Dispositivo

```bash
# Via ADB (dispositivo conectado via USB)
adb install frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

## ⚠️ Pré-requisitos

1. **Java JDK 11+** instalado
2. **Android SDK** instalado (pode ser só Command Line Tools)
3. **ANDROID_HOME** configurado

Veja `GERAR-APK-SEM-ANDROID-STUDIO.md` para instruções detalhadas.

## 📱 O Site Continua Funcionando!

O app Android é apenas uma versão nativa do mesmo código. O site web não é afetado e continua funcionando normalmente.

