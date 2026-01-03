# 🌐 Gerar APK Online (GitHub Actions)

Este guia mostra como gerar o APK automaticamente online usando GitHub Actions, sem precisar instalar nada no seu computador!

> **💡 Importante:** Mesmo que seu site esteja hospedado na InfinityFree (ou qualquer outro serviço), você pode usar o GitHub **apenas para gerar o APK**. O GitHub não precisa hospedar seu site, apenas ter o código do frontend para gerar o APK automaticamente.

## 🚀 Como Funciona

O GitHub Actions irá:
1. ✅ Fazer build do projeto automaticamente
2. ✅ Gerar o APK quando você fizer push no código
3. ✅ Disponibilizar o APK para download

## 📋 Pré-requisitos

1. **Conta no GitHub** (gratuita)
2. **Repositório no GitHub** com seu código

## 🎯 Passo a Passo

### 1. Fazer Push do Código para o GitHub

Se ainda não fez push:

```bash
git add .
git commit -m "Adicionar configuração para gerar APK"
git push origin main
```

### 2. Verificar o Workflow

1. Vá para seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Você verá o workflow **"Build Android APK"** executando
4. Aguarde alguns minutos (primeira vez pode demorar mais)

### 3. Baixar o APK

#### Opção A: Via Artifacts (Qualquer Push)

1. Na aba **"Actions"**, clique no workflow que executou
2. Role até a seção **"Artifacts"**
3. Clique em **"app-debug-apk"** para baixar

#### Opção B: Via Release (Apenas Push para main/master)

1. Vá para a aba **"Releases"** no repositório
2. Você verá uma nova release criada automaticamente
3. Baixe o APK da release

### 4. Executar Manualmente (Opcional)

Se quiser gerar APK sem fazer push:

1. Vá para **"Actions"**
2. Selecione **"Build Android APK"**
3. Clique em **"Run workflow"**
4. Selecione a branch e clique em **"Run workflow"**

## 📱 Instalar o APK

1. Baixe o APK do GitHub
2. Transfira para seu dispositivo Android
3. Abra o arquivo no dispositivo
4. Permita instalação de fontes desconhecidas
5. Instale o app

## 🔧 Configurações Avançadas

### Gerar APK de Release (Assinado)

Para gerar APK de release assinado, você precisa:

1. **Criar um Keystore** (localmente):
```bash
keytool -genkey -v -keystore zard-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias zard
```

2. **Adicionar como Secret no GitHub**:
   - Vá em **Settings > Secrets and variables > Actions**
   - Adicione os seguintes secrets:
     - `KEYSTORE_BASE64`: Base64 do keystore (gerar com: `base64 zard-release-key.jks`)
     - `KEYSTORE_PASSWORD`: Senha do keystore
     - `KEY_ALIAS`: `zard`
     - `KEY_PASSWORD`: Senha da chave

3. **Modificar o workflow** para usar o keystore (veja exemplo abaixo)

### Workflow com Keystore (Release)

Adicione estes steps no workflow antes de `Gerar APK Debug`:

```yaml
- name: Configurar Keystore
  working-directory: ./frontend/android/app
  env:
    KEYSTORE_BASE64: ${{ secrets.KEYSTORE_BASE64 }}
    KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
    KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
    KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
  run: |
    echo "$KEYSTORE_BASE64" | base64 -d > zard-release-key.jks
    # Adicionar configuração de signing no build.gradle
```

## 🐛 Solução de Problemas

### Workflow não executa

- Verifique se o arquivo `.github/workflows/build-apk.yml` está no repositório
- Verifique se fez push para a branch `main` ou `master`
- Verifique se há mudanças na pasta `frontend/`

### Erro no build

- Verifique os logs na aba "Actions"
- Erros comuns:
  - Dependências faltando: adicione no `package.json`
  - Erro de sintaxe: corrija no código

### APK não aparece

- Verifique se o build foi concluído com sucesso
- Verifique a seção "Artifacts" na execução do workflow
- Artifacts ficam disponíveis por 30 dias

## 📊 Monitoramento

Você pode ver o status do build:
- ✅ Verde: Sucesso
- ❌ Vermelho: Erro (veja logs)
- 🟡 Amarelo: Em execução

## 🔄 Atualizar o App

Sempre que você fizer push de mudanças no código:

1. O GitHub Actions detecta automaticamente
2. Gera um novo APK
3. Disponibiliza para download

## 💡 Dicas

- **Notificações**: Configure notificações do GitHub para saber quando o build termina
- **Badge de Status**: Adicione um badge no README mostrando o status do build
- **Automação**: Configure para gerar APK apenas em tags/releases específicas

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Android Setup Action](https://github.com/android-actions/setup-android)
- [Capacitor Docs](https://capacitorjs.com/docs)

## ⚠️ Importante

- O APK gerado é de **DEBUG** (para testes)
- Para produção, configure o keystore e gere APK de **RELEASE**
- Artifacts ficam disponíveis por **30 dias**
- Releases ficam disponíveis **permanentemente**

