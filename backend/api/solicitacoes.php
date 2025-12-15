<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            $status = $_GET['status'] ?? 'pendente';
            $stmt = $db->prepare("SELECT * FROM solicitacoes_cadastro WHERE status = ? ORDER BY criado_em DESC");
            $stmt->execute([$status]);
            $solicitacoes = $stmt->fetchAll();
            sendResponse(['success' => true, 'data' => $solicitacoes]);
            break;

        case 'POST':
            $data = getJsonInput();
            validateRequired($data, ['nome', 'email', 'motivo']);

            $stmt = $db->prepare("INSERT INTO solicitacoes_cadastro (nome, email, motivo) VALUES (?, ?, ?)");
            $stmt->execute([$data['nome'], $data['email'], $data['motivo']]);

            sendResponse([
                'success' => true,
                'message' => 'Solicitação enviada com sucesso',
                'id' => $db->lastInsertId()
            ], 201);
            break;

        case 'PUT':
            $data = getJsonInput();
            validateRequired($data, ['id', 'status']);

            $allowedStatus = ['pendente', 'aprovado', 'rejeitado'];
            if (!in_array($data['status'], $allowedStatus)) {
                sendError('Status inválido');
            }

            $stmt = $db->prepare("UPDATE solicitacoes_cadastro SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['id']]);

            // Se aprovado, criar usuário
            if ($data['status'] === 'aprovado') {
                $stmt = $db->prepare("SELECT * FROM solicitacoes_cadastro WHERE id = ?");
                $stmt->execute([$data['id']]);
                $solicitacao = $stmt->fetch();

                if ($solicitacao) {
                    // Verificar se já existe usuário com esse email
                    $stmt = $db->prepare("SELECT id FROM usuarios WHERE email = ?");
                    $stmt->execute([$solicitacao['email']]);
                    if (!$stmt->fetch()) {
                        // Criar senha temporária (usuário deve trocar no primeiro login)
                        $senhaTemporaria = bin2hex(random_bytes(8));
                        $hashedPassword = password_hash($senhaTemporaria, PASSWORD_DEFAULT);
                        $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
                        $stmt->execute([$solicitacao['nome'], $solicitacao['email'], $hashedPassword]);
                    }
                }
            }

            sendResponse(['success' => true, 'message' => 'Status atualizado com sucesso']);
            break;

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor', 500);
}
?>


