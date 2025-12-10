<?php
// Router simples para a API
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remover query string
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/backend/api', '', $path);
$path = trim($path, '/');

// Roteamento
switch ($path) {
    case 'auth':
    case 'auth.php':
        require_once 'auth.php';
        break;
    
    case 'solicitacoes':
    case 'solicitacoes.php':
        require_once 'solicitacoes.php';
        break;
    
    case 'materias':
    case 'materias.php':
        require_once 'materias.php';
        break;
    
    case 'flashcards':
    case 'flashcards.php':
        require_once 'flashcards.php';
        break;
    
    case 'admin':
    case 'admin.php':
        require_once 'admin.php';
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}
?>

