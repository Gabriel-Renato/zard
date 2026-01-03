# 🔧 Solução: Erro no Build do APK no GitHub Actions

## ❌ Erro Comum: "Sincronizar Capacitor" falha

### Problema

O workflow falha no passo "Sincronizar Capacitor" com erro:
```
Process completed with exit code 1
```

### ✅ Solução

O workflow foi atualizado para:

1. **Verificar se o projeto Android existe** antes de sincronizar
2. **Criar o projeto Android automaticamente** se não existir
3. **Tratar erros** de forma mais robusta

### 🔄 Como Aplicar a Correção

1. **Faça commit das mudanças:**
```bash
git add .github/workflows/build-apk.yml
git commit -m "Corrigir workflow de build APK"
git push
```

2. **O workflow será executado novamente automaticamente**

3. **Aguarde o build terminar**

### 📋 Verificações

Se ainda der erro, verifique:

1. **Projeto Android no repositório:**
   - O projeto Android (`frontend/android/`) deve estar commitado
   - Ou o workflow vai criá-lo automaticamente

2. **Estrutura do projeto:**
   - `frontend/capacitor.config.ts` deve existir
   - `frontend/package.json` deve ter as dependências do Capacitor

3. **Logs do workflow:**
   - Veja os logs completos na aba "Actions"
   - Procure por mensagens de erro específicas

### 🐛 Outros Erros Possíveis

#### Erro: "Android SDK not found"
- O workflow já configura o Android SDK automaticamente
- Se persistir, verifique os logs

#### Erro: "Gradle build failed"
- Pode ser problema de dependências
- Verifique se `frontend/android/build.gradle` está correto

#### Erro: "Node modules not found"
- O workflow instala dependências automaticamente
- Se persistir, pode ser problema de cache

### 💡 Dica

Se o erro persistir:
1. Veja os logs completos na aba "Actions"
2. Procure pela mensagem de erro específica
3. Verifique se todas as pastas necessárias estão no repositório

### ✅ Workflow Atualizado

O workflow agora:
- ✅ Verifica se Android existe antes de sincronizar
- ✅ Cria Android automaticamente se necessário
- ✅ Trata erros de forma mais robusta
- ✅ Mostra mensagens claras de progresso

