<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/database.php';

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

function sendError($message, $statusCode = 400, $details = null) {
    $response = ['error' => $message];
    if ($details && (defined('DEBUG') && DEBUG)) {
        $response['details'] = $details;
    }
    sendResponse($response, $statusCode);
}

function getJsonInput() {
    $json = file_get_contents('php://input');
    return json_decode($json, true);
}

function validateRequired($data, $fields) {
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            sendError("Campo obrigatório: $field");
        }
    }
}
?>


