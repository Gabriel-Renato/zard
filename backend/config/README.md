# Configuração do Banco de Dados

## Arquivo: `database.php`

Este arquivo contém as credenciais de conexão com o banco de dados MySQL.

## Configurações Atuais (InfinityFree)

- **Host:** `sql100.byetcluster.com`
- **Database:** `if0_40649761_zard`
- **Username:** `if0_40649761`
- **Password:** `DxZ9y356rRbtkAj`

## ⚠️ IMPORTANTE - Segurança

**NUNCA commite este arquivo no Git com senhas reais!**

Se você usar controle de versão:
1. Adicione `config/database.php` ao `.gitignore`
2. Use `config.example.php` como template
3. Crie um `config/database.php` local apenas

## Testar Conexão

Para testar se a conexão está funcionando, você pode criar um arquivo de teste:

```php
<?php
require_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    echo "Conexão com o banco de dados estabelecida com sucesso!";
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
```

## Alterar Configurações

Se precisar alterar as credenciais, edite apenas estas linhas:

```php
private $host = "seu_host";
private $db_name = "seu_banco";
private $username = "seu_usuario";
private $password = "sua_senha";
```

