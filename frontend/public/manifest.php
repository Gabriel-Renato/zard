<?php
/**
 * Manifest PWA para InfinityFree
 * InfinityFree intercepta arquivos .json, então usamos PHP para forçar o Content-Type correto
 */

// Força o Content-Type correto (CRÍTICO para InfinityFree)
header('Content-Type: application/json; charset=utf-8');

// Cache control
header('Cache-Control: public, max-age=3600');

// Retorna o manifest diretamente via json_encode (mais confiável no InfinityFree)
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
?>
