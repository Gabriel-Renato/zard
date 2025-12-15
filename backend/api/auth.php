<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    switch ($method) {
        case 'GET':
            if ($action === 'perfil') {
                $userId = $_GET['user_id'] ?? null;
                if (!$userId) {
                    sendError('user_id é obrigatório', 400);
                }

                $stmt = $db->prepare("SELECT id, nome, email, tipo, ativo, criado_em FROM usuarios WHERE id = ?");
                $stmt->execute([$userId]);
                $user = $stmt->fetch();

                if (!$user) {
                    sendError('Usuário não encontrado', 404);
                }

                sendResponse([
                    'success' => true,
                    'data' => $user
                ]);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        case 'POST':
            if ($action === 'login') {
                $data = getJsonInput();
                validateRequired($data, ['email', 'password']);

                $stmt = $db->prepare("SELECT id, nome, email, senha, tipo, ativo FROM usuarios WHERE email = ?");
                $stmt->execute([$data['email']]);
                $user = $stmt->fetch();

                if (!$user || !password_verify($data['password'], $user['senha'])) {
                    sendError('Credenciais inválidas', 401);
                }

                if (!$user['ativo']) {
                    sendError('Usuário inativo', 403);
                }

                // Verificar se o usuário tem uma solicitação aprovada
                // Se não for admin, verificar status da solicitação
                if ($user['tipo'] === 'estudante') {
                    $stmt = $db->prepare("SELECT status FROM solicitacoes_cadastro WHERE email = ? ORDER BY criado_em DESC LIMIT 1");
                    $stmt->execute([$data['email']]);
                    $solicitacao = $stmt->fetch();
                    
                    if ($solicitacao) {
                        if ($solicitacao['status'] === 'pendente') {
                            unset($user['senha']);
                            sendResponse([
                                'success' => true,
                                'user' => $user,
                                'aprovado' => false,
                                'message' => 'Cadastro em análise'
                            ]);
                            return;
                        } elseif ($solicitacao['status'] === 'rejeitado') {
                            sendError('Sua solicitação de cadastro foi rejeitada. Entre em contato com o administrador.', 403);
                            return;
                        }
                    } else {
                        // Se não tem solicitação, pode ser um usuário criado diretamente (admin ou antigo)
                        // Permitir acesso
                    }
                }

                unset($user['senha']);
                sendResponse([
                    'success' => true,
                    'user' => $user,
                    'aprovado' => true,
                    'message' => 'Login realizado com sucesso'
                ]);
            } elseif ($action === 'register') {
                $data = getJsonInput();
                validateRequired($data, ['nome', 'email', 'password']);

                // Verificar se email já existe
                $stmt = $db->prepare("SELECT id FROM usuarios WHERE email = ?");
                $stmt->execute([$data['email']]);
                if ($stmt->fetch()) {
                    sendError('Email já cadastrado', 409);
                }

                $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
                $stmt->execute([$data['nome'], $data['email'], $hashedPassword]);

                sendResponse([
                    'success' => true,
                    'message' => 'Usuário cadastrado com sucesso',
                    'user_id' => $db->lastInsertId()
                ], 201);
            } else {
                sendError('Ação inválida', 400);
            }
            break;

        case 'PUT':
            if ($action === 'perfil') {
                $data = getJsonInput();
                validateRequired($data, ['user_id']);

                $userId = $data['user_id'];
                $updates = [];
                $params = [];

                if (isset($data['nome'])) {
                    $updates[] = "nome = ?";
                    $params[] = $data['nome'];
                }
                if (isset($data['email'])) {
                    // Verificar se o email já está em uso por outro usuário
                    $stmt = $db->prepare("SELECT id FROM usuarios WHERE email = ? AND id != ?");
                    $stmt->execute([$data['email'], $userId]);
                    if ($stmt->fetch()) {
                        sendError('Email já está em uso', 409);
                    }
                    $updates[] = "email = ?";
                    $params[] = $data['email'];
                }
                if (isset($data['senha'])) {
                    $updates[] = "senha = ?";
                    $params[] = password_hash($data['senha'], PASSWORD_DEFAULT);
                }

                if (empty($updates)) {
                    sendError('Nenhum campo para atualizar', 400);
                }

                $params[] = $userId;
                $sql = "UPDATE usuarios SET " . implode(', ', $updates) . " WHERE id = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute($params);

                // Retornar dados atualizados
                $stmt = $db->prepare("SELECT id, nome, email, tipo, ativo, criado_em FROM usuarios WHERE id = ?");
                $stmt->execute([$userId]);
                $user = $stmt->fetch();

                sendResponse([
                    'success' => true,
                    'message' => 'Perfil atualizado com sucesso',
                    'data' => $user
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


