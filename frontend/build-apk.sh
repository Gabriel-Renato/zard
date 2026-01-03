#!/bin/bash

# Script para gerar APK via linha de comando (sem Android Studio)
# Uso: ./build-apk.sh [debug|release]

set -e

BUILD_TYPE=${1:-debug}

echo "🚀 Iniciando build do APK..."
echo "📦 Tipo: $BUILD_TYPE"

# Verifica se está no diretório correto
if [ ! -d "android" ]; then
    echo "❌ Erro: Execute este script da pasta frontend/"
    exit 1
fi

# 1. Build do projeto web
echo ""
echo "📱 Passo 1/3: Build do projeto web..."
npm run build

# 2. Sincronizar com Capacitor
echo ""
echo "🔄 Passo 2/3: Sincronizando com Capacitor..."
npx cap sync android

# 3. Build do APK
echo ""
echo "🔨 Passo 3/3: Gerando APK ($BUILD_TYPE)..."

cd android

# Torna gradlew executável (Linux/Mac)
chmod +x gradlew 2>/dev/null || true

# Build do APK
if [ "$BUILD_TYPE" = "release" ]; then
    echo "⚠️  Para APK de release, você precisa configurar o keystore primeiro."
    echo "📝 Veja GERAR-APK.md para instruções de keystore."
    ./gradlew assembleRelease
    
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
    echo ""
    echo "✅ APK de RELEASE gerado com sucesso!"
    echo "📦 Localização: $APK_PATH"
else
    ./gradlew assembleDebug
    
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "✅ APK de DEBUG gerado com sucesso!"
    echo "📦 Localização: $APK_PATH"
fi

cd ..

echo ""
echo "🎉 Concluído! APK disponível em:"
echo "   frontend/android/$APK_PATH"
echo ""
echo "💡 Para instalar no dispositivo conectado:"
echo "   adb install frontend/android/$APK_PATH"

