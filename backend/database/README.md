# Banco de Dados - Zard Flashcard Mastery

## 📋 Arquivos SQL Disponíveis

### 1. `schema.sql` - Schema Básico
Schema original do projeto com estrutura mínima.

### 2. `banco_completo.sql` - Script Completo (RECOMENDADO)
Script completo e documentado com:
- Criação do banco de dados
- Todas as tabelas necessárias
- Índices otimizados
- Usuário admin padrão
- Comentários explicativos

## 🚀 Como Usar

### Opção 1: Via linha de comando (MySQL)

```bash
mysql -u root -p < banco_completo.sql
```

Ou se preferir especificar o banco:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zard_flashcard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p zard_flashcard < banco_completo.sql
```

### Opção 2: Via phpMyAdmin

1. Acesse o phpMyAdmin
2. Clique em "Importar" (Import)
3. Selecione o arquivo `banco_completo.sql`
4. Clique em "Executar" (Go)

### Opção 3: Via MySQL Workbench

1. Abra o MySQL Workbench
2. Conecte ao servidor
3. File → Open SQL Script
4. Selecione `banco_completo.sql`
5. Execute o script (⚡)

## 🔑 Credenciais Padrão

Após executar o script, você terá:

**Administrador:**
- Email: `admin@zard.com`
- Senha: `admin123`

⚠️ **IMPORTANTE**: Altere a senha do admin após o primeiro acesso!

## 📊 Estrutura das Tabelas

### usuarios
Armazena os usuários do sistema (admin e estudantes).

### solicitacoes_cadastro
Solicitações de novos cadastros aguardando aprovação.

### materias
Matérias/disciplinas criadas pelos usuários.

### flashcards
Cartões de estudo (pergunta e resposta).

### revisoes
Histórico de revisões dos flashcards (para estatísticas futuras).

## 🔍 Verificar se Funcionou

Execute no MySQL:

```sql
USE zard_flashcard;

-- Ver tabelas criadas
SHOW TABLES;

-- Ver usuário admin
SELECT * FROM usuarios WHERE email = 'admin@zard.com';

-- Contar registros
SELECT 
    (SELECT COUNT(*) FROM usuarios) as usuarios,
    (SELECT COUNT(*) FROM materias) as materias,
    (SELECT COUNT(*) FROM flashcards) as flashcards,
    (SELECT COUNT(*) FROM solicitacoes_cadastro) as solicitacoes;
```

## 🛠️ Configuração do Backend

Depois de criar o banco, configure em `backend/config/database.php`:

```php
private $host = "localhost";
private $db_name = "zard_flashcard";
private $username = "root";      // Seu usuário MySQL
private $password = "";           // Sua senha MySQL
```

## 📝 Notas

- O banco usa **UTF-8** (utf8mb4) para suportar emojis e caracteres especiais
- Todas as tabelas usam **InnoDB** para suportar foreign keys
- Os índices foram criados para melhorar performance
- A tabela `flashcards` tem índice FULLTEXT para buscas futuras

## 🔄 Resetar o Banco (CUIDADO!)

Se precisar recriar o banco do zero:

```sql
DROP DATABASE IF EXISTS zard_flashcard;
-- Depois execute novamente o banco_completo.sql
```

