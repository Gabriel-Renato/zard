<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    switch ($method) {
        case 'GET':
            if ($action === 'stats') {
                // Total de usuários
                $stmt = $db->query("SELECT COUNT(*) as total FROM usuarios WHERE tipo = 'estudante'");
                $totalUsuarios = $stmt->fetch()['total'];

                // Solicitações pendentes
                $stmt = $db->query("SELECT COUNT(*) as total FROM solicitacoes_cadastro WHERE status = 'pendente'");
                $solicitacoesPendentes = $stmt->fetch()['total'];

                // Aprovados hoje
                $stmt = $db->query("SELECT COUNT(*) as total FROM solicitacoes_cadastro WHERE status = 'aprovado' AND DATE(atualizado_em) = CURDATE()");
                $aprovadosHoje = $stmt->fetch()['total'];

                // Total de flashcards
                $stmt = $db->query("SELECT COUNT(*) as total FROM flashcards");
                $totalFlashcards = $stmt->fetch()['total'];

                sendResponse([
                    'success' => true,
                    'data' => [
                        'total_usuarios' => (int)$totalUsuarios,
                        'solicitacoes_pendentes' => (int)$solicitacoesPendentes,
                        'aprovados_hoje' => (int)$aprovadosHoje,
                        'total_flashcards' => (int)$totalFlashcards
                    ]
                ]);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor', 500);
}
?>


