# 🔧 Corrigir Erro: Java sem Compilador (Local)

## ❌ Problema

Erro ao gerar APK localmente:
```
Toolchain installation '/usr/lib/jvm/java-21-openjdk-amd64' does not provide the required capabilities: [JAVA_COMPILER]
```

## 🔍 Causa

Você tem apenas o **JRE** (Java Runtime Environment) instalado, mas precisa do **JDK** (Java Development Kit) completo que inclui o compilador `javac`.

## ✅ Solução

### Instalar JDK 21 Completo

Execute no terminal:

```bash
sudo apt update
sudo apt install -y openjdk-21-jdk
```

### Verificar Instalação

Após instalar, verifique:

```bash
# Verificar versão do Java
java -version

# Verificar se javac está instalado (deve funcionar agora)
javac -version

# Verificar JAVA_HOME
echo $JAVA_HOME
```

### Configurar JAVA_HOME (se necessário)

Se `JAVA_HOME` não estiver configurado:

```bash
# Adicionar ao ~/.bashrc ou ~/.zshrc
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# Recarregar
source ~/.bashrc
```

### Tentar Gerar APK Novamente

```bash
cd /var/www/html/zard-flashcard-mastery/frontend/android
./gradlew assembleDebug
```

## 🎯 Alternativa: Usar GitHub Actions

Se preferir não instalar localmente, você pode usar o GitHub Actions que já está configurado e funcionando:

1. Faça commit das mudanças
2. Push para GitHub
3. O workflow gera o APK automaticamente
4. Baixe o APK pronto

## 📋 Verificação Rápida

```bash
# Verificar se javac existe
which javac

# Se não existir, instale:
sudo apt install openjdk-21-jdk
```

## ✅ Após Instalar

O comando `./gradlew assembleDebug` deve funcionar e gerar o APK em:
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

