<?php
// Página inicial da API - listar endpoints disponíveis
header('Content-Type: application/json; charset=utf-8');

$endpoints = [
    'autenticação' => [
        'POST /api/auth.php?action=login' => 'Fazer login',
        'POST /api/auth.php?action=register' => 'Registrar usuário',
    ],
    'solicitações' => [
        'GET /api/solicitacoes.php?status={status}' => 'Listar solicitações',
        'POST /api/solicitacoes.php' => 'Criar solicitação',
        'PUT /api/solicitacoes.php' => 'Atualizar solicitação',
    ],
    'matérias' => [
        'GET /api/materias.php?user_id={id}' => 'Listar matérias',
        'POST /api/materias.php?user_id={id}' => 'Criar matéria',
        'PUT /api/materias.php?user_id={id}' => 'Atualizar matéria',
        'DELETE /api/materias.php?user_id={id}&id={id}' => 'Deletar matéria',
    ],
    'flashcards' => [
        'GET /api/flashcards.php?user_id={id}' => 'Listar flashcards',
        'POST /api/flashcards.php?user_id={id}' => 'Criar flashcard',
        'PUT /api/flashcards.php?user_id={id}' => 'Atualizar flashcard',
        'DELETE /api/flashcards.php?user_id={id}&id={id}' => 'Deletar flashcard',
    ],
    'admin' => [
        'GET /api/admin.php?action=stats' => 'Estatísticas do sistema',
    ],
];

echo json_encode([
    'api' => 'Zard Flashcard API',
    'version' => '1.0',
    'endpoints' => $endpoints
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

