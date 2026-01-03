# 🔍 Como Verificar o Erro do Workflow

## 📋 Passo a Passo para Ver os Logs

1. **Clique no workflow que falhou:**
   - Na página do GitHub Actions, clique em "Build Android APK #1" (o que tem o X vermelho)

2. **Veja os detalhes:**
   - Você verá uma lista de steps (passos)
   - O step que falhou terá um X vermelho

3. **Clique no step que falhou:**
   - Geralmente é "Sincronizar Capacitor" ou "Gerar APK Debug"
   - Isso abrirá os logs completos

4. **Procure pela mensagem de erro:**
   - Procure por palavras como "Error", "Failed", "Exception"
   - A última linha geralmente mostra o erro específico

## 🔧 Erros Comuns e Soluções

### Erro: "Android project not found"
**Solução:** O projeto Android precisa estar no repositório ou será criado automaticamente.

### Erro: "Capacitor sync failed"
**Solução:** Pode ser problema de dependências ou configuração.

### Erro: "Gradle build failed"
**Solução:** Verifique se todas as dependências estão corretas.

### Erro: "Permission denied"
**Solução:** Problema de permissões no workflow.

## 💡 Próximos Passos

1. Veja os logs completos do erro
2. Copie a mensagem de erro específica
3. Me envie o erro para eu ajudar a corrigir

Ou você pode tentar executar manualmente novamente:
- Vá em "Actions" > "Build Android APK"
- Clique em "Run workflow"
- Selecione "main" e execute

