# Zard Flashcard Mastery

Sistema de flashcards para estudos, separado em frontend (React) e backend (PHP com MySQL).

## Estrutura do Projeto

```
zard-flashcard-mastery/
├── frontend/          # Aplicação React/TypeScript
├── backend/           # API PHP
│   ├── api/          # Endpoints da API
│   ├── config/       # Configurações
│   └── database/     # Scripts SQL
└── README.md
```

## Requisitos

- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Node.js 18+ e npm
- Servidor web (Apache/Nginx)

## Instalação

### 1. Banco de Dados

1. Crie o banco de dados MySQL:
```bash
mysql -u root -p < backend/database/schema.sql
```

2. Configure as credenciais do banco em `backend/config/database.php`:
```php
private $host = "localhost";
private $db_name = "zard_flashcard";
private $username = "root";
private $password = "";
```

### 2. Backend PHP

1. Configure o servidor web para apontar para a pasta `backend/`
2. Certifique-se de que o módulo `mod_rewrite` está habilitado (Apache)
3. A API estará disponível em: `http://localhost/zard-flashcard-mastery/backend/api/`

### 3. Frontend React

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API no arquivo `.env` (opcional):
```env
VITE_API_URL=http://localhost/zard-flashcard-mastery/backend/api
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Endpoints da API

### Autenticação
- `POST /api/auth.php?action=login` - Login
- `POST /api/auth.php?action=register` - Registro

### Solicitações
- `GET /api/solicitacoes.php?status=pendente` - Listar solicitações
- `POST /api/solicitacoes.php` - Criar solicitação
- `PUT /api/solicitacoes.php` - Atualizar status da solicitação

### Matérias
- `GET /api/materias.php?user_id={id}` - Listar matérias
- `GET /api/materias.php?user_id={id}&id={id}` - Obter matéria
- `POST /api/materias.php` - Criar matéria
- `PUT /api/materias.php` - Atualizar matéria
- `DELETE /api/materias.php?user_id={id}&id={id}` - Deletar matéria

### Flashcards
- `GET /api/flashcards.php?user_id={id}` - Listar flashcards
- `GET /api/flashcards.php?user_id={id}&id={id}` - Obter flashcard
- `POST /api/flashcards.php` - Criar flashcard
- `PUT /api/flashcards.php` - Atualizar flashcard
- `DELETE /api/flashcards.php?user_id={id}&id={id}` - Deletar flashcard

### Admin
- `GET /api/admin.php?action=stats` - Estatísticas do sistema

## Usuário Padrão Admin

- Email: `admin@zard.com`
- Senha: `admin123`

## Desenvolvimento

### Backend
- PHP 7.4+
- PDO para MySQL
- Headers CORS configurados

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Produção

### Build do Frontend
```bash
cd frontend
npm run build
```

Os arquivos estarão em `frontend/dist/` e devem ser servidos por um servidor web.

### Backend
Configure o servidor web para servir os arquivos PHP da pasta `backend/`.

## Licença

Este projeto é privado.
