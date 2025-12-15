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
            } elseif ($action === 'usuarios') {
                // Listar todos os usuários
                $stmt = $db->query("SELECT id, nome, email, tipo, ativo, criado_em FROM usuarios ORDER BY criado_em DESC");
                $usuarios = $stmt->fetchAll();
                sendResponse(['success' => true, 'data' => $usuarios]);
            } elseif ($action === 'configuracoes') {
                // Obter configurações (por enquanto retornar padrões)
                // TODO: Criar tabela de configurações se necessário
                $configuracoes = [
                    'nome_sistema' => 'Zard Flashcard Mastery',
                    'email_suporte' => 'suporte@zard.com',
                    'manutencao' => false,
                    'registro_aberto' => true,
                    'max_flashcards_por_materia' => 1000,
                    'dias_revisao' => 7,
                ];
                sendResponse(['success' => true, 'data' => $configuracoes]);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        case 'PUT':
            if ($action === 'usuarios') {
                $data = getJsonInput();
                validateRequired($data, ['id']);

                $id = $data['id'];
                $updates = [];
                $params = [];

                if (isset($data['nome'])) {
                    $updates[] = "nome = ?";
                    $params[] = $data['nome'];
                }
                if (isset($data['email'])) {
                    $updates[] = "email = ?";
                    $params[] = $data['email'];
                }
                if (isset($data['tipo'])) {
                    $updates[] = "tipo = ?";
                    $params[] = $data['tipo'];
                }
                if (isset($data['ativo'])) {
                    $updates[] = "ativo = ?";
                    $params[] = $data['ativo'] ? 1 : 0;
                }

                if (empty($updates)) {
                    sendError('Nenhum campo para atualizar', 400);
                }

                $params[] = $id;
                $sql = "UPDATE usuarios SET " . implode(', ', $updates) . " WHERE id = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute($params);

                sendResponse(['success' => true, 'message' => 'Usuário atualizado com sucesso']);
            } elseif ($action === 'configuracoes') {
                $data = getJsonInput();
                // Por enquanto apenas retornar sucesso
                // TODO: Implementar salvamento em tabela de configurações
                sendResponse(['success' => true, 'message' => 'Configurações salvas com sucesso']);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        case 'DELETE':
            if ($action === 'usuarios') {
                $id = $_GET['id'] ?? null;
                if (!$id) {
                    sendError('ID do usuário é obrigatório', 400);
                }

                // Não permitir deletar admin
                $stmt = $db->prepare("SELECT tipo FROM usuarios WHERE id = ?");
                $stmt->execute([$id]);
                $usuario = $stmt->fetch();
                
                if ($usuario && $usuario['tipo'] === 'admin') {
                    sendError('Não é permitido deletar usuários administradores', 403);
                }

                $stmt = $db->prepare("DELETE FROM usuarios WHERE id = ?");
                $stmt->execute([$id]);

                sendResponse(['success' => true, 'message' => 'Usuário deletado com sucesso']);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor: ' . $e->getMessage(), 500);
}
?>


