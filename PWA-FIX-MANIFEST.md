# 🔧 Correção do Erro de Manifest.json

## Problema
O navegador estava reportando erro de sintaxe no `manifest.json`:
```
Manifest: Line: 1, column: 1, Syntax error.
```

## Causa
O problema geralmente ocorre quando:
1. O servidor não está servindo o arquivo com o Content-Type correto (`application/manifest+json`)
2. O arquivo está sendo interceptado pelo rewrite do `.htaccess` e redirecionado para `index.html` (retornando HTML em vez de JSON)

## Solução Implementada

### 1. Atualização do `.htaccess`
Foram adicionadas as seguintes configurações:

```apache
# PWA - Configurar Content-Type para manifest.json
<IfModule mod_mime.c>
    AddType application/manifest+json .json
</IfModule>

# Exclusões no rewrite para arquivos PWA
RewriteCond %{REQUEST_URI} !^/manifest\.json$
RewriteCond %{REQUEST_URI} !^/service-worker\.js$
RewriteCond %{REQUEST_URI} !^/service-worker-register\.js$
RewriteCond %{REQUEST_URI} !^/icons/
```

### 2. O que foi feito:
- ✅ Configurado Content-Type correto para arquivos `.json`
- ✅ Excluído `manifest.json` do rewrite que redireciona para `index.html`
- ✅ Excluído `service-worker.js` e `service-worker-register.js` do rewrite
- ✅ Excluída a pasta `icons/` do rewrite

## Como Aplicar a Correção

### 1. Fazer Upload do `.htaccess` Atualizado
Certifique-se de que o arquivo `.htaccess` atualizado está no servidor na raiz do `htdocs/`.

### 2. Verificar no Navegador
1. Abra o DevTools (F12)
2. Vá na aba **Network** (Rede)
3. Recarregue a página (Ctrl+R ou F5)
4. Procure por `manifest.json` na lista
5. Clique nele e verifique:
   - **Status**: Deve ser `200 OK`
   - **Content-Type**: Deve ser `application/manifest+json` ou `application/json`
   - **Response**: Deve mostrar o JSON, não HTML

### 3. Verificar no Console
1. Abra o DevTools (F12)
2. Vá na aba **Console**
3. O erro `Manifest: Line: 1, column: 1, Syntax error` não deve mais aparecer
4. Vá em **Application** → **Manifest**
5. Deve mostrar o manifest carregado corretamente

## Teste Rápido

Acesse diretamente no navegador:
```
https://zardflashcard.gt.tc/manifest.json
```

**Resultado esperado:**
- Deve mostrar o JSON formatado
- **NÃO** deve mostrar HTML ou página de erro

**Se mostrar HTML:**
- O rewrite ainda está interceptando
- Verifique se o `.htaccess` foi atualizado corretamente
- Verifique se o arquivo `manifest.json` existe na raiz do servidor

## Troubleshooting

### Se o erro persistir:

1. **Verificar se o arquivo existe:**
   ```bash
   ls -la htdocs/manifest.json
   ```

2. **Verificar o conteúdo do arquivo:**
   ```bash
   cat htdocs/manifest.json | head -5
   ```
   Deve começar com `{` e não com `<!DOCTYPE` ou HTML

3. **Verificar permissões:**
   ```bash
   chmod 644 htdocs/manifest.json
   ```

4. **Limpar cache do navegador:**
   - Ctrl+Shift+Delete
   - Ou usar modo anônimo/privado

5. **Verificar logs do servidor:**
   - Procure por erros relacionados ao `.htaccess`
   - Alguns servidores podem não suportar `AddType`

### Alternativa se AddType não funcionar:

Se o servidor não suportar `AddType`, você pode criar um arquivo PHP para servir o manifest:

**Criar `manifest.php`:**
```php
<?php
header('Content-Type: application/manifest+json');
readfile(__DIR__ . '/manifest.json');
?>
```

E atualizar o `index.html`:
```html
<link rel="manifest" href="/manifest.php" />
```

## Status
✅ Correção aplicada no `.htaccess`
✅ Arquivos PWA excluídos do rewrite
✅ Content-Type configurado

**Próximo passo:** Fazer upload do `.htaccess` atualizado para o servidor.

