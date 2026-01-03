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
            
            validateRequired($data, ['nome', 'email', 'motivo', 'senha']);

            // Verificar se email já existe em solicitações pendentes ou aprovadas
            $stmt = $db->prepare("SELECT id, status FROM solicitacoes_cadastro WHERE email = ? AND status IN ('pendente', 'aprovado')");
            $stmt->execute([$data['email']]);
            $solicitacaoExistente = $stmt->fetch();
            if ($solicitacaoExistente) {
                sendError('Já existe uma solicitação para este email', 409);
            }

            // Verificar se email já existe em usuários
            $stmt = $db->prepare("SELECT id FROM usuarios WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                sendError('Este email já está cadastrado', 409);
            }

            // Criar solicitação
            $stmt = $db->prepare("INSERT INTO solicitacoes_cadastro (nome, email, motivo) VALUES (?, ?, ?)");
            $stmt->execute([$data['nome'], $data['email'], $data['motivo']]);
            $solicitacaoId = $db->lastInsertId();

            // Criar usuário imediatamente com senha (mas ainda não aprovado)
            $hashedPassword = password_hash($data['senha'], PASSWORD_DEFAULT);
            $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
            $stmt->execute([$data['nome'], $data['email'], $hashedPassword]);

            sendResponse([
                'success' => true,
                'message' => 'Solicitação enviada com sucesso. Aguarde a aprovação do administrador.',
                'id' => $solicitacaoId
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

            // Usuário já foi criado quando a solicitação foi feita, apenas atualizar status
            // Se rejeitado, podemos desativar o usuário (opcional)
            if ($data['status'] === 'rejeitado') {
                $stmt = $db->prepare("SELECT email FROM solicitacoes_cadastro WHERE id = ?");
                $stmt->execute([$data['id']]);
                $solicitacao = $stmt->fetch();
                if ($solicitacao) {
                    $stmt = $db->prepare("UPDATE usuarios SET ativo = 0 WHERE email = ?");
                    $stmt->execute([$solicitacao['email']]);
                }
            } elseif ($data['status'] === 'aprovado') {
                // Garantir que o usuário está ativo quando aprovado
                $stmt = $db->prepare("SELECT email FROM solicitacoes_cadastro WHERE id = ?");
                $stmt->execute([$data['id']]);
                $solicitacao = $stmt->fetch();
                if ($solicitacao) {
                    $stmt = $db->prepare("UPDATE usuarios SET ativo = 1 WHERE email = ?");
                    $stmt->execute([$solicitacao['email']]);
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


