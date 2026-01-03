@echo off
REM Script para gerar APK via linha de comando no Windows (sem Android Studio)
REM Uso: build-apk.bat [debug|release]

setlocal enabledelayedexpansion

set BUILD_TYPE=%1
if "%BUILD_TYPE%"=="" set BUILD_TYPE=debug

echo.
echo 🚀 Iniciando build do APK...
echo 📦 Tipo: %BUILD_TYPE%

REM Verifica se está no diretório correto
if not exist "android" (
    echo ❌ Erro: Execute este script da pasta frontend/
    exit /b 1
)

REM 1. Build do projeto web
echo.
echo 📱 Passo 1/3: Build do projeto web...
call npm run build
if errorlevel 1 (
    echo ❌ Erro no build do projeto web
    exit /b 1
)

REM 2. Sincronizar com Capacitor
echo.
echo 🔄 Passo 2/3: Sincronizando com Capacitor...
call npx cap sync android
if errorlevel 1 (
    echo ❌ Erro ao sincronizar com Capacitor
    exit /b 1
)

REM 3. Build do APK
echo.
echo 🔨 Passo 3/3: Gerando APK (%BUILD_TYPE%)...

cd android

if "%BUILD_TYPE%"=="release" (
    echo ⚠️  Para APK de release, você precisa configurar o keystore primeiro.
    echo 📝 Veja GERAR-APK.md para instruções de keystore.
    call gradlew.bat assembleRelease
    if errorlevel 1 (
        echo ❌ Erro ao gerar APK de release
        cd ..
        exit /b 1
    )
    set APK_PATH=app\build\outputs\apk\release\app-release.apk
    echo.
    echo ✅ APK de RELEASE gerado com sucesso!
) else (
    call gradlew.bat assembleDebug
    if errorlevel 1 (
        echo ❌ Erro ao gerar APK de debug
        cd ..
        exit /b 1
    )
    set APK_PATH=app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo ✅ APK de DEBUG gerado com sucesso!
)

cd ..

echo.
echo 🎉 Concluído! APK disponível em:
echo    frontend\android\%APK_PATH%
echo.
echo 💡 Para instalar no dispositivo conectado:
echo    adb install frontend\android\%APK_PATH%

