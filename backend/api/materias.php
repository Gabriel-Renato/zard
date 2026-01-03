<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    sendError('user_id é obrigatório', 400);
}

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            
            if ($id) {
                $stmt = $db->prepare("SELECT m.*, 
                    (SELECT COUNT(*) FROM flashcards WHERE materia_id = m.id) as flashcards_count,
                    (SELECT COUNT(*) FROM flashcards WHERE materia_id = m.id AND revisado = 1) as flashcards_revisados
                    FROM materias m WHERE m.id = ? AND m.usuario_id = ?");
                $stmt->execute([$id, $userId]);
                $materia = $stmt->fetch();
                
                if (!$materia) {
                    sendError('Matéria não encontrada', 404);
                }
                sendResponse(['success' => true, 'data' => $materia]);
            } else {
                $stmt = $db->prepare("SELECT m.*, 
                    (SELECT COUNT(*) FROM flashcards WHERE materia_id = m.id) as flashcards_count,
                    (SELECT COUNT(*) FROM flashcards WHERE materia_id = m.id AND revisado = 1) as flashcards_revisados
                    FROM materias m WHERE m.usuario_id = ? ORDER BY m.criado_em DESC");
                $stmt->execute([$userId]);
                $materias = $stmt->fetchAll();
                sendResponse(['success' => true, 'data' => $materias]);
            }
            break;

        case 'POST':
            $data = getJsonInput();
            validateRequired($data, ['nome']);

            $nome = $data['nome'];
            $descricao = $data['descricao'] ?? '';
            $cor = $data['cor'] ?? '#0D9488';

            $stmt = $db->prepare("INSERT INTO materias (usuario_id, nome, descricao, cor) VALUES (?, ?, ?, ?)");
            $stmt->execute([$userId, $nome, $descricao, $cor]);

            sendResponse([
                'success' => true,
                'message' => 'Matéria criada com sucesso',
                'id' => $db->lastInsertId()
            ], 201);
            break;

        case 'PUT':
            $data = getJsonInput();
            validateRequired($data, ['id']);

            $id = $data['id'];
            $nome = $data['nome'] ?? null;
            $descricao = $data['descricao'] ?? null;
            $cor = $data['cor'] ?? null;

            // Verificar se a matéria pertence ao usuário
            $stmt = $db->prepare("SELECT id FROM materias WHERE id = ? AND usuario_id = ?");
            $stmt->execute([$id, $userId]);
            if (!$stmt->fetch()) {
                sendError('Matéria não encontrada', 404);
            }

            $updates = [];
            $params = [];
            if ($nome !== null) {
                $updates[] = "nome = ?";
                $params[] = $nome;
            }
            if ($descricao !== null) {
                $updates[] = "descricao = ?";
                $params[] = $descricao;
            }
            if ($cor !== null) {
                $updates[] = "cor = ?";
                $params[] = $cor;
            }

            if (empty($updates)) {
                sendError('Nenhum campo para atualizar', 400);
            }

            $params[] = $id;
            $sql = "UPDATE materias SET " . implode(", ", $updates) . " WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            sendResponse(['success' => true, 'message' => 'Matéria atualizada com sucesso']);
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                sendError('ID é obrigatório', 400);
            }

            // Verificar se a matéria pertence ao usuário
            $stmt = $db->prepare("SELECT id FROM materias WHERE id = ? AND usuario_id = ?");
            $stmt->execute([$id, $userId]);
            if (!$stmt->fetch()) {
                sendError('Matéria não encontrada', 404);
            }

            $stmt = $db->prepare("DELETE FROM materias WHERE id = ?");
            $stmt->execute([$id]);

            sendResponse(['success' => true, 'message' => 'Matéria removida com sucesso']);
            break;

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor', 500);
}
?>


