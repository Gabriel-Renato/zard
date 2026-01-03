# ⚙️ Configurar Codemagic para iOS

## 🔧 Configuração Atual

O Codemagic não detectou o app porque está procurando na raiz. Seu app está na pasta `frontend/`.

## ✅ Solução: Definir Tipo Manualmente

### Passo a Passo:

1. **Clique em "Defina o tipo manualmente"** (botão à direita)

2. **Configure o projeto:**
   - **Trajetória do projeto:** `frontend` (mude de "." para "frontend")
   - **Selecione a filial:** `main` (já está correto)

3. **Selecione o tipo de projeto:**
   - Escolha **"Capacitor"** ou **"Other"**
   - Platform: **iOS**

4. **Continue a configuração**

## 📋 Configurações Recomendadas

### Trajetória do Projeto:
```
frontend
```

### Branch:
```
main
```

### Tipo de Projeto:
- **Capacitor** (se disponível)
- Ou **Other** > **Capacitor**

### Platform:
- **iOS**

## 🎯 Próximos Passos Após Configurar

1. **Workflow será gerado automaticamente**
2. **Clique em "Start new build"**
3. **Aguarde o build terminar**
4. **Baixe o IPA gerado**

## 💡 Dica

Se não encontrar "Capacitor" nas opções:
- Escolha "Other"
- Configure manualmente os comandos de build
- Ou use "React Native" e ajuste depois

## 🔄 Comandos que o Codemagic Precisa

O workflow deve incluir:
```yaml
scripts:
  - npm ci
  - npm run build
  - npx cap sync ios
  - # Build iOS
```

## ✅ Resumo

1. Clique em **"Defina o tipo manualmente"**
2. Mude **Trajetória** de "." para **"frontend"**
3. Selecione tipo: **Capacitor** ou **Other**
4. Platform: **iOS**
5. Continue e inicie o build!

