<?php
/**
 * Manifest PWA - Força Content-Type correto
 * Use este arquivo se o .htaccess não estiver funcionando
 * 
 * No index.html, altere:
 * <link rel="manifest" href="/manifest.json" />
 * Para:
 * <link rel="manifest" href="/manifest.php" />
 */

// Força o Content-Type correto
header('Content-Type: application/json; charset=utf-8');

// Previne cache (opcional - remova em produção se necessário)
header('Cache-Control: public, max-age=3600');

// Lê e exibe o manifest.json
$manifestPath = __DIR__ . '/manifest.json';

if (file_exists($manifestPath)) {
    // Lê o arquivo e remove qualquer BOM
    $content = file_get_contents($manifestPath);
    // Remove BOM se existir
    $content = preg_replace('/^\xEF\xBB\xBF/', '', $content);
    echo $content;
} else {
    // Fallback: retorna o manifest diretamente
    http_response_code(200);
    echo json_encode([
        "name" => "Zard - Aprenda com Flashcards Inteligentes",
        "short_name" => "Zard",
        "description" => "A plataforma de estudos que transforma seu aprendizado com flashcards interativos.",
        "start_url" => "/",
        "display" => "standalone",
        "background_color" => "#ffffff",
        "theme_color" => "#6366f1",
        "orientation" => "portrait-primary",
        "scope" => "/",
        "icons" => [
            [
                "src" => "/icons/icon-192x192.png",
                "sizes" => "192x192",
                "type" => "image/png",
                "purpose" => "any maskable"
            ],
            [
                "src" => "/icons/icon-512x512.png",
                "sizes" => "512x512",
                "type" => "image/png",
                "purpose" => "any maskable"
            ]
        ],
        "categories" => ["education", "productivity"],
        "lang" => "pt-BR",
        "dir" => "ltr"
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>

