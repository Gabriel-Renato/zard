# 🚀 Como Executar o Workflow Manualmente

## ⚡ Método Rápido (Recomendado)

1. **Acesse o GitHub:**
   - Vá em: `https://github.com/Gabriel-Renato/zard/actions`

2. **Clique em "Build Android APK":**
   - No menu lateral esquerdo, clique em "Build Android APK"

3. **Execute manualmente:**
   - No canto superior direito, clique no botão **"Run workflow"**
   - Selecione a branch: **"main"**
   - Clique em **"Run workflow"** (botão verde)

4. **Aguarde:**
   - O workflow será executado imediatamente
   - Aguarde alguns minutos para o build terminar

## 🔄 Por Que Não Executou Automaticamente?

O workflow está configurado para executar apenas quando há mudanças em:
- `frontend/**` (arquivos do frontend)

Como você mudou apenas `.github/workflows/build-apk.yml`, ele não executou automaticamente.

## 💡 Alternativa: Disparar Automaticamente

Se quiser que execute automaticamente, faça uma pequena mudança no frontend:

```bash
# Adicionar um comentário em qualquer arquivo do frontend
echo "// Build APK" >> frontend/src/App.tsx
git add frontend/src/App.tsx
git commit -m "Trigger workflow"
git push
```

Mas o método manual é mais rápido! 🚀

