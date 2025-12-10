# Guia de Instalação - Zard Flashcard Mastery

## Pré-requisitos

- PHP 7.4 ou superior com extensões: PDO, pdo_mysql
- MySQL 5.7 ou superior (ou MariaDB 10.3+)
- Node.js 18+ e npm
- Servidor web (Apache com mod_rewrite ou Nginx)

## Passo 1: Configurar o Banco de Dados

1. Acesse o MySQL:
```bash
mysql -u root -p
```

2. Execute o script de criação do banco:
```bash
mysql -u root -p < backend/database/schema.sql
```

Ou copie e cole o conteúdo de `backend/database/schema.sql` no MySQL.

3. Verifique se o banco foi criado:
```sql
USE zard_flashcard;
SHOW TABLES;
```

## Passo 2: Configurar o Backend PHP

1. Edite o arquivo `backend/config/database.php` e ajuste as credenciais:
```php
private $host = "localhost";
private $db_name = "zard_flashcard";
private $username = "root";  // Seu usuário MySQL
private $password = "";      // Sua senha MySQL
```

2. Configure o servidor web:

### Apache
Certifique-se de que o `mod_rewrite` está habilitado:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

O arquivo `.htaccess` já está configurado na pasta `backend/`.

### Nginx
Adicione ao seu arquivo de configuração:
```nginx
location /zard-flashcard-mastery/backend {
    try_files $uri $uri/ /zard-flashcard-mastery/backend/api/index.php?$query_string;
}
```

3. Teste a API:
```bash
curl http://localhost/zard-flashcard-mastery/backend/api/admin.php?action=stats
```

Deve retornar um JSON com as estatísticas.

## Passo 3: Configurar o Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. (Opcional) Configure a URL da API criando um arquivo `.env`:
```env
VITE_API_URL=http://localhost/zard-flashcard-mastery/backend/api
```

Se não criar o `.env`, a URL padrão será usada.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:8080`

## Passo 4: Testar o Sistema

1. Acesse `http://localhost:8080`
2. Clique em "Login"
3. Use as credenciais do admin:
   - Email: `admin@zard.com`
   - Senha: `admin123`

4. Ou solicite um novo cadastro através de "Solicitar cadastro"

## Estrutura de URLs

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost/zard-flashcard-mastery/backend/api/`

## Solução de Problemas

### Erro de conexão com o banco
- Verifique se o MySQL está rodando
- Confirme as credenciais em `backend/config/database.php`
- Teste a conexão manualmente no MySQL

### Erro 404 na API
- Verifique se o `mod_rewrite` está habilitado (Apache)
- Confirme que o `.htaccess` está na pasta `backend/`
- Verifique as permissões dos arquivos

### CORS errors no frontend
- Os headers CORS já estão configurados no `backend/api/config.php`
- Verifique se a URL da API está correta no `.env`

### Erro ao fazer login
- Verifique se o banco de dados foi criado corretamente
- Confirme que o usuário admin foi inserido (verifique no MySQL)

## Produção

### Build do Frontend
```bash
cd frontend
npm run build
```

Os arquivos estarão em `frontend/dist/` - configure seu servidor web para servir esses arquivos.

### Backend
Certifique-se de que:
- PHP está configurado corretamente
- As permissões dos arquivos estão corretas
- O banco de dados está acessível
- As credenciais do banco estão seguras (não commite o arquivo `config.php`)

## Suporte

Em caso de problemas, verifique:
1. Logs do PHP (`/var/log/apache2/error.log` ou similar)
2. Console do navegador (F12)
3. Logs do MySQL

