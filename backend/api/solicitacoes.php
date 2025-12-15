<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            $status = $_GET['status'] ?? null;
            if ($status) {
                $stmt = $db->prepare("SELECT * FROM solicitacoes_cadastro WHERE status = ? ORDER BY criado_em DESC");
                $stmt->execute([$status]);
            } else {
                // Listar todas as solicitações
                $stmt = $db->query("SELECT * FROM solicitacoes_cadastro ORDER BY criado_em DESC");
            }
            $solicitacoes = $stmt->fetchAll();
            sendResponse(['success' => true, 'data' => $solicitacoes]);
            break;

        case 'POST':
            $data = getJsonInput();
            
            // Verificar se conseguiu decodificar o JSON
            if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
                sendError('JSON inválido: ' . json_last_error_msg(), 400);
            }
            
            validateRequired($data, ['nome', 'email', 'motivo']);

            // Verificar se a tabela existe (usando uma query de teste)
            try {
                $testStmt = $db->query("SELECT 1 FROM solicitacoes_cadastro LIMIT 1");
            } catch (PDOException $e) {
                // Se a tabela não existe, pode ser que tenha outro nome
                sendError('Tabela "solicitacoes_cadastro" não encontrada. Verifique se o banco de dados está configurado corretamente.', 500);
            }

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
} catch (PDOException $e) {
    error_log("PDO Error: " . $e->getMessage());
    // Verificar se é erro de tabela não encontrada
    if (strpos($e->getMessage(), "doesn't exist") !== false || strpos($e->getMessage(), "Table") !== false) {
        sendError('Erro: Tabela não encontrada. Verifique se a tabela "solicitacoes_cadastro" existe no banco de dados.', 500);
    } else {
        sendError('Erro ao conectar com o banco de dados: ' . $e->getMessage(), 500);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    sendError('Erro interno do servidor: ' . $e->getMessage(), 500);
}
?>


