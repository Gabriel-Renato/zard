<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    switch ($method) {
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

                unset($user['senha']);
                sendResponse([
                    'success' => true,
                    'user' => $user,
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

        default:
            sendError('Método não permitido', 405);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    sendError('Erro interno do servidor', 500);
}
?>


