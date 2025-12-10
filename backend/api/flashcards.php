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
            $materiaId = $_GET['materia_id'] ?? null;
            $revisado = $_GET['revisado'] ?? null;

            if ($id) {
                $stmt = $db->prepare("SELECT * FROM flashcards WHERE id = ? AND usuario_id = ?");
                $stmt->execute([$id, $userId]);
                $flashcard = $stmt->fetch();
                
                if (!$flashcard) {
                    sendError('Flashcard não encontrado', 404);
                }
                sendResponse(['success' => true, 'data' => $flashcard]);
            } else {
                $sql = "SELECT * FROM flashcards WHERE usuario_id = ?";
                $params = [$userId];

                if ($materiaId) {
                    $sql .= " AND materia_id = ?";
                    $params[] = $materiaId;
                }

                if ($revisado !== null) {
                    $sql .= " AND revisado = ?";
                    $params[] = $revisado === 'true' || $revisado === '1' ? 1 : 0;
                }

                $sql .= " ORDER BY criado_em DESC";
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                $flashcards = $stmt->fetchAll();
                sendResponse(['success' => true, 'data' => $flashcards]);
            }
            break;

        case 'POST':
            $data = getJsonInput();
            validateRequired($data, ['pergunta', 'resposta', 'materia_id']);

            $pergunta = $data['pergunta'];
            $resposta = $data['resposta'];
            $materiaId = $data['materia_id'];
            $dificuldade = $data['dificuldade'] ?? 'medium';

            // Verificar se a matéria pertence ao usuário
            $stmt = $db->prepare("SELECT id FROM materias WHERE id = ? AND usuario_id = ?");
            $stmt->execute([$materiaId, $userId]);
            if (!$stmt->fetch()) {
                sendError('Matéria não encontrada', 404);
            }

            $stmt = $db->prepare("INSERT INTO flashcards (materia_id, usuario_id, pergunta, resposta, dificuldade) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$materiaId, $userId, $pergunta, $resposta, $dificuldade]);

            sendResponse([
                'success' => true,
                'message' => 'Flashcard criado com sucesso',
                'id' => $db->lastInsertId()
            ], 201);
            break;

        case 'PUT':
            $data = getJsonInput();
            validateRequired($data, ['id']);

            $id = $data['id'];
            $pergunta = $data['pergunta'] ?? null;
            $resposta = $data['resposta'] ?? null;
            $dificuldade = $data['dificuldade'] ?? null;
            $revisado = $data['revisado'] ?? null;
            $materiaId = $data['materia_id'] ?? null;

            // Verificar se o flashcard pertence ao usuário
            $stmt = $db->prepare("SELECT id FROM flashcards WHERE id = ? AND usuario_id = ?");
            $stmt->execute([$id, $userId]);
            if (!$stmt->fetch()) {
                sendError('Flashcard não encontrado', 404);
            }

            $updates = [];
            $params = [];
            if ($pergunta !== null) {
                $updates[] = "pergunta = ?";
                $params[] = $pergunta;
            }
            if ($resposta !== null) {
                $updates[] = "resposta = ?";
                $params[] = $resposta;
            }
            if ($dificuldade !== null) {
                $updates[] = "dificuldade = ?";
                $params[] = $dificuldade;
            }
            if ($revisado !== null) {
                $updates[] = "revisado = ?";
                $params[] = $revisado === true || $revisado === 'true' || $revisado === '1' ? 1 : 0;
            }
            if ($materiaId !== null) {
                // Verificar se a nova matéria pertence ao usuário
                $stmt = $db->prepare("SELECT id FROM materias WHERE id = ? AND usuario_id = ?");
                $stmt->execute([$materiaId, $userId]);
                if (!$stmt->fetch()) {
                    sendError('Matéria não encontrada', 404);
                }
                $updates[] = "materia_id = ?";
                $params[] = $materiaId;
            }

            if (empty($updates)) {
                sendError('Nenhum campo para atualizar', 400);
            }

            $params[] = $id;
            $sql = "UPDATE flashcards SET " . implode(", ", $updates) . " WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            sendResponse(['success' => true, 'message' => 'Flashcard atualizado com sucesso']);
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                sendError('ID é obrigatório', 400);
            }

            // Verificar se o flashcard pertence ao usuário
            $stmt = $db->prepare("SELECT id FROM flashcards WHERE id = ? AND usuario_id = ?");
            $stmt->execute([$id, $userId]);
            if (!$stmt->fetch()) {
                sendError('Flashcard não encontrado', 404);
            }

            $stmt = $db->prepare("DELETE FROM flashcards WHERE id = ?");
            $stmt->execute([$id]);

            sendResponse(['success' => true, 'message' => 'Flashcard removido com sucesso']);
            break;

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor', 500);
}
?>

